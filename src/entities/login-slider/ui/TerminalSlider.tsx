import VerticalSlider from "shared/ui/VerticalSlider";
import { useEffect } from "react";
import { getGridsFx } from "../model/effects/sliderEffects";
import { useStore } from "effector-react";
import { $gridState } from "../model/sliderModel";
import LoaderPage from "shared/ui/LoaderPage";

const TerminalSlider: React.FC<any> = () => {
  const { grids } = useStore($gridState);

  useEffect(() => {
    getGridsFx();
  }, [])

  return (
    <>
      {grids.length ? (
        <VerticalSlider
          sliderItems={grids}
          autoDuration={5000}
        />
      ) : (
        <LoaderPage />
      )}
    </>
  )
}

export default TerminalSlider;