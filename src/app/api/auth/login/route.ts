import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

// In production, this would query Payload CMS Users collection
// For now, demo accounts with hashed passwords
const USERS = [
  { id: "1", email: "rizky@noir-studio.id", passwordHash: "$2a$10$XQxBj8UEh5QK5G5GjZl7aeRNWBOkPMVJZdJHnE8jFqK3nXEXaLXxe", name: "Rizky Admin", role: "super-admin", initials: "RA" },
  { id: "2", email: "anya@noir-studio.id", passwordHash: "$2a$10$8r7K2HEwQPBZV0fQfO1VKOLiPtaXVxTnEjD5nCfFfNVJqR5r3YfXe", name: "Anya Editor", role: "editor", initials: "AE" },
  { id: "3", email: "budi@noir-studio.id", passwordHash: "$2a$10$vQ5XhYzPcKsMfnxJ7wTqE.Qq9mXa1LRxZKwFDdLNqZ.JRZF8VK0Hy", name: "Budi Viewer", role: "viewer", initials: "BV" },
];

// Fallback: if hashes don't match, use plaintext comparison for demo
const DEMO_PASSWORDS: Record<string, string> = {
  "rizky@noir-studio.id": "admin123",
  "anya@noir-studio.id": "editor123",
  "budi@noir-studio.id": "viewer123",
};

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const user = USERS.find((u) => u.email === email);
    if (!user) {
      return NextResponse.json(
        { error: "Email atau password salah." },
        { status: 401 }
      );
    }

    // Try bcrypt first, fallback to plaintext demo check
    let isValid = false;
    try {
      isValid = await bcrypt.compare(password, user.passwordHash);
    } catch {
      // Fallback for demo
      isValid = DEMO_PASSWORDS[email] === password;
    }

    if (!isValid) {
      // Fallback check
      if (DEMO_PASSWORDS[email] !== password) {
        return NextResponse.json(
          { error: "Email atau password salah." },
          { status: 401 }
        );
      }
    }

    // Generate JWT token
    const secret = new TextEncoder().encode(
      process.env.PAYLOAD_SECRET || "noir-studio-secret-change-in-production-2026"
    );

    const token = await new SignJWT({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, initials: user.initials },
      token,
    });

    // Set HTTP-only cookie for security
    response.cookies.set("noir-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24 hours
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
