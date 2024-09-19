import React from "react"

export const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  const notificationType =
    type === "successMessage" ? "successMessage" : "errorMessage"

  return <div className={notificationType}>{message}</div>
}
