import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </div>
  );
}

export default App;
