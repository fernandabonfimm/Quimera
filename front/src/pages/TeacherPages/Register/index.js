import React, { useState } from "react";
import BaseAuth from "../../../components/BaseAuth";
import { Link, useNavigate } from "react-router-dom";
import { Card, Input, message } from "antd";
import LogoHA from "../../../logoHA.png";
import { RiUserHeartLine } from "react-icons/ri";
import "./styles.css";
import Swal from "sweetalert2";
import { registerTeacher } from "../../../services/routes/api/AuthTeacher";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [responseUser, setResponseUser] = useState({});

  const saveUser = async () => {
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Por favor, insira seu nome completo!",
      });
      return;
    }

    if (!email.match(`^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$`)) {
      Swal.fire({
        icon: "error",
        title:
          "Por favor, verifique o campo de e-mail se ele está correto, insira o @ e endereço!",
      });
      return;
    }

    if (
      !password.match(
        `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$`
      )
    ) {
      Swal.fire({
        icon: "error",
        title:
          "Por favor, verifique o campo de senha, insira uma letra maiúscula, minúscula e caracter especial!",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "As senhas não coincidem, por favor verifique!",
      });
      return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("userType", "teacher");
    localStorage.setItem("isTeacher", true);
    localStorage.setItem("isStudent", false);
    setTimeout(() => {
      localStorage.removeItem("name");
      localStorage.removeItem("userType");
      localStorage.removeItem("isTeacher");
      localStorage.removeItem("isStudent");
    }, 24 * 60 * 60 * 1000);
    try {
      await registerTeacher(name, email, password).then((response) => {
        setResponseUser(response.data);
        localStorage.setItem("responseUser", JSON.stringify(response.data));
      });
      Swal.fire({
        icon: "success",
        title: "Login realizado com sucesso!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error logging in teacher:", error);
      Swal.fire({
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
          Preencha o formulário para criar uma conta na plataforma.
        </span>
        <span className="label-input">Nome Completo:</span>
        <Input
          type="name"
          placeholder="Digite seu nome completo..."
          id="name"
          className="input-login"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
        />
        <span className="label-input">E-mail:</span>
        <Input
          type="email"
          placeholder="example@example.com"
          id="email"
          className="input-login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={100}
        />
        <span className="label-input">Senha:</span>
        <Input.Password
          placeholder="Crie uma senha..."
          id="password"
          className="input-login"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={30}
        />
        <span className="label-input">Confirme a Senha:</span>
        <Input.Password
          placeholder="Confirme sua senha..."
          id="confirmPassword"
          className="input-login"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={30}
        />
        <button className="button-login" onClick={() => saveUser()}>
          Criar conta
        </button>
        <span className="forgot-password">
          <RiUserHeartLine style={{ marginRight: 5 }} />
          Já possui uma conta?
          <Link to="/loginTeacher" className="link-register">
            Fazer Login
          </Link>
        </span>
      </Card>
    </BaseAuth>
  );
};
export default Register;
