"use client";

import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "./components/Button";
import { Container } from "./components/Container";
import { Input } from "./components/Input";
import { Label } from "./components/Label";

const Page: React.FC = () => {
  const router = useRouter();
  const [value] = useLocalStorage(
    "contas",
    [] as Record<"email" | "password", string>[],
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const contaDoLocalStorage = value.find(
      (conta) => conta.email === formData.get("email"),
    );

    if (
      contaDoLocalStorage &&
      contaDoLocalStorage.password === formData.get("password")
    ) {
      router.push("/dashboard");
    }
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
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default Page;
