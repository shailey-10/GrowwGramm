import { useSpring } from "react-spring";

export const TopTobottom = () => {
  const animatedProps = useSpring({
    from: { marginTop: -200, opacity: 0 },
    opacity: 1,
    marginTop: 0,
    config: { mass: 1, tension: 150, friction: 10 },
  });

  return animatedProps;
};
