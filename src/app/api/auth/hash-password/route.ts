export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return new Response(JSON.stringify({ error: "Password is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const hashedPassword = Bun.password.hashSync(password, {
      algorithm: "argon2id",
    });

    return new Response(JSON.stringify({ hashedPassword }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
}
