import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  const addItem = async () => {
    if (!name.trim()) return;
    await fetch("http://backend-service:5050/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchItems();
  };

  const fetchItems = async () => {
    const res = await fetch("http://backend-service:5050/items");
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Frontend App</h1>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item"
      />
      <button onClick={addItem} style={{ marginLeft: 8 }}>Add</button>
      <ul>
        {items.map((i, idx) => <li key={idx}>{i.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
