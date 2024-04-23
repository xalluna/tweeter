FROM node:alpine as build

WORKDIR /web
COPY package.json package-lock.json ./
RUN NODE_ENV=development npm install
COPY . .

RUN npm run build

## UP NGINX STAGE

FROM nginx:alpine

COPY --from=build /web/dist /usr/share/nginx/html
COPY --from=build /web/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]