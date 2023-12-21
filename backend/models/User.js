const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = mongoose.Schema({
        UserName: {
            type: String,
            required: [true, " Please add your username. "],
        },
        FirstName: {
            type: String,
            required: [true, " Please add your Firstname. "],
        },
        LastName: {
            type: String,
            required: [true, " Please add your Lastname. "],
        },
        ProfilePhoto: {
            type: String,
        },
        Gender: {
            type: String,
            required: [true, " Please add mention your Gender. "]
        },
        Bio: {
            type: String
        },
        DoB: {
            type: Date,
            required: [true, " Please add your birthdate. "]
        },
        Email: {
            type: String,
            required: [true, " Please add your email. "],
            unique: [true,"Email address already taken. "]
        },
        Password: {
            type: Buffer,
            required: [true, " Please add your password. "]
        },
        ExecutionJobs:[{ type: Schema.Types.ObjectId, ref:'Job' }],
        salt: Buffer
    },
    {
        timestamps: true,
    }
);

const virtualId = userSchema.virtual('id');
virtualId.get(function () {
    return this._id;
})

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

module.exports = mongoose.model("User", userSchema);
