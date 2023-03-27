import { HiPencil } from "react-icons/hi";
import { IoFilter, IoSearch } from "react-icons/io5";

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

type Props = {
  data: {
    id: string;
    title: string;
    tasks: {
      id: string;
      title: string;
      description: string;
      tags: string[];
    }[];
  }[];
  onDragEnd: OnDragEndResponder;
};

function Content({ data, onDragEnd }: Props) {
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
      <section className={styles.filter}>
        <Button
          text="Filtrar"
          icon={<IoFilter size="100%" />}
          iconPosition="left"
          type="button"
        />
        <Input
          placeholder="Busque por cards, assuntos ou responsáveis..."
          icon={<IoSearch size={24} color={colors.darkGray} />}
          iconPosition="left"
        />
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
                              <Card
                                title={task.title}
                                description={task.description}
                                tags={task.tags}
                                style={{
                                  boxShadow: sectionSnapshot.isDraggingOver
                                    ? "none"
                                    : undefined,
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
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
