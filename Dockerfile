# =========================
# Build frontend
# =========================
FROM node:18 AS frontend
WORKDIR /app/front-end
COPY front-end/package*.json ./
RUN npm install
COPY front-end/ .
RUN npm run build


# =========================
# Build backend
# =========================
FROM node:18 AS backend
WORKDIR /app/back-end
COPY back-end/package*.json ./
RUN npm install
COPY back-end/ .

# Tạo thư mục uploads (nơi multer lưu ảnh)
RUN mkdir -p /app/back-end/uploads


# =========================
# Final image
# =========================
FROM node:18
WORKDIR /app

# Copy frontend build
COPY --from=frontend /app/front-end/build ./front-end

# Copy backend source
COPY --from=backend /app/back-end ./back-end

# Đảm bảo thư mục uploads tồn tại
RUN mkdir -p /app/back-end/uploads

# Expose cổng cho backend
EXPOSE 5000

# CMD chạy server
CMD ["node", "back-end/src/server.js"]
