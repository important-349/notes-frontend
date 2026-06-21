import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Notes.css'

function Notes() {
  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [editId, setEditId] = useState(null)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const headers = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/api/notes', { headers })
    setNotes(response.data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editId) {
      await axios.put(`http://localhost:5000/api/notes/${editId}`, { title, body }, { headers })
      setEditId(null)
    } else {
      await axios.post('http://localhost:5000/api/notes', { title, body }, { headers })
    }
    setTitle('')
    setBody('')
    fetchNotes()
  }

  const handleEdit = (note) => {
    setEditId(note._id)
    setTitle(note.title)
    setBody(note.body)
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`, { headers })
    fetchNotes()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1>My Notes</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form className="notes-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
        <button type="submit">{editId ? 'Update Note' : 'Add Note'}</button>
      </form>

      {notes.map((note) => (
        <div className="note-card" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <div className="note-actions">
            <button onClick={() => handleEdit(note)}>Edit</button>
            <button className="btn-delete" onClick={() => handleDelete(note._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Notes