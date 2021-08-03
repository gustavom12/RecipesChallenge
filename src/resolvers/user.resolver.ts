import { Query, Resolver, Arg, Mutation, FieldResolver, Root } from 'type-graphql';
import { User } from '../entities/user';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { Recipe } from '../entities/recipe';

@Resolver((of) => User)
export class UserResolver {
  @Mutation(() => User)
  async login(@Arg('Email') Email: string, @Arg('Password') Password: string) {
    try {
      const user = await User.findOne({ where: { Email } });
      if (!user) throw new Error("this email doesn't exists");
      if (jwt.decode(user.Password) !== Password)
        throw new Error('Password is incorrect');
      return user;
    } catch (error) {
      return error;
    }
  }

  @Query(() => [User])
  async getUsers() {
    try {
      return await User.find();
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => String)
  async signUp(
    @Arg('Name') Name: string,
    @Arg('Email') Email: string,
    @Arg('Password') Password: string
  ) {
    try {
      const emailAlreadyExists = await User.findOne(Email);
      if (emailAlreadyExists) throw new Error('this email is already in use');
      const nameAlreadyExists = await User.findOne(Name);
      if (nameAlreadyExists) throw new Error('this name is already in use');
      //encrypt password of user to protect it in case of any hacker want to see it
      const encryptedPassword = jwt.sign(Password, config.encryptPassword);
      //creates a login token to the user based on Email and Password
      const Token = jwt.sign({ Email, Password }, config.encryptPassword);
      await User.insert({ Name, Email, Password: encryptedPassword, Token });
      return 'User has been registered successfully';
    } catch (error) {
      return error;
    }
  }

  @FieldResolver(() => [Recipe])
  //Resolve this field every time that is queried
  async Recipes(@Root() user: User) {
    const recipes = []
    for(let i in user.Recipes) recipes.push(await Recipe.findOne(user.Recipes[i]))
    return recipes;
  }
}
