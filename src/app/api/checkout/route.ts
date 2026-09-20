import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20.acacia",
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }
    const body = await request.json();
    const { billing, total } = body;
    if (!billing?.email || !total) {
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }
    const orderId = `ORD-${Date.now()}`;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: { order_id: orderId, customer_email: billing.email },
      receipt_email: billing.email,
      description: `Damiir's Treats ${orderId}`,
    });
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
