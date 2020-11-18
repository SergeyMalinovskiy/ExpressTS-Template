import * as bodyParser from 'body-parser';

import HomeController from './controllers/home/home.controller';
import App from './app';

import * as dotenv from 'dotenv';

dotenv.config();

const app = new App({
    port: parseInt(process.env.PORT, 10)  || 5000,
    controllers: [
        new HomeController(),
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
    ],
});

app.listen();
