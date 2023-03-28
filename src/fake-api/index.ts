import { v4 as uuidv4 } from "uuid";

import { columns as MockColumns } from "../mockData";

import { Column, EditCardPayload } from "../types";

export const startFakeApi = (): void => {
  const columns = localStorage.getItem("kanbanColumns");
  if (columns) {
    const parsedColumn: Column[] = JSON.parse(columns);
    const columnNonNullable: Column[] = parsedColumn.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => !!task),
    }));
    localStorage.setItem("kanbanColumns", JSON.stringify(columnNonNullable));
    return;
  }
  localStorage.setItem("kanbanColumns", JSON.stringify(MockColumns));
};

const getColumnsFromStorage = (): Column[] => {
  const savedColumns = localStorage.getItem("kanbanColumns");
  const parsedColumns = savedColumns ? JSON.parse(savedColumns) : [];

  return parsedColumns;
};

const setColumnsInStorage = (columns: Column[]): void => {
  localStorage.setItem("kanbanColumns", JSON.stringify(columns));
};

const simulateLoading = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const listColumns = async (): Promise<{ data: Column[] }> => {
  // await simulateLoading();

  return { data: getColumnsFromStorage() };
};

type UpdateCardPositionPayload = {
  currentIndex: number;
  destinationIndex: number;
  currentColumnId: string;
  destinationColumnId: string;
};

export const updateCardPosition = async ({
  currentIndex,
  destinationIndex,
  currentColumnId,
  destinationColumnId,
}: UpdateCardPositionPayload): Promise<{ data: Column[] }> => {
  // await simulateLoading();
  let columns = getColumnsFromStorage();
  if (currentColumnId === destinationColumnId) {
    {
      const formattedColumns = [...columns];
      const sourceColIndex = formattedColumns.findIndex(
        (e) => e.id === currentColumnId
      );
      const sourceCol = formattedColumns[sourceColIndex];
      const sourceTask = [...sourceCol.tasks];

      const [removed] = sourceTask.splice(currentIndex, 1);
      sourceTask.splice(destinationIndex, 0, removed);

      formattedColumns[sourceColIndex].tasks = sourceTask;
      columns = formattedColumns;
    }
  } else {
    const formattedColumns = [...columns];
    const sourceColIndex = formattedColumns.findIndex(
      (e) => e.id === currentColumnId
    );
    const destinationColIndex = formattedColumns.findIndex(
      (e) => e.id === destinationColumnId
    );

    const sourceCol = formattedColumns[sourceColIndex];
    const destinationCol = formattedColumns[destinationColIndex];

    const sourceTask = [...sourceCol.tasks];
    const destinationTask = [...destinationCol.tasks];

    const [removed] = sourceTask.splice(currentIndex, 1);
    destinationTask.splice(destinationIndex, 0, removed);

    formattedColumns[sourceColIndex].tasks = sourceTask;
    formattedColumns[destinationColIndex].tasks = destinationTask;
    columns = formattedColumns;
  }
  setColumnsInStorage(columns);
  return { data: columns };
};

export const listTags = async (): Promise<{ data: string[] }> => {
  // await simulateLoading();
  const columns = getColumnsFromStorage();
  if (!columns.length) return { data: [] };

  const tags: Record<string, boolean> = {};

  columns.forEach((column) =>
    column.tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        if (!tags[tag]) tags[tag] = true;
      });
    })
  );
  return { data: Object.keys(tags).sort() };
};

export const createNewCard = async (
  columnId: string,
  payload: EditCardPayload
): Promise<{ data: Column[] }> => {
  // await simulateLoading();
  let columns = getColumnsFromStorage();

  const destinationColumnIndex = columns.findIndex(
    (column) => column.id === columnId
  );
  const destinationColumn = columns[destinationColumnIndex];
  const destinationTasks = [...destinationColumn.tasks];

  const newCard = {
    ...payload,
    id: uuidv4(),
  };
  destinationTasks.push(newCard);
  columns[destinationColumnIndex].tasks = destinationTasks;
  setColumnsInStorage(columns);

  return { data: columns };
};

export const editCard = async (
  id: string,
  payload: EditCardPayload
): Promise<{ data: Column[] }> => {
  // await simulateLoading();
  let columns = getColumnsFromStorage();
  let cardIndex: number | null = null;
  const columnIndex = columns.findIndex((column) =>
    column.tasks.some((task, index) => {
      if (task.id === id) {
        cardIndex = index;
        return true;
      }
      return false;
    })
  );
  const column = columns[columnIndex];
  const tasks = [...column.tasks];

  if (cardIndex) {
    tasks[cardIndex] = {
      ...payload,
    };
  }

  columns[columnIndex].tasks = tasks;
  setColumnsInStorage(columns);

  return { data: columns };
};

export const removeCard = async (id: string): Promise<{ data: Column[] }> => {
  // await simulateLoading();
  let columns = getColumnsFromStorage();
  let cardIndex: number | null = null;
  const columnIndex = columns.findIndex((column) =>
    column.tasks.some((task, index) => {
      if (task.id === id) {
        cardIndex = index;
        return true;
      }
      return false;
    })
  );
  const column = columns[columnIndex];
  const tasks = [...column.tasks];

  columns[columnIndex].tasks = tasks.filter((task) => task.id !== id);
  setColumnsInStorage(columns);

  return { data: columns };
};
