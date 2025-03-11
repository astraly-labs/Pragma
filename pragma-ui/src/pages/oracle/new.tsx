import React from "react";
import Form from "../../components/Oaas/Form";
import BoxContainer from "../../components/common/BoxContainer";
import classNames from "classnames";
import styles from "../styles.module.scss";

const NewOraclePage = () => {
  return (
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
};

export default NewOraclePage;
