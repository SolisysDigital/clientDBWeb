import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertClientSchema, type InsertClient } from "@shared/schema";

interface AddClientModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: InsertClient) => Promise<void>;
  isSubmitting: boolean;
}

export function AddClientModal({ open, onOpenChange, onSubmit, isSubmitting }: AddClientModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<InsertClient>({
    resolver: zodResolver(insertClientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const handleFormSubmit = async (data: InsertClient) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium text-slate-900">Add New Client</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Full Name *
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter client's full name"
              className="w-full"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email Address *
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="client@example.com"
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+1 (555) 123-4567"
              className="w-full"
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Client"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
