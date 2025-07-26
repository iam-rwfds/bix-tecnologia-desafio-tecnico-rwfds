"use client";

import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { Input } from "./components/Input";
import { Label } from "./components/Label";
import Link from "next/link";
import { useAuth } from "~/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { signup } = useAuth();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const sucesso = await signup(
      formData.get("email")?.toString() ?? "",
      formData.get("password")?.toString() ?? "",
    );

    sucesso && router.push("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        minHeight: "100vh",
      }}
    >
      <Container>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="voce@exemplo.com"
              required
            />
          </div>
          <div
            style={{
              marginBottom: "1.5rem",
            }}
          >
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
            />
          </div>

          <div>
            <Button type="submit">Cadastrar</Button>
            <Link
              href={"/acesso/login"}
              style={{
                marginTop: "1rem",
                display: "block",
              }}
            >
              Já tem uma conta? Faça o login
            </Link>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Page;
