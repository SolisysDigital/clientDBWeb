import pkg from "pg";
const { Client } = pkg;

// Create properly encoded database URL for Supabase
function createDatabaseUrl(): string {
  const originalUrl = process.env.DATABASE_URL!;
  console.log("Original URL components...");
  
  // Build the URL components manually since the password contains @
  // postgresql://postgres.wnidzcvewbypxmshhudv:Summ3r@2025@aws-0-us-east-2.pooler.supabase.com:6543/postgres
  const host = "aws-0-us-east-2.pooler.supabase.com";
  const port = "6543";
  const username = "postgres.wnidzcvewbypxmshhudv";
  const password = "Summ3r2025Asjh";
  const database = "postgres";
  
  // Use URL constructor to properly encode
  const url = new URL(`postgresql://${host}:${port}/${database}`);
  url.username = username;
  url.password = password;
  
  console.log("Constructed URL:", url.toString().replace(/:[^:@]+@/, ":[PASSWORD]@"));
  
  return url.toString();
}

async function setupDatabase() {
  try {
    const connectionString = createDatabaseUrl();
    const client = new Client({ connectionString });
    
    console.log("Connecting to database...");
    await client.connect();
    
    console.log("Setting up database...");
    
    // Create the clients table
    await client.query(`
      CREATE TABLE IF NOT EXISTS clients (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);
    
    console.log("✓ Database setup complete!");
    console.log("✓ Clients table created successfully");
    
    await client.end();
    
  } catch (error) {
    console.error("Error setting up database:", error);
    throw error;
  }
}

setupDatabase().catch(console.error);