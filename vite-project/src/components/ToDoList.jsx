import { useReducer, useState } from "react";


function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), text: action.text }
      ];
    case "remove":
      return state.filter(todo => todo.id !== action.id);
    default:
      return state;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []); // start with empty array
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      dispatch({ type: "add", text: input });
      setInput(""); // clear the input field
    }
  };

  // Allow pressing Enter to add a todo
  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return (
    <div style={{ maxWidth: "480px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "22px", marginBottom: "1rem" }}>To-Do List</h1>

      {/* Input area */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new task"
          style={{
            flex: 1,
            padding: "8px 12px",
            fontSize: "14px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          onClick={addTodo}
          style={{
            padding: "8px 16px",
            fontSize: "14px",
            background: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Add Todo
        </button>
      </div>

      {/* Empty state */}
      {todos.length === 0 && (
        <p style={{ color: "#999", fontSize: "14px" }}>No tasks yet — add one above!</p>
      )}

      {/* To-do list */}
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              marginBottom: "8px",
              background: "#f9f9f9",
              border: "1px solid #eee",
              borderRadius: "6px",
              fontSize: "14px",
            }}
          >
            <span>{todo.text}</span>
            <button
              onClick={() => dispatch({ type: "remove", id: todo.id })}
              style={{
                background: "none",
                border: "1px solid #ddd",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
                color: "#e53e3e",
                padding: "3px 10px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Item count */}
      {todos.length > 0 && (
        <p style={{ marginTop: "1rem", fontSize: "13px", color: "#888" }}>
          {todos.length} task{todos.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

export default TodoList;