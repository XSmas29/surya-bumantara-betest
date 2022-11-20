FROM node:16.16

WORKDIR /ms-surya-bumantara-betest

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3030
ENV MONGO_URI=mongodb+srv://admin:admin123@xsmas29.ihmno4p.mongodb.net/?retryWrites=true&w=majority
ENV JWT_SECRET=5d0f7a27fe8a66efe169db0023307a234a54f0630d20f2df35258f9b427e29f74bba7caec56fe8d328a939d14c64df39748bf46ab778f73053549901c6198e4c
ENV REDIS_EXPIRATION_TIME=300

EXPOSE 3030

CMD [ "npm", "run", "start" ]