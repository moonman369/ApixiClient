import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import { logo, openai, bg } from "./assets";
import { Home, CreatePost } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full h-[140px] flex justify-between items-center bg-[url(./assets/synthwave-8119826_1280.webp)] sm:px-8 px-4 py-4">
        <Link to="/" className="flex flex-row blur-none">
          <img src={openai} alt="logo" className="w-16 object-contain" />
          <h1 className="font-extrabold text-[#deffed] mt-2 ml-2 text-[36px] drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,2)] ">
            Apixi
          </h1>
        </Link>

        <Link
          to="/create-post"
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className="sm:p-8 p-4 py-8 w-full bg-[#252525] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
