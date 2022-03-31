import "./App.css";
import * as api from "./api";
import { AppProvider } from "./context";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import AddCategory from "./components/AddCategory";
import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  const [appCtx, setAppCtx] = useState({
    loading: true,
    user: {},
    todos: [],
    categories: [],
  });

  const loadInitialProps = async () => {
    const [todos, user] = await Promise.all([
      api.getTodos({ userId: 1 }),
      api.getUser(1),
    ]);
    setAppCtx({ ...appCtx, loading: false, todos, user });
  };

  const dispatchCtxEvent = async (actionType, payload) => {
    switch (actionType) {
      case "ADD_TODO":
        const ntd = await api.createTodo(payload);
        if (!ntd) {
          console.error("could not create todo");
          return;
        }
        setAppCtx({ ...appCtx, todos: [...appCtx.todos, ntd] });
        return;
      case "REMOVE_TODO":
        const res = await api.deleteTodo(payload);
        if (!res) {
          console.error("could not delete todo");
          return;
        }
        const updatedTodos = appCtx.todos.filter((el) => el.id !== payload);
        setAppCtx({ ...appCtx, todos: updatedTodos });
        return;
      case "UPDATE_TODO":
        const { id, ...params } = payload;
        const td = await api.updateTodo(id, params);
        if (!td) {
          console.error("could not delete todo");
          return;
        }
        appCtx.todos[appCtx.todos.findIndex((el) => el.id === id)] = td;
        setAppCtx({ ...appCtx, todos: [...appCtx.todos] });
        return;
      case "ADD_CATEGORY":
        setAppCtx({ ...appCtx, categories: [...appCtx.categories, payload] });
        return;
      default:
        console.log("invalid actionType in dispatchCtxEvent");
        return;
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadInitialProps();
    }
    fetchData();
  }, []);

  if (appCtx.loading) {
    return <span>App is loading...</span>;
  }
  return (
    <AppProvider value={{ ...appCtx, dispatchCtxEvent }}>
      <Layout>
        <Todos />
        <div className="panel-wrapper">
          <div className="panel">
            <AddCategory />
            <AddTodo />
          </div>
        </div>
      </Layout>
    </AppProvider>
  );
}

export default App;
