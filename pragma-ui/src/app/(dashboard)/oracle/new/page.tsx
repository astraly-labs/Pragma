import React from "react";
import classNames from "classnames";
import Form from "@/components/Oaas/Form";
import BoxContainer from "@/components/common/BoxContainer";
import styles from "@/pages/styles.module.scss";

const NewOraclePage = () => (
  <div
    className={classNames(
      "relative w-full overflow-x-hidden",
      styles.bigScreen
    )}
  >
    <BoxContainer>
      <Form />
    </BoxContainer>
  </div>
);

export default NewOraclePage;
