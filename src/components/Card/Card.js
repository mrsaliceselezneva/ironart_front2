import axios from "axios";
import React from "react";
import enterList from "./DragEnerList";
import "./Card.css";

export default function Card({ listId }) {
  const [cards, setCards] = React.useState(null);
  const [CardTitle, setCardTitle] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${listId}/answers`)
      .then((response) => {
        setCards(response.data);
      });
  }, [listId]);

  function createCard(CardTitle) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/questions/${listId}/answers`, {
        body: CardTitle,
        list_id: listId,
      })
      .then((response) => {
        setCards(response.data);
      });
  }

  function deleteCard(cardId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/questions/${listId}/answers/${cardId}`
      )
      .then(() => {
        setCards(cards.filter((card) => card.id !== cardId));
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  function updateCard(cardId, title) {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/questions/${listId}/answers/${cardId}`,
        {
          title,
        }
      )
      .then((response) => {
        setCards(response.data);
      });
  }

  if (!cards) return null;

  return (
    <div>
      <input
        placeholder="Имя карточки"
        onChange={(event) => setCardTitle(event.target.value)}
      />

      <button className="pressed-button" onClick={() => createCard(CardTitle)}>
        Create Card
      </button>
      <div>
        <ul className="list1a">
          {cards.map((card) => (
            <div>
              <li>
                <input
                  value={card.body}
                  onChange={(event) => {
                    const updateCards = cards.reduce(
                      (prevCards, updatedCards) => {
                        if (updatedCards.id !== card.id) {
                          return [...prevCards, updatedCards];
                        }

                        const updatedCard = {
                          ...updatedCards,
                          body: event.target.value,
                        };
                        return [...prevCards, updatedCard];
                      },
                      []
                    );
                    setCards(updateCards);
                  }}
                  onBlur={() => updateCard(card.id, card.body)}
                />
                <button
                  className="pressed-button"
                  onClick={() => deleteCard(card.id)}
                >
                  Delete Card
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
