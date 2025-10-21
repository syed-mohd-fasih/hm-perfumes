export async function GET() {
  // Return mock data directly
  return Response.json([
    {
      id: "1",
      name: "Amber Essence",
      brand: "HM Perfumes",
      description: "A warm, rich blend of amber and vanilla.",
      price: 59.99,
      image: "/amber-perfume.jpg",
      ingredients: "Amber, Vanilla, Musk",
    },
    {
      id: "2",
      name: "Citrus Bloom",
      brand: "HM Perfumes",
      description: "Fresh citrus with soft floral notes.",
      price: 49.99,
      image: "/citrus-perfume.png",
      ingredients: "Orange, Jasmine, Bergamot",
    },
    {
      id: "3",
      name: "Midnight Musk",
      brand: "HM Perfumes",
      description: "Deep and sensual musk with woody undertones.",
      price: 64.99,
      image: "/musk-perfume.jpg",
      ingredients: "Musk, Sandalwood, Oud",
    },
    {
      id: "4",
      name: "Rose Garden",
      brand: "HM Perfumes",
      description: "Elegant rose with hints of peony and lily.",
      price: 54.99,
      image: "/rose-perfume.jpg",
      ingredients: "Rose, Peony, Lily, Musk",
    },
  ])
}
