import { useAppCtx } from "../context";

const Layout = (props) => {
  const { user } = useAppCtx();
  return (
    <div>
      <p>{user.name}</p>
      {props.children}
    </div>
  );
};
export default Layout;
