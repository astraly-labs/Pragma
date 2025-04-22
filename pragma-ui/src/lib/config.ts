export const BASE_API = process.env.NEXT_PUBLIC_API_URL;
export const APP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://pragma.build";
