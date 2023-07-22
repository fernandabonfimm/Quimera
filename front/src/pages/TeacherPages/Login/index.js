import React, { useContext, useRef } from "react";
import BaseAuth from "../../../components/BaseAuth";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input } from "antd";
import LogoHA from "../../../logoHA.png";
import { AiOutlineUserAdd } from "react-icons/ai";
import "./styles.css";
import Alert from "sweetalert2";
import { loginTeacher } from "../../../services/routes/api/AuthTeacher";
import TeacherContext from "../../../context/Users/Teacher";

const Login = () => {
  const navigate = useNavigate();
  const refEmail = useRef();
  const refPassword = useRef();
  const teacherContext = useContext(TeacherContext);

  const handleLogin = async () => {
    const email = refEmail.current.input.value.trim();
    const password = refPassword.current.input.value.trim();

    if (email.length === 0) {
      Alert.fire({
        icon: "error",
        title: "Insira um e-mail para realizar o login!",
      });
      return;
    } else if (password.length === 0) {
      Alert.fire({
        icon: "error",
        title: "Insira sua senha para realizar o login!",
      });
      return;
    }

    try {
      const { token, name, _id} = (await loginTeacher(email, password)).data;

      teacherContext.setEmail(email);
      teacherContext.setName(name);
      teacherContext.setToken(token);
      teacherContext.set_id(_id)
      teacherContext.saveSession();

      Alert.fire({
        icon: "success",
        title: "Login realizado com sucesso!",
      });
      navigate("/dashboard");
    } catch (error) {
      Alert.fire({
        icon: "error",
        title: "Erro ao realizar o login!",
      });
    }
  };

  return (
    <BaseAuth>
      <Card className="card-login">
        <div className="center">
          <img src={LogoHA} name="logo" className="logo-login" />
        </div>
        <h3 className="title-login">Seja bem-vindo à plataforma!</h3>
        <span className="subtitle-login">
          Preencha o formulário para realizar seu login na plataforma.
        </span>
        <form>
          <span className="label-input">E-mail:</span>
          <Input
            ref={refEmail}
            type="email"
            placeholder="example@example.com"
            id="email"
            className="input-login"
          />
          <span className="label-input">Senha:</span>
          <Input.Password
            ref={refPassword}
            placeholder="Digite sua senha..."
            id="password"
            className="input-login"
          />
        </form>
        {/* <span
          className="forgot-password"
          onClick={() => navigate("/forgotpassword")}
        >
          <AiOutlineKey style={{ marginRight: 5 }} />
          Esqueceu sua senha?
        </span> */}
        <button className="button-login" onClick={() => handleLogin()}>
          Fazer Login
        </button>
        <span className="forgot-password">
          <AiOutlineUserAdd style={{ marginRight: 5 }} />
          Ainda não possui uma conta?
          <Link to="/register" className="link-register">
            Criar conta
          </Link>
        </span>
      </Card>
    </BaseAuth>
  );
};
export default Login;
