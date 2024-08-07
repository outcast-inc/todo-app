"use server"
import { GET_IDENTITY, LOGIN_USER } from "@/graphql/queries";
import client from "../apolloClient";
import { parseStringify } from "../utils";

const createClient = client()

export const loginCurrentUser = async(username: string, password: string) => {
  try {
    const loginData = await createClient.query({
      variables: {login: {username, password}},
      query: LOGIN_USER,
  });

  return parseStringify(loginData.data.login);
  } catch (error) {
    console.log(error)
  }
}

export const getIdentity = async(accessToken: string) => {
    try {
        const userIdentity = await createClient.query({
            variables: {accessToken},
            query: GET_IDENTITY
        })
        return parseStringify(userIdentity)
    } catch(error) {
        console.log(error);
    }
}
