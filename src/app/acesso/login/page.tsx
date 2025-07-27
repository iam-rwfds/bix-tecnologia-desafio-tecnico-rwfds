"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "~/contexts/AuthContext";
import * as styles from "../components/styles";

const Page: React.FC = () => {
  const router = useRouter();

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const success = await login(
      formData.get("email")?.toString() ?? "",
      formData.get("password")?.toString() ?? "",
    );

    success && router.push("/dashboard");
  };

  return (
    <styles.Container>
      <styles.FormContainer>
        <form onSubmit={handleSubmit}>
          <styles.LabelContainer>
            <styles.Label htmlFor="email">Email</styles.Label>
            <styles.Input
              type="email"
              id="email"
              name="email"
              placeholder="voce@exemplo.com"
              required
            />
          </styles.LabelContainer>
          <styles.LabelContainer>
            <styles.Label htmlFor="password">Senha</styles.Label>
            <styles.Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
            />
          </styles.LabelContainer>
          <div>
            <styles.Button type="submit">Login</styles.Button>
            <styles.Link href={"/acesso/cadastro"}>
              Não tem uma conta? Cadastre-se aqui
            </styles.Link>
          </div>
        </form>
      </styles.FormContainer>
    </styles.Container>
  );
};

export default Page;
