import { plalist } from "@/data/playlistData";
import React, { memo } from "react";

function SearchBar({ setSearchMovies }) {
  function handleInputChange(searchString) {
    let searchList = plalist.categories[0].videos.filter((data) =>
      data.title.toLowerCase().includes(searchString.toLowerCase())
    );
    setSearchMovies(searchList);
  }
  return (
    <div className="relative m-5 w-[60vw] rounded-2xl border-2 h-10">
      <input
        type="text"
        className="w-[100%] pl-1 rounded-2xl h-[100%]"
        placeholder="Search here by title..."
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
}

export default memo(SearchBar);
