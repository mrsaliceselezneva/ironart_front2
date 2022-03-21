import axios from "axios";
import React from "react";
import Modal from "../Modal/Modal";

function Answers({ questionId }) {
  const [answers, setAnswers] = React.useState(null);
  const [show, setShow] = React.useState(null);
  const [modalActive, setModalActive] = React.useState(false);

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
        <button onClick={() => setModalActive(true)}>{answer.body}</button>
      ))}
      <Modal active={modalActive} setActive={setModalActive} />
    </div>
  );
}
export default Answers;
