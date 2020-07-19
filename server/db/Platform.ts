import {Schema, model, Model, Document} from 'mongoose';

export interface PlatformSchemaInterface extends Document {
    name: string;
    sentences: Array<Object>;
    createdAt?: Date;
    updatedAt?: Date;
}

const PlatformSchema = Schema<PlatformSchemaInterface>({
    name: {type: String, required: true},
    sentences: [{
        _id: {type: Schema.Types.ObjectId, ref: "Sentence", required: true},
        key: {type: String, required: true},
        sentence: {type: Schema.Types.ObjectId, ref: "Sentence", required: true}
    }],
    createdAt: {type: Date, default: Date.now, required: true},
    updatedAt: {type: Date},
});

const Platform: Model<PlatformSchemaInterface> = model('Platform', PlatformSchema);

export default Platform