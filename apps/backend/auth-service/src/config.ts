import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

type Config = {
  env: string;
  port: number;
  mongodbUrl: string;
  cognitoRegion: string;
  awsAccessKeyId: string;
  awsAcesssSecretKey: string;
  cognitoClientId: string;
  cognitoClientSecret: string;
  cognitoUserPoolId: string;
  frontEndUrl: string;
  userServiceUrl: string;
};

// Function to load and validate environment variables
function loadConfig(): Config {
  // Determine the environment and set the appropriate .env file
  const env = process.env.NODE_ENV || "development";
  const envPath = path.resolve(__dirname, `./configs/.env.${env}`);
  dotenv.config({ path: envPath });

  // Define a schema for the environment variables
  const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required(),
    COGNITO_REGION: Joi.string().required(),
    AWS_ACCESS_KEYID: Joi.string().required(),
    AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    COGNITO_CLIENTID: Joi.string().required(),
    COGNITO_CLIENTSECRET: Joi.string().required(),
    COGNITO_USER_POOL_ID: Joi.string().required(),
    FRONTEND_URL: Joi.string().required(),
    USER_SERVICE_URL: Joi.string().required(),
  })
    .unknown()
    .required();

  // Validate the environment variables
  const { value: envVars, error } = envVarsSchema.validate(process.env);
  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongodbUrl: envVars.MONGODB_URL,
    cognitoRegion: envVars.COGNITO_REGION,
    awsAccessKeyId: envVars.AWS_ACCESS_KEYID,
    awsAcesssSecretKey: envVars.AWS_SECRET_ACCESS_KEY,
    cognitoClientId: envVars.COGNITO_CLIENTID,
    cognitoClientSecret: envVars.COGNITO_CLIENTSECRET,
    cognitoUserPoolId: envVars.COGNITO_USER_POOL_ID,
    frontEndUrl: envVars.FRONTEND_URL,
    userServiceUrl: envVars.USER_SERVICE_URL,
  };
}

// Export the loaded configuration
const configs = loadConfig();
export default configs;
