import {Router} from "express";
import Platform from '../../db/Platform'
import Sentence from '../../db/Sentence'

const mainRouter = Router();

mainRouter.get('/', async (req, res: any) => {
    let platforms;
    try {
        platforms = await Platform.find().populate({
            path: 'sentences.sentence',
            select: {'korean': 1, 'japanese': 1},
        }).exec();
    } catch (e) {
        res.status(500).send({succeeded: false, reason: e.message})
    }
    res.renderVue('main.vue', {platforms: JSON.stringify(platforms)});
});

export default mainRouter;
