/* eslint-disable @next/next/no-img-element */
import { secToMin } from "@/utils/helper";
import { useVideoContext } from "@/utils/video-context";
import React, { memo } from "react";

function CurrentPlayListCard({ data }) {
  const { videoId, setVideoId } = useVideoContext();
  const selected = videoId?.id === data.id;
  return (
    <div
      className={`relative flex felx-row min-h-[120px] w-[90%] gap-2 rounded-lg max-w-[450px] bg-white cursor-pointer hover:bg-slate-200 p-2 ${
        selected ? "bg-slate-300" : ""
      }`}
      onClick={() => setVideoId(data)}
    >
      <img
        alt={data.title}
        src={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/${data.thumb}`}
        className="h-[100%] min-w-[200px] rounded-md"
      />
      <div className="absolute text-white text-xs bottom-2 left-[175px]">
        {`${secToMin(data.duration).min}:${secToMin(data.duration).sec}`}
      </div>
      <div>
        <div className="text-sm font-bold">{data.title}</div>
        <div className="text-[8px]">{data.description}</div>
      </div>
    </div>
  );
}

export default memo(CurrentPlayListCard);
