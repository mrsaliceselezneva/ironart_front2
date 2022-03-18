import { useContext } from "react";
import Question from "../components/Question/Question";

export default function User({ id }) {
  return <Question id={id} />;
}
