import { memo } from "react";

function CardList({ cards, onDelete, onToggle }) {
  return (
    <div>
      <h2>Список карточек</h2>

      <table>
        <thead>
          <tr>
            <th>Лицевая</th>
            <th>Оборотная</th>
            <th>Выучена</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>{card.front}</td>

              <td>{card.back}</td>

              <td>
                <input
                  type="checkbox"
                  checked={card.learned}
                  onChange={() => onToggle(card.id)}
                />
              </td>

              <td>
                <button onClick={() => onDelete(card.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(CardList);
