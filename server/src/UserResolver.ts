import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
} from "type-graphql";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { User } from "./entity/User";

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
    @Arg("password") password: string
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

      //login successfully

      return {
        accessToken: sign({ userId: user.id }, "affgasd", { expiresIn: "15m" }),
      };
    }
  }
}
