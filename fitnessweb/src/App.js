import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import store from "./features/appStore";
import React from "react";

function App() {

  const appRouter = createBrowserRouter(
    [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        future: {
          v7_partialHydration: true,
        },
      }
    ]
  );

  return (
    <Provider store={store}> 
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
