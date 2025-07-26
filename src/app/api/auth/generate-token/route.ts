import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { sub } = await request.json();

    if (!sub) {
      return new Response(JSON.stringify({ error: "Password is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const gerarAccessToken = (sub: string) => {
      return jwt.sign({ sub }, "1", {
        expiresIn: 3600,
      });
    };

    const accessToken = gerarAccessToken(sub);

    return new Response(JSON.stringify({ accessToken }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
}
