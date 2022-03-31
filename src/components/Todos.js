import { useState, useEffect } from "react";
import { useAppCtx } from "../context";
import TodoList from "./TodoList";

const Todos = () => {
  const { todos, categories } = useAppCtx();
  const [filteredTodos, setFilteredTodos] = useState({});
  const colors = [
    "#ffb7cc",
    "#f8b7ff",
    "#d3b7ff",
    "#b7f3ff",
    "#64edc6",
    "#b8ed64",
    "#edbb64",
    "#673AB7",
    "#EDE7F6",
    "#D1C4E9",
    "#B39DDB",
    "#9575CD",
    "#7E57C2",
    "#673AB7",
    "#5E35B1",
    "#512DA8",
    "#4527A0",
    "#311B92",
    "#B388FF",
    "#7C4DFF",
    "#651FFF",
    "#6200EA",
    "#3F51B5",
    "#E8EAF6",
  ];
  const filterTodos = () => {
    const todoStruct = { misc: [] };
    todos.forEach((element) => {
      if (element.category && todoStruct[element.category]) {
        todoStruct[element.category].push(element);
      } else if (element.category) {
        todoStruct[element.category] = [element];
      } else {
        todoStruct.misc.push(element);
      }
    });
    setFilteredTodos(todoStruct);
  };

  useEffect(() => {
    filterTodos();
  }, [todos]);

  return (
    <div>
      <TodoList
        bg={colors[0]}
        items={filteredTodos.misc || []}
        category={"Todos"}
      />
      {categories.map((el, i) => (
        <TodoList
          key={`${el}-todo-list`}
          bg={colors[i]}
          items={filteredTodos[el] || []}
          category={el}
        />
      ))}
    </div>
  );
};
export default Todos;
