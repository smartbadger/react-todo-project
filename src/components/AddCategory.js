import { useState } from "react";
import { useAppCtx } from "../context";

const AddCategory = () => {
  const { dispatchCtxEvent } = useAppCtx();
  const [cat, setCat] = useState("");
  const handleAdd = () => {
    if (cat) {
      dispatchCtxEvent("ADD_CATEGORY", cat);
      setCat("");
    }
  };
  return (
    <div className="column">
      <input
        type="text"
        value={cat}
        placeholder="Category Name"
        onChange={({ target }) => setCat(target.value)}
      />
      <button className="add" onClick={handleAdd}>
        Add Category +
      </button>
    </div>
  );
};
export default AddCategory;
