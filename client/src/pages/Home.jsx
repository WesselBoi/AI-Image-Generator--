import React, { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";
import { Search, ImagePlus } from "lucide-react";
import { Link } from "react-router-dom";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[200px] rounded-lg border border-dashed border-gray-400 p-8">
      <p className="text-gray-500 text-lg mb-2">No results found</p>
      <h2 className="font-bold text-xl uppercase text-center">{title}</h2>
    </div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  async function fetchPosts() {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchPosts();
  }, []);

  function handleSearchChange(e) {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        if (e.target.value === "") {
          setSearchedResults(null);
          return;
        }
        
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.prompt.toLowerCase().includes(e.target.value.toLowerCase())
        );

        setSearchedResults(searchResult);
      }, 500)
    );
  }

  return (
    <section className="max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full bg-gradient-to-r from-indigo-700 to-purple-700 p-8 rounded-xl shadow-lg mb-12 flex flex-col items-center">
        <h1 className="font-extrabold text-4xl text-white mb-3 text-center">
          Community Gallery
        </h1>
        <p className="text-lg text-indigo-100 max-w-[600px] text-center">
          Explore a variety of creative and visually captivating images crafted by our community members.
        </p>
      </div>

      <div className="relative w-full max-w-xl mb-4">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Find by name or prompt..."
          value={searchText}
          handleChange={handleSearchChange}
        />
        <Search
          className="absolute right-3 top-[42px] text-gray-500"
          size={20}
        />
      </div>

      <div className="mt-10 w-full flex flex-col items-center">
        {loading ? (
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <Loader />
            <p className="mt-4 text-indigo-600 animate-pulse">Loading creative works...</p>
          </div>
        ) : (
          <>
            {searchText && (
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg mb-6 w-full max-w-2xl mx-auto text-center">
                <h2 className="font-medium text-xl">
                  Results for{" "}
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    "{searchText}"
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {searchedResults?.length || 0} items found
                </p>
              </div>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6 w-full max-h-[80vh] overflow-y-auto px-4">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No posts matched your search"
                />
              ) : (
                <RenderCards data={allPosts} title="No posts to display yet" />
              )}
            </div>

            {!loading && allPosts?.length > 0 && (
              <div className="mt-12 text-center w-full">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  That's everything for now! Want to add your own creation?
                </p>
                <Link
                  to="/create-post"
                  className="inline-flex items-center px-5 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors gap-2 font-medium"
                >
                  <ImagePlus size={18} />
                  Share Your Image
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Home;