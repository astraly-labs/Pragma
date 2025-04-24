import { redirect } from "next/navigation";
import { getUser } from "@/lib/getUser";
import { cn } from "@/lib/utils";
import BoxContainer from "@/components/common/BoxContainer";
import styles from "@/pages/styles.module.scss";
import { OracleForm } from "./_components/oracle-form";

const NewOraclePage = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/oaas");
  }

  return (
    <div className={cn("relative w-full overflow-x-hidden", styles.bigScreen)}>
      <BoxContainer>
        <OracleForm
          isSubscriptionActive={user.subscription.status === "active"}
        />
      </BoxContainer>
    </div>
  );
};

export default NewOraclePage;
