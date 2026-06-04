import { NextResponse } from "next/server";

// Contact form submission endpoint
export async function POST(request: Request) {
  const body = await request.json();

  // Validate
  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 }
    );
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Sanitize input (basic XSS prevention)
  const sanitize = (str: string) => str.replace(/[<>]/g, "");

  const message = {
    id: Date.now().toString(),
    name: sanitize(body.name),
    email: body.email,
    service: body.service || "other",
    message: sanitize(body.message),
    status: "unread",
    createdAt: new Date().toISOString(),
  };

  // In production: await payload.create({ collection: 'messages', data: message })
  // In production: send notification email via Resend

  return NextResponse.json(
    { success: true, message: "Pesan berhasil dikirim!" },
    { status: 201 }
  );
}
