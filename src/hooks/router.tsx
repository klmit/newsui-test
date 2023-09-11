import { AboutPage } from "pages/AboutPage";
import { NewsPage } from "pages/NewsPage";
import { Route, Routes, Navigate } from "react-router-dom";

export const UseRouter: React.FC = () => (
  <Routes>
    <Route path="/news" element={<NewsPage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="*" element={<Navigate to="/news" />} />
  </Routes>
);
