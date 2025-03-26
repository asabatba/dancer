# Dockerfile

# --- Stage 1: Build the static website ---
FROM node:20-slim AS builder

WORKDIR /usr/src/app

# Copy package files and lockfile
COPY package*.json yarn.lock ./

# Install all dependencies (including devDependencies needed for build)
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code
COPY . .

# Run the build script defined in package.json
# This should generate the static site in the '/usr/src/app/dist' directory
RUN yarn build

# --- Stage 2: Serve the static website with Nginx ---
FROM nginx:stable-alpine

# Copy the custom Nginx configuration
# This overwrites the default Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files (contents of 'dist') from the 'builder' stage
# to the default Nginx public HTML directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 (standard HTTP port Nginx listens on)
EXPOSE 80

# The base Nginx image already has a CMD to start Nginx,
# so we don't need to specify it again.