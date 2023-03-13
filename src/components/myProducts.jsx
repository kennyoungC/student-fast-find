import React, { useCallback, useContext } from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { Row, Col, Container, Card } from "react-bootstrap"

import { FaCloudUploadAlt } from "react-icons/fa"

import EditModel from "./singleProduct"
import PostModel from "./postProduct"
import { multiStateContext } from "../context/contextApi"

const MyProducts = () => {
  const [myProducts, setMyProducts] = useState([])
  const [show, setShow] = useState(false)
  const { products, setProducts } = useContext(multiStateContext)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const updateUi = (res) => {
    setMyProducts([...myProducts, res])
  }
  const deleteUI = async (singleId) => {
    setMyProducts(myProducts.filter((product) => product._id !== singleId))
    setProducts(products.filter((product) => product._id !== singleId))
  }

  const myProduct = useCallback(async () => {
    const token = localStorage.getItem("token")
    await axios
      .get("http://localhost:3001/users/me/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMyProducts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  useEffect(() => {
    myProduct()
  }, [myProduct])

  return (
    <div>
      <Container style={{ marginTop: "24px", marginBottom: "80px" }}>
        <div className="d-flex" style={{ gap: "12px" }}>
          <h4
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "18rem",
              backgroundColor: "var(--primary-color)",
              color: "var(--secondary-color)",
            }}
          >
            My Products
          </h4>
          <h4
            style={{
              borderRadius: "10px",
              padding: "10px",
              width: "10rem",
              backgroundColor: "grey",
              color: "var(--secondary-color)",
            }}
            className="ml-auto"
            onClick={handleShow}
          >
            <FaCloudUploadAlt /> New
          </h4>
        </div>

        {myProducts.length ? (
          <Row className="justify-content-start">
            {myProducts
              .slice(0)
              .reverse()
              .map((product, index) => {
                return (
                  <Col lg={3} md={4} sm={6} className="mb-5" key={index}>
                    <div
                      className="card shadow"
                      style={{
                        border: "3px solid var(--primary-color)",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={product.image}
                        width={200}
                        height={250}
                      />
                      <div
                        className="card-body "
                        style={{ borderTop: "3px solid var(--primary-color)" }}
                      >
                        <div className="d-flex justify-content-between">
                          <h5 className="card-title text-capitalize font-weight-bold">
                            {product.title}
                          </h5>
                          <EditModel
                            singleId={product._id}
                            deleteUI={deleteUI}
                          />
                        </div>
                        <p className="card-text">
                          <strong>Price: </strong> ${product.price}
                        </p>
                        <p className="card-text">
                          <strong> Condition: </strong> {product.condition}
                        </p>
                        <p className="card-text">
                          <strong> Category: </strong> {product.category}
                        </p>
                      </div>
                    </div>
                  </Col>
                )
              })}
          </Row>
        ) : (
          <div className="d-flex justify-content-center m-5">
            <h4 className="text-center">
              To upload a new product for sale, please click on the "{" "}
              <FaCloudUploadAlt /> New" button.
            </h4>
          </div>
        )}
        {show && (
          <PostModel
            show={show}
            handleClose={handleClose}
            updateUi={updateUi}
          />
        )}
      </Container>
    </div>
  )
}

export default MyProducts
