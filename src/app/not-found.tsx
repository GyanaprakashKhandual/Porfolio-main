/* eslint-disable @next/next/no-img-element */
export default function NotFound() {
  return (
    <div
      className="flex items-center justify-center bg-white dark:bg-gray-950 min-w-screen"
      style={{
        minHeight: "calc(100vh - 56px)",
        maxHeight: "calc(100vh - 56px)",
      }}
    >
      <img
        src="/images/utils/not-found.image.png"
        alt="404 Not Found"
        className="h-full min-w-screen max-w-screen object-contain"
        style={{ maxHeight: "calc(100vh - 56px)" }}
      />
    </div>
  );
}
