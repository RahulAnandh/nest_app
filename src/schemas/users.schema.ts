import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ unique: true, required: true })
  user_name: string;

  @Prop({ required: true })
  display_name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  avatar_url?: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
