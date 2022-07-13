type SimpleStatus = "ok" | "error" | "degraded" | "unknown";

export interface StarkNetStatus {
  status: SimpleStatus;
}

/**
 * Uses https://github.com/argentlabs/starknet-status-lambda to check for StarkNet's status.
 * Uses the `simple-status` endpoint.
 * @return {Promise<StarkNetStatus>} StarkNet's status
 */
export async function getStarknetStatus(): Promise<StarkNetStatus> {
  try {
    const response = await fetch(
      "https://starknet-status.vercel.app/api/simple-status"
    );
    return await response.json();
  } catch (error) {
    return {
      status: "unknown",
    };
  }
}
