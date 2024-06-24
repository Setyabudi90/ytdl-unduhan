"use client";

import React, { useState } from "react";

export default function Hero({ handlePreview }) {
  const [url, setURL] = useState("");
  return (
    <>
      <section
        data-section-id={btoa("hero")}
        className={`text-center my-2 py-2 mt-10 md:mt-20`}
      >
        <h1 className="font-bold text-center sm:text-[40px] text-3xl w-[20rem] sm:w-full sm:mb-2 m-auto opacity-75">
          Unduh Video YouTube & Shorts Cepat dan Mudah
        </h1>
        <p className="text-lg w-[20rem] sm:w-full m-auto font-medium opacity-45">
          Dapatkan Video Secara Gratis dan Mudah tanpa Iklan...
        </p>
        <div className="mb-2 mt-4 gap-3 w-[80%] md:w-full block md:flex justify-center items-center mx-auto">
          <input
            type="search"
            className="sm:w-[495px] lg:w-[630px] outline-none py-[14px] px-5 text-[14px] rounded-xl block border-2 w-full bg-black border-[#ffc4c4]"
            placeholder="Tempel Tautan YouTube Disini"
            onChange={(e) => setURL(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePreview()}
            required
          />
          <button
            className="mt-4 md:mt-0 text-white w-[100%] h-[50px] sm:w-[152px] sm:h-[52px] font-[600] bg-[#fd0054] hover:bg-[#dc2260] focus:outline-none  rounded-lg  text-center text-[17px] shadow-2xl"
            onClick={() => handlePreview(url)}
          >
            Preview
          </button>
        </div>
      </section>
    </>
  );
}
