"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ApiKeyFormData = {
  name: string;
};

type CreateApiKeyDialogProps = {
  onCreateApiKey?: (data: ApiKeyFormData) => void;
};

export function CreateApiKeyDialog({
  onCreateApiKey,
}: CreateApiKeyDialogProps) {
  const [formData, setFormData] = useState<ApiKeyFormData>({
    name: "",
  });

  const handleChange = (field: keyof ApiKeyFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (onCreateApiKey) {
      onCreateApiKey(formData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create API Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#0a1a14] text-white border-gray-800 max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-normal pb-6">
            Create a new API Key
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <p className="text-gray-400 text-sm mb-4">
              API keys allow you to authenticate requests to our API. Keep your
              API keys secure and do not share them publicly.
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-xl font-normal">API Key Name</Label>
            <p className="text-gray-400 text-sm pb-2">
              Give your API key a descriptive name to help you identify it
              later.
            </p>
            <Input
              placeholder="My API Key"
              className="bg-[#1a2e25] border-0 h-14 text-white"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="bg-[#1a2e25] p-4 rounded-md border border-emerald-900/50">
            <p className="text-amber-400 text-sm">
              <strong>Important:</strong> Your full API key will only be shown
              once when created. Make sure to copy it and store it securely.
            </p>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/20"
            >
              CANCEL
            </Button>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600 text-black font-medium px-8"
              onClick={handleSubmit}
            >
              CREATE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
