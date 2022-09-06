import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Ctx,
  UseMiddleware,
  Int,
} from "type-graphql";
import { compare } from "bcryptjs";
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { createAccessToken, createRefreshToken } from "./auth";
import { isAuth } from "./isAuth";
import { sendRefreshToken } from "./sendRefreshToken";
import { AppDataSource } from "./data-source";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await AppDataSource.getRepository(User).increment(
      { id: userId },
      "tokenVersion",
      1
    );

    return true;
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

      sendRefreshToken(res, createRefreshToken(user));

      return {
        accessToken: createAccessToken(user),
      };
    }
  }
}
