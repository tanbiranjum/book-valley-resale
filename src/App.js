import { RouterProvider } from "react-router-dom";
import router from "./router/PublicRoute/PublicRoute";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
