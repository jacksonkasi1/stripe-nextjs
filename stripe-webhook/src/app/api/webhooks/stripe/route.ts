import Stripe from "stripe";

import { env } from "@/config";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("Stripe-Signature");

  // Correctly handle the absence of signature
  if (!signature) {
    console.log("🔴 No signature");
    return new Response("No signature", { status: 400 });
  }

  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      payload!,
      signature!,
      env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("event.type: ", event.type);

    if (event.type === "checkout.session.completed") {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        { expand: ["line_items"] }
      );
      console.log("Processed checkout session:", session.id);

      const lineItems = session.line_items;

      if (!lineItems) {
        return new Response("Webhook Error: No line items", {
          status: 400,
        });
      }

      // log customer details
      console.log("customer details: ", session.customer_details);
      // log line items
      console.log("line items: ", lineItems);
      // log email
      console.log("email: ", session.customer_details?.email);
      // log created
      console.log("created: ", session.created);

      // TODO: store data in database
      try {
        // TODO: send email
      } catch (error) {
        console.error(`Failed to send email`, error);
      }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response("Webhook processed successfully", {
      status: 200,
    });
  } catch (error: any) {
    console.error(`🔴 Webhook error: ${error.message}`);
    return new Response(`Webhook Error: ${error.message}`, {
      status: 400,
    });
  }
}

export async function GET(req: Request) {
  return new Response("Webhook endpoint doesn't support GET requests.", {
    status: 400,
  });
}
