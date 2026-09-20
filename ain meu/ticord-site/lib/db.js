const { neon } = require("@neondatabase/serverless");

const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const sql = url ? neon(url) : null;
let ready = null;

// Conecta ao Neon e cria as tabelas na primeira chamada (se ainda não existirem)
function db() {
  if (!sql) throw new Error("DATABASE_URL não configurada");
  if (!ready) {
    ready = (async () => {
      await sql`create table if not exists users (
        id serial primary key,
        first_name text not null,
        last_name text not null,
        email text not null unique,
        password_hash text not null,
        is_client boolean not null default false,
        created_at timestamptz not null default now()
      )`;
      await sql`create table if not exists sessions (
        token_hash text primary key,
        user_id integer not null references users(id) on delete cascade,
        expires_at timestamptz not null
      )`;
    })().catch((e) => { ready = null; throw e; });
  }
  return ready.then(() => sql);
}

module.exports = { db };
