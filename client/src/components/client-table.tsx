import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import type { Client } from "@shared/schema";

interface ClientTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600", 
    "bg-amber-100 text-amber-600",
    "bg-purple-100 text-purple-600",
    "bg-pink-100 text-pink-600",
    "bg-indigo-100 text-indigo-600"
  ];
  const index = name.length % colors.length;
  return colors[index];
}

export function ClientTable({ clients, onEdit, onDelete }: ClientTableProps) {
  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-12 text-center">
          <div className="mx-auto h-12 w-12 text-slate-400 mb-4">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-slate-900">No clients found</h3>
          <p className="mt-2 text-sm text-slate-500">Get started by adding your first client.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-800">Clients</h3>
          <span className="text-sm text-slate-500">{clients.length} total</span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Added</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className={`h-10 w-10 rounded-full ${getAvatarColor(client.name)} flex items-center justify-center`}>
                        <span className="font-medium text-sm">{getInitials(client.name)}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-slate-900">{client.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900">{client.phone || "-"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(client)}
                      className="text-primary hover:text-primary/80 h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(client)}
                      className="text-red-600 hover:text-red-800 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-slate-200">
        {clients.map((client) => (
          <div key={client.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-12 w-12">
                  <div className={`h-12 w-12 rounded-full ${getAvatarColor(client.name)} flex items-center justify-center`}>
                    <span className="font-medium">{getInitials(client.name)}</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-slate-900">{client.name}</h4>
                  <p className="text-sm text-slate-500">{client.email}</p>
                  <p className="text-sm text-slate-500">{client.phone || "-"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(client)}
                  className="text-primary hover:text-primary/80 h-10 w-10 p-0"
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(client)}
                  className="text-red-600 hover:text-red-800 h-10 w-10 p-0"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xs text-slate-400">
                Added {formatDistanceToNow(new Date(client.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
