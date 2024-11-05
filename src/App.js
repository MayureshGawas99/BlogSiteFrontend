import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactUsPage from "./pages/ContactUsPage";
import PageNotFound from "./pages/PageNotFound";
import TopBar from "./components/TopBar";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import BlogPage from "./pages/BlogPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import { useEffect } from "react";
import SearchPage from "./pages/SearchPage";
import UserProfilePage from "./pages/UserProfilePage";

function App() {
  useEffect(() => {
    window.alert(
      "This website's backend is hosted on a free instance. Please allow 3 to 4 minutes for the data to load. Thank you for your patience!"
    );
  }, []);

  return (
    <div className="flex flex-col h-screen App">
      <TopBar />
      <div className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/blog/:action" element={<CreateBlogPage />} />
          <Route path="/contactus" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
          <Route path="/view/:blogid" element={<BlogPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
