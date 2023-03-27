import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";

import { cards } from "../../../../mockData";
import Content from "./content";

function BoardSection() {
  const [data, setData] = useState(cards);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      setData((prev) => {
        const newData = [...prev];
        const sourceColIndex = newData.findIndex(
          (e) => e.id === source.droppableId
        );
        const sourceCol = newData[sourceColIndex];
        const sourceTask = [...sourceCol.tasks];

        const [removed] = sourceTask.splice(source.index, 1);
        sourceTask.splice(destination.index, 0, removed);

        newData[sourceColIndex].tasks = sourceTask;
        return newData;
      });
    } else {
      setData((prev) => {
        const newData = [...prev];
        const sourceColIndex = newData.findIndex(
          (e) => e.id === source.droppableId
        );
        const destinationColIndex = newData.findIndex(
          (e) => e.id === destination.droppableId
        );

        const sourceCol = newData[sourceColIndex];
        const destinationCol = newData[destinationColIndex];

        const sourceTask = [...sourceCol.tasks];
        const destinationTask = [...destinationCol.tasks];

        const [removed] = sourceTask.splice(source.index, 1);
        destinationTask.splice(destination.index, 0, removed);

        newData[sourceColIndex].tasks = sourceTask;
        newData[destinationColIndex].tasks = destinationTask;
        return newData;
      });
    }
  };
  return <Content data={data} onDragEnd={handleDragEnd} />;
}

export default BoardSection;
