import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </div>
  );
}

export default App;
