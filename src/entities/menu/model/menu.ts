import { createStore, createEffect, createEvent } from 'effector';
import { ApiError } from 'exceptions';
import { menuHardcodes } from 'shared/constants/menuHardcode';

interface MenuState {
	menu: any;
	error: any;
}

export const $menuState = createStore<MenuState>({
	menu: menuHardcodes,
	error: '',
});

export const $menuPaths = createStore<Record<string, any>>({});

export const updatePaths = createEvent<Record<string, any>>()

export const menuFx = createEffect(async () => {
	try {
		const { menu } = $menuState.getState();
		return menu;
	} catch (error) {
		throw ApiError.UnauthorizedError()
	}
});

$menuPaths.on(updatePaths, (_, newpaths) => newpaths);
$menuState
	.on(menuFx.done, (state, { result }) => ({
		...state,
		error: null,
		menu: result
	}))
	.on(menuFx.fail, (state, { error }) => ({
		...state,
		error: error.message,
		menu: null,
	}));
