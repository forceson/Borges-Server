import {Express} from 'express';
import expressVue from 'express-vue';
import path from 'path';

/**
 * vue 로 작성된 클라이언트를 express-vue 로 렌더
 * @param {Express} app
 */
export default async function initExpressVue(app: Express) {
    const vueOptions = {
        pagesPath: path.join(__dirname, '../../client'),
        head: {
            title: 'Borges',
            metas: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
                },
            ],
            scripts: [
                {src: 'https://apis.google.com/js/platform.js', async: true, defer: true},
            ],
            styles: [
                {style: '/global.css'},
            ],
        },
    };

    await expressVue.use(app, vueOptions);
}
