import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Category from '../admin/Container/Category'
import SubCategory from '../admin/Container/SubCategory'

export default function AdminRoute() {
  return (
    <Routes>
      <Route path='/Category' element={<Category/>}/>
      <Route path='/SubCategory' element={<SubCategory/>}/>
    </Routes>
  )
}
