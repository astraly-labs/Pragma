import Link from "next/link";
import { ArrowRight, Database, Key, LineChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import { getServerFeeds } from "./feeds/_helpers/getServerFeeds";
import { getServerApiKeys } from "./api-keys/_helpers/getServerApiKeys";

export default async function Dashboard() {
  const user = await getUser();

  if (!user) {
    redirect("/oaas");
  }

  if (user!.subscription?.status !== "active") {
    redirect("/dashboard/payment");
  }

  const feeds = await getServerFeeds();
  const apiKeys = await getServerApiKeys();

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">
          Welcome to your dashboard
        </h1>
        <p className="text-white/70">
          Manage your data feeds, API keys, and billing settings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-[#0f2a20] border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Database className="h-6 w-6 text-emerald-400" />
              <span className="text-emerald-400 text-sm">
                {feeds.total} active
              </span>
            </div>
            <CardTitle className="mt-4 text-white">Data Feeds</CardTitle>
            <CardDescription className="text-white/70">
              Manage your data feeds and create new ones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2"
            >
              <Link
                href="/dashboard/feeds"
                className="flex items-center justify-between"
              >
                View Feeds
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2a20] border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Key className="h-6 w-6 text-emerald-400" />
              <span className="text-emerald-400 text-sm">
                {apiKeys!.length} active
              </span>
            </div>
            <CardTitle className="mt-4 text-white">API Keys</CardTitle>
            <CardDescription className="text-white/70">
              Manage your API keys for accessing our services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2"
            >
              <Link
                href="/dashboard/api-keys"
                className="flex items-center justify-between"
              >
                View API Keys
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#0f2a20] border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <LineChart className="h-6 w-6 text-emerald-400" />
              <span className="text-emerald-400 text-sm">
                {user.subscription.tier} tier
              </span>
            </div>
            <CardTitle className="mt-4 text-white">Usage & Billing</CardTitle>
            <CardDescription className="text-white/70">
              View your usage metrics and manage billing settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              asChild
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-2"
            >
              <Link
                href="/dashboard/billing"
                className="flex items-center justify-between"
              >
                View Billing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
