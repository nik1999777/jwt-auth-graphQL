import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Ctx,
} from "type-graphql";
import { compare } from "bcryptjs";
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { createAccessToken, createRefreshToken } from "./auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    {
      const user = await User.findOne({
        where: { email: email },
      });

      if (!user) {
        throw new Error("could not find user");
      }

      const valid = await compare(password, user.password);

      if (!valid) {
        throw new Error("bad password");
      }

      res.cookie("jid", createRefreshToken(user), { httpOnly: true });

      return {
        accessToken: createAccessToken(user),
      };
    }
  }
}
