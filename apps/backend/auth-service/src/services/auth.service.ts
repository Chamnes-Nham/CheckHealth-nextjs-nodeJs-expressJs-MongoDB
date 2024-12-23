import {
  SignIn,
  SignUp,
  Verifications,
} from "@/src/controllers/auth.controller";

import {
  AdminAddUserToGroupCommand,
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ResendConfirmationCodeCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";
import configs from "@/src/config";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export class AuthService {
  generateSecretHash = (
    username: string,
    clientId: string,
    clientSecret: string
  ) => {
    return crypto
      .createHmac("SHA256", clientSecret)
      .update(username + clientId)
      .digest("base64");
  };

  client = new CognitoIdentityProviderClient({
    region: configs.cognitoRegion,
    credentials: {
      accessKeyId: configs.awsAccessKeyId,
      secretAccessKey: configs.awsAcesssSecretKey,
    },
  });

  getUserInfoFromToken(token: string) {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }

  public async signUpService(request: SignUp) {
    const { username, password, role } = request;

    const secretHash = this.generateSecretHash(
      username,
      configs.cognitoClientId,
      configs.cognitoClientSecret
    );

    const command = new SignUpCommand({
      ClientId: configs.cognitoClientId,
      Username: username,
      Password: password,
      SecretHash: secretHash,
      UserAttributes: [
        {
          Name: "custom:role", // Custom attribute name for role
          Value: role, // Role value passed in the request
        },
      ],
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async verificationsService(request: Verifications) {
    const { username, verifyCode } = request; // Add password here

    const secretHash = this.generateSecretHash(
      username,
      configs.cognitoClientId,
      configs.cognitoClientSecret
    );

    const command = new ConfirmSignUpCommand({
      ClientId: configs.cognitoClientId,
      Username: username,
      ConfirmationCode: verifyCode,
      SecretHash: secretHash,
    });

    try {
      const response = await this.client.send(command);

      // Fetch user attributes to get the role
      const getUserCommand = new AdminGetUserCommand({
        UserPoolId: configs.cognitoUserPoolId,
        Username: username,
      });
      const userInfo = await this.client.send(getUserCommand);

      // Find the custom:role attribute
      const roleAttribute = userInfo.UserAttributes?.find(
        (attr) => attr.Name === "custom:role"
      );
      const role = roleAttribute?.Value || "Users"; // Default to 'Users' if no role is set

      // Determine the group based on the role
      const groupName = role === "Admin" ? "Admins" : "Users";

      // Add user to the appropriate group
      const addToGroupCommand = new AdminAddUserToGroupCommand({
        UserPoolId: configs.cognitoUserPoolId,
        Username: username,
        GroupName: groupName,
      });

      await this.client.send(addToGroupCommand);

      // Create user in profile-user-service
      await this.createUserProfile(userInfo.Username!);

      return response;
    } catch (error) {
      console.error("Error confirming user sign-up or adding to group:", error);
      throw error;
    }
  }

  public async createUserProfile(username: string) {
    try {
      const response = await axios.post(`${configs.userServiceUrl}/users`, {
        userId: username,
      });

      return response.data;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  public async resendVerificationService(username: string) {
    const secretHash = this.generateSecretHash(
      username,
      configs.cognitoClientId,
      configs.cognitoClientSecret
    );

    const command = new ResendConfirmationCodeCommand({
      ClientId: configs.cognitoClientId,
      Username: username,
      SecretHash: secretHash,
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async signInService(request: SignIn) {
    const { username, password } = request;

    const secretHash = this.generateSecretHash(
      username,
      configs.cognitoClientId,
      configs.cognitoClientSecret
    );

    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: configs.cognitoClientId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secretHash,
      },
    });

    try {
      const result = await this.client.send(command);

      // Get the user info
      const congitoUsername = await this.getUserInfoFromToken(
        result.AuthenticationResult?.IdToken!
      );
      // Get the user info from the user service
      // const userInfo = await axios.get(
      //   `${configs.userServiceUrl}/v1/users/${congitoUsername.sub}`,
      // );

      return {
        accessToken: result.AuthenticationResult?.AccessToken!,
        idToken: result.AuthenticationResult?.IdToken!,
        refreshToken: result.AuthenticationResult?.RefreshToken!,
        username: congitoUsername.sub,
      };
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  public async refreshTokenService({
    refreshToken,
    username,
  }: {
    refreshToken: string;
    username: string;
  }) {
    const secretHash = this.generateSecretHash(
      username,
      configs.cognitoClientId,
      configs.cognitoClientSecret
    );

    const command = new InitiateAuthCommand({
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: configs.cognitoClientId,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
        SECRET_HASH: secretHash,
      },
    });

    try {
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      console.error("Error refreshing token:", error);
      throw error;
    }
  }

  public async logoutService(username: string) {
    try {
      console.log(`User ${username} logged out`);
      return { message: "Logout successful" };
    } catch (error) {
      console.error("Error during logout:", error);
      throw error;
    }
  }
}
