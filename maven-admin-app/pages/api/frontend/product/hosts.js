import Cors from 'cors'
import corsMiddleware from '../../../../lib/middleware/cors'
import { query as q } from 'faunadb'
import { faunaClient } from '../../../../lib/config/fauna'
import moment from 'moment'
import { server } from '../../../../lib/config/server'

// Initializing the cors middleware
const cors = corsMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: [process.env.NEXT_PUBLIC_FRONTEND_API_URL],
    methods: ['POST'],
  })
)

async function handler(req, res) {
  // Run the middleware
  await cors(req, res)

  if (req.method == 'POST') {
    let hostArray = []
    for (let index = 0; index < req.body.length; index++) {
      const host = req.body[index]
      try {
        await faunaClient
          .query(q.Get(q.Ref(q.Collection('hosts'), host.value)))
          .then((result) => {
            hostArray.push(result.data)
            hostArray[index].role = host.role
          })
      } catch (error) {
        res.status(422).json([{ key: 'general', values: error.description }])
        return
      }
    }
    res.status(200).json(hostArray)
    return
  }
}

export default handler
