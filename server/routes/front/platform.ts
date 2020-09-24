import {Router} from "express";
import Platform from '../../db/Platform'
import Sentence from '../../db/Sentence'

const platformRouter = Router();

platformRouter.get('/:id', async (req, res: any) => {
    let platforms;
    try {
        platforms = await Platform.findOne({_id: req.params.id}).populate({
            path: 'sentences.sentence',
            select: {'korean': 1, 'japanese': 1},
        }).exec();
    } catch (e) {
        res.status(500).send({succeeded: false, reason: e.message})
    }
    res.renderVue('platform.vue', {platform: JSON.stringify(platforms)});
});

export default platformRouter;
