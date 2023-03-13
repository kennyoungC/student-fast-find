import { Modal, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const messageModal = (
  title,
  show,
  handleClose,
  user,
  seller,
  showLogin
) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ width: "28rem" }} onSubmit={() => {}}>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={title}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Enter message" />
          </Form.Group>
          <Modal.Footer>
            {user ? (
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Send
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="warning"
                  onClick={() => {
                    handleClose()
                    showLogin()
                  }}
                >
                  Sign In
                </Button>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </>
            )}
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
