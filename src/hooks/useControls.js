import { useEffect, useState } from "react";

export const useControls = () => {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    reset: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setControls((prev) => ({ ...prev, forward: true }));
          break;
        case "s":
        case "arrowdown":
          setControls((prev) => ({ ...prev, backward: true }));
          break;
        case "a":
        case "arrowleft":
          setControls((prev) => ({ ...prev, left: true }));
          break;
        case "d":
        case "arrowright":
          setControls((prev) => ({ ...prev, right: true }));
          break;
        case "r":
          setControls((prev) => ({ ...prev, reset: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
        case "arrowup":
          setControls((prev) => ({ ...prev, forward: false }));
          break;
        case "s":
        case "arrowdown":
          setControls((prev) => ({ ...prev, backward: false }));
          break;
        case "a":
        case "arrowleft":
          setControls((prev) => ({ ...prev, left: false }));
          break;
        case "d":
        case "arrowright":
          setControls((prev) => ({ ...prev, right: false }));
          break;
        case "r":
          setControls((prev) => ({ ...prev, reset: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return controls;
};
