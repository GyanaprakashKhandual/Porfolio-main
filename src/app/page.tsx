import AnnouncementWindow from "./components/Announcement";
import HomePage from "./pages/home/Main";

export const metadata = {
  title: "Home - Gyan's",
  description:
    "Discover my projects, skills, and experience in software development.",
};

export default function Home() {
  return (
    <div>
      <HomePage />
      <AnnouncementWindow />
    </div>
  );
}
