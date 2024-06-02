import { useState } from "react";

export const Cookies = () => {
  const [cookies, setCookies] = useState(
    localStorage.getItem("tarifni-sistem-cookies"),
  );

  const acceptCookies = () => {
    const date = new Date().toISOString();
    setCookies(date);
    localStorage.setItem("tarifni-sistem-cookies", date);
  };

  return !cookies ? (
    <div className="z-10 border border-zinc-200 fixed sm:max-w-[340px] items-center flex gap-4 bottom-0 sm:bottom-4 sm:right-4 p-4 bg-zinc-50 shadow-md rounded-lg">
      <p className="flex-1 text-sm">
        Uporabljam piškotke za zbiranje anonimizirane analitike.
      </p>
      <button
        onClick={acceptCookies}
        className="border border-zinc-200 hover:bg-zinc-200 transition-colors text-sm px-2 py-1 rounded-md"
      >
        Sprejmem
      </button>
    </div>
  ) : null;
};
