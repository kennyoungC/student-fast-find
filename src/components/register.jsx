import { Form, Button, Spinner } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import ErrorText from "./errorText"

const Register = ({ setIsLogin }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    location: "",
    avatar: "",
    error: "",
  })

  const [fileError, setFileError] = useState(false)

  let formData = new FormData()
  formData.append("username", user.username)
  formData.append("email", user.email)
  formData.append("password", user.password)
  formData.append("location", user.location)
  formData.append("avatar", user.avatar)

  const onFileChange = (e) => {
    if (e.target && e.target.files[0] && e.target.files[0].size < 1000000) {
      setFileError(false)
      setUser({ ...user, avatar: e.target.files[0] })
    } else {
      setFileError(true)
      return
    }
  }

  const isFormValid = () => {
    if (user.username && user.email && user.password && user.avatar !== null) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    await axios
      .post("http://localhost:3001/users/register", formData)
      .then((res) => {
        setIsLoading(false)
        setIsLogin(true)
      })
      .catch((err) => {
        setIsLoading(false)
        if (err.response.status === 400) {
          setUser({ ...user, error: err.response.data.message })
        }
      })
  }

  const isSetNewUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <h1 className="text-center mb-3">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={user.username}
            name="username"
            onChange={isSetNewUser}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={user.email}
            name="email"
            onChange={isSetNewUser}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={user.password}
            name="password"
            onChange={isSetNewUser}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Location"
            value={user.location}
            name="location"
            onChange={isSetNewUser}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            placeholder="Profile Picture"
            onChange={onFileChange}
          />
        </Form.Group>
        {fileError && (
          <p className="text-danger">File size should be less than 1MB</p>
        )}
        <div className="d-grid gap-2">
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              borderColor: "var(--primary-color)",
            }}
            type="submit"
            size="lg"
            className="btn btn-block "
            disabled={!isFormValid()}
          >
            {isLoading ? (
              <Spinner
                animation="border"
                variant="warning"
                className="align-self-center"
              />
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </Form>
      <small className="mousehover">
        <p
          className="m-2 text-center "
          onClick={(e) => {
            setIsLogin(true)
          }}
        >
          Already have an account?
        </p>
      </small>
      <ErrorText error={user.error} />
    </>
  )
}

export default Register
