import { memo, useState } from "react";

function CardForm({ onAdd }) {
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleAdd = () => {
    if (!front || !back) return;

    onAdd(front, back);

    setFront("");
    setBack("");
  };

  return (
    <div>
      <h2>Добавить карточку</h2>

      <div>
        <input
          placeholder="Лицевая сторона"
          value={front}
          onChange={(e) => setFront(e.target.value)}
        />

        <input
          placeholder="Оборотная сторона"
          value={back}
          onChange={(e) => setBack(e.target.value)}
        />

        <button onClick={handleAdd}>Добавить</button>
      </div>
    </div>
  );
}

export default memo(CardForm);
