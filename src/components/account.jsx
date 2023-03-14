import React, { useEffect } from "react"
import { multiStateContext } from "../context/contextApi"
import { Container, Card, Modal, Form, Button, Image } from "react-bootstrap"
import { AiFillEdit } from "react-icons/ai"
import { useState } from "react"
import axios from "axios"
import { parseISO, format } from "date-fns"

const Account = () => {
  const { user, setUser, getUserData } = React.useContext(multiStateContext)
  const [show, setShow] = useState(false)
  const [fileError, setFileError] = useState(false)

  useEffect(() => {
    getUserData()
  }, [])

  const formData = new FormData()
  formData.append("username", user.username)
  formData.append("email", user.email)
  formData.append("avatar", user.avatar)

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      setUser({ ...user, avatar: e.target.files[0] })
      setFileError(false)
    } else {
      setFileError(true)
      return
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const updateUser = (res) => {
    setUser({ ...user, res })
  }

  const editProfile = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")

    await axios
      .put(`https://student-fast-find.herokuapp.com/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        updateUser(res.data)
        handleClose()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onSetMyUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Container style={{ marginTop: "30px" }}>
        <div className="d-flex justify-content-center">
          <Card className="shadow-lg w-100">
            <Card.Header className="d-flex justify-content-between">
              <h5>My Profile</h5>
              <AiFillEdit size={25} onClick={handleShow} />
            </Card.Header>
            <Card.Body className="d-flex flex-column flex-sm-row">
              <Image
                className="mx-auto mx-sm-0 mb-4 mb-sm-0"
                src={user.avatar}
                alt="avatar"
                width={150}
                height={150}
                roundedCircle
              />
              <div className="mt-1 mx-4">
                <Card.Text>
                  <strong>Username:</strong> {user.username}
                </Card.Text>
                <Card.Text>
                  <strong>Email: </strong> {user.email}
                </Card.Text>
                <Card.Text>
                  <strong>Location: </strong>
                  {user.location}
                </Card.Text>
                <Card.Text>
                  <strong>Member since: </strong>{" "}
                  {user.createdAt && format(parseISO(user.createdAt), "PPP")}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editProfile}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                value={user.username}
                name="username"
                onChange={onSetMyUser}
                required
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                name="email"
                onChange={onSetMyUser}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={onFileChange} />
            </Form.Group>
            {fileError && (
              <p className="text-danger">File size must be less than 1MB</p>
            )}
            <Button disabled={fileError} variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Account
