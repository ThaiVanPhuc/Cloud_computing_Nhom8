const isProduction = window.location.hostname !== "localhost";
const urlBackend = isProduction 
  ? "https://54.166.22.101/"  // URL thật trên server
  : "http://localhost:5000/"; // URL local khi dev

export const getImageUrl = (imgPath) => {
  if (!imgPath) return "";
  if (!imgPath.startsWith("/")) imgPath = "/" + imgPath; // đảm bảo có dấu /
  return `${urlBackend}${imgPath}`;
};
