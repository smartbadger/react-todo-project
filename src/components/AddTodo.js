import { useState, useEffect } from "react";
import { useAppCtx } from "../context";

const AddTodo = () => {
  const { user, categories, dispatchCtxEvent } = useAppCtx();
  const [todo, setTodo] = useState({
    title: "",
    userId: user.id,
    completed: false,
    category: "",
  });
  const handleAdd = () => {
    dispatchCtxEvent("ADD_TODO", todo);
    setTodo({ title: "", userId: user.id, completed: false, category: "" });
  };
  const handleChange = (val) => {
    setTodo({ ...todo, ...val });
  };
  return (
    <>
      <input
        type="text"
        value={todo.title}
        onChange={({ target }) => handleChange({ title: target.value })}
      />
      <select
        value={todo.category}
        onChange={({ target }) => handleChange({ category: target.value })}
      >
        <option key={`unset-add-option`} value={""}>
          Unset
        </option>
        {categories.map((el) => (
          <option key={`${el}-add-option`} value={el}>
            {el}
          </option>
        ))}
      </select>
      <button onClick={handleAdd}>Add Todo +</button>
    </>
  );
};
export default AddTodo;
