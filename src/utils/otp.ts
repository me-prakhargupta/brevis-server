import crypto from "crypto";

export const generatOTP = () => {
    return Math.floor(10000 + Math.random() * 999999).toString();
};

export const hashOTP = (otp: string) => {
    return crypto.createHash("sha256").update(otp).digest("hex");
};