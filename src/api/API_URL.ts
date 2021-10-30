const apiUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:8888" : window.location.origin;

export default apiUrl;
