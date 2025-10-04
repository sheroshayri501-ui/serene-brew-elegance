-- Create enum for user roles
create type public.app_role as enum ('admin', 'user');

-- Create user_roles table
create table public.user_roles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade not null,
    role app_role not null,
    created_at timestamptz default now(),
    unique (user_id, role)
);

alter table public.user_roles enable row level security;

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Create menu_categories table
create table public.menu_categories (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    display_order int not null default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create menu_items table
create table public.menu_items (
    id uuid primary key default gen_random_uuid(),
    category_id uuid references public.menu_categories(id) on delete cascade not null,
    name text not null,
    description text not null,
    price text not null,
    is_special boolean default false,
    display_order int not null default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Enable RLS
alter table public.menu_categories enable row level security;
alter table public.menu_items enable row level security;

-- RLS Policies for menu_categories
create policy "Anyone can view menu categories"
on public.menu_categories
for select
using (true);

create policy "Admins can insert menu categories"
on public.menu_categories
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update menu categories"
on public.menu_categories
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete menu categories"
on public.menu_categories
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for menu_items
create policy "Anyone can view menu items"
on public.menu_items
for select
using (true);

create policy "Admins can insert menu items"
on public.menu_items
for insert
to authenticated
with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update menu items"
on public.menu_items
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete menu items"
on public.menu_items
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
create policy "Users can view their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

-- Insert default categories
insert into public.menu_categories (name, display_order) values
('Signature Brews', 1),
('Artisan Pastries', 2);

-- Insert default menu items for Signature Brews
insert into public.menu_items (category_id, name, description, price, is_special, display_order)
select 
    c.id,
    'Verdant Espresso',
    'Single-origin Ethiopian coffee with notes of bergamot and wildflowers',
    '$5.50',
    true,
    1
from public.menu_categories c where c.name = 'Signature Brews'
union all
select 
    c.id,
    'Forest Latte',
    'Smooth espresso with house-made oat milk and a hint of maple',
    '$6.50',
    false,
    2
from public.menu_categories c where c.name = 'Signature Brews'
union all
select 
    c.id,
    'Garden Pour Over',
    'Precision-brewed Colombian coffee with citrus undertones',
    '$6.00',
    false,
    3
from public.menu_categories c where c.name = 'Signature Brews'
union all
select 
    c.id,
    'Meadow Cappuccino',
    'Classic cappuccino with microfoam artistry',
    '$5.50',
    false,
    4
from public.menu_categories c where c.name = 'Signature Brews';

-- Insert default menu items for Artisan Pastries
insert into public.menu_items (category_id, name, description, price, is_special, display_order)
select 
    c.id,
    'Honeycomb Croissant',
    'Buttery layers with wildflower honey glaze',
    '$4.50',
    true,
    1
from public.menu_categories c where c.name = 'Artisan Pastries'
union all
select 
    c.id,
    'Botanical Scone',
    'Lavender and lemon with clotted cream',
    '$4.00',
    false,
    2
from public.menu_categories c where c.name = 'Artisan Pastries'
union all
select 
    c.id,
    'Forest Berry Tart',
    'Seasonal berries on almond cream',
    '$6.00',
    false,
    3
from public.menu_categories c where c.name = 'Artisan Pastries'
union all
select 
    c.id,
    'Matcha Roll',
    'Green tea sponge with vanilla cream',
    '$5.50',
    false,
    4
from public.menu_categories c where c.name = 'Artisan Pastries';

-- Create function to update timestamps
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

-- Add triggers for updated_at
create trigger set_updated_at
    before update on public.menu_categories
    for each row
    execute function public.handle_updated_at();

create trigger set_updated_at
    before update on public.menu_items
    for each row
    execute function public.handle_updated_at();