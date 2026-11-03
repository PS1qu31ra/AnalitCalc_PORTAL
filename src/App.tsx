import { Routes, Route, Navigate } from "react-router-dom";
import HomePortal from "./components/portal/HomePortal";
import LoginForm from "./components/auth/LoginForm";
import CadastroForm from "./components/cadastro/CadastroForm";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePortal />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/cadastro" element={<CadastroForm />} />
      <Route path="/painel" element={<DashboardPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
