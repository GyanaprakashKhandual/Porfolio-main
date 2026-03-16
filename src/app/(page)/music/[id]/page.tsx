import type { Metadata } from "next";
import MusicDetailPage from "../pages/Music.detail.page";
import { store } from "@/app/lib/store";
import { selectAllTracks } from "@/app/lib/features/music/music.selector";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const track = selectAllTracks(store.getState()).find(t => t._id === params.id);
  return {
    title: track?.title ?? "Track",
  };
}

export default function Page() {
  return (
    <div>
      <MusicDetailPage />
    </div>
  );
}