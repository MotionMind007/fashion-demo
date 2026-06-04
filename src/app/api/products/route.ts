import { NextResponse } from "next/server";

// This will connect to Payload CMS once DATABASE_URI is configured
// For now, returns mock data that matches the Payload collection schema

const mockProducts = [
  { id: "1", name: "The Onyx Coat", slug: "the-onyx-coat", category: "men", price: 4800000, description: "Dibuat dari wol Merino Jepang berat 380gsm.", status: "published", featured: true, images: [], createdAt: "2026-05-28", updatedAt: "2026-06-04" },
  { id: "2", name: "Wool Blazer", slug: "wool-blazer", category: "men", price: 3200000, description: "Blazer wool premium dengan cutting slim modern.", status: "published", featured: false, images: [], createdAt: "2026-05-25", updatedAt: "2026-06-01" },
  { id: "3", name: "Silk Shirt No. 7", slug: "silk-shirt-no-7", category: "women", price: 2100000, description: "Kemeja sutra halus dengan detail pearl button.", status: "published", featured: false, images: [], createdAt: "2026-05-20", updatedAt: "2026-05-28" },
  { id: "4", name: "Linen Trousers", slug: "linen-trousers", category: "women", price: 1650000, description: "Celana linen breathable.", status: "draft", featured: false, images: [], createdAt: "2026-05-18", updatedAt: "2026-05-22" },
  { id: "5", name: "Shadow Trench", slug: "shadow-trench", category: "limited", price: 7500000, description: "Trench coat limited edition.", status: "published", featured: true, images: [], createdAt: "2026-05-15", updatedAt: "2026-05-20" },
  { id: "6", name: "Grey Turtleneck", slug: "grey-turtleneck", category: "men", price: 1200000, description: "Turtleneck kasmir blend.", status: "draft", featured: false, images: [], createdAt: "2026-05-10", updatedAt: "2026-05-12" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const featured = searchParams.get("featured");

  let filtered = mockProducts;

  if (category) filtered = filtered.filter((p) => p.category === category);
  if (status) filtered = filtered.filter((p) => p.status === status);
  if (featured === "true") filtered = filtered.filter((p) => p.featured);

  return NextResponse.json({ docs: filtered, totalDocs: filtered.length });
}

export async function POST(request: Request) {
  const body = await request.json();

  // Validate required fields
  if (!body.name || !body.price || !body.category) {
    return NextResponse.json(
      { error: "name, price, and category are required" },
      { status: 400 }
    );
  }

  const newProduct = {
    id: Date.now().toString(),
    ...body,
    slug: body.name.toLowerCase().replace(/\s+/g, "-"),
    status: body.status || "draft",
    featured: body.featured || false,
    images: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // In production, this would call: await payload.create({ collection: 'products', data: body })
  return NextResponse.json(newProduct, { status: 201 });
}
