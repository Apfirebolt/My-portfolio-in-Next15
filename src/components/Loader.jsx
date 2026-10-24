"use client";

import React from "react";

const Loader = ({ message = "Loading, please wait...", fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 transition-all duration-300 ${
        fullScreen
          ? "fixed inset-0 z-50 min-h-screen bg-[var(--background)]/80 backdrop-blur-md"
          : "min-h-[40vh] w-full"
      }`}
    >
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow Aura */}
        <div 
          aria-hidden="true" 
          className="absolute h-16 w-16 rounded-full bg-[var(--accent)]/20 blur-xl animate-pulse" 
        />

        {/* Outer Background Track */}
        <div className="h-14 w-14 rounded-full border-[3px] border-[var(--primary)]/20" />

        {/* Active Animated Spinner */}
        <div className="absolute h-14 w-14 rounded-full border-[3px] border-transparent border-t-[var(--accent)] border-r-[var(--accent)]/60 animate-spin" />

        {/* Pulsing Core Indicator */}
        <div className="absolute h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-ping opacity-75" />
        <div className="absolute h-2 w-2 rounded-full bg-[var(--accent)]" />
      </div>

      {/* Loading Label */}
      <div className="mt-6 flex items-center gap-1.5">
        <p className="text-sm font-semibold tracking-wide text-[var(--foreground)]">
          {message}
        </p>
        <span className="flex gap-0.5">
          <span className="h-1 w-1 rounded-full bg-[var(--primary)] animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-1 w-1 rounded-full bg-[var(--primary)] animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-1 w-1 rounded-full bg-[var(--primary)] animate-bounce"></span>
        </span>
      </div>
    </div>
  );
};

export default Loader;