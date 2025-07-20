import { AlertTriangle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Client } from "@shared/schema";

interface DeleteClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  client: Client | null;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteClientModal({ 
  open, 
  onOpenChange, 
  client, 
  onConfirm, 
  isDeleting 
}: DeleteClientModalProps) {
  if (!client) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg leading-6 font-medium text-slate-900">Delete Client</h3>
            <div className="mt-2">
              <p className="text-sm text-slate-500">
                Are you sure you want to delete{" "}
                <span className="font-medium">{client.name}</span>? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
