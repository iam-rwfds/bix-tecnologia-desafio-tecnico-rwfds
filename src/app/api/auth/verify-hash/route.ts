export async function POST(request: Request) {
  try {
    const { content, hashedContent } = await request.json();

    if (!content || !hashedContent) {
      return new Response(JSON.stringify({ error: "Content is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const isValid = Bun.password.verifySync(content, hashedContent);

    return new Response(JSON.stringify({ isValid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
  }
}
