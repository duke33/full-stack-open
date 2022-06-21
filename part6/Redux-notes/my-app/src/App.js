import "./App.css";
import { createStore } from "redux";
import noteReducer from "./reducers/noteReducer";
import ReactDOM from "react-dom/client";
const store = createStore(noteReducer);

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const App = () => {
  const addNote = (event) => {
    console.log("llega al addnote");
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    store.dispatch({
      type: "NEW_NOTE",
      data: {
        content,
        important: false,
        id: generateId(),
      },
    });
  };

  const toggleImportance = (id) => {
    store.dispatch({
      type: "TOGGLE_IMPORTANCE",
      data: { id },
    });
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <p>I can render</p>
      <ul>
        {store.getState().map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note.id)}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
};

renderApp();
store.subscribe(renderApp);

export default App;
