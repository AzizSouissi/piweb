# Stage 1: Build the Angular app
FROM node:latest AS builder

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

RUN npm run build -- --prod

# Stage 2: Serve the Angular app with nginx
FROM nginx:latest

# Copy the built Angular app from the previous stage
COPY --from=builder /app/dist/frontend /usr/share/nginx/html

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
