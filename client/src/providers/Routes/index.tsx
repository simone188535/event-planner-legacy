import  { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Events from "../../pages/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Events />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const Routes: FC = () => {
   return <RouterProvider router={router} />
}

export default Routes;