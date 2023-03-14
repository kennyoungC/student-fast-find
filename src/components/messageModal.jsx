import axios from "axios"
import { useState } from "react"
import { Modal, Form, Button } from "react-bootstrap"

export const MessageModal = ({
  subject,
  show,
  handleClose,
  sellerEmail,
  user,
  showLogin,
}) => {
  const [message, setMessage] = useState("")
  const capitalizedTitle = subject?.charAt(0).toUpperCase() + subject?.slice(1)

  const sendMessageHandler = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(
        `https://student-fast-find.herokuapp.com/products/send`,
        {
          sellerEmail,
          buyerEmail: user.email,
          subject: capitalizedTitle,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        alert("Message sent successfully!")
      } else alert("Message not sent!")
      setMessage("")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form style={{ width: "100%" }} onSubmit={() => {}}>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              defaultValue={capitalizedTitle}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>message</Form.Label>
            <Form.Control
              value={message}
              as="textarea"
              rows={3}
              placeholder="Enter message"
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Modal.Footer>
            {user ? (
              <>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    sendMessageHandler()
                    handleClose()
                  }}
                >
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
