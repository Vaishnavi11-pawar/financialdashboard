import RegisterForm from "../components/Auth/RegisterForm";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  return <RegisterForm onRegister={() => navigate("/login")} />;
};

export default RegisterPage;