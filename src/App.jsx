import React, { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [selectedNote, setSelectedNote] = useState(null);

  const new_array = notes.map((note, index) => {
    return (
      <div className="mt-4">
        <button
          className="btn btn-outline-warning"
          onClick={() => {
            handleClick(index);
          }}
        >
          {note.title}
        </button>
        {selectedNote === index && (
          <div className="mt-3">
            <div className="note-body">{note.body}</div>
          </div>
        )}
      </div>
    );
  });

  // <------------------------LOCAL-STORAGE-------------------------------->
  useEffect(() => {
    const existing_notes = localStorage.getItem("notes");

    if (existing_notes) {
      setNotes(JSON.parse(existing_notes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // <------------------------------------------------------------------------>

  function handleClick(index) {
    setSelectedNote(selectedNote === index ? null : index);
  }

  function onSubmit(event) {
    event.preventDefault();
    setNotes([
      ...notes,
      {
        title: title,
        body: desc,
        key: Math.floor(Math.random() * 1000000),
      },
    ]); //Push to be tested
    setTitle("");
    setDesc("");
  }

  return (
    <div className="container">
      <h2 className="headings">Note Taker</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the title here..."
            id="title_input"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Note:
          </label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Write the note here..."
            id="note_input"
            value={desc}
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          />
        </div>
        <button className="btn btn-outline-warning btn-sm" onClick={onSubmit}>
          Submit
        </button>
      </form>

      <div>
        <h3 className="headings">SAVED NOTES:</h3>
        {new_array}
      </div>
    </div>
  );
}

export default App;
