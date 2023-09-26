import { createStore } from 'effector';
import { SliderItems } from 'shared/ui/VerticalSlider';
import { getGridsFx } from './effects/sliderEffects';

interface ConfirmState {
	grids: SliderItems[]
}

export const defaultGrids: ConfirmState = {
	grids: [],
}

export const $gridState = createStore<ConfirmState>(defaultGrids);

$gridState
	.on(getGridsFx.doneData, (state, data) => ({
		...state,
		grids: data
	}))

