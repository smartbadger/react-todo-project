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
    <>
      <input
        type="text"
        value={cat}
        onChange={({ target }) => setCat(target.value)}
      />
      <button onClick={handleAdd}>Add Category +</button>
    </>
  );
};
export default AddCategory;
