"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.default.Schema({
    fid: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pfp: {
        type: String,
    },
    earned: {
        type: Number,
        default: 0,
    },
    invited: {
        type: Number,
        default: 0,
    },
    refer_income: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.models.User || mongoose_1.default.model("User", UserSchema);
