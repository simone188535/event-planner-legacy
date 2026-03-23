import { type FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Events from "../../pages/Events";


const Routes: FC = () => {
  const { token } = useAuth();

  // all users, logged in or not makes no difference
  const routesForPublic = [
    {},
    //   {
    //   path: "/about-us",
    //   element: <div>About Us</div>,
    // },
  ];

  // users who are logged in
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Events />,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
      ],
    },
  ];


  // users who are not logged in
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];

  const router = createBrowserRouter([
  ...routesForPublic,
  ...(!token ? routesForNotAuthenticatedOnly : []),
  ...routesForAuthenticatedOnly,
]);

  return <RouterProvider router={router} />;
};

export default Routes;
