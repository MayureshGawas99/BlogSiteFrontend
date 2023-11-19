// 1. Create a new file for your context, for example, MyContext.js

import React, { createContext, useState } from "react";

// Create a context with a default value
const BlogContext = createContext();

// Create a provider component to wrap your app
const BlogContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [fetchagain, setFetchagain] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("Home");

  return (
    <BlogContext.Provider
      value={{
        isLogin,
        setIsLogin,
        blogs,
        setBlogs,
        user,
        setUser,
        active,
        setActive,
        myBlogs,
        setMyBlogs,
        fetchagain,
        setFetchagain,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogContextProvider };
