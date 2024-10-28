import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ onNewBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()

    const newBlog = await blogService.create({ title, author, url })
    onNewBlog(newBlog)
    setTitle("")
    setAuthor("")
    setUrl("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          required
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          required
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          required
        />
      </div>
      <button type="submit">Add Blog</button>
    </form>
  )
}

export default BlogForm
