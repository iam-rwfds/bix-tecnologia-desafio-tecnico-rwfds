import jwt, { TokenExpiredError } from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: "Token is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    jwt.verify(token, "1");

    return new Response(JSON.stringify({ isValid: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return new Response(JSON.stringify({ isValid: false }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
}
