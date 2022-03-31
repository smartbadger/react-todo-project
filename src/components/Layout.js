import { useAppCtx } from "../context";

const Layout = (props) => {
  const { user } = useAppCtx();
  return (
    <>
      <header>
        <div className="user-icn">
          <span>User: {user.name}</span>
        </div>
        <h1>To Do App</h1>
      </header>
      <main className="page-wrapper">{props.children}</main>
    </>
  );
};
export default Layout;
