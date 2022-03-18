import axios from "axios";
import React from "react";

function NextQuestion() {
  const [questions, setQuestions] = React.useState(null);
  const [nextQuestion, setNextQuestion] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/questions`).then((response) => {
      setQuestions(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/next_questions`)
      .then((response) => {
        setNextQuestion(response.data);
      });
  }, []);

  function updateNextQuestion(event, id) {
    axios
      .put(`${process.env.REACT_APP_API_URL}/next_questions/1`, {
        number: id,
      })
      .then((response) => {
        setNextQuestion(response.data);
        console.log(event);
      });
  }

  if (!questions) return null;
  return (
    <table className="one">
      {questions.map((question) => {
        return (
          <td>
            <button onClick={(event) => updateNextQuestion(event, question.id)}>
              {question.title}
            </button>
          </td>
        );
      })}
    </table>
  );
}

export default NextQuestion;
