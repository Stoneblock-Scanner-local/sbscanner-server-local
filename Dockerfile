FROM node:20
# Copy everything in app folder
COPY . /app/
# Set app as workdit
WORKDIR /app
# Install depend
RUN yarn install
# Generate prisma client
RUN yarn prisma:generate
# Start application
CMD [ "yarn", "start" ]