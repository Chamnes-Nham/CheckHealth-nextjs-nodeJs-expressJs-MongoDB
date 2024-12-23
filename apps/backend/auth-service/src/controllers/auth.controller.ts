import { Body, Controller, Post, Request, Route, Tags } from "tsoa";
import { AuthService } from "@/src/services/auth.service";
import setCookie from "@/src/utils/cookies";
import { Response, Request as ExpressRequest } from "express";

export interface SignUp {
  username: string;
  password: string;
  role: string;
}

export interface Verifications {
  username: string;
  verifyCode: string;
}

export interface UserCreationRequest {
  username: string;
  password: string;
}

export interface SignIn {
  username: string;
  password: string;
}

@Route("/auth")
@Tags("Auth")
export class AuthController extends Controller {
  private authService = new AuthService();

  @Post("/signup")
  public async signUp(@Body() requestBody: SignUp) {
    try {
      const response = await this.authService.signUpService(requestBody);
      this.setStatus(201);
      return { response, message: "បង្គើតគណនីបានសម្រាច់" };
    } catch (error: any) {
      if (error.name === "UsernameExistsException") {
        this.setStatus(400); // Specific error handling
        return { message: "Email នេះបានចុះឈ្មោះម្តងហើយ" };
      }

      if (error.name === "InvalidPasswordException") {
        this.setStatus(400);
        return {
          message:
            "ពាក្យសម្ងាត់ត្រូវតែប្រវែង៨អក្សឡើង និងមាននិមិត្តសញ្ញាយ៉ាងតិចមួយ",
        };
      }

      if (error.name === "InvalidParameterException") {
        this.setStatus(400);
        return {
          message: "Email មិនត្រឹមត្រូវ",
        };
      } else {
        this.setStatus(500); // General error handling
        return { message: "unexpected error" };
      }
    }
  }

  @Post("verifications")
  public async verifications(@Body() requestBody: Verifications) {
    try {
      const response = await this.authService.verificationsService(requestBody);
      this.setStatus(201);
      return { message: "ជោគជ័យ", response };
    } catch (error: any) {
      if (error.name === "CodeMismatchException") {
        this.setStatus(400);
        return { message: "លេខកូដមិនត្រឹមត្រូវ" };
      }
      if (error.name === "ExpiredCodeException") {
        this.setStatus(400);
        return { message: "លេខកូដមិនត្រឹមត្រូវសូមបញ្ចូលម្តងទៀត" };
      }
      console.log(error);
      return { message: "unexpected error", error };
    }
  }

  @Post("/resend-verification")
  public async resendVerification(@Body() requestBody: { username: string }) {
    try {
      const response = await this.authService.resendVerificationService(
        requestBody.username
      );
      this.setStatus(200);
      return { response };
    } catch (error: any) {
      this.setStatus(500);
      console.log("this is the error", error);
      return { error };
    }
  }

  @Post("/signin")
  public async signIn(
    @Body() requestBody: SignIn,
    @Request() request: Express.Request
  ) {
    try {
      const response = (request as any).res as Response;
      const result = await this.authService.signInService(requestBody);

      if (result.idToken) {
        setCookie(response, "id_token", result.idToken);
        setCookie(response, "access_token", result.accessToken);
        setCookie(response, "refresh_token", result.refreshToken, {
          maxAge: 30 * 24 * 3600 * 1000,
        });
        setCookie(response, "username", result.username!, {
          maxAge: 30 * 24 * 3600 * 1000,
        });
      }

      return { message: "ចូលគណនីដោយជោគជ័យ" };
    } catch (error: any) {
      console.log(error);
      if (error.name === "NotAuthorizedException") {
        this.setStatus(401);
        return { message: "អុីម៉ែល ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ" };
      }
      if (error.name === "UserNotConfirmedException") {
        this.setStatus(400);
        return { message: "គណនីមិនទាន់បានបញ្ជាក់" };
      }
      this.setStatus(500);
      return { message: "មានបញ្ហាក្នុងការចូលគណនីសូមព្យាយាមម្តងទៀតនៅពេលក្រោយ" };
    }
  }

  @Post("/refresh-token")
  public async refreshToken(
    @Request() request: ExpressRequest,
    @Body() requestBody: { username: string; refreshToken: string }
  ) {
    try {
      const response = (request as any).res as Response;
      const refreshToken = request.cookies["refresh_token"];
      const username = request.cookies["username"];

      const result = await this.authService.refreshTokenService({
        refreshToken: requestBody.refreshToken || refreshToken,
        username: requestBody.username || username,
      });
      setCookie(response, "id_token", result.AuthenticationResult?.IdToken!);
      setCookie(
        response,
        "access_token",
        result.AuthenticationResult?.AccessToken!
      );
      return {
        message: "refresh token success",
      };
    } catch (error) {
      this.setStatus(401);
      console.log(error);
      return { message: "Invalid refresh token" };
    }
  }

  @Post("/logout")
  public async logout(@Request() request: ExpressRequest) {
    try {
      const response = (request as any).res as Response;
      const username = request.cookies["username"];

      if (!username) {
        this.setStatus(400);
        return { message: "No active session" };
      }

      const result = await this.authService.logoutService(username);

      // Clear cookies
      setCookie(response, "id_token", "", { maxAge: -1 });
      setCookie(response, "access_token", "", { maxAge: -1 });
      setCookie(response, "refresh_token", "", { maxAge: -1 });
      setCookie(response, "username", "", { maxAge: -1 });

      this.setStatus(200);
      return { result, message: "ចាកចេញពីគណនីដោយជោគជ័យ" };
    } catch (error: any) {
      console.error("Error during logout:", error);
      this.setStatus(500);
      return { message: "មានបញ្ហាក្នុងការចាកចេញពីគណនី" };
    }
  }
}
