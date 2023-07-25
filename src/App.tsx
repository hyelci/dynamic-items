import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import ItemDetails from './pages/ItemDetails'
import AddItem from './pages/AddItem'
import EditItem from './pages/EditItem'

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/data/:id" element={<ItemDetails />}></Route>
      <Route path="/create-item" element={<AddItem />}></Route>
      <Route path="/edit-item/:id" element={<EditItem />}></Route>
    </Routes>
  )
}

export default App
