FROM node:24-alpine as builder
WORKDIR /app
COPY package*.json ./

RUN npm ci --omit=dev
COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app ./
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "server.js"]