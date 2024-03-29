/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { memo } from "react";
import { secToMin } from "@/utils/helper";

function PlayListCard({ data, isplay, setIsplay, setVideoId, index }) {
  return (
    <div
      className="relative h-40 bg-[#ffffdd] w-[320px] rounded-md cursor-pointer"
      onMouseOver={() => setIsplay(index)}
      onMouseOut={() => setIsplay(null)}
    >
      <Link href="/videoplayer">
        <img
          src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${data.thumb}`}
          className="rounded-xl h-[100%] w-[100%]"
          alt={data.title}
        />
        <div
          className={`left-0 top-0 absolute w-[100%] h-[100%] bg-[#ffffff55] text-5xl flex justify-center items-center z-20  ${
            isplay !== null && isplay === index ? "" : "opacity-0"
          }`}
          onClick={() => setVideoId(data)}
        >
          ▶
        </div>
        <div className="flex justify-between w-[100%] absolute px-2 bottom-0 text-white z-10 text-sm">
          <div className="text-ellipsis text-nowrap w-[75%] overflow-hidden">
            {data.title}
          </div>
          <div>{`${secToMin(data.duration).min}:${
            secToMin(data.duration).sec
          }`}</div>
        </div>
      </Link>
    </div>
  );
}

export default memo(PlayListCard);
