import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./components/DashboardLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomePage from "./pages/HomePage";
import WriteContent from "./pages/WriteContent";
import ProtectedLayout from "./components/ProtectedLayout";
import AddBusiness from "./pages/AddBusiness";
import Settings from "./pages/Settings";
import AllContent from "./pages/AllContent";
import Businesses from "./pages/Businesses";
import LinksPage from "./pages/LinksPage";

function App() {
  return (
    <>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route element={<ProtectedLayout />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/content/write" element={<WriteContent />} />
            <Route path="/business/add" element={<AddBusiness />} />
            <Route path="/all-content" element={<AllContent />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/business" element={<Businesses />} />
            <Route path="/links" element={<LinksPage/>} />
          </Route>
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
