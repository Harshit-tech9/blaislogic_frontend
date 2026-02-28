import React from "react";

const VISUAL_BREAK_IMAGE_URL =
  typeof import.meta.env?.VITE_VISUAL_BREAK_IMAGE === "string"
    ? import.meta.env.VITE_VISUAL_BREAK_IMAGE
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuD3gGARjAQXZfaera6d1FC6C3ctFXCGdQseQqiuRSB1Z2ShG5YT5-VKfxUq6-QWHHx2uUh6JcrvzjmLV02EtKQgVyfsWeb-s391lj2D1dEWcK3MPI1RMAQC_8Kkv97y2_AiSkvb8b1N9fki6lz3FdU3VQbEEH4J-YuMatgLRusQKiVipowCfwXTqx-a1KkvjI4g5cw8FLbNHN5mNYW7s-1Tj-qjeXIp88sRohHX9GHi4fGp9A9OsClozQPLDh-h4JHv-yKapFEDRMTK";

export const VisualBreak: React.FC = () => {
  return (
    <section
      className="w-full h-[60vh] relative overflow-hidden bg-black"
      aria-labelledby="visual-break-heading"
    >
      <img
        src={VISUAL_BREAK_IMAGE_URL}
        alt="Abstract minimalist architectural pattern representing structure and light"
        className="w-full h-full object-cover opacity-60 grayscale"
        fetchPriority="low"
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <h2
          id="visual-break-heading"
          className="text-white text-4xl md:text-6xl font-black tracking-tighter text-center max-w-4xl leading-tight"
        >
          From chaos to calculation.
        </h2>
      </div>
    </section>
  );
};
