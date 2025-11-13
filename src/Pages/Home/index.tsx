import { signal } from "@preact/signals-react";
import styles from "./style.module.css";
import type { Task } from "../../types";
const count = signal(0);
const Home = () => {
    return <>
        <img className="cat" src="/images/cat.png" />

        <h1 className={styles.default}>Home {count.value}</h1>
        <button onClick={() => count.value++}>Increment</button>
    </>;
}

export default Home