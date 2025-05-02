import { redirect } from "next/navigation";

import { getUser } from "@/lib/getUser";
import { Dialog } from "@/components/ui/dialog";
import { getServerFeeds } from "./_helpers/getServerFeeds";
import Feeds from "./_components/feeds";
import { NewFeed } from "./_components/new-feed";

const FeedsPage = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/oaas");
  }

  if (user!.subscription?.status !== "active") {
    redirect("/dashboard/payment");
  }

  const feeds = await getServerFeeds();

  return (
    <Dialog>
      <Feeds initialData={feeds} />
      <NewFeed />
    </Dialog>
  );
};

export default FeedsPage;
