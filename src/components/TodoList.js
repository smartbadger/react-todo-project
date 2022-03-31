import { useState } from "react";
import { useAppCtx } from "../context";
const TodoList = ({ items = [], category, bg }) => {
  const list = items.map((el) => <ListItem {...el} key={el.id} />);
  return (
    <div style={{ backgroundColor: bg }}>
      <h3 className="cat-title">{category}</h3>
      <ul>{list}</ul>
    </div>
  );
};

const ListItem = ({ title, id, completed, category = "" }) => {
  const [edit, setEdit] = useState(false);
  const [todo, setTodo] = useState({ title, completed, category, id });
  const { categories, dispatchCtxEvent } = useAppCtx();
  const handleEdit = () => {
    dispatchCtxEvent("UPDATE_TODO", todo);
    setEdit(false);
  };
  const handleChange = (val) => {
    setTodo({ ...todo, ...val });
  };
  const handleDelete = () => {
    dispatchCtxEvent("REMOVE_TODO", id);
  };

  return (
    <li className={todo.completed ? "complete" : ""}>
      {edit ? (
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
          <button className="add" onClick={handleEdit}>
            Update
          </button>
          <button onClick={() => setEdit(false)}>cancel</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <div className="column">
            <button
              disabled={todo.completed}
              className="done"
              onClick={() => {
                dispatchCtxEvent("UPDATE_TODO", { ...todo, completed: true });
                setTodo({ ...todo, completed: true });
              }}
            >
              Done
            </button>
            <button onClick={() => setEdit(!edit)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};
export default TodoList;
