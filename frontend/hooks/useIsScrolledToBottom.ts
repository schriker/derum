import { useEffect, useRef, useState } from 'react';

const useIsScrolledToBottom = () => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [isBottom, setIsBottom] = useState(true);

  const scollToBottom = () => {
    wrapperRef.current.scrollTop = 0;
  };

  useEffect(() => {
    const element = wrapperRef.current;
    const scrollHandler = () => {
      if (element.scrollTop < 0) {
        setIsBottom(false);
      } else {
        setIsBottom(true);
        wrapperRef.current.scrollTop = 0;
      }
    };
    element.addEventListener('scroll', scrollHandler);
    return () => {
      element.removeEventListener('scroll', scrollHandler);
    };
  }, [wrapperRef]);

  return {
    wrapperRef,
    isBottom,
    scollToBottom,
  };
};

export default useIsScrolledToBottom;
