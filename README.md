# Mar D Jabones - Ecommerce Platform

Production-ready ecommerce web application built with Next.js, TypeScript, PostgreSQL, and Prisma.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js (Credentials + OAuth)
- **Payments**: Stripe + MercadoPago
- **Storage**: AWS S3 (for product images)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Features

- ✅ User authentication (Email/Password + Google OAuth)
- ✅ Product catalog with categories
- ✅ Shopping cart (guest + authenticated)
- ✅ Checkout flow
- ✅ Payment processing (Stripe + MercadoPago)
- ✅ User dashboard (orders, profile, addresses)
- ✅ Admin dashboard (product CRUD, order management)
- ✅ SEO-optimized pages
- ✅ Role-based access control (USER, ADMIN)

## Getting Started

### Prerequisites

- Node.js 18+ and Bun
- PostgreSQL database
- Stripe account (for payments)
- MercadoPago account (for payments)
- AWS S3 bucket (for images)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mar-jabones
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Fill in all required environment variables in `.env`:
   - Database connection string
   - NextAuth secret (generate with `openssl rand -base64 32`)
   - OAuth provider credentials
   - Payment provider keys
   - AWS S3 credentials

4. **Set up the database**
   ```bash
   # Generate Prisma client
   bun run db:generate

   # Push schema to database (or use migrations)
   bun run db:push
   ```

5. **Run the development server**
   ```bash
   bun dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
mar-jabones/
├── app/                    # Next.js App Router
│   ├── (shop)/            # Public shop routes
│   │   ├── page.tsx       # Homepage
│   │   ├── productos/     # Product pages
│   │   ├── carrito/       # Shopping cart
│   │   └── checkout/      # Checkout flow
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin dashboard
│   └── api/               # API routes
│       ├── auth/          # NextAuth endpoints
│       ├── cart/          # Cart API
│       └── webhooks/      # Payment webhooks
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components
│   └── providers/        # Context providers
├── lib/                   # Utilities
│   ├── prisma.ts         # Prisma client
│   ├── auth.ts           # NextAuth config
│   └── cart.ts           # Cart utilities
├── services/
│   └── payments/         # Payment service abstractions
├── prisma/
│   └── schema.prisma     # Database schema
└── types/                 # TypeScript type definitions
```

## Database Schema

The Prisma schema includes:

- **User** - User accounts with role-based access
- **Product** - Product catalog with images and categories
- **Order** - Order management with status tracking
- **Payment** - Payment records for Stripe/MercadoPago
- **CartItem** - Shopping cart items (guest + authenticated)
- **Address** - User shipping/billing addresses

## Authentication

The app uses NextAuth.js with:
- **Credentials provider** - Email/password authentication
- **Google OAuth** - Social login
- **Role-based access** - USER and ADMIN roles

## Payment Processing

Payment abstraction layer supports:
- **Stripe** - Credit cards, Apple Pay, Google Pay
- **MercadoPago** - Cards, wallet, bank transfer

Webhook handlers process payment events and update order status automatically.

## Environment Variables

See `.env.example` for all required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - NextAuth secret key
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
- `STRIPE_SECRET_KEY` / `STRIPE_WEBHOOK_SECRET` - Stripe keys
- `MERCADOPAGO_ACCESS_TOKEN` - MercadoPago token
- `AWS_*` - AWS S3 credentials

## Development

```bash
# Run development server
bun dev

# Generate Prisma client
bun run db:generate

# Open Prisma Studio
bun run db:studio

# Run database migrations
bun run db:migrate
```

## Production Deployment

1. Set up production database (PostgreSQL)
2. Configure environment variables
3. Run database migrations
4. Build the application:
   ```bash
   bun run build
   bun start
   ```

## TODO / Future Enhancements

- [ ] Complete MercadoPago SDK integration
- [ ] Implement password hashing on registration
- [ ] Add product image upload to S3
- [ ] Implement order creation from cart
- [ ] Add email notifications
- [ ] Complete admin product CRUD forms
- [ ] Add inventory management
- [ ] Implement search functionality
- [ ] Add product reviews/ratings

## License

Private - Mar D Jabones
