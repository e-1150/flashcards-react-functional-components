import { memo, useMemo, useState } from "react";

function StudyMode({ cards }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState("all");

  const filteredCards = useMemo(() => {
    if (mode === "unlearned") {
      return cards.filter((c) => !c.learned);
    }

    return cards;
  }, [cards, mode]);

  if (filteredCards.length === 0) {
    return <h2>Нет карточек</h2>;
  }

  const safeIndex = index >= filteredCards.length ? 0 : index;
  const card = filteredCards[safeIndex];

  const prev = () => {
    setIndex((i) => Math.max(0, i - 1));
    setFlipped(false);
  };

  const next = () => {
    setIndex((i) => Math.min(filteredCards.length - 1, i + 1));

    setFlipped(false);
  };

  return (
    <div>
      <h2>Режим изучения</h2>

      <select
        value={mode}
        onChange={(e) => {
          setMode(e.target.value);
          setIndex(0);
        }}
      >
        <option value="all">Все</option>

        <option value="unlearned">Невыученные</option>
      </select>

      <div className="study-card">{flipped ? card.back : card.front}</div>

      <div className="controls">
        <button onClick={prev}>Назад</button>

        <button onClick={() => setFlipped((f) => !f)}>Перевернуть</button>

        <button onClick={next}>Вперёд</button>
      </div>

      <div>
        {safeIndex + 1} / {filteredCards.length}{" "}
      </div>
    </div>
  );
}

export default memo(StudyMode);
