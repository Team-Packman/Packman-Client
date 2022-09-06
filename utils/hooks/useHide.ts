import { MutableRefObject, useRef, useState, useEffect, UIEvent } from 'react';
import useGlobalState from './useGlobalState';

type UseHideOutput<section, sufficient> = [
  state: {
    hidden: boolean;
    isScrolling: boolean;
    sectionArr: MutableRefObject<MutableRefObject<section | null>[]>;
    sufficientArr: MutableRefObject<MutableRefObject<sufficient>[]>;
  },

  handler: {
    checkSufficient: () => void;
  },
  scrollEvent: (e: UIEvent<HTMLDivElement>) => void,
];

function useHide(activeMode: number): UseHideOutput<HTMLDivElement, boolean> {
  const [hidden, setHidden] = useGlobalState('scroll', false);
  const [isScrolling, setIsScrolling] = useState(false);

  const aloneSection = useRef<HTMLDivElement | null>(null);
  const togetherSection = useRef<HTMLDivElement | null>(null);

  const aloneSufficient = useRef<boolean>(false);
  const togetherSufficient = useRef<boolean>(false);

  const sectionArr = useRef([togetherSection, aloneSection]);
  const sufficientArr = useRef([togetherSufficient, aloneSufficient]);

  useEffect(() => {
    checkSufficient();
  }, [activeMode, sectionArr.current[activeMode].current]);

  useEffect(() => {
    return () => {
      setHidden(false);
    };
  }, []);

  const checkSufficient = () => {
    const el = sectionArr.current[activeMode].current;
    const isSufficient = sufficientArr.current[activeMode];

    if (!el) return;

    if (hidden) {
      const gapForHidden = el.scrollHeight - (el.clientHeight - 117);
      isSufficient.current = gapForHidden > 180;

      if (!isSufficient.current) setHidden(false);
    } else {
      isSufficient.current = el.scrollHeight - el.clientHeight > 180;
    }
  };

  const scrollEvent = (e: UIEvent<HTMLDivElement>) => {
    if (!sufficientArr.current[activeMode].current) return;

    if (e.currentTarget.scrollTop < 10) {
      hidden && setHidden(false);
    } else if (!isScrolling) {
      setIsScrolling(true);
      !hidden && setHidden(true);
      setTimeout(() => setIsScrolling(false), 300);
    }
  };

  const state = {
    hidden,
    isScrolling,
    sectionArr,
    sufficientArr,
  };

  const handler = {
    checkSufficient,
  };

  return [state, handler, scrollEvent];
}

export default useHide;
