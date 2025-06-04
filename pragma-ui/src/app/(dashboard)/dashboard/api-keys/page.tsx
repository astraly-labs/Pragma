import { redirect } from "next/navigation";

import { getUser } from "@/lib/getUser";
import { getServerApiKeys } from "./_helpers/getServerApiKeys";
import { ApiKeys } from "./_components/api-keys";

const ApiKeysPage = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/oaas");
  }

  if (user!.subscription?.status !== "active") {
    redirect("/dashboard/payment");
  }

  const apiKeys = await getServerApiKeys();

  return <ApiKeys initialData={apiKeys} />;
};

export default ApiKeysPage;
