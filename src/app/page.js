/* eslint-disable @next/next/no-img-element */
"use client";

import PlayListCard from "@/components/PlayListCard";
import SearchBar from "@/components/SearchBar";
import { useVideoContext } from "@/utils/video-context";
import { useState } from "react";

export default function Home() {
  const [isplay, setIsplay] = useState(null);
  const { setVideoId, playList } = useVideoContext();
  const [serchMovies, setSearchMovies] = useState(playList);
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-bold">Movies Playlist</h2>
      <SearchBar setSearchMovies={setSearchMovies} />
      <menu className="flex flex-wrap justify-between gap-5 w-[90%]">
        {serchMovies.map((data, index) => (
          <PlayListCard
            key={data.id}
            data={data}
            index={index}
            isplay={isplay}
            setIsplay={setIsplay}
            setVideoId={setVideoId}
          />
        ))}
      </menu>
    </div>
  );
}
