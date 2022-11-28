import { createBrowserRouter } from "react-router-dom";
import Main from "../../layouts/Main/Main";
import AddBook from "../../pages/AddBook/AddBook";
import AllBuyer from "../../pages/AllBuyer/AllBuyer";
import AllSeller from "../../pages/AllSeller/AllSeller";
import AllUser from "../../pages/AllUser/AllUser";
import Blog from "../../pages/Blog/Blog";
import Category from "../../pages/Category/Category";
import Dashboard from "../../pages/Dashboard/Dashboard";
import DashboardHome from "../../pages/Dashboard/DashboardHome/DashboardHome";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Login/Login";
import MyBooks from "../../pages/MyBooks/MyBooks";
import MyBuyers from "../../pages/MyBuyers/MyBuyers";
import MyOrders from "../../pages/MyOrders/MyOrders";
import Payment from "../../pages/Payment/Payment";
import Register from "../../pages/Register/Register";
import Wishlist from "../../pages/Wishlist/Wishlist";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SellerRoute from "../SellerRoute.js/SellerRoute";

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
        element: (
          <PrivateRoute>
            <Category />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog",
        element: <Blog />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-users",
        element: (
          <AdminRoute>
            <AllUser />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <AdminRoute>
            <AllSeller />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <AdminRoute>
            <AllBuyer />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-book",
        element: (
          <SellerRoute>
            <AddBook />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-books",
        element: (
          <SellerRoute>
            <MyBooks />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-buyers",
        element: (
          <SellerRoute>
            <MyBuyers />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:cartId",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

export default router;
