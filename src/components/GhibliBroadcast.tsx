import React from "react";
import { GhibliBroadcastProps } from "../types";

const GhibliBroadcast: React.FC<GhibliBroadcastProps> = ({
  data,
  width = 565,
  height = 955,
}) => {
  return (
    <div
      className="relative overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-green-100"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {/* 背景云朵装饰 */}
      <div className="absolute top-10 left-20 w-32 h-20 bg-white opacity-60 rounded-full blur-sm animate-float"></div>
      <div
        className="absolute top-32 right-32 w-24 h-16 bg-white opacity-40 rounded-full blur-sm animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-60 left-10 w-40 h-24 bg-white opacity-50 rounded-full blur-sm animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* 太阳光晕效果 */}
      <div className="absolute top-16 right-20 w-32 h-32 bg-yellow-200 opacity-40 rounded-full blur-2xl"></div>
      <div className="absolute top-20 right-24 w-20 h-20 bg-yellow-300 opacity-30 rounded-full blur-xl"></div>

      {/* 主要内容容器 */}
      <div className="relative z-10 h-full flex flex-col px-8 py-8">
        {/* 标题 */}
        <div className="text-center mt-8 flex-shrink-0">
          <h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 bg-clip-text text-transparent drop-shadow-2xl font-['Kalam',cursive]"
            style={{
              textShadow:
                "3px 3px 6px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5)",
            }}
          >
            {data.title}
          </h1>
        </div>
        {/* 文本内容卡片 */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-4xl bg-white/85 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-emerald-200 p-8 relative">
            {/* 装饰性边框 */}
            <div className="absolute -top-3 -left-3 w-10 h-10 bg-yellow-300 rounded-full opacity-80 shadow-lg"></div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-pink-300 rounded-full opacity-80 shadow-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-blue-300 rounded-full opacity-80 shadow-lg"></div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-green-300 rounded-full opacity-80 shadow-lg"></div>

            <div className="text-lg md:text-xl  text-slate-700 text-left font-sans-serif">
              {data.segments.map((segment, index) =>
                segment.isHighlighted ? (
                  <strong
                    key={index}
                    className="leading-relaxed bg-gradient-to-r from-yellow-200 to-yellow-300 px-1 py-1 rounded-lg text-emerald-800 font-bold shadow-md border border-yellow-400"
                  >
                    {segment.text}
                  </strong>
                ) : (
                  <span key={index} className="leading-relaxed">{segment.text}</span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GhibliBroadcast;
