import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/main/ MainPage";
import { NotFound } from "./pages/not-found/NotFound";

export const AppRoutes = ({ users }) => {
  return (
    <Routes>
      <Route index element={<MainPage users={users} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
