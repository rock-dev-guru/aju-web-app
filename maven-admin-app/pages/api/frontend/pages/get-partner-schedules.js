import Cors from 'cors'
import corsMiddleware from '../../../../lib/middleware/cors'
import { query as q } from 'faunadb'
import { faunaClient } from '../../../../lib/config/fauna'
import moment from 'moment-timezone'
import jwt from 'next-auth/jwt'

// Initializing the cors middleware
const cors = corsMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: [process.env.NEXT_PUBLIC_FRONTEND_API_URL],
    methods: ['POST'],
  })
)

const secret = process.env.JWT_SECRET

async function handler(req, res) {
  // Run the middleware
  await cors(req, res)

  // check if you can verify the api token then do your process
  // else it's an invalid api token
  let payload = null
  try {
    // Guide: https://nate-d-gage.medium.com/authentication-with-next-js-and-json-web-token-baf93ce7a63
    const apiToken = req.headers.authorization.replace('Bearer ', '')
    payload = await jwt.decode({ token: apiToken, secret: secret })
  } catch (error) {
    res.status(401).json([{ key: 'general', values: 'Not Authenticated' }])
    return
  }

  if (req.method == 'POST') {
    // get the current userId, this userId should belong to a partner
    const userId = payload.userRefID

    // get the organization profile of the partner using userId
    let userOrgProfile = null
    try {
      await faunaClient
        .query(q.Get(q.Match(q.Index('organizations_by_owner_id'), userId)))
        .then((ret) => {
          userOrgProfile = ret.data
          userOrgProfile['id'] = ret.ref.id
        })
    } catch (error) {
      res.status(422).json([{ key: 'general', values: error.description }])
      return
    }

    const { startDt, endDt } = req.body

    if (startDt.length > 0 && endDt.length > 0) {
      let formattedStartDt = moment(startDt, 'YYYY-MM-DD HH:mm:ss')
      let formattedEndDt = moment(endDt, 'YYYY-MM-DD HH:mm:ss')

      if (!formattedEndDt.isAfter(formattedStartDt)) {
        res.status(422).json([{ key: 'general', values: 'Invalid Dates' }])
        return
      }
    }

    try {
      await faunaClient
        .query(
          q.Paginate(
            q.Match(q.Index('products_for_partner_dashboard'), [
              'published',
              'no',
            ]),
            { size: 100000 }
          )
        )
        .then(async (result) => {
          let data = result.data

          let formattedOutput = data.map((item, index) => {
            let dateNow = moment(new Date(), 'YYYY-MM-DD HH:mm:ss')
            let dateToCheck = moment(item[2], 'YYYY-MM-DD HH:mm:ss')
            let isDateConditionAllow = false

            if (startDt.length > 0 && endDt.length > 0) {
              let formattedStartDt = moment(startDt, 'YYYY-MM-DD HH:mm:ss')
              let formattedEndDt = moment(endDt, 'YYYY-MM-DD HH:mm:ss')

              if (dateToCheck.isBetween(formattedStartDt, formattedEndDt)) {
                isDateConditionAllow = true
              }
            } else if (dateToCheck.isAfter(dateNow)) {
              isDateConditionAllow = true
            }

            if (isDateConditionAllow) {
              return {
                img:
                  item[3] ||
                  `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/images/product-1.png`,
                link: `${process.env.NEXT_PUBLIC_FRONTEND_API_URL}/events-classes/program/${item[4]}`,
                name: item[5],
                description: item[6],
                date: moment(item[0]).format('MMM DD'),
                time: moment(item[0]).format('hh:mm A'),
                month: moment(item[0]).format('MMM'),
                day: moment(item[0]).format('DD'),
                free: Number(item[8]) <= 0 ? true : false,
                startDt: moment(item[1]).format('YYYY-MM-DD | hh:mm A'),
                registrationStartDt: moment(item[0]).format(
                  'YYYY-MM-DD | hh:mm A'
                ),
                id: item[9].id,
              }
            } else {
              return {}
            }
          })

          formattedOutput = formattedOutput.filter((item) => {
            return item.img !== undefined
          })

          res.status(200).json(formattedOutput)
          return
        })
    } catch (error) {
      res.status(422).json([{ key: 'general', values: error.description }])
      return
    }
  }
}

export default handler
