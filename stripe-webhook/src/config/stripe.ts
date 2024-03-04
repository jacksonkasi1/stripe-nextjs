import Stripe from "stripe";
import { env } from "@/config/env";

export const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  // https://stripe.com/docs/api/versioning
  // @ts-ignore
  apiVersion: null,
  // Register this as an official Stripe plugin.
  // https://stripe.com/docs/building-plugins#setappinfo
  appInfo: {
    name: "Next.js Subscription Starter",
    version: "0.0.1",
    url: "https://example.com",
  },
});
