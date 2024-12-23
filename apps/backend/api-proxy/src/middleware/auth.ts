import { Request, Response, NextFunction } from "express";
import { CognitoJwtVerifier } from "aws-jwt-verify";
import configs from "@/src/config";
import ROUTE_PATHS, { RouteConfig } from "@/src/route-defs";

// Initialize the Cognito JWT Verifier
const verifier = CognitoJwtVerifier.create({
  userPoolId: configs.cognitoUserPoolId,
  tokenUse: "access",
  clientId: configs.cognitoClientId,
});

// Extend the Request type to include methodConfig and currentUser
declare global {
  namespace Express {
    interface Request {
      currentUser: {
        username: string;
        role: string[] | undefined;
      };
      routeConfig: RouteConfig;
      methodConfig: {
        authRequired: boolean;
        roles?: string[];
      };
    }
  }
}

// Custom error handling function
const handleError = (res: Response, message: string) => {
  res.status(403).json({ message }); // Use appropriate status code
};

// Authenticate Token Middleware
const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { methodConfig } = req;

    if (methodConfig.authRequired) {
      const token = req.cookies?.["access_token"];
      if (!token) {
        return handleError(res, "Please login to continue");
      }

      const payload = await verifier.verify(token);
      if (!payload) {
        return handleError(res, "Invalid token");
      }

      const role = payload["cognito:groups"] || [];
      req.currentUser = {
        username: payload.username,
        role,
      };
    }

    next();
  } catch (error) {
    console.log("error", error);
    handleError(res, "An error occurred during authentication");
  }
};

// Authorize Role Middleware
const authorizeRole = (req: Request, res: Response, next: NextFunction) => {
  const { methodConfig, currentUser } = req;

  if (methodConfig.roles) {
    if (
      !currentUser ||
      !Array.isArray(currentUser.role) ||
      !currentUser.role.some((role) => methodConfig.roles!.includes(role))
    ) {
      return handleError(res, "Unauthorized: Insufficient permissions");
    }
  }

  next();
};

// Find Route Config Middleware with Dynamic Path Support
const findRouteConfig = (
  path: string,
  routeConfigs: RouteConfig
): RouteConfig | null => {
  // Normalize path and ensure there's a leading slash
  const trimmedPath = path.replace(/\/+$/, ""); // Remove trailing slash, if any

  // STEP 1: Split both the path and routeConfig path into segments
  const requestSegments = trimmedPath.split("/").filter(Boolean); // Split and remove empty segments
  const routeSegments = routeConfigs.path.split("/").filter(Boolean);

  // STEP 2: Check if the number of segments match
  if (routeSegments.length > requestSegments.length) {
    return null; // Path is too short to match this route
  }

  // STEP 3: Match route segments (considering dynamic segments like :productId)
  for (let i = 0; i < routeSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const requestSegment = requestSegments[i];

    if (routeSegment.startsWith(":")) {
      // Dynamic segment, can be anything, so it matches
      continue;
    }

    if (routeSegment !== requestSegment) {
      return null; // Static segment mismatch
    }
  }

  // STEP 4: If no nested routes, return the current routeConfig
  if (!routeConfigs.nestedRoutes) {
    return routeConfigs;
  }

  // STEP 5: Find the remaining path after matching the base path
  const remainingPath = `/${requestSegments.slice(routeSegments.length).join("/")}`;

  // STEP 6: Check if any nested routes match the remaining path
  for (const nestedRouteConfig of routeConfigs.nestedRoutes) {
    const nestedResult = findRouteConfig(remainingPath, nestedRouteConfig);
    if (nestedResult) {
      return nestedResult;
    }
  }

  // If no nested route matches, return the current routeConfig
  return routeConfigs;
};

// Route Config Middleware
const routeConfigMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { path, method } = req;
  let routeConfig = null;
  for (const key in ROUTE_PATHS) {
    routeConfig = findRouteConfig(path, ROUTE_PATHS[key]);

    if (routeConfig) break;
  }

  if (!routeConfig) {
    return handleError(res, "Route not found");
  }

  const methodConfig = routeConfig.methods?.[method];
  if (!methodConfig) {
    return handleError(res, "Method not allowed");
  }

  req.routeConfig = routeConfig;
  req.methodConfig = methodConfig;

  next();
};

export { authenticateToken, authorizeRole, routeConfigMiddleware };
