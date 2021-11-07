import mime from "mime-types";

export function formatBytes(a: number, b = 2) {
  if (0 === a) return "0 Bytes";
  const c = 0 > b ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024));
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    " " +
    ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
  );
}

export function getFileExtension(file: File): string {
  try {
    return mime.extension(file.type) || file.name.split(".").pop() || "unknown";
  } catch (er) {
    return "unknown";
  }
}
