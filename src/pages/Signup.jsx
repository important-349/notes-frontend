import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData)
      alert('Signup successful!')
      navigate('/login')
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Signup</button>
      </form>
    </div>
  )
}

export default Signup