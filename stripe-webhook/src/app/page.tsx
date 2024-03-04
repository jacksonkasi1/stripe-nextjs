'use client';

import { Button } from "@/components/ui/button";
import { env } from "@/config";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const STRIPE_PAYMENT_LINK: string = env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={() => router.push(STRIPE_PAYMENT_LINK)}>Click me</Button>
    </main>
  );
}
