import React, { useState, useEffect } from "react";

export default function TypingText({ text, speed=100 }) {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        let isCancelled = false;
      
        function typeChar(i) {
          if (isCancelled) return;
          if (i < text.length) {
            setDisplayed((prev) => prev + text[i]);
            setTimeout(() => typeChar(i + 1), speed);
          }
        }
      
        typeChar(0);
      
        return () => {
          isCancelled = true;
        };
      }, [text, speed]);
      
    return <p className="text-slate-300 text-lg font-mono typing-text">{displayed}</p>;
}