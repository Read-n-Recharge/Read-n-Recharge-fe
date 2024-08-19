import { DashboardPage } from "./pages/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutPage } from "./pages/about";
import { ServicePage } from "./pages/servicePage";
import { AuthPage } from "./pages/AuthPage";
import UserProfile from "./pages/Profile";
import TasksList from "./pages/TodoPage";
import "../src/styles/App.css";
import ClockPage from "./pages/ClockPage";
import ErrorPage from "./pages/ErrorPage";
import MoodTrack from "./pages/MoodTrack";
import RecordMood from "./components/RecordMood";
import Activity from "./pages/activity";
import GpsPage from "./pages/GPSPage";
import ChargingPage from "./pages/ChargingPage";

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
        <Route path="/clock" element={<ClockPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/mood" element={<MoodTrack />} />
        <Route path="/record-mood/:date" element={<RecordMood />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/gps" element={<GpsPage />} />
        <Route path="/charging" element={<ChargingPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
