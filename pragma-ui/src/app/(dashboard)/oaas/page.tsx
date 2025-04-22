import { cn } from "@/lib/utils";
import styles from "@/pages/styles.module.scss";
import V2Hero from "@/components/v2/v2Hero";
import GoogleOauth from "./_components/google-oauth";

const OaasPage = () => {
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
      ></V2Hero>
    </div>
  );
};

export default OaasPage;
