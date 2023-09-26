import { useEffect, useRef, useState } from 'react';
import style from './style.module.scss'

export type SliderItems = {
  id: number;
  text: string;
  image: any;
  contentCode?: string,
  dateModified?: number,
  datePublished?: number,
  name?: string,
  section?: number,
  type?: string,
  value?: string,
  widget?: number,
}

interface Props {
  sliderItems: SliderItems[],
  autoDuration?: number
  autoChange?: boolean
}

const VerticalSlider: React.FC<Props> = ({
  sliderItems,
  autoDuration = 1000,
  autoChange = true
}) => {
  const [containerHeight, setContainerHeight] = useState(600);
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalOptions = useRef<{
    interval?: ReturnType<typeof setInterval>;
    duration: number;
    flow: string;
    currentStep: number
  }>({ duration: autoDuration, flow: 'decrease', currentStep: 0 });

  const maxLength = sliderItems.length - 1;

  useEffect(() => {
    const observer = new ResizeObserver(onMutation);

    if (autoChange) {
      startAutoChange();
    }

    containerRef.current && observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      // eslint-disable-next-line
      clearInterval(intervalOptions.current.interval);
    }
    // eslint-disable-next-line
  }, [])

  function startAutoChange() {
    intervalOptions.current.interval = setInterval(() => {
      if (intervalOptions.current.flow === 'decrease' && intervalOptions.current.currentStep === 0) {
        intervalOptions.current.flow = 'increase';
      }

      if (intervalOptions.current.flow === 'increase' && intervalOptions.current.currentStep === maxLength) {
        intervalOptions.current.flow = 'decrease';
      }

      intervalOptions.current.currentStep = intervalOptions.current.flow === 'increase'
        ? (intervalOptions.current.currentStep + 1)
        : (intervalOptions.current.currentStep - 1);

      setCurrentSlider(intervalOptions.current.currentStep)
    }, intervalOptions.current.duration as number)
  }

  function onMutation(entries: any[]) {
    const container = entries[0] || {};
    const height = container.contentRect.height;

    if (height !== containerHeight) setContainerHeight(container.contentRect.height)
  }

  return (
    <div
      ref={containerRef}
      className={style.sliderContainer}
    >
      <div className={style.slideBand} style={{ transform: `translateY(${-containerHeight * currentSlider}px)` }}>
        {sliderItems.map((item) => (
          <div
            key={item.id}
            className={style.sliderItem}
            style={{ height: `${containerHeight}px` }}
          >
            <img src={item.image} alt="img" />
          </div>
        ))}
      </div>
      <div
        className={style.textContainer}
        dangerouslySetInnerHTML={{ __html: sliderItems[currentSlider]?.text }}
      >
      </div>
    </div>
  )
}

export default VerticalSlider;