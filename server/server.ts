import {createError} from 'http-errors';
import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import mongoose from 'mongoose';
import logger from 'morgan';
import {apiSentenceRouter, apiPlatformRouter, mainRouter, platformRouter} from './routes';
import initExpressVue from './util/initExpressVue';

export async function bootstrap() {
    const app = express();
    await initExpressVue(app);

    const NODE_ENV = process.env;

    mongoose
        .connect(NODE_ENV.BORGES_DB_HOST, {
            user: NODE_ENV.BORGES_DB_USERNAME,
            pass: NODE_ENV.BORGES_DB_PSW,
            dbName: 'borges-db',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10
        })
        .then(() => console.info('Successfully connected to mongodb'))
        .catch(e => console.error(e));


    app.set('views', path.join(__dirname, '../client/views'));
    app.set('view engine', 'pug');

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/api/sentences', apiSentenceRouter);
    app.use('/api/platforms', apiPlatformRouter);
    app.use('/', mainRouter);
    app.use('/platforms', platformRouter);

    app.use(logger('dev'));

    // catch 404 and forward to error handler
    // app.use(function (req, res, next) {
    //     next(createError(404));
    // });

    // error handler
    /*app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });*/

    const PORT = 4000;

    app.listen({port: PORT}, () => {
        console.info(`🚀 Server ready at http://localhost:${PORT}`)
    })
}