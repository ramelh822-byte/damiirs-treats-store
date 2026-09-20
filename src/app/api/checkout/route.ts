import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/** Resolve Stripe secret from standard or simplified Vercel env names */
function getStripeSecret(): string {
  return (
    process.env.STRIPE_SECRET_KEY ||
    process.env.stripesecretkey ||
    process.env.STRIPE_SECRET ||
    process.env.stripe ||
    ""
  );
}

export async function POST(request: NextRequest) {
  try {
    const secret = getStripeSecret();
    if (!secret) {
      return NextResponse.json(
        {
          error: "Stripe not configured",
          hint: "Set STRIPE_SECRET_KEY (or stripesecretkey) in Vercel env vars and redeploy",
        },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secret, {
      apiVersion: "2024-11-20.acacia" as Stripe.LatestApiVersion,
    });

    const body = await request.json();
    const { billing, total } = body;
    if (!billing?.email || !total) {
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }

    const orderId = `ORD-${Date.now()}`;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(total) * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        order_id: orderId,
        customer_email: String(billing.email),
      },
      receipt_email: String(billing.email),
      description: `Damiir's Treats ${orderId}`,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });
  } catch (e) {
    console.error("Checkout error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
