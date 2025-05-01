FROM node:lts-alpine AS build-stage

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install node

COPY . .

# Increase memory limit and build the app
ENV NODE_OPTIONS="--max-old-space-size=2048"

RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:stable-alpine AS production-stage

COPY nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80


CMD ["nginx", "-g", "daemon off;"]