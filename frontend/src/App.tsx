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
        <Route path='/profile' element={<Profile />} />
        <Route path='/blog/:id' element={<Blog />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
