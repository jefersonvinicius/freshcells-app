import axios from "axios";
import { getUserAuthImperative } from "../state/auth";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult = {
  jwt: string;
  userID: string;
};

export type UserModel = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export class InvalidCredentialsError extends Error {
  constructor() {
    super("InvalidCredentialsError");
  }
}

export class API {
  private static instance = axios.create({
    baseURL: "https://cms.trial-task.k8s.ext.fcse.io",
  });

  static async login(payload: LoginPayload): Promise<LoginResult> {
    const { data } = await this.instance.post("/graphql", {
      query: `
        mutation Login($identifier: String!, $password: String!) {
          login(input: {
            identifier: $identifier,
            password: $password
          }) {
            jwt
            user {
              id
            }
          }
        }      
      `,
      variables: { identifier: payload.email, password: payload.password },
    });

    if (
      !data.data &&
      data.errors[0]?.extensions?.exception?.data?.data?.[0]?.messages?.[0]?.message?.includes(
        "Identifier or password invalid"
      )
    ) {
      throw new InvalidCredentialsError();
    }

    const loginData = data?.data?.login;
    return { jwt: loginData.jwt, userID: loginData.user.id };
  }

  static async fetchUser(): Promise<UserModel> {
    const authData = getUserAuthImperative();
    const { data } = await this.instance.post(
      "/graphql",
      {
        query: `
        query User($id: ID!) {
          user(id: $id) {
            id
            email
            firstName
            lastName
          }
        }   
      `,
        variables: { id: authData?.userID },
      },
      {
        headers: {
          Authorization: `Bearer ${authData?.jwt}`,
        },
      }
    );
    return data?.data?.user;
  }
}
