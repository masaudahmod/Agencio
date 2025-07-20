import { Route, Routes } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./pages/HomePage";
import WriteContent from "./pages/WriteContent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/content/write" element={<WriteContent />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;