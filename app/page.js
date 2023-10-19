"use client";

import { useState } from "react";

export default function Home() {
  const [hex, setHex] = useState("#8f4f2f");
  const [result, setResult] = useState([]);
  const handleChange = (e) => {
    setHex(
      e.target.value.includes("#") ? e.target.value : `#${e.target.value}`
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const r = await fetch(
      `/api?` +
        new URLSearchParams({
          color: hex,
        })
    );
    const rst = await r.json();
    console.log(rst);
    if (rst) setResult(rst.data[0]);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-600">
        <div className="z-10 max-w-5xl w-full font-mono text-sm">
          <p
            className="my-2 flex w-full justify-center border-b border-gray-300  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            style={{ backgroundColor: hex }}
            dir="rtl"
          >
            <span>{"رنگ وارد شده:"}</span>
            <code className="font-mono font-bold">{hex}</code>
            <br />
          </p>
          <div className="my-2 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <code className="font-mono font-bold">
              {"نام رنگ به فارسی:"} {result?.persian_name}
            </code>
          </div>
          <div
            className={`my-2 flex w-full justify-center border-b border-gray-300  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 lg:static lg:w-auto  lg:rounded-xl lg:border `}
            style={{ backgroundColor: result.hex }}
          >
            <code className="font-mono font-bold">
              {"نمونه رنگ:"} {result?.hex}
            </code>
          </div>
          <div className="my-2 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            <input
              type="text"
              name="hex-code"
              className="p-4 rounded-md mx-2"
              onChange={handleChange}
              value={hex}
            />
            <input
              type="submit"
              value={"submit"}
              title="پیدا کن"
              onClick={handleSubmit}
              className="cursor-pointer border-2 border-red-400 bg-red-200 p-2 rounded-md"
            />
          </div>
          <p className="text-center text-lg text-white">
            ❤ {"تقدیم به آوا مهربانم"} ❤
          </p>
        </div>
      </main>
      <footer></footer>
    </>
  );
}
