#* dockerfile for the backend 
FROM node:18-alpine
#* Create app directory
WORKDIR /app
#* Copy package.json and package-lock.json
COPY package.json package-lock.json ./
#* Install app dependencies
RUN npm install
#* Bundle app source
COPY . .
#* Expose port and start application
EXPOSE 3000
#* Start the application
CMD [ "npm", "run", "start" ]