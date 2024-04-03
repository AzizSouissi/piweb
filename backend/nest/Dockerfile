# Development Stage
FROM node:20.11.0-slim as development

# Create a directory for node_modules and set ownership to node user
RUN mkdir -p /app/node_modules && chown -R node:node /app/node_modules

# Install system dependencies
RUN apt-get update && apt-get install -y openssl

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY --chown=node:node . .

# Generate Prisma client
RUN npx prisma generate

# Switch to the node user
USER node

# Build Stage for Production
FROM node:20.11.0-slim as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY --chown=node:node package*.json ./

# Copy node_modules from development stage
COPY --chown=node:node --from=development /app/node_modules ./node_modules

# Copy the rest of the application code
COPY --chown=node:node . .

# Build the application
RUN npm run build

# Set NODE_ENV to production
ENV NODE_ENV=production

# Install production dependencies and clean npm cache
RUN npm ci --omit=dev && npm cache clean --force

# Switch to the node user
USER node

# Final Stage for Production
FROM node:20.11.0-slim as production

# Set working directory
WORKDIR /app

# Copy node_modules and built files from the build stage
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

# Switch to the node user
USER node

# Command to run the application
CMD ["node", "./dist/src/main.js"]
