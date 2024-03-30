import React, { useEffect, useRef, useState, memo } from "react";
import { redirect } from "next/navigation";

import { playBackSpeed } from "@/utils/constants";
import { secToMin } from "@/utils/helper";
import { useVideoContext } from "@/utils/video-context";
function VideoCard() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(["00", "00"]);
  const [currentTimeSec, setCurrentTimeSec] = useState();
  const [duration, setDuration] = useState(["00", "00"]);
  const [currentSpeed, setCurrentSpeed] = useState(playBackSpeed[0]);
  const [volume, setVolume] = useState(1);
  const { videoId, setVideoId, playList } = useVideoContext();
  const [controls, setControls] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  useEffect(() => {
    if (videoId === null) {
      redirect("/");
    }
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }

    const { min, sec } = secToMin(videoId?.duration);
    setDuration([min, sec]);

    const interval = setInterval(() => {
      const { min, sec } = secToMin(videoRef?.current?.currentTime);
      setCurrentTimeSec(videoRef?.current?.currentTime);
      setCurrentTime([min, sec]);
    }, 1);
    return () => clearInterval(interval);
  }, [videoId]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };

  const playOnFullScreen = () => {
    let elem = videoRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };
  const handlePlayBackSpeed = () => {
    let playBacklength = playBackSpeed.length - 1;
    let index = playBackSpeed.indexOf(currentSpeed);
    if (playBacklength === index) {
      setCurrentSpeed(playBackSpeed[0]);
      videoRef.current.playbackRate = playBackSpeed[0].speed;
    } else {
      setCurrentSpeed(playBackSpeed[++index]);
      videoRef.current.playbackRate = playBackSpeed[index].speed;
    }
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tagName = document.activeElement.tagName.toLowerCase();

      if (tagName === "input") return;

      switch (e.key.toLowerCase()) {
        case " ":
          if (tagName === "button") return;
        case "k":
          togglePlay();
          break;
        case "f":
          playOnFullScreen();
          x;
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  useEffect(() => {
    if (currentTimeSec === videoId.duration) {
      if (autoPlay) {
        let index = playList.indexOf(videoId);
        if (index < playList.length - 1) setVideoId(playList[++index]);
        else setVideoId(playList[0]);
      } else {
        videoRef.current.play();
      }
    }
  }, [currentTimeSec, autoPlay]);
  return (
    <div className="relative w-[90%] max-w-[1000px] text-white z-0">
      <video
        preload="metadata"
        ref={videoRef}
        className="w-[100%]"
        src={videoId?.source}
        onMouseOver={() => setControls(true)}
        onMouseOut={() => setControls(false)}
      />
      <div
        className={`absolute w-[100%] bg-[#00000055] left-0 bottom-0 z-50 p-2 ${
          !controls ? "opacity-0" : ""
        }`}
        onMouseOver={() => setControls(true)}
        onMouseOut={() => setControls(false)}
      >
        <div className="flex justify-between w-[100%]">
          <p>{`${currentTime[0]}:${currentTime[1]}`}</p>
          <p>{`${duration[0]}:${duration[1]}`}</p>
        </div>
        <input
          className="w-[100%] rounded-lg h-1 cursor-pointer"
          type="range"
          min={0}
          max={videoId?.duration}
          default={0}
          value={currentTimeSec}
          step="any"
          onChange={(e) => (videoRef.current.currentTime = e.target.value)}
        />
        <div className="flex justify-between items-center w-[100%]">
          <div className="flex items-center">
            <button
              onClick={() => togglePlay()}
              title={!isPlaying ? "play" : "pause"}
            >
              {!isPlaying ? "▶️" : "⏸️"}
            </button>
            {volume < 0.1 ? "🔈" : volume < 0.95 ? "🔉" : "🔊"}
            <input
              className="h-[2px] w-[100px]"
              type="range"
              min="0"
              max="1"
              defaultValue={1}
              step="any"
              onChange={(e) => {
                setVolume(e.target.value);
                videoRef.current.volume = e.target.value;
              }}
              title="Volume"
            />
          </div>
          <div className="flex items-center gap-1">
            <label className="inline-flex items-center cursor-pointer">
              <span className="me-[6px] text-sm font-medium text-gray-900 dark:text-gray-300">
                AutoPlay
              </span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={autoPlay}
                onChange={() => setAutoPlay((prev) => !prev)}
              />
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
            </label>
            <button onClick={() => playOnFullScreen()} title="fullscreen">
              {"[ ]"}
            </button>
            <button
              className="w-[70px]"
              onClick={() => handlePlayBackSpeed()}
              title="playback speed"
            >
              {currentSpeed.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VideoCard);
