import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import store from "./features/appStore";

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
    ]
  );

  return (
    <Provider store={store}> {/* Wrap the RouterProvider inside the Provider */}
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
