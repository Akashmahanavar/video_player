import { useVideoContext } from "@/utils/video-context";
import React, { memo } from "react";

function SearchBar({ setSearchMovies }) {
  const { playList } = useVideoContext();
  function handleInputChange(searchString) {
    let searchList = playList.filter((data) =>
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
