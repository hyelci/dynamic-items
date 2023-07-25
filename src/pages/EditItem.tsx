import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useNavigate, useParams } from 'react-router'
import FormRow from '../components/FormRow'
import { Item } from '../models/item.interface'
import { editItem, getItemDetails } from '../features/items/itemsSlice'

const EditItem = () => {
  const { itemDetails } = useAppSelector((store) => store.items)
  const [formInput, setFormInput] = useState<Item | undefined>(itemDetails)
  const navigate = useNavigate()

  const { id } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getItemDetails(parseInt(id!)))
  }, [id, dispatch])

  useEffect(() => {
    setFormInput(itemDetails)
  }, [itemDetails])

  const handleItemInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const inputValue = e.target.value
    setFormInput({ ...formInput, [name]: inputValue } as Item)
  }

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formInput) {
      await dispatch(editItem(formInput))
      navigate('/')
    }
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit} className="mx-14 mt-24">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-1">
            <h2 className="my-4 font-semibold">Edit the Yoga Type</h2>

            <FormRow
              type="text"
              name="name"
              value={formInput?.name!}
              handleChange={handleItemInput}
            />

            <FormRow
              type="text"
              name="description"
              value={formInput?.description!}
              handleChange={handleItemInput}
            />

            <FormRow
              type="url"
              name="image"
              value={formInput?.image!}
              handleChange={handleItemInput}
            />

            <button
              type="submit"
              className="mt-5 rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditItem
