import "./App.css";
import Navbar from "./Component/Navbar.jsx";
import { Route, Routes} from "react-router-dom";
import AllPosts from "./Views/AllPosts.jsx";
import LoginDialog from "./Views/LoginDialog.jsx";
import Signup from "./Views/Signup.jsx";
import UserPost from "./Views/UserPost.jsx";

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
