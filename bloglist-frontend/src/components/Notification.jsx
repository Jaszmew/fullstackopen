const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }

  return (
    <div
      style={{
        color: type === "error" ? "red" : "green",
        border: `1px solid ${type === "error" ? "red" : "green"}`,
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
      }}
    >
      {message}
    </div>
  )
}

export default Notification
