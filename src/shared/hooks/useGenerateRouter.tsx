import { updatePaths } from "entities/menu/model/menu";
import { lazy } from "react"
import { Navigate, RouteObject } from "react-router"
import { getLangPrefix } from "shared/helpers/genericHelper"

export type RouteStoreItem = {
  path: string,
  data?: Record<string, number | string | boolean>
}

const langPrefix = '/:ln'

const defaultRoutes: RouteObject[] = [];

const menuPaths: Record<string, RouteStoreItem> = {};

export const useGenerateRoutes = (menu: Record<string, string>[]) => {

  const setRoutes = () => {
    defaultRoutes.push({
      path: "/",
      element: <Navigate to={getLangPrefix()} replace />,
    })

    menu.forEach((menuItem) => {
      const Component = menuItem.component;
      menuPaths[menuItem.key] = {
        path: getLangPrefix() + menuItem.canonicalUrl,
        data: menuItem
      };

      defaultRoutes.push({
        path: `${langPrefix}${menuItem.canonicalUrl}`,
        element: <Component />,
      })
    })

    defaultRoutes.push({
      path: '*',
      element: <Navigate to={getLangPrefix()} replace />,
    });

    updatePaths(menuPaths);
  }

  if (!defaultRoutes.length && menu.length) {
    setRoutes()
  }

  return { defaultRoutes }
}