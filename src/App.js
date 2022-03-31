import "./App.css";
import * as api from "./api";
import { AppProvider } from "./context";
import { useEffect, useState } from "react";
import Layout from "./components/Layout";

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

  const dispatchCtxEvent = async (actionType, payload) => {};

  useEffect(() => loadInitialProps());

  if (appCtx.loading) {
    return <span>App is loading...</span>;
  }
  return (
    <AppProvider value={{ ...appCtx, dispatchCtxEvent }}>
      <Layout></Layout>
    </AppProvider>
  );
}

export default App;
