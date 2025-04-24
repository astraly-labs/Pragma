"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Key, Copy } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateApiKeyDialog } from "../api-keys-dialog";

type ApiKey = {
  id: string;
  name: string;
  key_prefix: string;
  active: boolean;
  created_at: string;
};

type ApiKeyFormData = {
  name: string;
};

const API_KEYS_QUERY_KEY = "API_KEYS";

const useApiKeys = () => {
  return useQuery<ApiKey[]>({
    queryKey: [API_KEYS_QUERY_KEY],
    queryFn: async () => {
      const res = await fetch(
        "https://feed.devnet.pragma.build/v1/api-keys/list",
        {
          credentials: "include",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch API keys");
      return res.json();
    },
  });
};

const useCreateApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string }) => {
      const res = await fetch(
        "https://feed.devnet.pragma.build/v1/api-keys/create",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Failed to create API key");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS_QUERY_KEY] });
    },
  });
};

const useRevokeApiKey = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: string }) => {
      const res = await fetch(
        "https://feed.devnet.pragma.build/v1/api-keys/delete",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Failed to delete API key");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [API_KEYS_QUERY_KEY] });
    },
  });
};

export const FourthStep = () => {
  const { data: apiKeys = [], isLoading } = useApiKeys();
  const createMutation = useCreateApiKey();
  const revokeMutation = useRevokeApiKey();

  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);

  const handleCreateApiKey = async (formData: { name: string }) => {
    try {
      const result = await createMutation.mutateAsync(formData);
      setNewApiKey(result?.key); // assuming API returns the full key here
      setShowNewKeyDialog(true);
    } catch (err) {
      console.error(err);
      // optionally show toast here
    }
  };

  const handleRevokeApiKey = async (id: string) => {
    try {
      await revokeMutation.mutateAsync({ id });
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = () => {
    setShowNewKeyDialog(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 text-white">
        <div>
          <h1 className="text-2xl font-semibold mb-1">API Keys</h1>
          <p className="text-sm text-white/70">
            Manage your API keys for accessing our services
          </p>
        </div>
        <CreateApiKeyDialog onCreateApiKey={handleCreateApiKey} />
      </div>

      {isLoading ? (
        <p className="text-white/60">Loading keys...</p>
      ) : apiKeys.length > 0 ? (
        <div className="space-y-4">
          {apiKeys.map((apiKey) => (
            <Card
              key={apiKey.id}
              className="bg-[#0f2a20] border-0 p-4 rounded-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <Key className="h-4 w-4 text-emerald-400 mr-2" />
                    <span className="font-medium text-lg text-white">
                      {apiKey.name}
                    </span>
                    {!apiKey.active && (
                      <Badge
                        variant="outline"
                        className="ml-2 text-amber-400 border-amber-400/30 bg-amber-400/10"
                      >
                        Inactive
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center">
                    <code className="text-sm bg-[#0a1a14] px-2 py-1 rounded text-white/70 mr-2">
                      {apiKey.key_prefix}
                    </code>
                    <CopyToClipboard
                      text={apiKey.key_prefix}
                      onCopy={() => toast("API Key has been copied!")}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        type="button"
                      >
                        <Copy className="h-3.5 w-3.5 text-white/70" />
                      </Button>
                    </CopyToClipboard>
                  </div>
                  <div className="text-xs text-white/70">
                    Created at: {new Date(apiKey.created_at).toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-600/30 text-red-400 hover:bg-red-600/20"
                    onClick={() => handleRevokeApiKey(apiKey.id)}
                    disabled={revokeMutation.isPending}
                  >
                    Revoke
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-4 bg-[#0f2a20]/50 border border-dashed border-gray-700 p-4 rounded-lg">
          <div className="flex flex-col items-center justify-center py-6">
            <Key className="h-8 w-8 text-white/50 mb-2" />
            <p className="text-white/70 text-sm">
              You don't have any API keys yet
            </p>
            <Button
              variant="outline"
              className="mt-4 border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/20"
              onClick={() =>
                document
                  .querySelector<HTMLButtonElement>(
                    '[aria-label="Create API Key"]'
                  )
                  ?.click()
              }
            >
              Create your first API key
            </Button>
          </div>
        </Card>
      )}

      <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
        <DialogContent className="sm:max-w-[500px] bg-[#0a1a14] text-white border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-normal pb-2">
              API Key Created
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-[#1a2e25] p-4 rounded-md border border-emerald-900/50">
              <p className="text-amber-400 text-sm mb-2">
                <strong>Important:</strong> This is the only time your full API
                key will be shown. Copy it now and store it securely.
              </p>
              <div className="flex items-center mt-2">
                <code className="text-sm bg-[#0a1a14] px-3 py-2 rounded text-white flex-1 overflow-x-auto">
                  {newApiKey}
                </code>
                {newApiKey && (
                  <CopyToClipboard text={newApiKey} onCopy={copyToClipboard}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2"
                      type="button"
                    >
                      <Copy className="h-4 w-4 text-white/70" />
                    </Button>
                  </CopyToClipboard>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
