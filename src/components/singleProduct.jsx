import axios from "axios"
import React from "react"
import { useEffect, useState } from "react"
import { Modal, Button, Form, Spinner } from "react-bootstrap"
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import { multiStateContext } from "../context/contextApi"

const EditModel = ({ singleId, deleteUI }) => {
  const { categories } = React.useContext(multiStateContext)
  const [show, setShow] = useState(false)
  const [fileError, setFileError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [myProduct, setMyProduct] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    condition: "",
    image: null,
  })

  let formData = new FormData()
  formData.append("title", myProduct.title)
  formData.append("price", myProduct.price)
  formData.append("location", myProduct.location)
  formData.append("category", myProduct.category)
  formData.append("description", myProduct.description)
  formData.append("condition", myProduct.condition)
  formData.append("image", myProduct.image)

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      setFileError(false)
      setMyProduct({ ...myProduct, image: e.target.files[0] })
    } else {
      setFileError(true)
      return
    }
  }

  const onSetMyProduct = (e) => {
    setMyProduct({ ...myProduct, [e.target.name]: e.target.value })
  }

  const getProductsDetails = async () => {
    const token = localStorage.getItem("token")
    await axios
      .get(`http://localhost:3001/products/${singleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMyProduct({
          title: res.data.title,
          price: res.data.price,
          condition: res.data.condition,
          category: res.data.category,
          location: res.data.location,
          image: res.data.image,
          description: res.data.description,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getProductsDetails()
  }, [singleId])

  const updateEdit = (res) => {
    setMyProduct({ ...myProduct, res })
  }

  const editProduct = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const token = localStorage.getItem("token")
    await axios
      .put(`http://localhost:3001/products/${singleId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        updateEdit(res)
        setIsLoading(false)
        window.location.reload()

        handleClose()
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err)
      })
  }

  const deleteProduct = async () => {
    alert("Are you Sure?")
    const token = localStorage.getItem("token")
    await axios
      .delete(`http://localhost:3001/products/${singleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        deleteUI(singleId)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <div>
        <AiFillEdit size={25} onClick={handleShow} />
        <AiFillDelete
          size={25}
          onClick={deleteProduct}
          style={{
            color: "red",
            marginLeft: "16px",
          }}
        />
      </div>
      {show && (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={editProduct}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={myProduct.title}
                    name="title"
                    onChange={onSetMyProduct}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={myProduct.description}
                    name="description"
                    onChange={onSetMyProduct}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter price"
                    value={myProduct.price}
                    name="price"
                    onChange={onSetMyProduct}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="New or Used"
                    value={myProduct.condition}
                    name="condition"
                    onChange={onSetMyProduct}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={myProduct.category}
                    name="category"
                    onChange={onSetMyProduct}
                  >
                    {categories.slice(1).map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={myProduct.location}
                    name="location"
                    onChange={onSetMyProduct}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={onFileChange} />
                </Form.Group>
                {fileError && (
                  <p style={{ color: "red" }}>
                    File size should be less than 1MB
                  </p>
                )}
                <div className="d-flex justify-content-between">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                  {isLoading && (
                    <Spinner animation="border" variant="warning" />
                  )}
                </div>
              </Form>
            </Modal.Body>{" "}
          </Modal>
        </>
      )}
    </>
  )
}

export default EditModel
