import { createEffect } from "effector";
import { fetchGrids } from "shared/api/loginApi";
import { AUTH_BASE_URL } from "shared/constants/genericApiRoutes";

export const getGridsFx = createEffect(async (id: number | null = null) => {
  try {
    const response = await fetchGrids(id);

    const data = response.reduce((acc: Record<string, any>, item: any) => {
      const currentItem = (acc[item.name] = acc[item.name] || {
        id: item.contentCode,
        ...item
      });

      if (item.type === "TEXT") {
        currentItem.text = item.value;
      }

      if (item.type === "PHOTO") {
        currentItem.image = `${AUTH_BASE_URL}${item.value}`;
      }

      return acc;
    }, {})

    return Object.values(data as any[]);
  } catch (error) {
    return []
  }
});