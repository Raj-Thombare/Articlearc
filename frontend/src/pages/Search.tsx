import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Post, User } from "../lib/types";
import { BACKEND } from "../config";
import axios from "axios";
import SearchResult from "../components/search/SearchResult";
import Spinner from "../components/loader/Spinner";
import SearchPageTabs from "../components/tabs/SearchPageTabs";

const Search = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState("articles");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      const fetchResults = async () => {
        const res = await axios.get(`${BACKEND}/api/v1/search?query=${query}`);
        setUsers(res.data.users);
        setPosts(res.data.posts);
        setIsLoading(false);
      };

      fetchResults();
    }
  }, [location.search]);

  return (
    <div className='flex flex-col md:flex-row md:justify-evenly py-6 md:py-12'>
      <main className='flex-1 max-w-[728px]'>
        <div className='px-4'>
          <h1 className='text-3xl px-4 font-semibold text-gray-500'>
            Results for <span className='text-black'>{query}</span>
          </h1>
        </div>
        <div className='px-4 mt-4'>
          <SearchPageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        {!isLoading ? (
          <SearchResult
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            posts={posts}
            users={users}
          />
        ) : (
          <div className='h-[70vh] flex items-center justify-center'>
            <Spinner />
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
