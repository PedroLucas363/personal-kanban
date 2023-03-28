import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";

import Content from "./content";

import {
  editCard,
  listColumns,
  listTags,
  removeCard,
  updateCardPosition,
  createNewCard,
} from "../../../../fake-api";
import { Column, EditCardPayload } from "../../../../types";

function BoardSection() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredColumns, setFilteredColumns] = useState<Column[] | null>(null);
  const [isFilterTagsVisible, setIsFilterTagsVisible] = useState(false);
  const [allAvailableTags, setAllAvailableTags] = useState<string[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [isEditingCard, setIsEditingCard] = useState("");

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const payload = {
      currentIndex: source.index,
      destinationIndex: destination.index,
      currentColumnId: source.droppableId,
      destinationColumnId: destination.droppableId,
    };

    try {
      const response = await updateCardPosition(payload);
      setColumns(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
  };

  const handleToggleIsFilterTagsVisible = () => {
    setFilterTags([]);
    setIsFilterTagsVisible((prev) => !prev);
  };

  const handleSelectTag = (tag: string) => {
    if (filterTags.includes(tag)) {
      setFilterTags((prev) => prev.filter((filterTag) => filterTag !== tag));
    } else {
      setFilterTags((prev) => [...prev, tag]);
    }
  };

  useEffect(() => {
    if (filterValue.trim() === "") {
      if (filterTags.length) {
        setFilteredColumns(
          columns.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) =>
              filterTags
                .map((tag) => task.tags.some((taskTag) => taskTag === tag))
                .every(Boolean)
            ),
          }))
        );
      } else {
        setFilteredColumns(null);
      }
    } else {
      setFilteredColumns(
        columns.map((column) => ({
          ...column,
          tasks: column.tasks.filter((task) => {
            return (
              (task.title.toLowerCase().indexOf(filterValue.toLowerCase()) >
                -1 ||
                task.description
                  .toLowerCase()
                  .indexOf(filterValue.toLowerCase()) > -1) &&
              (filterTags.length
                ? filterTags
                    .map((tag) => task.tags.some((taskTag) => taskTag === tag))
                    .every(Boolean)
                : true)
            );
          }),
        }))
      );
    }
  }, [filterValue, filterTags]);

  const fetchColumns = async () => {
    try {
      const response = await listColumns();
      setColumns(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await listTags();
      setAllAvailableTags(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchColumns();

    fetchTags();
  }, []);

  const handleClickAddCard = (columnId: string) => {
    setIsEditingCard("newCard");
    setColumns((prev) => {
      const newColumns = [...prev];
      const destinationColumnIndex = newColumns.findIndex(
        (column) => column.id === columnId
      );
      const destinationColumn = newColumns[destinationColumnIndex];
      const destinationTasks = [...destinationColumn.tasks];

      const newCard = {
        id: "newCard",
        title: "",
        description: "",
        tags: [],
      };
      destinationTasks.push(newCard);
      newColumns[destinationColumnIndex].tasks = destinationTasks;
      return newColumns;
    });
  };

  const handleClickEditCard = async (id: string) => {
    setIsEditingCard(id);
  };

  const handleCancelCardEdition = () => {
    if (isEditingCard === "newCard") {
      setColumns((prev) => {
        const newColumns = [...prev];
        const destinationColumnIndex = newColumns.findIndex((column) =>
          column.tasks.some((task) => task.id === isEditingCard)
        );
        const destinationColumn = newColumns[destinationColumnIndex];
        const destinationTasks = [...destinationColumn.tasks];

        newColumns[destinationColumnIndex].tasks = destinationTasks.filter(
          (task) => task.id !== "newCard"
        );
        return newColumns;
      });
    }
    setIsEditingCard("");
  };

  const handleSaveCardEdition = async (
    payload: EditCardPayload,
    columnId: string
  ) => {
    try {
      if (payload.id === "newCard") {
        const response = await createNewCard(columnId, payload);
        setColumns(response.data);
        fetchTags();
      } else {
        const response = await editCard(isEditingCard, payload);
        setColumns(response.data);
        fetchTags();
      }
    } catch (err) {
      console.log(err);
    }
    setIsEditingCard("");
  };

  const handleRemoveCard = async (cardId: string) => {
    try {
      const response = await removeCard(cardId);
      setColumns(response.data);
      fetchTags();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Content
      data={filteredColumns || columns}
      onDragEnd={handleDragEnd}
      filterValue={filterValue}
      onFilterValueChange={handleFilterValueChange}
      allAvailableTags={allAvailableTags}
      isFilterTagsVisible={isFilterTagsVisible}
      onToggleIsFilterTagsVisible={handleToggleIsFilterTagsVisible}
      onSelectTag={handleSelectTag}
      filterTags={filterTags}
      onClickAddCard={handleClickAddCard}
      isEditingCardId={isEditingCard}
      onClickEditCard={handleClickEditCard}
      onCancelCardEdition={handleCancelCardEdition}
      onSaveCardEdition={handleSaveCardEdition}
      onRemoveCard={handleRemoveCard}
    />
  );
}

export default BoardSection;
