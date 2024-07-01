import React from "react"

export const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Phone book app, Mathias Mändmets 2024</em>
    </div>
  )
}
