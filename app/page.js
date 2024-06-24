"use client";
import React, { useState } from "react";
import {
  Download,
  FileAudio,
  ThreadsLogo,
  TiktokLogo,
} from "@phosphor-icons/react";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { Poppins } from "next/font/google";
import Link from "next/link";
import axios from "axios";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });
export default function Home() {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("highest");
  const [id, setID] = useState("");
  const [preview, setIsPreview] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileSize, setFileSize] = useState(null);
  const [speedDownload, setDownloadSpeed] = useState(null);
  const [currentFileSize, setCurrentFileSize] = useState(0);
  const [isClick, setIsClick] = useState(false);
  const [duration, setDuration] = useState(null);

  const handlePreview = async () => {
    if (!url || url.trim() === "") return;
    setID(videoID(url));
    setIsPreview(true);
    try {
      const metadata = await axios.post("https://backendyt.glitch.me/metadata", {
        url,
      });
      setTitle(metadata.data.title);
      setQualities(metadata.data.formats);
      console.log(metadata.data.formats);
      setSelectedQuality(metadata.data.formats[0].itag);
      setDuration(metadata.data.duration);
      const minutes = Math.floor(metadata.data.duration / 60);
      const seconds = metadata.data.duration % 60;
      setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
    } catch (error) {
      console.log(error);
      alert("Maaf, ada masalah pada server");
      setURL("");
    }
  };

  const handleDownload = () => {
    setIsLoading(true);
    setIsClick(true);
    setProgress(0);
    const encodeURL = encodeURIComponent(url);
    const encodeQuality = encodeURIComponent(selectedQuality);
    axios({
      url: `https://backendyt.glitch.me/download?url=${encodeURL}&quality=${encodeQuality}`,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const total = progressEvent.total;
        const current = progressEvent.loaded;
        const percentCompleted = Math.round((current / total) * 100);
        setProgress(percentCompleted);
        setFileSize((total / (1024 * 1024)).toFixed(2));
        setCurrentFileSize(current);
        const speedBytesPerSeconds = progressEvent.rate;
        const speedMBPerSeconds = (
          speedBytesPerSeconds /
          (1024 * 1024)
        ).toFixed(2);
        setDownloadSpeed(speedMBPerSeconds);
      },
    })
      .then((response) => {
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "video/mp4" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title || "video"}.mp4`);
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
        setProgress(0);
        setDownloadSpeed(0);
        setCurrentFileSize(0);
        setIsClick(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleDownloadMp3 = () => {
    setLoading(true);
    setIsClick(true);
    setProgress(0);
    const encodeURL = encodeURIComponent(url);
    axios({
      url: `https://backendyt.glitch.me/download/mp3?url=${encodeURL}`,
      method: "GET",
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const total = progressEvent.total;
        const current = progressEvent.loaded;
        const percentCompleted = Math.round((current / total) * 100);
        setProgress(percentCompleted);
        setCurrentFileSize(current);
        setFileSize((total / (1024 * 1024)).toFixed(2));
        const speedBytesPerSeconds = progressEvent.rate;
        const speedMBPerSeconds = (
          speedBytesPerSeconds /
          (1024 * 1024)
        ).toFixed(2);
        setDownloadSpeed(speedMBPerSeconds);
      },
    })
      .then((response) => {
        setIsClick(true);
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "audio/mp3" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${title || "audio"}.mp3`);
        document.body.appendChild(link);
        link.click();
        setLoading(false);
        setProgress(0);
        setDownloadSpeed(0);
        setCurrentFileSize(0);
        setIsClick(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  const videoID = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:[^/]+\/)?(?:shorts|e(?!\/))\/|.*[?&]v=)|youtu.be\/)([^"&?/ ]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <>
      <header className={poppins.className}>
        <nav className="border-gray-200 px-2 sm:px-4 py-5 mb-2 shadow-md shadow-white bg-[#fd0054]">
          <div className="container flex justify-between w-full max-w-none px-2">
            <span className="items-center gap-1 flex text-xl sm:text-2xl text-white font-semibold">
              <Download size={`${25}`} alt="Download Icon" weight="fill" />
              <p className="self-center">SaveTube</p>
            </span>
            <ul className="flex justify-between gap-3">
              <li className="ml-3">
                <Link
                  href="https://www.instagram.com/i.setya_b?igsh=MXZoNHFpYW4xZ2EzMg=="
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogo
                    size={`${25}`}
                    alt="Instagram Icon"
                    weight="fill"
                  />
                </Link>
              </li>
              <li className="ml-3">
                <Link
                  href="https://www.tiktok.com/@budisetya09?_t=8nSXHcFR8v2&_r=1"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <TiktokLogo size={`${25}`} alt="Tiktok Icon" weight="fill" />
                </Link>
              </li>
              <li className="ml-3">
                <Link
                  href="https://www.threads.net/@i.setya_b"
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ThreadsLogo
                    size={`${25}`}
                    alt="Threads Icon"
                    weight="fill"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <section
        data-section-id={btoa("hero")}
        className={`text-center my-2 py-2 mt-10 md:mt-20`}
      >
        <h1 className="font-bold text-center sm:text-[40px] text-3xl w-[20rem] sm:w-full sm:mb-2 m-auto opacity-75">
          Unduh Video YouTube & Shorts Cepat dan Mudah
        </h1>
        <p className="text-lg w-[20rem] sm:w-full m-auto font-medium opacity-45">
          Dapatkan Video Secara Gratis dan Berkualitas tanpa Iklan...
        </p>
        <div className="mb-2 mt-4 gap-3 w-[80%] md:w-full block md:flex justify-center items-center mx-auto">
          <input
            type="search"
            className="sm:w-[495px] lg:w-[630px] outline-none py-[14px] px-5 text-[14px] rounded-xl block border-2 w-full bg-black border-[#ffc4c4] text-xl"
            placeholder="Tempel Tautan YouTube Disini"
            onChange={(e) => setURL(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePreview()}
            required
          />
          <button
            className="mt-4 md:mt-0 text-white w-[100%] h-[50px] sm:w-[152px] sm:h-[52px] font-[600] bg-[#fd0054] hover:bg-[#dc2260] focus:outline-none  rounded-lg  text-center text-[17px] shadow-2xl"
            onClick={() => handlePreview()}
          >
            Preview
          </button>
        </div>
      </section>
      {preview && url ? (
        <div className="w-[96%] md:w-[50%] block md:flex justify-center items-center mx-auto">
          <div className="w-full bg-[rgba(0,0,0, .1)] backdrop-blur-md border-gray-200 rounded-lg shadow-md shadow-[rgba(255,255,255, .10)]">
            <div className="p-5">
              <iframe
                width="100%"
                height="315"
                className="aspect-video rounded-md"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                src={`https://www.youtube.com/embed/${id}`}
              ></iframe>
            </div>
            <p className="text-white py-4 px-3 text-2xl font-semibold text-left flex flex-col">
              {title}
              <strong className="mt-2 ml-1 text-base">{duration} MENIT</strong>
            </p>
            <div className="mb-3 mx-auto w-[95%] bg-slate-300 px-2 py-1 rounded-sm"></div>
            <div className="grid gap-2 px-3 grid-cols-2">
              <button
                className="flex items-center justify-center gap-2 font-bold bg-indigo-400 px-[20px] py-[10px] md:px-7 md:py-3 rounded-lg disabled:bg-transparent disabled:text-slate-400"
                disabled={isClick || isLoading || loading}
                onClick={handleDownload}
              >
                <Download size={25} alt="Download Icon" weight="fill" />
                .Mp4
              </button>
              <button
                className="flex items-center justify-center gap-2 font-bold bg-indigo-400 px-4 py-1 rounded-lg disabled:bg-transparent disabled:text-slate-400"
                disabled={isClick || isLoading || loading}
                onClick={handleDownloadMp3}
              >
                <FileAudio size={25} alt="Download Icon" weight="fill" />
                .Mp3
              </button>
            </div>

            {qualities.length > 0 ? (
              <select
                name="options"
                aria-label="Select an option"
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="block w-[96%] mx-auto border border-gray-300 rounded focus:outline-none focus:border-blue-500 py-4 px-5 mt-3 text-base md:text-xl cursor-pointer bg-slate-950 text-slate-200"
              >
                {qualities.map((quality, index) => (
                  <option key={index} value={quality.itag} data-format="mp4">
                    {quality.quality}
                  </option>
                ))}
              </select>
            ) : null}
            {isLoading || loading ? (
              <div className="w-[95%] max-w-xl mt-2 bottom-0 z-30 text-sm md:text-base mx-auto">
                <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                {fileSize && (
                  <div className="text-center mt-2 text-sm flex justify-between items-center">
                    <p>
                      Ukuran: {fileSize} MB | Diunduh:
                      {(currentFileSize / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    || <p>Kecepatan Unduh: {speedDownload} MB/s</p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
