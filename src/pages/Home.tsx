import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getItemsList } from '../features/items/itemsSlice'
import { SingleItem } from '../components/SingleItem'

const Home = () => {
  const { itemList } = useAppSelector((store) => store.items)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getItemsList())
  }, [dispatch])

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mt-6">
            Items
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Here are your items list
          </p>
          <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
            {itemList?.map((item) => (
              <SingleItem item={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
