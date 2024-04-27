import { useState } from "react";
import "./App.css"

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Note 1",
      description: "Description 1",
    },
    {
      id: 2,
      title: "Note 2",
      description: "Description 2",
    },
    {
      id: 3,
      title: "Note 3",
      description: "Description 3",
    },
    {
      id: 4,
      title: "Note 4",
      description: "Description 4",
    },
  ]);
  return (
    <div className="app-container">
      <form className="note-form">
        <input placeholder="Title" required></input>
        <textarea placeholder="Description" rows={8} required></textarea>
        <button type="submit">Add Note</button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
        <div className="note-item" key={note.id}>
          <div className="notes-header">
            <button>x</button>
          </div>
          <h2>{note.title}</h2>
          <p>{note.description}</p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default App;