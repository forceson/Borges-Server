import {Schema, model, Model, Document} from 'mongoose';

export interface SentenceSchemaInterface extends Document {
    korean: string;
    japanese: string;
    tags: Array<string>
    createdAt?: Date;
    updatedAt?: Date;
}

const SentenceSchema = Schema<SentenceSchemaInterface>({
    korean: {type: String, required: true},
    japanese: {type: String, required: false},
    tags: {type: Array},
    platforms: [{
        type: Schema.Types.ObjectId,
        ref: "Platform"
    }],
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date},
});

const Sentence: Model<SentenceSchemaInterface> = model('Sentence', SentenceSchema);

export default Sentence