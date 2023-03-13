import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"

import Home from "./components/home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Account from "./components/account"
import PageNavbar from "./components/navbar"
import Details from "./components/details"
import MyProducts from "./components/myProducts"
import Login from "./components/login"
import { AuthRoute } from "./components/AuthRoute"

function App() {
  return (
    <BrowserRouter>
      <PageNavbar />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <AuthRoute>
              <Home />
            </AuthRoute>
          }
        />

        <Route
          path="/account"
          element={
            <AuthRoute>
              <Account />
            </AuthRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <AuthRoute>
              <Details />
            </AuthRoute>
          }
        />

        <Route
          path="/sell"
          element={
            <AuthRoute>
              <MyProducts />
            </AuthRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
