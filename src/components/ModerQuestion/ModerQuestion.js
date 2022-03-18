import axios from "axios";
import React from "react";
import Card from "../Card";
import "./ModerQuestion.css";

export default function ModerQuestion() {
  const [lists, setLists] = React.useState(null);
  const [ListName, setListName] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/questions`).then((response) => {
      setLists(response.data);
    });
  }, []);

  function createList(listName) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/questions`, {
        title: listName,
      })
      .then((response) => {
        setLists(response.data);
      });
  }

  function deleteList(listId) {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/questions/${listId}`)
      .then(() => {
        setLists(lists.filter((list) => list.id !== listId));
      })
      .catch((error) => {
        console.log({ ...error });
      });
  }

  if (!lists) return null;
  return (
    <table className="one">
      {lists.map((list) => {
        return (
          <td>
            {list.title}
            <br />
            <button
              className="floating-button"
              onClick={() => {
                const { id } = list;
                deleteList(id);
              }}
            >
              Delete List
            </button>
            <br />
            <br />
            <Card listId={list.id} />
          </td>
        );
      })}

      <input
        placeholder="Имя списка"
        onChange={(event) => setListName(event.target.value)}
      />

      <button className="floating-button" onClick={() => createList(ListName)}>
        Create List
      </button>
    </table>
  );
}
