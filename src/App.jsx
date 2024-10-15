import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import ShowChannel from './Components/ShowChannel'
import ShowVideo from './Components/ShowVideo'
import SearchPage from './Components/SearchPage'

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/channel/:id' element={<ShowChannel></ShowChannel>}></Route>
        <Route path='/video/:id' element={<ShowVideo></ShowVideo>}></Route>
        <Route path='/search' element={<SearchPage></SearchPage>}></Route>

      </Routes>

    </>
  )
}

export default App
