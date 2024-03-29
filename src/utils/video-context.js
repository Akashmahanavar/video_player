"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { plalist } from "@/data/playlistData";

const VideoContext = createContext();

export const useVideoContext = () => {
  return useContext(VideoContext);
};

export const VideoProvider = ({ children }) => {
  const [videoId, setVideoId] = useState(null);

  return (
    <VideoContext.Provider value={{ videoId, setVideoId, plalist }}>
      {children}
    </VideoContext.Provider>
  );
};
