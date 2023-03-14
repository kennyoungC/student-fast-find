import React from "react"
import { ListGroup } from "react-bootstrap"
import { useContext } from "react"
import "../App.css"
import { multiStateContext } from "../context/contextApi"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const Sidebar = () => {
  const { categories, changeCategory, selectedCategory } =
    useContext(multiStateContext)
  return (
    <>
      <Accordion className="d-sm-none mb-3">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>CATEGORIES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ListGroup
            as="ul"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              marginBottom: "12px",
            }}
          >
            {categories.map((category, index) => (
              <ListGroup.Item
                as="li"
                key={index}
                onClick={() => {
                  changeCategory(category)
                }}
                style={{
                  backgroundColor:
                    selectedCategory === category
                      ? "var(--primary-color)"
                      : "var(--secondary-color)",
                  color:
                    selectedCategory === category
                      ? "var(--secondary-color)"
                      : "var(--tertiary-color)",
                  display: "inline-block",
                  margin: "5px",
                  padding: "10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "140px",
                }}
              >
                {category}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </AccordionDetails>
      </Accordion>
      <div className="d-none d-sm-block">
        <h4>CATEGORIES</h4>
        <ListGroup
          as="ul"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            marginBottom: "12px",
          }}
        >
          {categories.map((category, index) => (
            <ListGroup.Item
              as="li"
              key={index}
              onClick={() => {
                changeCategory(category)
              }}
              style={{
                backgroundColor:
                  selectedCategory === category
                    ? "var(--primary-color)"
                    : "var(--secondary-color)",
                color:
                  selectedCategory === category
                    ? "var(--secondary-color)"
                    : "var(--tertiary-color)",
                display: "inline-block",
                margin: "5px",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer",
                width: "160px",
              }}
            >
              {category}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  )
}

export default Sidebar
