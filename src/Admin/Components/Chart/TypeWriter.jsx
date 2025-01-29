/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const Typewriter = ({words}) => {
//   const words = ["Hello, World!", "Welcome to my website!", "This is a typewriter effect."];
  const [index, setIndex] = useState(0); // Track which word we're on
  const [currentText, setCurrentText] = useState(""); // Display text
  const [isDeleting, setIsDeleting] = useState(false); // Track typing or deleting

  useEffect(() => {
    const type = () => {
      const word = words[index];

      if (isDeleting) {
        setCurrentText((prev) => word.substring(0, prev.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % words.length); // Move to the next word
        }
      } else {
        setCurrentText((prev) => word.substring(0, prev.length + 1));
        if (currentText === word) {
          setIsDeleting(true);
        }
      }
    };

    const timer = setTimeout(type, isDeleting ? 50 : 100);

    return () => clearTimeout(timer); // Clean up timeout on unmount
  }, [currentText, isDeleting, index]);

  return (
    <div className="w-40 h-40 flex justify-center items-center">
      <h1 id="typewriter" className="text-xs font-bold">
        {currentText}
      </h1>
    </div>
  );
};

export default Typewriter;
