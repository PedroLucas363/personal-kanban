import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";

import { cards } from "../../../../mockData";
import Content, { Data } from "./content";

const getInitialTagsAvailable = () => {
  const tags: Record<string, boolean> = {};

  cards.forEach((card) =>
    card.tasks.forEach((task) => {
      task.tags.forEach((tag) => {
        if (!tags[tag]) tags[tag] = true;
      });
    })
  );
  return Object.keys(tags);
};

function BoardSection() {
  const [data, setData] = useState(cards);
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState<Data[] | null>(null);
  const [isFilterTagsVisible, setIsFilterTagsVisible] = useState(false);
  const [allAvailableTags, setAllAvailableTags] = useState<string[]>(
    getInitialTagsAvailable()
  );
  const [filterTags, setFilterTags] = useState<string[]>([]);

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
        setFilteredData(
          data.map((column) => ({
            ...column,
            tasks: column.tasks.filter((task) =>
              filterTags
                .map((tag) => task.tags.some((taskTag) => taskTag === tag))
                .every(Boolean)
            ),
          }))
        );
      } else {
        setFilteredData(null);
      }
    } else {
      setFilteredData(
        data.map((column) => ({
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

  return (
    <Content
      data={filteredData || data}
      onDragEnd={handleDragEnd}
      filterValue={filterValue}
      onFilterValueChange={handleFilterValueChange}
      allAvailableTags={allAvailableTags}
      isFilterTagsVisible={isFilterTagsVisible}
      onToggleIsFilterTagsVisible={handleToggleIsFilterTagsVisible}
      onSelectTag={handleSelectTag}
      filterTags={filterTags}
    />
  );
}

export default BoardSection;
