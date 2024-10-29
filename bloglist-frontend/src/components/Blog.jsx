import ToggleForm from "./FormToggle"

const Blog = ({ blog, onLike, onDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      Title: {blog.title} <br />
      Author: {blog.author}
      <br />
      <ToggleForm buttonLabel={"View"}>
        <div>
          Url: {blog.url}
          <br />
          Likes: {blog.likes}
          <button onClick={() => onLike(blog)}>Like</button> <br />
          Added by: {blog.user?.name}
          <br />
          {blog.user && user && blog.user.username === user.username && (
            <button onClick={() => onDelete(blog)}>Delete</button>
          )}
        </div>
      </ToggleForm>
    </div>
  )
}

export default Blog
