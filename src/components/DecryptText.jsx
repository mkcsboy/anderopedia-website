import React, { useState, useRef } from 'react';

// 1. The Scramble Characters
// These are the random symbols that will flash before the real letter appears.
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+1234567890';

const DecryptText = ({ text = "", className }) => {
  // 2. State: Holds the text currently visible on the screen.
  // Initially, it just equals the normal 'text' passed in.
  const [displayText, setDisplayText] = useState(text);
  
  // 3. Ref: This is a permanent storage container for our Timer ID.
  // We use useRef instead of a normal variable so React doesn't lose the ID if the component re-renders.
  const intervalRef = useRef(null);

  // 4. The Animation Function
  const scramble = () => {
    let iteration = 0;

    // Safety: If an animation is already running, stop it first.
    // This prevents "glitching" if the user hovers in and out really fast.
    clearInterval(intervalRef.current);

    // Start the Interval (The Loop)
    intervalRef.current = setInterval(() => {
      
      // Generate the new scrambled string
      const scrambledText = text
        .split('')
        .map((letter, index) => {
          // If the letter is a space, keep it a space (don't scramble spaces)
          if (letter === ' ') return ' ';

          // If we have passed this index, show the REAL letter
          if (index < iteration) {
            return text[index];
          }

          // Otherwise, show a RANDOM character
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('');

      // Update the screen
      setDisplayText(scrambledText);

      // Stop the loop when we reach the end
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      // 5. Speed Control
      // Increasing by 1/3 means it takes 3 cycles to reveal 1 letter.
      // Adjust this number: 1 = Fast, 1/5 = Slow/Cinematic.
      iteration += 1 / 3; 
      
    }, 30); // 30ms per frame = ~30 frames per second
  };

  return (
    <span 
      className={className} 
      onMouseEnter={scramble} // 6. The Trigger: Runs when mouse enters
    >
      {displayText}
    </span>
  );
};

export default DecryptText;