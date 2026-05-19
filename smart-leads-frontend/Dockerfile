# Stage 1: Build the React Application
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project and build
COPY . .
RUN npm run build

# Stage 2: Serve the App
FROM node:20-alpine

# Install a lightweight static server
RUN npm install -g serve

# Set the working directory to serve the built files
WORKDIR /app

# Copy the build artifacts from the build stage
COPY --from=build /app/dist /app/dist

# Expose the port (Render's default is often 10000 or 80)
EXPOSE 3000

# Start the static server
CMD ["serve", "-s", "dist", "-l", "3000"]