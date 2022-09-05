import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
} from "type-graphql";
import { User } from "./entity/User";
import { compare } from "bcryptjs";

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

      const valid = compare(password, user.password);

      if (!valid) {
        throw new Error("bad password");
      }

      //login successfully

      return {
        accessToken: "",
      };
    }
  }
}
