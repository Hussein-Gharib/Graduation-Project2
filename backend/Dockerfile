FROM node:20-alpine AS base
WORKDIR /app

# Install only production deps
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy app source
COPY backend/. ./

ENV NODE_ENV=production
EXPOSE 10000

CMD ["node", "index.js"]

