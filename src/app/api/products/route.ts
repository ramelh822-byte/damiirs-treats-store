import { NextResponse } from "next/server";

const PRODUCTS = [
  { id: "prod-001", name: "Classic Hard Candy Assortment", price: 24.99, weight: "5 lbs", description: "Assorted fruit hard candies, individually wrapped.", stock: 150, category: "hard-candy" },
  { id: "prod-002", name: "Premium Dark Chocolate Bites", price: 39.99, weight: "3 lbs", description: "Rich 70% cacao dark chocolate for bulk retail.", stock: 85, category: "chocolate" },
  { id: "prod-003", name: "Sour Gummy Worms", price: 18.5, weight: "4 lbs", description: "Tangy chewy sour worms — customer favorite.", stock: 200, category: "gummy" },
  { id: "prod-004", name: "Black Licorice Twists", price: 16.99, weight: "2 lbs", description: "Traditional soft black licorice twists.", stock: 60, category: "licorice" },
  { id: "prod-005", name: "Fruit Jelly Beans Bulk", price: 22.0, weight: "5 lbs", description: "Assorted fruit jelly beans in bulk bag.", stock: 120, category: "fruity" },
  { id: "prod-006", name: "Extreme Sour Hard Candy", price: 27.5, weight: "3 lbs", description: "Intense sour hard candy for novelty displays.", stock: 40, category: "sour" },
];

export async function GET() {
  return NextResponse.json({ products: PRODUCTS, total: PRODUCTS.length, page: 1, limit: 12 });
}
