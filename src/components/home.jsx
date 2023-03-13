import { Col, Row, Container } from "react-bootstrap"
import Main from "./main"
import Sidebar from "./sidebar"

const Home = () => {
  return (
    <Container
      fluid
      style={{
        marginTop: "24px",
      }}
    >
      <Row>
        <Col className="w-100" sm={12} md={2}>
          <Sidebar />
        </Col>
        <Col
          className="d-flex justify-content-center justify-content-sm-start d-md-block"
          sm={12}
          md={10}
        >
          <Main />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
