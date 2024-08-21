import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Home from "./pages/chat/home";
import "./app.css";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
