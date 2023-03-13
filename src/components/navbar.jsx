import React, { useContext, useEffect, useState } from "react"
import {
  Navbar,
  Form,
  FormControl,
  Button,
  Nav,
  NavDropdown,
} from "react-bootstrap"
import { BiSearch } from "react-icons/bi"
import { multiStateContext } from "../context/contextApi"
import { Link, useNavigate, useLocation } from "react-router-dom"
import logo from "./../assets/logo.png"

const PageNavbar = () => {
  const { getUserData, user, setUser, setSearch } =
    useContext(multiStateContext)
  const location = useLocation()
  const navigate = useNavigate()

  const [thisIsHome, setThisIsHome] = useState(true)
  const token = localStorage.getItem("token")

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    if (location.pathname === "/") {
      setThisIsHome(false)
    } else setThisIsHome(true)
  }, [location.pathname])

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser("")
    navigate("/login")
  }
  return (
    <>
      <Navbar
        sticky="top"
        expand="md"
        style={{
          border: "1px solid var(--primary-color)",
          backgroundColor: "var(--primary-color)",
        }}
      >
        <Link to={"/"}>
          <Navbar.Brand>
            <img
              src={logo}
              className="d-inline-block align-top ml-5 mr-3 w-100"
              alt="SFFLogo"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form
            inline
            className="flex-grow-1 justify-content-start justify-content-md-center"
          >
            <FormControl
              type="text"
              placeholder="Search"
              style={{
                width: "80%",
                borderRadius: "10px 0px 0px 10px ",
              }}
              onChange={(e) => setSearch(e.target.value)}
              disabled={thisIsHome}
            />
            <Button
              variant="outline-light"
              className="float-right"
              style={{
                borderRadius: "0px 10px 10px 0px ",
              }}
            >
              <BiSearch />
            </Button>
          </Form>
          {token ? (
            <Nav className="mr-auto">
              <p className="m-2 text-light" style={{ fontSize: "20px" }}>
                Hi {user.username}!
              </p>
              <Link to="/sell">
                <p
                  className="m-2 text-light"
                  style={{
                    fontSize: "20px",
                    fontWeight: location.pathname === "/sell" ? "bolder" : "",
                    textDecoration:
                      location.pathname === "/sell" ? "underline" : "",
                  }}
                >
                  Sell
                </p>
              </Link>

              <Link to="/account" className="text-light">
                <p
                  className="m-2 text-light"
                  style={{
                    fontSize: "20px",
                    fontWeight:
                      location.pathname === "/account" ? "bolder" : "",
                    textDecoration:
                      location.pathname === "/account" ? "underline" : "",
                  }}
                >
                  Account
                </p>
              </Link>
              <p
                className="m-2 text-light"
                style={{ fontSize: "20px" }}
                onClick={handleLogout}
              >
                Logout
              </p>
            </Nav>
          ) : (
            <Nav className="mr-auto">
              <p
                className=" mr-2 mb-0 text-light"
                style={{ cursor: "pointer" }}
              >
                Sign In
              </p>
              <p className=" mr-2 mb-0 text-light">or </p>
              <p
                className=" mr-2 mb-0 text-light"
                style={{ cursor: "pointer" }}
              >
                Register
              </p>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default PageNavbar
