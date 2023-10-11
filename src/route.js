import { useRoutes } from "react-router-dom";
import Chat from "./app/Chat/Chat";
import Layout from "./app/layout/Layout";
import Main from "./app/Main/Main";

export default function Router() {
  return useRoutes([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Main /> },
        { path: "/room/:id", element: <Chat /> },
      ],
    },
  ]);
}
