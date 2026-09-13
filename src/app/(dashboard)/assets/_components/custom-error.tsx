"use client";
import { useRouter } from "next/navigation";
export const CustomError = ({
  reset,
}: {
  error: Error;
  reset?: () => void;
}) => {
  const router = useRouter();
  return (
    <div className="explorer-panel explorer-notice" role="alert">
      <h2>Data temporarily unavailable</h2>
      <p>We couldn’t load this section. Please try again.</p>
      <button
        className="text-link"
        onClick={() => {
          reset?.();
          router.refresh();
        }}
      >
        Try again ↗
      </button>
    </div>
  );
};
