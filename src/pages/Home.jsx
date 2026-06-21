import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Notes App</h1>
      <button onClick={() => navigate('/signup')}>Signup</button>
      <button onClick={() => navigate('/login')}>Login</button>
    </div>
  )
}

export default Home