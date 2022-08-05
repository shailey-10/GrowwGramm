import { useState, useCallback } from "react";

import { useInView } from "react-intersection-observer";

import { useBlurhash } from "../utils/hooks/useBlurhash";

type BlurImgProps = {
  blurhash: string | null;
  height: number;
  width: number;
  src: string;
};

export function BlurImg(props: BlurImgProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [ref, inView] = useInView({ rootMargin: "110%" });
  const loading = "lazy";

  const blurUrl = useBlurhash(
    !imgLoaded && inView ? props.blurhash : null,
    100,
    500,
    1
  );

  const handleOnLoad = useCallback(() => {
    setImgLoaded(true);
  }, []);

  const newStyle = {
    backgroundImage: `url("${blurUrl}")`,
    backgroundSize:
      props.width && props.height
        ? `${props.width}% ${props.height}px`
        : "100% 100%",
  };

  return (
    <img
      alt="Blur hash"
      ref={ref}
      {...props}
      loading={loading}
      onLoad={handleOnLoad}
      style={newStyle}
    />
  );
}
