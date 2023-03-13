import React from "react"
import { ListGroup } from "react-bootstrap"
import { useContext } from "react"
import "../App.css"
import { multiStateContext } from "../context/contextApi"

const Sidebar = () => {
  const { categories, changeCategory, selectedCategory } =
    useContext(multiStateContext)
  return (
    // <div className=" fixed ">
    //   <h4> CATEGORIES</h4>
    //   <ListGroup as="ul" style={{ width: "200px", borderRadius: "0px" }}>
    //     {categories.map((category, index) => (
    //       <ListGroup.Item
    //         as="li"
    //         key={index}
    //         onClick={() => {
    //           changeCategory(category);
    //         }}
    //         style={{
    //           backgroundColor:
    //             selectedCategory === category
    //               ? "var(--primary-color)"
    //               : "var(--secondary-color)",
    //           color:
    //             selectedCategory === category
    //               ? "var(--secondary-color)"
    //               : "var(--tertiary-color)"
    //         }}
    //       >
    //         {category}
    //       </ListGroup.Item>
    //     ))}
    //   </ListGroup>
    // </div>
    <div className="">
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
              width: "170px",
            }}
          >
            {category}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default Sidebar
