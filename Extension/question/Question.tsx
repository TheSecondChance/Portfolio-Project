import { z } from "zod";
import { RandomCategoryResponse } from "./FetchShape";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Custom.module.css";
import CorrectAnswer from "./CorrectAnswer";
import IncorrectAnswer from "./IncorrectAnswer";
import Loading from "./Loading";
import NetworkError from "./NetworkError";

const FormSchema = z.object({
  items: z.array(z.number()).refine((value) => value.length > 0, {
    message: "You have to select at least one item.",
  }),
});

export function Question() {
  const [random, setRandom] = useState<RandomCategoryResponse | null>(null);
  const [error, setError] = useState<React.ReactNode>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submissionMessage, setSubmissionMessage] =
    useState<React.ReactNode>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const networkError = <NetworkError />;
  useEffect(() => {
    axios
      .get<RandomCategoryResponse>("http://127.0.0.1:8000/random-category")
      .then((res) => {
        setRandom(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(networkError);
        setLoading(false);
      });
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const formData = { items: selectedItems };
    const parseResult = FormSchema.safeParse(formData);

    if (!parseResult.success) {
      setValidationError(parseResult.error.errors[0].message);
      return;
    }

    setValidationError(null);

    const selectedIds = selectedItems;
    const correctAnswers =
      random?.random_category.random_question.question_answer
        .filter((answer) => answer.is_correct)
        .map((answer) => answer.id) || [];
    const isCorrect =
      selectedIds.length === correctAnswers.length &&
      selectedIds.every((id) => correctAnswers.includes(id));

    const message = isCorrect ? <CorrectAnswer /> : <IncorrectAnswer />;
    setSubmissionMessage(message);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (submissionMessage) {
    return <div>{submissionMessage}</div>;
  }

  return (
    <>
      <div style={{ width: "36rem", height: "22rem" }}>
        <div className={styles.cardBody}>
          <h2>
            Hassel-Free <span className={styles.headColor}>Reminder</span>
          </h2>
          <hr />
          <p className={[styles.question, "card-text"].join(" ")}>
            {random?.random_category.random_question.question} ❓
          </p>

          <form onSubmit={onSubmit}>
            {random?.random_category.random_question.question_answer.map(
              (question) => (
                <div
                  className={[styles.questioLeft, "form-check"].join(" ")}
                  key={question.id}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`flexCheckDefault-${question.id}`}
                    checked={selectedItems.includes(question.id)}
                    onChange={() => handleCheckboxChange(question.id)}
                  />
                  <label htmlFor={`flexCheckDefault-${question.id}`}>
                    {question.answer}
                  </label>
                </div>
              )
            )}

            <button
              type="submit"
              className={[
                styles.btnColor,
                styles.btnHover,
                styles.btnSpace,
              ].join(" ")}
            >
              Done
            </button>
            {validationError && (
              <div className={styles.closeColor}>{validationError}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default Question;
