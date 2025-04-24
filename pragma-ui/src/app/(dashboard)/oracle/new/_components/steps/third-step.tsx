"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "../Form.module.scss";

import { Feeds } from "@/app/(dashboard)/oracle/new/_components/feeds";
import { NewFeed } from "@/app/(dashboard)/oracle/new/_components/new-feed";
import { FormData } from "@/app/(dashboard)/oracle/new/_types";
import { Dialog } from "@/components/ui/dialog";

type ThirdStepProps = {
  formData: FormData;
  handleFieldChange: (
    name: string,
    value: string | number | boolean | [],
    isRequired?: boolean
  ) => void;
};

export const ThirdStep = ({ formData, handleFieldChange }: ThirdStepProps) => {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!formData.network) {
      handleFieldChange("network", "Unknown");
    }
  }, []);

  const validateFields = () => {
    if (formData.type === "api") {
      if (!formData.network) {
        setError("Please select a network");
        return false;
      }
      if (formData.network !== "Unknown" && !formData.assetAddress) {
        setError("Please enter an asset address");
        return false;
      }
      if (!formData.tokenName) {
        setError("Please enter a token name");
        return false;
      }
      if (!formData.ticker) {
        setError("Please enter a ticker");
        return false;
      }
    }
    setError("");
    return true;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const body: Record<string, any> = {
        token_config: {
          name: formData.tokenName,
          ticker: formData.ticker.toUpperCase(),
          decimals: 18,
          addresses: {},
        },
      };

      if (formData.network !== "Unknown" && formData.assetAddress) {
        body.token_config.addresses[formData.network.toLowerCase()] =
          formData.assetAddress;
      }

      const res = await fetch("https://feed.devnet.pragma.build/v1/feeds/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add token");
      }

      return res.json();
    },
    onSuccess: () => {
      handleFieldChange("sources", []);
      handleFieldChange("selectedPairs", []);
      handleFieldChange("submitSuccess", true);
      queryClient.invalidateQueries({ queryKey: ["FEEDS"] });
    },
    onError: (err: any) => {
      setError(err.message);
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async () => {
    if (!validateFields()) return false;

    if (formData.sources?.length > 0) {
      handleFieldChange("sources", []);
      return true;
    }

    setIsSubmitting(true);
    mutation.mutate();
    return true;
  };

  useEffect(() => {
    window.validateStep3 = validateFields;
    window.submitStep3 = handleSubmit;
    return () => {
      delete window.validateStep3;
      delete window.submitStep3;
    };
  }, [formData]);

  return (
    <div className={styles.container}>
      <Dialog>
        <Feeds />
        <NewFeed
          formData={formData}
          error={error}
          isSubmitting={isSubmitting}
          handleFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      </Dialog>
    </div>
  );
};
