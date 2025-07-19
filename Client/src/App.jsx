import { Route, Routes } from "react-router-dom";
import "./index.css";
import DashboardLayout from "./components/DashboardLayout";
function App() {
  return (
    <>
      <h2 className="text-5xl font-bold text-center mt-10">Hello World</h2>

      <div className="flex justify-center mt-5">
        <input
          type="date"
          className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
        />
      </div>

      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<h1>Home</h1>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
