import { useState, CSSProperties } from "react";
import { HiCheck, HiX } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import colors from "../../colors";
import { EditCardPayload } from "../../types";
import Button from "../button";

import Input from "../input";

import styles from "./index.module.css";

type Props = {
  style?: CSSProperties;
  id: string;
  columnId: string;
  initialValues?: {
    id: string;
    title: string;
    description: string;
    tags: string[];
  };
  onCancelEdition: () => void;
  onSave: (payload: EditCardPayload, columnId: string) => Promise<void>;
};

function FormCard({
  id,
  columnId,
  initialValues,
  style,
  onCancelEdition,
  onSave,
}: Props) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );
  const [currentTag, setCurrentTag] = useState("");
  const [tags, setTags] = useState<string[]>(initialValues?.tags ?? []);

  const handleChangeTags = (value: string) => {
    if (value.includes("\n")) {
      const formattedValue = value.trim().replace("\n", "");
      setTags((prev) => [...prev, formattedValue]);
      setCurrentTag("");
    } else {
      setCurrentTag(value);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((prevTag) => prevTag !== tag));
  };

  const handleSubmit = () => {
    const payload = {
      id,
      title,
      description,
      tags,
    };
    onSave(payload, columnId);
  };
  return (
    <div className={styles.container} style={style}>
      <Input
        title="Título"
        placeholder="Digite o título do card"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        style={{ fontWeight: "700" }}
      />
      <textarea
        title="Descrição"
        placeholder="Digite a descrição do card"
        className={styles.textArea}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ height: "auto" }}
      />
      <textarea
        placeholder="Digite aqui as tags (aperte enter entre as tags)"
        value={currentTag}
        onChange={(e) => handleChangeTags(e.target.value)}
        className={styles.textArea}
      />
      <div className={styles.tagContainer}>
        {tags.map((tag) => (
          <p className={styles.tag} key={uuidv4()}>
            {tag}

            <a
              className={styles.removeTag}
              onClick={() => handleRemoveTag(tag)}
            >
              <HiX size={10} color={colors.white} />
            </a>
          </p>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <Button
          type="button"
          onClick={onCancelEdition}
          variant="text"
          text="Cancelar"
          size="small"
          className={styles.cancelButton}
          icon={<HiX size={20} color={colors.gray} />}
          iconPosition="right"
        />
        <Button
          type="button"
          onClick={handleSubmit}
          variant="default"
          text="Salvar"
          size="small"
          icon={<HiCheck size={20} />}
          iconPosition="right"
        />
      </div>
    </div>
  );
}

export default FormCard;
