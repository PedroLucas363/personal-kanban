import { HiPencil, HiPlus } from "react-icons/hi";
import { IoFilter, IoSearch } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

import Profile from "../../../../../assets/profile.jpeg";
import colors from "../../../../../colors";
import Button from "../../../../../components/button";
import Card from "../../../../../components/card";
import Input from "../../../../../components/input";
import styles from "./index.module.css";
import { Column, EditCardPayload } from "../../../../../types";
import FormCard from "../../../../../components/form-card";

type Props = {
  data: Column[];
  onDragEnd: OnDragEndResponder;
  filterValue: string;
  onFilterValueChange: (value: string) => void;
  allAvailableTags: string[];
  isFilterTagsVisible: boolean;
  onToggleIsFilterTagsVisible: () => void;
  onSelectTag: (tag: string) => void;
  filterTags: string[];
  onClickAddCard: (columnId: string) => void;
  isEditingCardId: string;
  onClickEditCard: (id: string) => Promise<void>;
  onCancelCardEdition: () => void;
  onSaveCardEdition: (
    payload: EditCardPayload,
    columnId: string
  ) => Promise<void>;
  onRemoveCard: (id: string) => Promise<void>;
};

function Content({
  data,
  onDragEnd,
  filterValue,
  onFilterValueChange,
  allAvailableTags,
  isFilterTagsVisible,
  onToggleIsFilterTagsVisible,
  onSelectTag,
  filterTags,
  onClickAddCard,
  isEditingCardId,
  onClickEditCard,
  onCancelCardEdition,
  onSaveCardEdition,
  onRemoveCard,
}: Props) {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.boardTitleContainer}>
          <p contentEditable className={styles.title}>
            Meu Kanban
          </p>
          <HiPencil size={34} color={colors.lightGray} />
        </div>
        <img
          src={Profile}
          alt="imagem de perfil do usuário"
          className={styles.profilePicture}
        />
      </header>
      <section>
        <div className={styles.filter}>
          <Button
            text="Filtrar"
            icon={<IoFilter size="100%" />}
            iconPosition="left"
            type="button"
            onClick={onToggleIsFilterTagsVisible}
          />
          <Input
            placeholder="Busque por os cards pelo título ou descrição"
            icon={<IoSearch size={24} color={colors.darkGray} />}
            iconPosition="left"
            onChange={(e) => onFilterValueChange(e.target.value)}
            value={filterValue}
          />
        </div>
        <div
          className={`${styles.filterTagsContainer} ${
            isFilterTagsVisible ? styles.filterTagsVisible : ""
          }`}
        >
          {allAvailableTags.map((tag) => (
            <button
              className={`${styles.tag} ${
                filterTags.includes(tag) ? styles.selectedTag : ""
              }`}
              onClick={() => onSelectTag(tag)}
              key={uuidv4()}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>
      <main>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.kanban}>
            {data.map((section) => (
              <Droppable key={section.id} droppableId={section.id}>
                {(provided, sectionSnapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={styles.kanbanSection}
                    style={{
                      backgroundColor: sectionSnapshot.draggingFromThisWith
                        ? colors.lightPurple
                        : sectionSnapshot.draggingOverWith
                        ? colors.purple
                        : "transparent",
                    }}
                  >
                    <div className={styles.kanbanSectionTitle}>
                      {section.title}
                    </div>
                    <div className={styles.kanbanSectionContent}>
                      {section.tasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, cardSnapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                ...provided.draggableProps.style,
                                opacity: cardSnapshot.isDragging ? "0.5" : "1",
                              }}
                            >
                              {isEditingCardId === task.id ? (
                                <FormCard
                                  id={task.id}
                                  columnId={section.id}
                                  initialValues={{
                                    ...task,
                                  }}
                                  onCancelEdition={onCancelCardEdition}
                                  onSave={onSaveCardEdition}
                                />
                              ) : (
                                <Card
                                  id={task.id}
                                  title={task.title}
                                  description={task.description}
                                  tags={task.tags}
                                  style={{
                                    boxShadow: sectionSnapshot.isDraggingOver
                                      ? "none"
                                      : undefined,
                                  }}
                                  onClickEditCard={onClickEditCard}
                                  onRemoveCard={onRemoveCard}
                                />
                              )}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                    <Button
                      icon={<HiPlus size={20} color={colors.darkPurple} />}
                      title="Adicionar novo card"
                      size="small"
                      className={styles.addButton}
                      onClick={() => onClickAddCard(section.id)}
                    />
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </main>
    </section>
  );
}

export default Content;
