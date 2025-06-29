import LoginForm from "../components/Auth/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return <LoginForm onLogin={() => navigate("/dashboard")} />;
};

export default LoginPage;