import { useRoutes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Managment } from "../pages/Managment";
import { Configurations } from "../pages/Configurations";
import { Analytics } from "../pages/Analytics";

export function AppRoutes() {
  const routes = useRoutes([
      {path: '/', element:<Home/> },
      { path: "/managment", element: <Managment /> },
      { path: "/configurations", element: <Configurations /> },
      { path: "/analytics", element: <Analytics /> },
  ]);
  return routes
}