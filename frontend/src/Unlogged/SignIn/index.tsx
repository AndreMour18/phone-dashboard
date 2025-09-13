import React, { useState } from "react";
import Baldussi from "assets/images/baldussi.png";
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
import { login, fetchASR } from "api"; // Ajuste o caminho se necessário

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      // Faz login e obtém o token
      const data = await login(email, password);
      const token = data.access_token; // ou conforme sua API retorna

      // Busca métricas ASR
      const asrData = await fetchASR(token);
      console.log("ASR:", asrData);

      // Aqui você pode redirecionar para outra página ou atualizar estado global
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Falha no login");
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
              placeholder="Usuário"
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
