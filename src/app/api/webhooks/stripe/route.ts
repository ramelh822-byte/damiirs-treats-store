import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripeSecret(): string {
  return (
    process.env.STRIPE_SECRET_KEY ||
    process.env.stripesecretkey ||
    process.env.stripe ||
    ""
  );
}

function getWebhookSecret(): string {
  return (
    process.env.STRIPE_WEBHOOK_SECRET ||
    process.env.stripewebhooksecret ||
    process.env.stripewebhook ||
    ""
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  const secret = getStripeSecret();
  const webhookSecret = getWebhookSecret();

  if (!sig || !secret || !webhookSecret) {
    return NextResponse.json({ error: "Misconfigured webhook" }, { status: 400 });
  }

  const stripe = new Stripe(secret, {
    apiVersion: "2024-11-20.acacia" as Stripe.LatestApiVersion,
  });

  try {
    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    console.log("[Webhook]", event.type, event.id);
    return NextResponse.json({ received: true });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid signature" },
      { status: 400 }
    );
  }
}
