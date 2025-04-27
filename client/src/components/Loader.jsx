import React from 'react';

const Loader = () => (
  <div role="status">
    <svg aria-hidden="true" className="inline w-12 h-12 mr-2 text-gray-800 animate-spin fill-[#00e6ff]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background circuit ring */}
      <path
        d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10ZM50 80C33.4315 80 20 66.5685 20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
      {/* Rotating core with neon effect */}
      <path
        d="M50 25C41.7157 25 35 31.7157 35 40C35 48.2843 41.7157 55 50 55C58.2843 55 65 48.2843 65 40C65 31.7157 58.2843 25 50 25ZM50 50C44.4772 50 40 45.5228 40 40C40 34.4772 44.4772 30 50 30C55.5228 30 60 34.4772 60 40C60 45.5228 55.5228 50 50 50Z"
        fill="currentFill"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="1.2s"
          repeatCount="indefinite"
        />
      </path>
      {/* Pulsing nodes with magenta accents */}
      <circle cx="50" cy="20" r="5" fill="#ff00ff">
        <animate
          attributeName="r"
          values="5;7;5"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="80" cy="50" r="5" fill="#ff00ff">
        <animate
          attributeName="r"
          values="5;7;5"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle cx="50" cy="80" r="5" fill="#ff00ff">
        <animate
          attributeName="r"
          values="5;7;5"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
      <circle cx="20" cy="50" r="5" fill="#ff00ff">
        <animate
          attributeName="r"
          values="5;7;5"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
      {/* Connecting circuit lines */}
      <path
        d="M50 20L50 30M80 50L60 50M50 80L50 60M20 50L40 50"
        stroke="#00e6ff"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-opacity"
          values="1;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
);

export default Loader;