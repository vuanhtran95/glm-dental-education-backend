"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = {
    mongoUri: process.env.ATLAS_URI || '',
    port: process.env.PORT || 9090,
    jwtSecret: process.env.JWT_SECRET || '',
    llamaApi: process.env.LLAMA_URL || '',
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    awsRegion: process.env.AWS_REGION || '',
    s3BucketName: process.env.S3_BUCKET_NAME || '',
};
exports.default = env;
