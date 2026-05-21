import { memo, useState, useCallback } from "react";

function Card({ card, onDelete, onToggle }) {
  const handleDelete = useCallback(() => {
    onDelete(card.id);
  }, [onDelete, card.id]);

  const handleToggle = useCallback(() => {
    onToggle(card.id);
  }, [onToggle, card.id]);

  return (
    <tr>
      <td>{card.front}</td>

      <td>{card.back}</td>

      <td>
        <input type="checkbox" checked={card.learned} onChange={handleToggle} />
      </td>

      <td>
        <button onClick={handleDelete}>Удалить</button>
      </td>
    </tr>
  );
}

export default memo(Card);
