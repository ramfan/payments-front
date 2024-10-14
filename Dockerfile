FROM node:22-alpine as stage_1
COPY . /front
WORKDIR /front
RUN npm install
FROM node:22-alpine as stage_2
COPY --from=stage_1 /front /front
WORKDIR /front
RUN npm run build
FROM nginx:alpine
COPY --from=stage_2 /front/dist /dist
COPY --from=stage_2 /front/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80