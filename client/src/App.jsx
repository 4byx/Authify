import SignUp from "./components/SignUp";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/signIn",
        element: <SignIn />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

const App = () => {
  return (
    <Provider store={store}>
      <>
        <RouterProvider router={appRouter} />
      </>
    </Provider>
  );
};

export default App;
