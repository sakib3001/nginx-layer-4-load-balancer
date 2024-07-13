FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./*js .
EXPOSE 3000
EXPOSE 9999
CMD ["node", "index.js"]
