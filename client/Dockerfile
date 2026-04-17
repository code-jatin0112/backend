# ---------- STAGE 1: BUILD ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy dependencies first (for caching)
COPY package.json package-lock.json ./
RUN npm ci

# Copy rest of code
COPY . .

# Build the app
RUN npm run build


# ---------- STAGE 2: PRODUCTION ----------
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from stage 1
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]