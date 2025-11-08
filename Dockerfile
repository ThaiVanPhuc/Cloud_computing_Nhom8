# Build frontend
FROM node:20 AS frontend
WORKDIR /app/front-end
COPY front-end/package*.json ./
RUN npm install
COPY front-end/ .
RUN npm run build

# Build backend
FROM node:20 AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Final image
FROM node:20
WORKDIR /app
COPY --from=frontend /app/front-end/dist ./front-end
COPY --from=backend /app/backend ./
EXPOSE 5000
CMD ["node", "server.js"]
