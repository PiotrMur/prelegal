### Stage 1: Build Next.js static site
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
COPY templates/ /app/templates/
RUN npm run build

### Stage 2: Build Go backend
FROM golang:1.25-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend/ ./
RUN CGO_ENABLED=0 go build -o server .

### Stage 3: Final image
FROM alpine:3.20
RUN apk add --no-cache ca-certificates

WORKDIR /app
COPY --from=backend-builder /app/backend/server ./server
COPY --from=frontend-builder /app/frontend/out ./static

RUN mkdir -p /data

ENV STATIC_DIR=/app/static
ENV DB_PATH=/data/prelegal.db

EXPOSE 8000

CMD ["./server"]
