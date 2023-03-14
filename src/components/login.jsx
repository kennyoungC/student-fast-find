import { Form, Button, Spinner } from "react-bootstrap"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import React from "react"
import ErrorText from "./errorText"
import "./style.scss"
import Register from "./register"
import loginImage from "./../assets/login_img.png"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    axios
      .post("http://localhost:3001/users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken)
        setIsLoading(false)
        navigate("/")
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      })
  }

  return (
    <div
      className="shadow-lg h-100 w-75 justify-content-center p-0 login d-flex gap "
      style={{ marginTop: "24px" }}
    >
      <div className="w-100 p-4 h-100 col-12 col-sm-6">
        {isLogin && (
          <>
            <h1 className="text-center mb-3">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                  value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                />
              </Form.Group>

              <Button
                style={{
                  backgroundColor: "var(--primary-color)",
                  borderColor: "var(--primary-color)",
                }}
                type="submit"
                className="btn btn-block "
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
              <small className="mousehover">
                <p
                  className="m-1 text-center"
                  onClick={(e) => {
                    setIsLogin(false)
                  }}
                >
                  Don't have an account? <br></br>
                </p>
                {/* <p className="m-1 text-center">Forget password?</p> */}
              </small>
              <ErrorText error={error} />
            </Form>
          </>
        )}
        {!isLogin && <Register setIsLogin={setIsLogin} />}
      </div>

      <div className="d-none d-sm-block col-sm-6 px-0">
        <img className="img-fluid w-100" src={loginImage} alt="" />
      </div>
    </div>
  )
}

export default Login
