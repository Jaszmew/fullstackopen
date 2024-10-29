import PropTypes from "prop-types"
import ToggleForm from "./FormToggle"
import BlogForm from "./BlogForm"

const NewBlogSection = ({ addNew }) => {
  return (
    <ToggleForm buttonLabel="Add New Blog">
      <BlogForm onNewBlog={addNew} />
    </ToggleForm>
  )
}

NewBlogSection.propTypes = {
  addNew: PropTypes.func.isRequired,
}

export default NewBlogSection
