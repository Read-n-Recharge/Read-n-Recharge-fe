import { DashboardPage } from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutPage } from "./pages/about";
import { ServicePage } from "./pages/servicePage";
import { AuthPage } from "./pages/AuthPage";
import UserProfile from "./pages/Profile";
import TasksList from "./pages/TodoPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage isLogin={true} />} />
        <Route path="/register" element={<AuthPage isLogin={false} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/todo-list" element={<TasksList />} />
      </Routes>
    </Router>
  );
}

export default App;
