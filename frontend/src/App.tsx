import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Toaster } from "sonner";
import Layout from "./components/global/Layout";
const Signup = React.lazy(() => import("./pages/Signup"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Publish = React.lazy(() => import("./pages/Publish"));
const Post = React.lazy(() => import("./pages/Post"));
const Home = React.lazy(() => import("./pages/Home"));
const Profile = React.lazy(() => import("./pages/Profile"));
const Recommended = React.lazy(() => import("./pages/Explore"));
const Bookmark = React.lazy(() => import("./pages/Bookmark"));
const Search = React.lazy(() => import("./pages/Search"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <React.Suspense fallback={<>...</>}>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/signin' element={<Signin />} />
            <Route
              path='/new-article'
              element={
                isAuthenticated ? <Publish /> : <Navigate to='/signin' />
              }
            />
            <Route path='/search' element={<Search />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/tag/:tag' element={<Recommended />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route
              path='/profile/:id/saved'
              element={
                isAuthenticated ? <Bookmark /> : <Navigate to='/signin' />
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Toaster />
        </Layout>
      </React.Suspense>
    </>
  );
}

export default App;
