import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sidebar } from "@/components/ui/sidebar";
import { ClientTable } from "@/components/client-table";
import { AddClientModal } from "@/components/add-client-modal";
import { DeleteClientModal } from "@/components/delete-client-modal";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Client, InsertClient } from "@shared/schema";

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [sortBy, setSortBy] = useState("name");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch clients
  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["/api/clients", searchQuery],
    enabled: true,
  });

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: async (data: InsertClient) => {
      const response = await apiRequest("POST", "/api/clients", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setShowAddModal(false);
      toast({
        title: "Success!",
        description: "Client has been added successfully.",
      });
    },
    onError: (error) => {
      console.error("Error creating client:", error);
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Delete client mutation
  const deleteClientMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setShowDeleteModal(false);
      setSelectedClient(null);
      toast({
        title: "Success!",
        description: "Client has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.error("Error deleting client:", error);
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAddClient = async (data: InsertClient) => {
    await createClientMutation.mutateAsync(data);
  };

  const handleEditClient = (client: Client) => {
    // TODO: Implement edit functionality
    console.log("Edit client:", client);
  };

  const handleDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedClient) {
      await deleteClientMutation.mutateAsync(selectedClient.id);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      
      <main className="pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-800">Client Management</h2>
                <p className="text-sm text-slate-600 mt-1">Manage your client database</p>
              </div>
              <Button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Client</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center space-x-3">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Sort by Name</SelectItem>
                    <SelectItem value="email">Sort by Email</SelectItem>
                    <SelectItem value="date">Sort by Date Added</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-slate-500">Loading clients...</p>
            </div>
          ) : (
            <ClientTable
              clients={clients}
              onEdit={handleEditClient}
              onDelete={handleDeleteClient}
            />
          )}
        </div>
      </main>

      {/* Add Client Modal */}
      <AddClientModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSubmit={handleAddClient}
        isSubmitting={createClientMutation.isPending}
      />

      {/* Delete Confirmation Modal */}
      <DeleteClientModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        client={selectedClient}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteClientMutation.isPending}
      />
    </div>
  );
}
