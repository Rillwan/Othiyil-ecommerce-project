import bcrypt from "bcrypt";

// HASH PASSWORD
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// COMPARE PASSWORD
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

// ------------- OTP ----------------
// Generates a 4-digit OTP
export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// set 5 minutes expiry OTP
export const generateExpiry = () => {
  return Date.now() + 3 * 60 * 1000;
};
