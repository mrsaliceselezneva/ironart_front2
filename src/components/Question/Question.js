import axios from "axios";
import React from "react";
import Answers from "../Answers/Answers";

function Question({ id }) {
  const [question, setQuestion] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${id}`)
      .then((response) => {
        setQuestion(response.data);
      });
  }, []);

  if (!question) return null;
  return (
    <div>
      {question.title}
      <Answers questionId={question.id} />
    </div>
  );
}
export default Question;
