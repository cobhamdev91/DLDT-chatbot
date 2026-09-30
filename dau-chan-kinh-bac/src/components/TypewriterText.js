'use client';

import { useState, useEffect, useRef } from 'react';

export default function TypewriterText({ 
  texts = [], 
  speed = 80, 
  deleteSpeed = 40, 
  pauseTime = 2000, 
  className = '',
  cursorChar = '|'
}) {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentFullText = texts[textIndex];

    const tick = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.substring(0, displayText.length + 1));
          timeoutRef.current = setTimeout(tick, speed);
        } else {
          // Pause before deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            tick();
          }, pauseTime);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.substring(0, displayText.length - 1));
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayText, isDeleting, textIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className={`typewriter ${className}`}>
      {displayText}
      <span className={`typewriter-cursor ${showCursor ? 'visible' : ''}`}>
        {cursorChar}
      </span>
    </span>
  );
}
