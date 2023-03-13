FROM node:14-alpine 

# Install dependencies
RUN npm install

# Build the app
RUN npm run build

# Copy application code
COPY . .

# Start the server (production mode)
CMD ["npm", "run", "start"]