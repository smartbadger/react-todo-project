import { useState } from "react";
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
    <div className="column">
      <input
        type="text"
        value={todo.title}
        placeholder="Todo Text"
        onChange={({ target }) => handleChange({ title: target.value })}
      />
      <select
        value={todo.category}
        onChange={({ target }) => handleChange({ category: target.value })}
      >
        <option key={`unset-add-option`} value={""}>
          Todo Category
        </option>
        {categories.map((el) => (
          <option key={`${el}-add-option`} value={el}>
            {el}
          </option>
        ))}
      </select>
      <button className="add" onClick={handleAdd}>
        Add Todo +
      </button>
    </div>
  );
};
export default AddTodo;
