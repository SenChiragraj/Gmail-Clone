import jwt from 'jsonwebtoken'

export const genrateToken = (data) => {
  return jwt.sign({ data }, process.env.SECRET_KEY, {
    expiresIn : '30d'
  });
}