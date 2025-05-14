FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /tests

COPY package.json ./
COPY playwright.config.ts ./
COPY tests ./tests

RUN npm install

CMD ["npx", "playwright", "test"]
