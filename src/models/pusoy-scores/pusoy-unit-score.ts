import { Schema } from "mongoose";

const pusoyUnitSchema = new Schema(
    {
        name: {
            type: String,
            required: false,
        },
        units: {
            type: Number,
            required: true,
        },
    },
    { _id: false },
);

export default pusoyUnitSchema;
