import Token from "../models/Token.js";
import jwt from "jsonwebtoken";

class TokenService {
  // Generate JWT token
  generateAccessToken(payload) {
    const accesToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "30d",
    });
    return { accesToken, refreshToken };
  }

  //Save token
  async tokenSave(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }

  // Delete token
  async removeToken(refreshToken) {
    const tokenData = Token.deleteOne({ refreshToken });
    return tokenData;
  }
}

export default new TokenService();
