import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";

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

export default function App() {
  return <RouterProvider router={router} />;
}