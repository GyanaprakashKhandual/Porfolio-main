import MusicList from "@/app/components/Music.list";


export const metadata = {
  title: "Explore my songs",
  description: "Explore the music library, play tracks, and view details.",
};

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[calc(100vh-56px)] bg-white overflow-hidden main-scrollbar dark:bg-gray-950">
        <MusicList />
      {children}
    </div>
  );
}