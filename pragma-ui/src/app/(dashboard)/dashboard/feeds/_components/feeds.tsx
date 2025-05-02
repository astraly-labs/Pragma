"use client";

import { useQuery } from "@tanstack/react-query";
import { PlusCircle, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DialogTrigger } from "@/components/ui/dialog";
import { FeedsResponse } from "@/app/(dashboard)/dashboard/feeds/_types";

const useFeeds = (initialData: FeedsResponse[]) =>
  useQuery({
    queryKey: ["FEEDS"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_OAAS_API}/feeds/list`,
        { credentials: "include" }
      );
      if (!res.ok) throw new Error("Failed to fetch feeds");
      return res.json();
    },
    initialData,
  });

export default function Feeds({
  initialData,
}: {
  initialData: FeedsResponse[];
}) {
  const { data } = useFeeds(initialData);

  const usedFeeds = data.max_feeds - data.remaining_feeds;
  const percentUsed = (usedFeeds / data.max_feeds) * 100;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 text-white">
        <div>
          <h1 className="text-2xl font-semibold mb-1">Feeds</h1>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className="text-emerald-400 border-emerald-400/30 bg-emerald-400/10"
            >
              {data.subscription_tier} tier
            </Badge>
            <span className="text-sm text-white/70">
              {data.remaining_feeds} remaining of {data.max_feeds}
            </span>
          </div>
        </div>
        <DialogTrigger asChild>
          <Button className="mt-4 md:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create a data feed
          </Button>
        </DialogTrigger>
      </div>

      <div className="mb-6 text-white">
        <div className="flex justify-between text-sm mb-2">
          <span>Usage</span>
          <span>
            {usedFeeds} of {data.max_feeds} feeds
          </span>
        </div>
        <Progress
          value={percentUsed}
          className="h-2 bg-gray-800"
          indicatorClassName="bg-emerald-500"
        />
      </div>

      <div className="space-y-4">
        {data.feeds.map((feed) => (
          <Card
            key={feed.id}
            className="bg-[#0f2a20] border-0 p-4 rounded-lg hover:bg-[#143326] transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 mr-2" />
                  <span className="font-medium text-lg text-white">
                    {feed.ticker}
                  </span>
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Created at: {new Date(feed.created_at).toLocaleString()}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white hover:bg-[#1d4535]"
              >
                View
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {data.remaining_feeds > 0 && (
        <Card className="mt-4 bg-[#0f2a20]/50 border border-dashed border-gray-700 p-4 rounded-lg">
          <div className="flex flex-col items-center justify-center py-6">
            <PlusCircle className="h-8 w-8 text-white/50 mb-2" />
            <p className="text-white/70 text-sm">
              You can create {data.remaining_feeds} more feed
              {data.remaining_feeds > 1 ? "s" : ""}
            </p>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="mt-4 border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20"
              >
                Add new feed
              </Button>
            </DialogTrigger>
          </div>
        </Card>
      )}
    </>
  );
}
