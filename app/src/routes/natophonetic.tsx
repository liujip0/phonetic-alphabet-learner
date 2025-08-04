import { IconButton, Input } from "@liujip0/components";
import { useState } from "react";
import { Link } from "react-router";
import styles from "./natophonetic.module.css";

const NATO_PHONETIC_ALPHABET = [
  ["A", "Alfa"],
  ["B", "Bravo"],
  ["C", "Charlie"],
  ["D", "Delta"],
  ["E", "Echo"],
  ["F", "Foxtrot"],
  ["G", "Golf"],
  ["H", "Hotel"],
  ["I", "India"],
  ["J", "Juliett"],
  ["K", "Kilo"],
  ["L", "Lima"],
  ["M", "Mike"],
  ["N", "November"],
  ["O", "Oscar"],
  ["P", "Papa"],
  ["Q", "Quebec"],
  ["R", "Romeo"],
  ["S", "Sierra"],
  ["T", "Tango"],
  ["U", "Uniform"],
  ["V", "Victor"],
  ["W", "Whiskey"],
  ["X", "Xray"],
  ["Y", "Yankee"],
  ["Z", "Zulu"],
];
const CORRECT_MESSAGE = "Correct!";

export default function NatoPhonetic() {
  const [question, setQuestion] = useState(
    NATO_PHONETIC_ALPHABET[
      Math.floor(Math.random() * NATO_PHONETIC_ALPHABET.length)
    ][0]
  );
  const [answer, setAnswer] = useState("");

  const [prevQuestionStatus, setPrevQuestionStatus] = useState("");

  const [record, setRecordState] = useState<[number, number]>(
    (localStorage
      .getItem("natophonetic-record")
      ?.split("/")
      .map((value) => parseInt(value))
      .slice(0, 3) as [number, number]) || [0, 0]
  );
  const setRecord = (value: [number, number]) => {
    setRecordState(value);
    localStorage.setItem("natophonetic-record", value.join("/"));
  };

  const checkAnswer = () => {
    const correctAnswer = NATO_PHONETIC_ALPHABET.find(
      (pair) => pair[0] === question
    )![1];

    if (answer.toUpperCase() === correctAnswer.toUpperCase()) {
      setPrevQuestionStatus(CORRECT_MESSAGE);
      setRecord([record[0] + 1, record[1] + 1]);
    } else {
      setPrevQuestionStatus(
        `Incorrect!\nThe correct answer is [ ${question} : ${correctAnswer} ].`
      );
      setRecord([record[0], record[1] + 1]);
    }

    let newQuestion: string;
    do {
      newQuestion =
        NATO_PHONETIC_ALPHABET[
          Math.floor(Math.random() * NATO_PHONETIC_ALPHABET.length)
        ][0];
    } while (newQuestion === question);
    setQuestion(newQuestion);
    setAnswer("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/">
          <span className={"material-symbols-outlined" + " " + styles.homeLink}>
            home
          </span>
        </Link>
        <h2 className={styles.heading}>NATO Phonetic Alphabet</h2>
        <div className={styles.record}>
          <div className={styles.recordText}>
            {record[0]}/{record[1]}
          </div>
          <div className={styles.recordText}>
            {((record[0] / record[1]) * 100).toFixed(4)}%
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.question}>{question}</div>
        <div>
          <Input
            id="nato-answer"
            value={answer}
            onChange={setAnswer}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                checkAnswer();
              }
            }}
            label={"Code Word"}
            endIcon={
              <IconButton onClick={checkAnswer}>
                <span className="material-symbols-outlined">
                  keyboard_return
                </span>
              </IconButton>
            }
          />
        </div>
        <div
          className={
            styles.prevQuestionStatus +
            " " +
            (prevQuestionStatus === CORRECT_MESSAGE ?
              styles.prevQuestionStatusCorrect
            : styles.prevQuestionStatusIncorrect)
          }>
          {prevQuestionStatus}
        </div>
      </div>
      <div className={styles.footer}>
        Code word list from{" "}
        <a href="https://en.wikipedia.org/wiki/NATO_phonetic_alphabet">
          Wikipedia/NATO phonetic alphabet
        </a>
      </div>
    </div>
  );
}
