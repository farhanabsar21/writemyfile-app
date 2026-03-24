"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_types_1 = require("./user.types");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 255,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        minlength: 6,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        enum: user_types_1.UserPlan,
        type: String,
        default: user_types_1.UserPlan.FREE,
    }),
    __metadata("design:type", String)
], User.prototype, "plan", void 0);
exports.User = User = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            timestamps: true,
            collection: "users",
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    })
], User);
exports.UserModel = (0, typegoose_1.getModelForClass)(User);
