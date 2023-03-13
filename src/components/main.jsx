import React, { useEffect } from "react"
import { Row } from "react-bootstrap"
import { multiStateContext } from "../context/contextApi"
import { mapProduct } from "./mapProduct"

const Main = () => {
  const { products, selectedCategory, searchResult, search, getUserData } =
    React.useContext(multiStateContext)
  useEffect(() => {
    getUserData()
  }, [])

  const displayProducts = () => {
    switch (true) {
      case search !== "" && searchResult.length:
        return (
          <Row className="w-100">
            <Row className="w-100">{mapProduct(searchResult)}</Row>
          </Row>
        )
      case search !== "" && !searchResult.length:
        return (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <h1 className="d-none d-sm-block">
              No Product Match the Given Filter
            </h1>
            <p className="d-sm-none">No Product Match the Given Filter</p>
          </div>
        )
      case !products.length:
        return (
          <div className="w-100 d-flex justify-content-center align-items-center">
            <h1 className="d-none d-sm-block">
              There is No Product that Match this Category
            </h1>
            <p className="d-sm-none">
              There is No Product that Match this Category
            </p>
          </div>
        )
      default:
        return (
          <Row className="w-100">
            {mapProduct(search ? searchResult : products)}
          </Row>
        )
    }
  }
  return (
    <div>
      <h4
        style={{
          borderRadius: "10px",
          padding: "10px",
          width: "18rem",
          backgroundColor: "var(--primary-color)",
          color: "var(--secondary-color)",
        }}
      >
        {selectedCategory}
      </h4>

      {displayProducts()}
    </div>
  )
}

export default Main
