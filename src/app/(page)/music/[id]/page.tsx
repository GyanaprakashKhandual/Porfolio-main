import MusicDetailPage from "../pages/Music.detail.page";


export const dynamic = "force-dynamic";
export const dynamicParams = true;

// Remove or empty out generateStaticParams entirely
export async function generateStaticParams() {
  return [];
}

export default function Page() {
  return (
    <div>
      <MusicDetailPage />
    </div>
  );
}