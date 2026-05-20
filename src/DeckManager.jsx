import { memo, useState } from "react";

function DeckManager({ decks, currentDeckId, onCreate, onDelete, onSelect }) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;

    onCreate(name);
    setName("");
  };

  return (
    <div>
      <h2>Колоды</h2>

      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название колоды"
        />

        <button onClick={handleCreate}>Создать</button>

        <select
          value={currentDeckId || ""}
          onChange={(e) => onSelect(e.target.value)}
        >
          {decks.map((deck) => (
            <option key={deck.id} value={deck.id}>
              {deck.name}
            </option>
          ))}
        </select>

        <button onClick={onDelete}>Удалить</button>
      </div>
    </div>
  );
}

export default memo(DeckManager);
