import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    user_id: String,

    email: String,

    first_name: String,

    middle_name: String,

    last_name: String,

    duty: String,

    image: String,

    type: String,

    createdDate: Date,

    updatedDate: Date
})
