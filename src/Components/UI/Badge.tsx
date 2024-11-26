import { useState } from "react";
import { pastelColors } from "../../../lib/helper/helper";

interface BadgeProps {
  title: string;
  className?: string;
}


const Badge = ({ title, className }: BadgeProps) => {
  const [colorClasses] = useState(() => {
    const randomIndex = Math.floor(Math.random() * pastelColors.length);
    return pastelColors[randomIndex];
  });

  return (
    <span className={`inline-block px-3 py-1 rounded-full font-medium ${colorClasses} ${className}`}>
      {title}
    </span>
  );
}

export default Badge;