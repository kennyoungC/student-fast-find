import React, { useState, createContext } from "react"
import App from "../App"
import axios from "axios"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
const initialState = {
  showSignIn: false,
  showRegister: false,
  getUserData: () => {},
  user: "",
  setUser: () => {},
  products: [],
  categories: [],
  changeCategory: () => {},
  selectedCategory: "",
  search: "",
  setSearch: () => {},
}

export const multiStateContext = createContext(initialState)

export const StateContext = () => {
  const [user, setUser] = useState("")
  const [products, setProducts] = useState([])

  const getUserData = async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const response = await axios.get("http://localhost:3001/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUser(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [categories] = useState([
    "All",
    "Accessories",
    "Beauty",
    "Books",
    "Electronics",
    "Fashion",
    "Home",
    "Mobility",
    "Others",
  ])
  const [selectedCategory, setSelectedCategory] = useState("All")

  const changeCategory = (category) => {
    setSelectedCategory(category)
  }

  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const getProductsBySearch = async () => {
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase())
    )
    setSearchResult(filteredProducts)
  }

  const getProducts = async () => {
    const token = localStorage.getItem("token")
    const url =
      selectedCategory === "All"
        ? "http://localhost:3001/products"
        : `http://localhost:3001/products?category=${selectedCategory}`

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setProducts(response.data)
  }

  useEffect(() => {
    getProducts()
    getProductsBySearch()
  }, [selectedCategory, search])

  return (
    <multiStateContext.Provider
      value={{
        getUserData,
        user,
        setUser,
        products,
        categories,
        changeCategory,
        selectedCategory,
        search,
        setSearch,
        searchResult,
        setProducts,
      }}
    >
      <App />
    </multiStateContext.Provider>
  )
}
