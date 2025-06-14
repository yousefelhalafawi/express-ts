import jwt from "jsonwebtoken";

const signToken = (id: string): string => {
  const payload = { id };
  const secret = process.env.JWT_SECRET as string;
  const options: any = {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  };
  return jwt.sign(payload, secret, options);
};

interface UserPayload {
  _id: string;
  password?: string;
  [key: string]: any;
}

export const createSendToken = (user: UserPayload) => {
  const token = signToken(user._id);

  // Remove password before sending response
  user.password = undefined;
  return {
    token,
    data: {
      user,
    },
  };
};
