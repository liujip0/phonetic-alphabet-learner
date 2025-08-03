import { Link } from "react-router";
import styles from "./index.module.css";

export default function Index() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Phonetic Alphabet Learner!</h1>
      <p>
        More alphabet types coming soon! (I really want to learn semaphore so
        it's prob going to end up here!)
      </p>
      <ul>
        <li>
          <Link to="/natophonetic">Nato Phonetic Alphabet</Link>
        </li>
      </ul>
    </div>
  );
}
