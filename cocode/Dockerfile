FROM node:12.13.0 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY package.json /usr/src/app/package.json
RUN npm install --silent
RUN npm install react-scripts@2.1.3 -g --silent

COPY . /usr/src/app
RUN npm run build

### 

FROM nginx:1.13.9-alpine

RUN rm -rf /etc/nginx/conf.d
COPY nginx /etc/nginx

COPY --from=builder /usr/src/app/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]