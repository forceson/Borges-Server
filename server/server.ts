import {createError} from 'http-errors';
import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import logger from 'morgan';

import indexRouter from './routes';
import usersRouter from './routes/users';

export function bootstrap() {
    const app = express();

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'pug');

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

    app.use(express.static(path.join(__dirname, '../public')));
    app.use('/', indexRouter);
    app.use('/users', usersRouter);

    app.use(logger('dev'));

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });

    const PORT = 4000;

    app.listen({port: PORT}, () => {
        logger(`🚀 Server ready at http://localhost:${PORT}`)
    })
}