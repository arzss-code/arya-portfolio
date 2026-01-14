import SkillCard from "../SkillCard";

import MarqueeElement from "@/common/components/elements/MarqueeElement";
import { STACKS } from "@/common/constants/stacks";

const MarqueeIcons = () => {
  const stacksInArray: Array<[string, { icon: JSX.Element; color: string }]> =
    Object.entries(STACKS)
      .filter(([, value]) => value.isActive)
      .sort(() => Math.random() - 0.5)
      .map(([name, value]) => [name, { icon: value.icon, color: value.color }]);

  return (
    <div className="flex flex-col gap-4 overflow-x-hidden py-4">
      {Array.from({ length: 2 }, (_, index) => {
        const slider = [...stacksInArray].sort(() => Math.random() - 0.5);
        return (
          <MarqueeElement
            key={index}
            direction={index % 2 === 0 ? "left" : "right"}
          >
            <div className="flex gap-4 px-2">
              {slider.map(([name, { icon, color }], idx) => (
                <SkillCard key={idx} name={name} icon={icon} color={color} />
              ))}
            </div>
          </MarqueeElement>
        );
      })}
    </div>
  );
};

export default MarqueeIcons;
