FROM node:22.14

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm config set only-allow-trusted-dependencies true

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]