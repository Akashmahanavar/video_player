/* eslint-disable @next/next/no-img-element */
"use client";
import CurrentPlayListCard from "@/components/CurrentPlayListCard";
import { playBackSpeed } from "@/utils/constants";
import { secToMin } from "@/utils/helper";
import { useVideoContext } from "@/utils/video-context";
import { useEffect, useRef, useState } from "react";
import { redirect } from "next/navigation";

export default function VideoPlayer() {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(["00", "00"]);
  const [currentTimeSec, setCurrentTimeSec] = useState();
  const [duration, setDuration] = useState(["00", "00"]);
  const [currentSpeed, setCurrentSpeed] = useState(playBackSpeed[0]);
  const [volume, setVolume] = useState(1);
  const [controls, setControls] = useState(true);
  const { videoId, plalist, setVideoId } = useVideoContext();

  useEffect(() => {
    if (videoId === null) {
      redirect("/");
    }
    const { min, sec } = secToMin(videoId?.duration);
    setDuration([min, sec]);

    const interval = setInterval(() => {
      const { min, sec } = secToMin(videoRef?.current?.currentTime);
      setCurrentTimeSec(videoRef?.current?.currentTime);
      setCurrentTime([min, sec]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
  return (
    <div className="flex items-center flex-col gap-10 xl:flex-row xl:items-start">
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
          className={`absolute w-[100%] left-0 bottom-0 z-50 p-2 ${
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
            onChange={(e) => {
              videoRef.current.currentTime = e.target.value;
            }}
          />
          <div className="flex justify-between w-[100%]">
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
            <div>
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
      <div className="flex flex-col gap-2 w-[90%] h-[600px] xl:h-[100vh] xl:min-w-[450px] xl:max-w-[450px] items-center overflow-y-scroll">
        <h2>Current PlayList</h2>
        {plalist.categories[0].videos.map((data, index) => (
          <CurrentPlayListCard key={data.id} data={data} index={index} />
        ))}
      </div>
    </div>
  );
}
