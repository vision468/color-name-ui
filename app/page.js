"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [hex, setHex] = useState("#CD5C5C");
  const [result, setResult] = useState({
    persian_name: "جگری",
    hex: "#CD5C5C",
    name: "indianred",
    rgb: {
      r: 205,
      g: 92,
      b: 92,
    },
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleSubmit();
  }, []);
  useEffect(() => {
    console.log(loading ? "Loading..." : "Done");
  }, [loading]);
  const handleChange = (e) => {
    setHex(
      e.target.value.includes("#") ? e.target.value : `#${e.target.value}`
    );
  };
  const handleSubmit = async () => {
    // e.preventDefault();
    setLoading(true);
    const r = await fetch(
      `/api?` +
        new URLSearchParams({
          color: hex,
        })
    );
    setLoading(false);
    const rst = await r.json();
    if (rst.data) setResult(rst.data[0]);
    else
      setResult({
        persian_name: "ورودی نامناسب",
        hex: "#CD5C5C",
        name: "UNKWON",
        rgb: {
          r: 205,
          g: 92,
          b: 92,
        },
      });
  };
  const findInvert = (c) => {
    const { r, g, b } = c;

    const newColor =
      "#" +
      componentToHex(255 - r) +
      componentToHex(255 - g) +
      componentToHex(255 - b);
    // `rgb(${255 - r}, ${255 - g}, ${255 - b})`;

    return newColor;
  };
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };
  return (
    <>
      <header dir="rtl" className="text-center p-2 bg-white text-purple-900">
        <h1>{"پیدا کردن نام رنگ از روی کد HEX"}</h1>
        <h3>
          {
            "کد HEX را در کارد پایین وارد کنید و دکمه 'پیدا کن' را انتخاب کنید تا جتسجو انجام شود. در صورتی که رنگی با نام فارسی نزدیک به این رنگ وجود داشته باشد نمایش داده میشود."
          }
        </h3>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-10 md:p-24 bg-purple-400">
        <div className="z-10 md:max-w-5xl w-full  text-sm">
          <div
            dir="rtl"
            className=" shadow-md my-8 flex flex-col gap-4 w-full justify-center items-center border-b border-red-600 bg-white text-purple-950   pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-md lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
          >
            <p className="text-lg">
              <span className="ml-2">{"نام رنگ به فارسی:"}</span>
              <i className=" font-bold text-3xl" style={{ color: result.hex }}>
                {result?.persian_name}
              </i>
            </p>
            <p className="text-md">
              <span className="ml-2">{"نام رنگ به انگلیسی:"}</span>
              <i className=" font-bold" style={{ color: result.hex }}>
                {result?.name}
              </i>
            </p>
            <div
              dir="rtl"
              className={` transition-colors w-full text-center pb-6 pt-8 rounded-b-md `}
              style={{ backgroundColor: result.hex }}
            >
              <span className="pl-2">{"کد رنگ:"}</span>
              <code dir="ltr" className="font-bold">
                {result?.hex}
              </code>
              <br />
              <span className="pl-2">{"کد رنگ متضاد:"}</span>
              <code
                dir="ltr"
                className="font-bold"
                style={{
                  color: findInvert(result?.rgb),
                }}
              >
                {findInvert(result?.rgb)}
              </code>
            </div>
          </div>
          <div
            className="my-2  w-full  border shadow-md border-gray-300 bg-gradient-to-b  pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-md lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
            style={{ backgroundColor: hex }}
          >
            <div className="flex justify-center">
              <input
                type="text"
                name="hex-code"
                className="p-4 rounded-md mx-2 font-mono shadow-md"
                onChange={handleChange}
                value={hex}
              />
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                dir="rtl"
                className="shadow-md cursor-pointer transition-all border-2 font-bold text-red-600 border-red-600 bg-red-200 p-2 rounded-md disabled:bg-gray-400 disabled:border-gray-800 disabled:text-white"
              >
                {loading ? "درحال جستجو..." : "پیدا کن"}
              </button>
            </div>
            {/* <p
              className="shadow-md my-2 transition-colors flex w-full justify-center border-gray-300  from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto rounded-md lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
              style={{ backgroundColor: hex }}
              dir="rtl"
            >
              <span>{"رنگ وارد شده:"}</span>
              <code className=" font-bold">{hex}</code>
              <br />
            </p> */}
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
