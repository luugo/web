import { useState, useEffect } from "react";

interface TypingPlaceholderProps {
  placeholders: string[];
}

const TypingPlaceholder = ({ placeholders }: TypingPlaceholderProps) => {
  const [placeholder, setPlaceholder] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentText = placeholders[currentIndex];

    const updatePlaceholder = () => {
      if (isDeleting) {
        setPlaceholder((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 500);
      }
    };

    const timeout = setTimeout(updatePlaceholder, isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex, placeholders]);

  return `Busque por ${placeholder}`;
};

export default TypingPlaceholder;
