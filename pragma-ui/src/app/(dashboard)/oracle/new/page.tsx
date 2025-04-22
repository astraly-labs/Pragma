import { redirect } from "next/navigation";
import { getUser } from "@/lib/getUser";
import { cn } from "@/lib/utils";
import Form from "@/components/Oaas/Form";
import BoxContainer from "@/components/common/BoxContainer";
import styles from "@/pages/styles.module.scss";

const NewOraclePage = async () => {
  const user = await getUser();

  // if (!user) {
  //   redirect("/oaas");
  // }

  return (
    <div className={cn("relative w-full overflow-x-hidden", styles.bigScreen)}>
      <BoxContainer>
        <Form />
      </BoxContainer>
    </div>
  );
};

export default NewOraclePage;
