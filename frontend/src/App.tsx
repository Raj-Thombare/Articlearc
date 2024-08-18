import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Recommended from "./pages/Recommended";
import Bookmark from "./pages/Bookmark";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/new-article' element={<Publish />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/tag/:tag' element={<Recommended />} />
        <Route path='/profile/:id' element={<Profile />} />
        <Route path='/profile/:id/saved' element={<Bookmark />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
