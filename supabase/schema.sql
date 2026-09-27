-- URIIIMPORT - esquema privado de pedidos
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  order_code text generated always as ('URI-' || lpad(id::text, 6, '0')) stored unique,
  created_at timestamptz not null default now(),
  customer_address text,
  distance_km numeric(8,3),
  shipping_cost integer,
  products_total integer not null default 0,
  potential_total integer not null default 0,
  has_pending_price boolean not null default false,
  status text not null default 'whatsapp' check (status in ('whatsapp','confirmado','pagado','enviado','entregado','cancelado')),
  items jsonb not null default '[]'::jsonb
);

alter table public.orders enable row level security;
revoke all on table public.orders from anon;
revoke all on table public.orders from authenticated;

-- El navegador publico NO lee ni escribe orders directamente.
-- La futura Edge Function crea el pedido usando una clave secreta del servidor.
-- El panel admin se conectara mediante una funcion/backend autenticado.
-- Nunca agregar service_role/secret keys al repositorio.
