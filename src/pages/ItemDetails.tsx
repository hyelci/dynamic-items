import { useNavigate, useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useEffect } from 'react'
import { deleteItem, getItemDetails } from '../features/items/itemsSlice'
import { Link } from 'react-router-dom'

const ItemDetails = () => {
  const { itemDetails } = useAppSelector((store) => store.items)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(getItemDetails(parseInt(id!)))
  }, [id, dispatch])

  const handleDelete = async () => {
    await dispatch(deleteItem(itemDetails!.id))
    navigate('/')
  }

  if (!itemDetails) {
    return <p>Loading</p>
  }
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {itemDetails.name}
        </h1>
        <div className="mt-16 mx-auto">
          {' '}
          <img src={itemDetails.image} alt="" />
        </div>

        <div className="mt-8 max-w-2xl">
          <p className="mb-4">{itemDetails.description}</p>
          <button
            type="button"
            className="mx-1 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={handleDelete}
          >
            Delete
          </button>
          <Link
            to={`/edit-item/${itemDetails.id}`}
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ItemDetails
