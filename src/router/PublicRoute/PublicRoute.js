import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main/Main";
import AddBook from "../../pages/AddBook/AddBook";
import AllBuyer from "../../pages/AllBuyer/AllBuyer";
import AllSeller from "../../pages/AllSeller/AllSeller";
import AllUser from "../../pages/AllUser/AllUser";
import Category from "../../pages/Category/Category";
import Dashboard from "../../pages/Dashboard/Dashboard";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import MyBooks from "../../pages/MyBooks/MyBooks";
import MyBuyers from "../../pages/MyBuyers/MyBuyers";
import MyOrders from "../../pages/MyOrders/MyOrders";
import Payment from "../../pages/Payment/Payment";
import Register from "../../pages/Register/Register";
import Wishlist from "../../pages/Wishlist/Wishlist";

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
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/category/:categoryId",
        element: <Category />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/all-users",
        element: <AllUser />,
      },
      {
        path: "/dashboard/all-sellers",
        element: <AllSeller />,
      },
      {
        path: "/dashboard/all-buyers",
        element: <AllBuyer />,
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/dashboard/add-book",
        element: <AddBook />,
      },
      {
        path: "/dashboard/my-books",
        element: <MyBooks />,
      },
      {
        path: "/dashboard/my-buyers",
        element: <MyBuyers />,
      },
      {
        path: "/dashboard/payment/:cartId",
        element: <Payment />,
      },
    ],
  },
]);

export default router;
