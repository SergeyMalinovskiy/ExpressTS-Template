import * as express from 'express';
import { Application } from 'express';

import * as expressHbs from 'express-handlebars';
import * as hbs from 'hbs';

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: any }) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
        this.routes(appInit.controllers);
        this.assets();
        this.template();
    }

    private middlewares(middleWares: {
        forEach: (arg0: (middleWare: any) => void) => void;
    }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes(controllers: {
        forEach: (arg0: (controller: any) => void) => void;
    }) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    private assets() {
        this.app.use(express.static('public'));
        this.app.use(express.static('views'));
    }

    private template() {
        this.app.engine(
            'hbs',
            expressHbs({
                layoutsDir: 'views/layouts',
                defaultLayout: 'main',
                extname: 'hbs',
            })
        );
        this.app.set('view engine', 'hbs');

        hbs.registerPartials(__dirname + 'views/partials');
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}

export default App;
