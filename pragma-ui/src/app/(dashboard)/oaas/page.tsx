// app/oaas/page.tsx or wherever your route is located
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import styles from "@/pages/styles.module.scss";
import V2Hero from "@/components/v2/v2Hero";
import GoogleOauth from "./_components/google-oauth";
import { getUser } from "@/lib/getUser";

const OaasPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/oracle/new");
  }

  return (
    <div className={cn("relative w-full overflow-x-hidden", styles.bigScreen)}>
      <V2Hero
        title="Launch your"
        purpleTitle="oracle"
        description="Permissionlessly launch your feed, in minutes. Jump in now."
        solidButton="Read docs"
        solidButtonLink="https://docs.pragma.build/"
        illustrationLink="/assets/vectors/Nodes.svg"
        customButton={
          <div className="flex flex-col items-center justify-center gap-4 pt-10 md:flex-row">
            <GoogleOauth />
          </div>
        }
      />
    </div>
  );
};

export default OaasPage;
