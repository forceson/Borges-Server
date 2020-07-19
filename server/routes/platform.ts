import express from 'express';
import Platform from '../db/Platform'
import Sentence from '../db/Sentence'
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', async (req, res) => {
    let platforms;
    try {
        platforms = await Platform.find().populate({
            path: 'sentences.sentence',
            select: {'korean': 1, 'japanese': 1},
        }).exec();
    } catch (e) {
        res.status(500).send({succeeded: false, reason: e.message})
    }
    res.status(200).send(platforms);
});

router.post('/', async (req, res) => {
    let platform;
    try {
        platform = await Platform.create({
            name: req.body.name,
            sentences: req.body.sentences,
        });
    } catch (e) {
        res.status(500).send({succeeded: false, reason: e.message})
    }
    res.status(200).send(platform);
});

router.put('/', async (req, res) => {
    let platform;
    try {
        platform = await Platform.findByIdAndUpdate(
            req.body.platformId,
            {$addToSet: {sentences: req.body.sentences}},
            {new: true, useFindAndModify: false});
        let sentenceIds = req.body.sentences.map(sentence => sentence.sentence);
        await Sentence.updateMany({_id: {$in: sentenceIds}}, {$addToSet: {platforms: [req.body.platformId]}}, {new: true})
    } catch (e) {
        res.status(500).send({succeeded: false, reason: e.message})
    }
    res.status(200).send(platform);
});

export default router;