export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'default',
    expiresIn: process.env.JWT_EXPIRES || '1d'
  }
};
