import type { Client, InsertClient } from "@shared/schema";
import pkg from "pg";
const { Client: PgClient } = pkg;

// Create properly encoded database URL for Supabase
function createDatabaseUrl(): string {
  // Build the URL components manually since the password contains @
  const host = "aws-0-us-east-2.pooler.supabase.com";
  const port = "6543";
  const username = "postgres.wnidzcvewbypxmshhudv";
  const password = "2025Asjh";
  const database = "postgres";
  
  // Use URL constructor to properly encode
  const url = new URL(`postgresql://${host}:${port}/${database}`);
  url.username = username;
  url.password = password;
  
  return url.toString();
}

// Create database client
async function createDbClient() {
  const client = new PgClient({ connectionString: createDatabaseUrl() });
  await client.connect();
  return client;
}

export interface IStorage {
  getClients(search?: string): Promise<Client[]>;
  getClient(id: number): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: number, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getClients(search?: string): Promise<Client[]> {
    const client = await createDbClient();
    try {
      let query = `
        SELECT id, name, email, phone, created_at as "createdAt"
        FROM clients 
      `;
      const params: any[] = [];
      
      if (search) {
        query += ` WHERE name ILIKE $1 `;
        params.push(`%${search}%`);
      }
      
      query += ` ORDER BY created_at DESC LIMIT 100`;
      
      const result = await client.query(query, params);
      return result.rows;
    } catch (error) {
      console.error("Error fetching clients:", error);
      throw error;
    } finally {
      await client.end();
    }
  }

  async getClient(id: number): Promise<Client | undefined> {
    const client = await createDbClient();
    try {
      const query = `
        SELECT id, name, email, phone, created_at as "createdAt"
        FROM clients 
        WHERE id = $1
      `;
      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error("Error fetching client:", error);
      throw error;
    } finally {
      await client.end();
    }
  }

  async createClient(clientData: InsertClient): Promise<Client> {
    const client = await createDbClient();
    try {
      const query = `
        INSERT INTO clients (name, email, phone)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, phone, created_at as "createdAt"
      `;
      const result = await client.query(query, [clientData.name, clientData.email, clientData.phone]);
      return result.rows[0];
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    } finally {
      await client.end();
    }
  }

  async updateClient(id: number, clientData: Partial<InsertClient>): Promise<Client | undefined> {
    const client = await createDbClient();
    try {
      const fields = [];
      const values = [];
      let paramIndex = 1;
      
      if (clientData.name !== undefined) {
        fields.push(`name = $${paramIndex++}`);
        values.push(clientData.name);
      }
      if (clientData.email !== undefined) {
        fields.push(`email = $${paramIndex++}`);
        values.push(clientData.email);
      }
      if (clientData.phone !== undefined) {
        fields.push(`phone = $${paramIndex++}`);
        values.push(clientData.phone);
      }
      
      if (fields.length === 0) {
        return undefined;
      }
      
      values.push(id);
      
      const query = `
        UPDATE clients 
        SET ${fields.join(', ')}
        WHERE id = $${paramIndex}
        RETURNING id, name, email, phone, created_at as "createdAt"
      `;
      
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    } finally {
      await client.end();
    }
  }

  async deleteClient(id: number): Promise<boolean> {
    const client = await createDbClient();
    try {
      const query = `DELETE FROM clients WHERE id = $1`;
      const result = await client.query(query, [id]);
      return result.rowCount! > 0;
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    } finally {
      await client.end();
    }
  }
}

export const storage = new DatabaseStorage();
