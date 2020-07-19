import express from 'express';
import Sentence from '../db/Sentence'
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', async (req, res) => {
    let sentences;
    try {
        sentences = await Sentence.find().populate({
            path: 'platforms',
            select: {'name': 1},
        }).exec()
    } catch (e) {
        res.status(500).send({succeeded: false, reason: e.message})
    }
    res.status(200).send(sentences);
});

router.post('/', async (req, res) => {
    let sentence;
    try {
        sentence = await Sentence.create({
            key: req.body.key,
            korean: req.body.korean,
            japanese: req.body.japanese,
            tags: req.body.tags,
        });
    } catch (e) {
        res.status(500).send({succeeded: false, reason: e.message})
    }
    res.status(200).send(sentence);
});

export default router;