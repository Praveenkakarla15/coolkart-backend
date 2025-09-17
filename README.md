# coolkart-backend

Backend for Coolkart ecommerce with JWT authentication (per-user cart & favorites).

## Setup (local)
1. Clone repo.
2. `npm install`
3. Create `.env` using `.env.example`
   ```
   PORT=
   MONGO_URI=
   JWT_SECRET=
   ```
4. Seed sample products and a test user: `npm run seed`
5. Start dev server: `npm run dev`

## Auth
- Register: `POST /api/auth/register`  body: `{ name, email, password }`
- Login: `POST /api/auth/login` body: `{ email, password }` -> returns `{ token, user }`
- Use `Authorization: Bearer <token>` for endpoints below.

## API Endpoints
- `GET /products` — get all products
- `GET /products/:category` — get products by category
- `POST /api/cart` — add product to cart (authenticated) — body: `{ productId, qty }`
- `GET /cart` — get cart items for authenticated user
- `POST /api/favorites` — add product to favorites (authenticated) — body: `{ productId }`
- `GET /favorites` — get favorites for authenticated user
- Swagger UI: `/api-docs`

## Notes for frontend integration
- Frontend must authenticate and include the JWT in `Authorization` header.
- The seed script creates a test user: `test@coolkart.com` / `password123`
