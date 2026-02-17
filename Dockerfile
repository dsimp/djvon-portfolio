# Stage 1: Build the React App
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Embed API Key during build (Required for React App)
# API Key is now provided via .env file or build argument
ARG REACT_APP_GEMINI_API_KEY
ENV REACT_APP_GEMINI_API_KEY=$REACT_APP_GEMINI_API_KEY

RUN npm run build

# Stage 2: Serve with Node.js Server
FROM node:18-alpine

WORKDIR /app

# Copy package.json and install production dependencies (only those needed for server)
COPY package*.json ./
RUN npm install --production --legacy-peer-deps

# Copy the server file
COPY server.js ./

# Copy the built React app from the build stage
COPY --from=build /app/build ./build

# Expose the port the server listens on
EXPOSE 8080

# Start the Node.js server
CMD ["node", "server.js"]
