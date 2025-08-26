import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { notesApi } from './api'
import Login from './Login'
import './App.css'

function App() {
  const { isAuthenticated, logout } = useAuth()
  const [showRegister, setShowRegister] = useState(false)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState({ title: '', content: '' })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isAuthenticated) loadNotes()
  }, [isAuthenticated])

  const loadNotes = async () => {
    try {
      const response = await notesApi.getNotes()
      setNotes(response.items)
    } catch (error) {

    }
  }

  const addNote = async () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return
    try {
      const createdNote = await notesApi.createNote(newNote.title, newNote.content)
      setNotes([createdNote, ...notes])
      setNewNote({ title: '', content: '' })
    } catch (error) {

    }
  }

  const deleteNote = async (id) => {
    try {
      await notesApi.deleteNote(id)
      setNotes(notes.filter(note => note.id !== id))
    } catch (error) {

    }
  }

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.trim().toLowerCase())
  )

  if (!isAuthenticated) {
    return <Login onToggleRegister={() => setShowRegister(!showRegister)} showRegister={showRegister} />
  }

  return (
    <div className="app">
      <header>
        <h1>Notes</h1>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={logout}>Logout</button>
      </header>

      {!searchTerm.trim() && (
        <div className="add-note">
          <input
            type="text"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            placeholder="Title"
          />
          <textarea
            value={newNote.content}
            onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
            placeholder="Content"
          />
          <button onClick={addNote}>Add</button>
        </div>
      )}

      <div className="notes">
        {filteredNotes.map(note => (
          <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
        {filteredNotes.length === 0 && notes.length > 0 && searchTerm.trim() && (
          <div>No notes found</div>
        )}
        {notes.length === 0 && !searchTerm.trim() && (
          <div>No notes yet</div>
        )}
      </div>
    </div>
  )
}

export default App
