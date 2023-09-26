import { createStore, createEvent } from 'effector';

export const onmenuChange = createEvent<number>();

export const $activeNavbar = createStore<number>(0);

$activeNavbar
  .on(onmenuChange, (_, id) => id)
