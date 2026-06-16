import { useEffect, useState } from "react";

const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const duration = 2000;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = timestamp - startTime;

      const value = Math.min(
        Math.floor((progress / duration) * target),
        target,
      );

      setCount(value);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <h2>
      {count}
      {suffix}
    </h2>
  );
};

export default Counter;
