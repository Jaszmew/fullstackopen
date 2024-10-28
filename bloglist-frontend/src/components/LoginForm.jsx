import { useState } from "react"
import loginService from "../services/login"

export const LoginForm = ({ onLogin, showNotification }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = { username, password }
      const loggedInUser = await loginService.login(user)
      onLogin(loggedInUser)
      setUsername("")
      setPassword("")
    } catch (error) {
      showNotification("Wrong credentials", "error")
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        ></input>
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        ></input>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
