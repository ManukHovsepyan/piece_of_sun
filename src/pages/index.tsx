import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { useStore } from "effector-react";
import { $menuState } from "entities/menu/model/menu";
import { useGenerateRoutes } from "shared/hooks/useGenerateRouter";

export const Routing = React.memo(() => {

  const { menu } = useStore($menuState)
  const { defaultRoutes } = useGenerateRoutes(menu);
  const router = createBrowserRouter(defaultRoutes);

  return (
    <RouterProvider router={router} />
  );
});
