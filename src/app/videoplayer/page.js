/* eslint-disable @next/next/no-img-element */
"use client";
import CurrentPlayListCard from "@/components/CurrentPlayListCard";
import { useVideoContext } from "@/utils/video-context";
import VideoCard from "@/components/VideoCard";

export default function VideoPlayer() {
  const { playList } = useVideoContext();

  return (
    <div className="flex items-center flex-col gap-10 xl:flex-row xl:items-start">
      <VideoCard />
      <div className="flex flex-col gap-2 w-[90%] h-[600px] xl:h-[100vh] xl:min-w-[450px] xl:max-w-[450px] items-center overflow-y-scroll">
        <h2>Current PlayList</h2>
        {playList.map((data, index) => (
          <CurrentPlayListCard key={data.id} data={data} index={index} />
        ))}
      </div>
    </div>
  );
}
