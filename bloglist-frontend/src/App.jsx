import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: "", type: "" })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      fetchBlogs()
    }
  }, [])

  const fetchBlogs = async () => {
    try {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (e) {
      showNotification("Failed to load blogs", "error")
      console.log(e)
    }
  }

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser)
    window.localStorage.setItem("loggedBlogUser", JSON.stringify(loggedInUser))
    showNotification("Successfully logged in!", "success")
    fetchBlogs()
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem("loggedBlogUser")
    showNotification("Logged out", "success")
  }

  const addNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(createdBlog))
      showNotification("Blog added successfully!", "success")
    } catch (e) {
      showNotification("Failed to add blog.", "error")
      console.log(e)
    }
  }

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification({ message: "", type: "" })
    }, 5000)
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <h2>Blog List Application</h2>
      {user === null ? (
        <LoginForm onLogin={handleLogin} showNotification={showNotification} />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <BlogForm onNewBlog={addNewBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
