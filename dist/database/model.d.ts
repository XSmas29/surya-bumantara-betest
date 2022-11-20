import mongoose from "mongoose";
declare const User: mongoose.Model<{
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    userName: string;
    accountNumber: number;
    emailAddress: string;
    identityNumber: number;
}>>;
export default User;
