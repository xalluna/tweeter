import { Route, Routes } from "react-router-dom";
import { routes } from "./index";
import { HomePage } from "../pages/home/HomePage";
import { ErrorPage } from "../pages/error/ErrorPage";
import { NotFoundPage } from "../pages/notFound/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={routes.home}
        element={<HomePage />}
        errorElement={<ErrorPage />}
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
