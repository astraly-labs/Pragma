"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_URL } from "@/lib/config";

const HOBBY_PLAN_ID = "price_1RGeWcRviOvHGCOCJP0LLZ9q";
const PRO_PLAN_ID = "price_1RGeY5RviOvHGCOCZx0WOiKA";

export function PaymentStep() {
  const subscribe = async (priceId: string) => {
    try {
      const res = await fetch(`${APP_URL}/auth/subscriptions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ price_id: priceId }),
      });

      if (!res.ok) {
        throw new Error("Subscription failed");
      }

      const data = await res.json();
      console.log("Subscription success:", data);
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-16 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Pricing</h1>
          <p className="text-xl text-[#B5F0E5] max-w-2xl mx-auto">
            Choose the plan that works best for your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-[#00473880] border border-[#B5F0E580] rounded-2xl overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold">Hobby</CardTitle>
              <CardDescription className="text-[#B5F0E5]">
                For individual developers
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="mb-6">
                <span className="text-4xl font-bold">$9.99</span>
                <span className="text-[#B5F0E5]">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#15FF81] shrink-0 mt-0.5" />
                  <span>Access to the launching tool</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#15FF81] shrink-0 mt-0.5" />
                  <span>2 feeds</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => subscribe(HOBBY_PLAN_ID)}
                type="button"
                className="w-full bg-[#FFFFFF26] hover:bg-[#15FF81] hover:text-[#042420] border border-[#B5F0E5] rounded-full py-6 font-medium text-lg transition-all"
              >
                Get started
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-[#00473880] border border-[#B5F0E580] rounded-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 bg-[#15FF81] text-[#042420] px-4 py-1 rounded-bl-lg font-medium">
              Popular
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="text-3xl font-bold">Pro Plan</CardTitle>
              <CardDescription className="text-[#B5F0E5]">
                For professional developers
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="mb-6">
                <span className="text-4xl font-bold">$99.99</span>
                <span className="text-[#B5F0E5]">/month</span>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#15FF81] shrink-0 mt-0.5" />
                  <span>Access to the launching tool</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#15FF81] shrink-0 mt-0.5" />
                  <span>10 feeds</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#15FF81] shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-[#15FF81] shrink-0 mt-0.5" />
                  <span>99.9% SLA</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => subscribe(PRO_PLAN_ID)}
                type="button"
                className="w-full bg-[#15FF81] hover:bg-[#B5F0E5] text-[#042420] rounded-full py-6 font-medium text-lg transition-all"
              >
                Get started
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
