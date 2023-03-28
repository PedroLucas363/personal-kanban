import { CSSProperties } from "react";
import { HiPencil } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import { v4 as uuidv4 } from "uuid";

import Button from "../button";

import colors from "../../colors";
import styles from "./index.module.css";

type Props = {
  id?: string;
  title: string;
  description?: string;
  tags?: string[];
  style?: CSSProperties;
  onClickEditCard?: (id: string) => Promise<void>;
  onRemoveCard?: (id: string) => Promise<void>;
};

function Card({
  id,
  title,
  description,
  tags = [],
  style,
  onClickEditCard,
  onRemoveCard,
}: Props) {
  return (
    <div className={styles.container} style={style}>
      <div className={styles.headerContainer}>
        <p className={styles.title}>{title}</p>
        <div className={styles.buttonsContainer}>
          <Button
            variant="text"
            style={{ height: "24px", width: "24px" }}
            className={styles.editButton}
            icon={<HiPencil size={20} color={colors.darkPurple} />}
            onClick={() => {
              id && onClickEditCard ? onClickEditCard(id) : undefined;
            }}
          />
          <Button
            variant="text"
            style={{ height: "24px", width: "24px" }}
            className={styles.removeButton}
            icon={<TbTrash size={20} color={colors.darkPurple} />}
            onClick={() => {
              id && onRemoveCard ? onRemoveCard(id) : undefined;
            }}
          />
        </div>
      </div>
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
