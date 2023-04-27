import "./App.css";
import Navbar from "./component/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import AllPosts from "./views/AllPosts.jsx";
import LoginDialog from "./views/LoginDialog.jsx";
import Signup from "./views/Signup.jsx";
import UserPost from "./views/UserPost.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route path="login" element={<LoginDialog />} />
        <Route path="signup" element={<Signup />} />
        <Route path="user-post" element={<UserPost />} />
      </Routes>
    </div>
  );
}

export default App;
