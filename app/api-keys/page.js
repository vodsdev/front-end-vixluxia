"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export default function ApiKeysPage() {
  const [keys, setKeys] = useState([]);
  const [newKeyName, setNewKeyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [createdKey, setCreatedKey] = useState(null);

  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      const res = await fetch("/api/v1/api-keys");
      if (!res.ok) throw new Error("Failed to fetch keys");
      const data = await res.json();
      setKeys(data || []);
    } catch (err) {
      toast.error("Could not load API keys");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/api-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName || "New API Key" }),
      });
      if (!res.ok) throw new Error("Failed to create key");
      
      const data = await res.json();
      setCreatedKey(data.key);
      setNewKeyName("");
      toast.success("API key created successfully");
      fetchKeys();
    } catch (err) {
      toast.error("Could not create API key");
    }
  };

  const handleRevokeKey = async (id) => {
    if (!confirm("Are you sure you want to revoke this key? This action cannot be undone.")) return;
    
    try {
      const res = await fetch("/api/v1/api-keys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Failed to revoke key");
      
      toast.success("API key revoked");
      fetchKeys();
    } catch (err) {
      toast.error("Could not revoke API key");
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">API Keys</h1>
      <p className="text-muted-foreground mb-8">Manage your API keys for accessing VixLuxia services programmatically.</p>

      {createdKey && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-4 rounded-md mb-8">
          <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">New API Key Created!</h3>
          <p className="text-sm mb-3">Please copy this key and save it somewhere safe. You won't be able to see it again.</p>
          <code className="block bg-black/10 dark:bg-black/40 p-2 rounded text-sm break-all font-mono">
            {createdKey}
          </code>
          <Button variant="outline" size="sm" className="mt-3" onClick={() => setCreatedKey(null)}>
            Dismiss
          </Button>
        </div>
      )}

      <div className="bg-card border rounded-xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Key</h2>
        <form onSubmit={handleCreateKey} className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="keyName" className="block text-sm font-medium mb-2">Key Name</label>
            <Input 
              id="keyName"
              placeholder="e.g. My Next.js App" 
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
          </div>
          <Button type="submit">Create Key</Button>
        </form>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Prefix</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">Loading...</TableCell>
              </TableRow>
            ) : keys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No API keys found.</TableCell>
              </TableRow>
            ) : (
              keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell className="font-medium">{key.name}</TableCell>
                  <TableCell className="font-mono text-muted-foreground">{key.key_prefix}...</TableCell>
                  <TableCell>{new Date(key.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleRevokeKey(key.id)} title="Revoke Key" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
