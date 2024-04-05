# Stage 1: Build the Angular app
FROM node:20.11.0-slim AS build

# Set the working directory
WORKDIR /usr/local/app

# Copy the source code to the working directory
COPY ./ /usr/local/app/

# Install dependencies
RUN npm install

# Build the Angular application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the built application from Stage 1 to replace the default nginx contents
COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80
