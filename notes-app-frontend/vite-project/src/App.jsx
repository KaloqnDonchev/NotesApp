import { useEffect, useState } from "react";
import "./App.css"

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/notes");

        const notes = await response.json();

        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setDescription(note.description);
  }

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description
          }),
      });

      const newNote = await response.json();

      setNotes([newNote, ...notes]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }

  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    if(!selectedNote) {
      return;
    };

    try {
      const response = await fetch(`http://localhost:8080/api/notes/${selectedNote.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description
        }),
      });

      const updatedNote = await response.json();

      const updatedNotesList = notes.map((note) => {
        return note.id === selectedNote.id ? updatedNote : note;
      });
  
      setNotes(updatedNotesList);
      setTitle("");
      setDescription("");
      setSelectedNote(null);
    } catch (error) {
      console.error(error);
    }

  };

  const handleDeleteNote = async (event, noteId) => {
    event.stopPropagation();

    try {
      await fetch(`http://localhost:8080/api/notes/${noteId}`, {
        method: "DELETE",
      })
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      setNotes(updatedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setSelectedNote(null);
  };

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