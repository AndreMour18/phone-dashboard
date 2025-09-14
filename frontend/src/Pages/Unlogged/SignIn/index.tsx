import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Baldussi from "assets/images/baldussi.png";
import { login } from "api";
import { useAuth } from "contexts/Auth";

import {
  Button,
  Form,
  Inner,
  Input,
  Left,
  LogoImg,
  Page,
  Right,
} from "./styles";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      authLogin(data.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError("Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Inner>
        <Left>
          <LogoImg src={Baldussi} alt="Logo" />
        </Left>

        <Right>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </Form>
        </Right>
      </Inner>
    </Page>
  );
};

export default SignIn;
