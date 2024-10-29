import PropTypes from "prop-types"
import { useState } from "react"

const ToggleForm = ({ buttonLabel, children }) => {
  const [formVisible, setFormVisible] = useState(false)

  const toggleVisibility = () => {
    setFormVisible(!formVisible)
  }

  return (
    <div>
      {!formVisible && (
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      )}

      {formVisible && (
        <>
          {children}
          <button onClick={toggleVisibility}>Cancel</button>
        </>
      )}
    </div>
  )
}

ToggleForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default ToggleForm
