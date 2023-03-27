import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./index.module.css";

type Props = {
  title: string;
  description?: string;
  tags?: string[];
  style: CSSProperties;
};

function Card({ title, description, tags = [], style }: Props) {
  return (
    <div className={styles.container} style={style}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      <div className={styles.tagContainer}>
        {tags.map((tag) => (
          <span className={styles.tag} key={uuidv4()}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Card;
