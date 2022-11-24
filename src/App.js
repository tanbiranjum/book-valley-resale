import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import router from "./router/PublicRoute/PublicRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
