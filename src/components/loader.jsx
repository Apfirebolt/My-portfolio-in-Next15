import React from "react";

const Loader = ({ message = "Loading, please wait...", fullScreen = false }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 transition-all duration-300 ${
        fullScreen
          ? "fixed inset-0 z-50 min-h-screen bg-neutral-950/80 backdrop-blur-sm"
          : "min-h-[40vh] w-full"
      }`}
    >
      {/* Spinner Container */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow Aura */}
        <div 
          aria-hidden="true" 
          className="absolute h-16 w-16 rounded-full bg-accent/20 blur-xl animate-pulse" 
        />

        {/* Outer Background Track */}
        <div className="h-14 w-14 rounded-full border-[3px] border-neutral-200/40 dark:border-neutral-800" />

        {/* Active Animated Spinner */}
        <div className="absolute h-14 w-14 rounded-full border-[3px] border-transparent border-t-accent border-r-accent/60 animate-spin" />

        {/* Pulsing Core Indicator */}
        <div className="absolute h-2.5 w-2.5 rounded-full bg-accent animate-ping opacity-75" />
        <div className="absolute h-2 w-2 rounded-full bg-accent" />
      </div>

      {/* Loading Label */}
      <div className="mt-5 flex items-center gap-1.5">
        <p className="text-sm font-medium tracking-wide text-neutral-600 dark:text-neutral-300">
          {message}
        </p>
        <span className="flex gap-0.5">
          <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-1 w-1 rounded-full bg-neutral-400 dark:bg-neutral-500 animate-bounce"></span>
        </span>
      </div>
    </div>
  );
};

export default Loader;