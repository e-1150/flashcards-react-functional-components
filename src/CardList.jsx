import { memo } from "react";
import Card from "./Card";

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
            <Card
              key={card.id}
              card={card}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(CardList);
