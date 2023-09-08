import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
    @Prop({ type: SchemaTypes.ObjectId })
    //mongoose.Schema.Types.ObjectId
  _id: Types.ObjectId;
}

//The @Prop() decorator defines a property in the document