import axios from "axios";
import React from "react";

function Answers({ questionId }) {
  const [answers, setAnswers] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/questions/${questionId}/answers`)
      .then((response) => {
        setAnswers(response.data);
      });
  }, []);

  if (!answers) return null;
  return (
    <div>
      {answers.map((answer) => (
        <button>{answer.body}</button>
      ))}
    </div>
  );
}
export default Answers;
