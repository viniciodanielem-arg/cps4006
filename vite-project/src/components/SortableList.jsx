import { useState, useMemo } from "react";

function SortableList() {
  const [items] = useState(["Banana", "Apple", "Mango", "Cherry", "Date"]);
  const [ascending, setAscending] = useState(true);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) =>
      ascending ? a.localeCompare(b) : b.localeCompare(a)
    );
  }, [items, ascending]);

  return (
    <div>
      <button onClick={() => setAscending(prev => !prev)}>
        Order: {ascending ? "Ascending" : "Descending"}
      </button>
      <ul>
        {sortedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SortableList;