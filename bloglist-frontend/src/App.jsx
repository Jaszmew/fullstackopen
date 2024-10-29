import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import NewBlogSection from "./components/AddNewBlog"

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
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
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

  const handleLike = async (blog) => {
    try {
      const updatedBlog = { ...blog, likes: blog.likes + 1 }
      const returnedBlog = await blogService.update(blog.id, updatedBlog)

      setBlogs((previousBlogs) =>
        previousBlogs
          .map((b) => (b.id === returnedBlog.id ? returnedBlog : b))
          .sort((a, b) => b.likes - a.likes)
      )
      showNotification("Blog liked", "success")
    } catch (e) {
      showNotification("Like failed", "error")
      console.log(e)
    }
  }

  const handleDelete = async (blog) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${blog.title}" by ${blog.author}?`
      )
    ) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        showNotification(`Blog "${blog.title}" deleted`, "success")
      } catch (error) {
        showNotification("Failed to delete blog", "error")
        console.error(error)
      }
    }
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
          <NewBlogSection addNew={addNewBlog} />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              onLike={handleLike}
              onDelete={handleDelete}
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
