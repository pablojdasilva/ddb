FROM node:19.7.0-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY api ./
EXPOSE 3000
CMD ["node", "server.js"]