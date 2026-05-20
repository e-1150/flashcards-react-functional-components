import { useState, useEffect, useMemo, useCallback } from "react";
import DeckManager from "./DeckManager";
import CardForm from "./CardForm";
import CardList from "./CardList";
import StudyMode from "./StudyMode";

const STORAGE_KEY = "flashcards-fc";

export default function App() {
  const [decks, setDecks] = useState([]);
  const [currentDeckId, setCurrentDeckId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved);

        setDecks(parsed.decks);
        setCurrentDeckId(parsed.currentDeckId);
        setLoading(false);

        return;
      }

      try {
        const response = await fetch(
          "https://opentdb.com/api.php?amount=50&type=multiple",
        );

        const data = await response.json();

        const cards = data.results.map((item, index) => ({
          id: Date.now() + index,
          front: decode(item.question),
          back: decode(item.correct_answer),
          learned: false,
        }));

        const deck = {
          id: Date.now(),
          name: "Trivia Deck",
          cards,
        };

        setDecks([deck]);
        setCurrentDeckId(deck.id);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ decks, currentDeckId }),
      );
    }
  }, [decks, currentDeckId, loading]);

  const currentDeck = useMemo(
    () => decks.find((d) => d.id === currentDeckId),
    [decks, currentDeckId],
  );

  const createDeck = useCallback((name) => {
    const deck = {
      id: Date.now(),
      name,
      cards: [],
    };

    setDecks((prev) => [...prev, deck]);
    setCurrentDeckId(deck.id);
  }, []);

  const deleteDeck = useCallback(() => {
    setDecks((prev) => {
      const updated = prev.filter((d) => d.id !== currentDeckId);

      setCurrentDeckId(updated[0]?.id || null);

      return updated;
    });
  }, [currentDeckId]);

  const selectDeck = useCallback((id) => {
    setCurrentDeckId(Number(id));
  }, []);

  const addCard = useCallback(
    (front, back) => {
      setDecks((prev) =>
        prev.map((deck) =>
          deck.id === currentDeckId
            ? {
                ...deck,
                cards: [
                  ...deck.cards,
                  {
                    id: Date.now(),
                    front,
                    back,
                    learned: false,
                  },
                ],
              }
            : deck,
        ),
      );
    },
    [currentDeckId],
  );

  const deleteCard = useCallback(
    (id) => {
      setDecks((prev) =>
        prev.map((deck) =>
          deck.id === currentDeckId
            ? {
                ...deck,
                cards: deck.cards.filter((c) => c.id !== id),
              }
            : deck,
        ),
      );
    },
    [currentDeckId],
  );

  const toggleLearned = useCallback(
    (id) => {
      setDecks((prev) =>
        prev.map((deck) =>
          deck.id === currentDeckId
            ? {
                ...deck,
                cards: deck.cards.map((c) =>
                  c.id === id ? { ...c, learned: !c.learned } : c,
                ),
              }
            : deck,
        ),
      );
    },
    [currentDeckId],
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="app">
      <h1>Flashcards</h1>

      <DeckManager
        decks={decks}
        currentDeckId={currentDeckId}
        onCreate={createDeck}
        onDelete={deleteDeck}
        onSelect={selectDeck}
      />

      <CardForm onAdd={addCard} />

      <CardList
        cards={currentDeck?.cards || []}
        onDelete={deleteCard}
        onToggle={toggleLearned}
      />

      <StudyMode cards={currentDeck?.cards || []} />
    </div>
  );
}

function decode(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}
