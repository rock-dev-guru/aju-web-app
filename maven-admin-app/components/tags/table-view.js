import React, { useMemo } from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from '../../lib/config/server'
import ReactTableView from '../../components/shared/table-template'
import AlertModal from '../../components/shared/alert-modal'
import Meta from '../meta'

function TableView() {
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [loadCount, setloadCount] = useState(0)
  const [dataRows, setdataRows] = useState([])
  const [totalRows, settotalRows] = useState(0)
  const [showDeleteModal, setshowDeleteModal] = useState(false)
  const [toDeleteItem, setToDeleteItem] = useState(null)

  const showAlert = (e, ref) => {
    e.preventDefault()
    setshowDeleteModal(true)
    setToDeleteItem(ref)
  }

  const hideAlert = () => {
    setshowDeleteModal(false)
    setToDeleteItem(null)
  }

  const confirmedDeleteHandler = async () => {
    await axios
      .post(`${server}/api/tags/${toDeleteItem}/deactivate`, {
        is_deleted: true,
      })
      .then(async (response) => {
        console.log('Success')
        await fetchData()
      })
      .catch((error) => {
        console.log(error)
        setErrors(error.response.data)
        setIsLoading(true)
      })

    setshowDeleteModal(false)
    setToDeleteItem(null)
  }

  const columns = useMemo(
    () => [
      // {
      //     Header: 'Ref#',
      //     accessor: 'ref',
      // },
      {
        Header: 'Action',
        Cell: function ActionButtons({ row }) {
          return (
            <div>
              <a
                href={`${server}/tags/${row.original.ref}/edit`}
                className="text-primary hover:text-primary-dark"
              >
                Edit
              </a>
              <a
                href=""
                onClick={(e) => showAlert(e, row.original.ref)}
                className={`ml-3 text-red-500 hover:text-red-700 ${
                  row.original.status == 'inactive' ? 'hidden' : ''
                }`}
              >
                Inactive
              </a>
            </div>
          )
        },
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Desktop Image',
        Cell: function DeskImage({ row }) {
          return (
            <div>
              <a
                href={`${row.original.desktop_image_url}`}
                target="_blank"
                className="text-primary hover:text-primary-dark"
                rel="noreferrer"
              >
                Click to Open Link
              </a>
            </div>
          )
        },
      },
      {
        Header: 'Featured',
        accessor: 'is_featured',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
    ],
    []
  )

  const data = useMemo(() => dataRows, [dataRows])

  useEffect(async () => {
    //initial load page 1 and limit
    setErrors({})
    await fetchData()
  }, [])

  const fetchData = async () => {
    await axios
      .get(`${server}/api/tags/all`)
      .then((response) => {
        const data = response.data.result.data
        const count = response.data.count
        const tags = []
        let counter = 0

        settotalRows(count)
        for (const key in data) {
          const tag = {
            id: parseInt(key) + 1,
            name: data[key][0],
            description: data[key][1].substring(0, 25),
            desktop_image_url: data[key][2],
            // mobile_image_url: data[key][3],
            is_featured: data[key][4] == 'yes' ? 'Yes' : 'No',
            status: data[key][6],
            ref: data[key][7]['@ref']['id'],
          }

          tags.push(tag)
          counter++
          setloadCount(counter)
        }

        setdataRows(tags)
        setIsLoading(false)
      })
      .catch(function (err) {
        console.log(err)
        setErrors(err.response.result.data)
        return
      })
  }

  return (
    <>
      <Meta title="Tags | Maven Admin" keywords="" description="" />
      {isLoading && (
        <div
          className={`loading-dock border-4 border-dashed border-gray-200 rounded-lg ${
            errors.length > 0 ? 'h-20' : 'h-16'
          }`}
        >
          <p className="text-center pt-4 text-gray-600">
            Loading ({loadCount}/{totalRows})
          </p>
          {errors.length > 0 && (
            <p className="text-red-600 text-center pb-4">
              Error Encountered! Something went wrong.
            </p>
          )}
        </div>
      )}
      {!isLoading && <ReactTableView columns={columns} rows={dataRows} />}
      <AlertModal
        show={showDeleteModal}
        title="Disable Tag"
        desc="Are you sure you want to disable this tag?"
        cancelActionhandler={hideAlert}
        actionHandler={confirmedDeleteHandler}
        actionName="Disable"
      />
    </>
  )
}

export default TableView
