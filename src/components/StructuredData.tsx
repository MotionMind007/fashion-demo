export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NOIR Studio",
    url: "https://noir-studio.id",
    logo: "https://noir-studio.id/images/og-image.jpg",
    description: "Fashion brand Indonesia — Bespoke tailoring, styling session, editorial shoot.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Kemang Raya No. 12",
      addressLocality: "Jakarta Selatan",
      postalCode: "12730",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@noir-studio.id",
      contactType: "customer service",
    },
    sameAs: ["https://instagram.com/noir.studio"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    name: "NOIR Studio",
    url: "https://noir-studio.id",
    telephone: "",
    email: "hello@noir-studio.id",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Kemang Raya No. 12",
      addressLocality: "Jakarta Selatan",
      addressRegion: "DKI Jakarta",
      postalCode: "12730",
      addressCountry: "ID",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "19:00",
      },
    ],
    priceRange: "Rp 250.000 - Rp 7.500.000",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductListSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "NOIR SS 2026 Collection",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "The Onyx Coat", url: "https://noir-studio.id/products" },
      { "@type": "ListItem", position: 2, name: "Wool Blazer", url: "https://noir-studio.id/products" },
      { "@type": "ListItem", position: 3, name: "Silk Shirt No. 7", url: "https://noir-studio.id/products" },
      { "@type": "ListItem", position: 4, name: "Shadow Trench", url: "https://noir-studio.id/products" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
