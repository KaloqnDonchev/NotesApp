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

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setDescription(note.description);
  }

  const handleAddNote = (e) => {
    e.preventDefault();

    const newNote = {
      id: notes.length + 1,
      title: title,
      description: description,
    };

    setNotes([newNote, ...notes]);
    setTitle("");
    setDescription("");
  };

  const handleUpdateNote = (e) => {
    e.preventDefault();

    if(!selectedNote) {
      return;
    };

    const updatedNote = {
      id: selectedNote.id,
      title: title,
      description: description,
    };

    const updatedNotesList = notes.map((note) => {
      note.id === selectedNote.id ? updatedNote : note;
    });

    setNotes(updatedNotesList);
    setTitle("");
    setDescription("");
    setSelectedNote(null);
  };

  const handleDeleteNote = (event, noteId) => {
    event.stopPropagation();

    const updatedNotes = notes.filter((note) => note.id !== noteId);

    setNotes(updatedNotes);
  }

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setSelectedNote(null);
  }

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={(e) => selectedNote ? handleUpdateNote(e) : handleAddNote(e)}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required></input>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} 
        placeholder="Description" rows={8} required></textarea>
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
        <div className="note-item" key={note.id} onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
            <button onClick={(e) => handleDeleteNote(e, note.id)}>x</button>
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