import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main/Main";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
