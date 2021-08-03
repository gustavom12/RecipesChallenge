import jwt from 'jsonwebtoken';
import config from './config/config';
import { User } from './entities/user';

export function Auth({ context }: { context: any }):any {
  //This function verificates if user has a valid bearer token on the header
  if(!config.authToken) return true
  const token = () => {
    const { req } = context;
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  };
  const Async = async () => {
    const user = await User.findOne({ where: { Token: token() } });
    if(user)return true
    return false
  };
  return Async()
}
