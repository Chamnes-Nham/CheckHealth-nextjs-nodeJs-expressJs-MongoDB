import configs from "@/src/config";

export interface RouteConfig {
  path: string;
  target?: string;
  methods?: {
    [method: string]: {
      authRequired: boolean;
      roles?: string[]; // Optional: Roles that are allowed
    };
  };
  nestedRoutes?: RouteConfig[];
}

export interface RoutesConfig {
  [route: string]: RouteConfig;
}

const ROUTE_PATHS: RoutesConfig = {
  AUTH_SERVICE: {
    path: "/auth",
    target: configs.backendUrl,
    nestedRoutes: [
      {
        path: "/signup",
        methods: {
          POST: {
            authRequired: false,
          },
        },
      },
      {
        path: "/verifications",
        methods: {
          POST: {
            authRequired: false,
          },
        },
      },
      {
        path: "/resend-verification",
        methods: {
          POST: {
            authRequired: false,
          },
        },
      },
      {
        path: "/signin",
        methods: {
          POST: {
            authRequired: false,
          },
        },
      },
      {
        path: "/refresh-token",
        methods: {
          POST: {
            authRequired: false,
          },
        },
      },
    ],
  },
  PROFILE_USER_SERVICE: {
    path: "/users",
    target: configs.userServiceUrl,
    nestedRoutes: [
      {
        path: "/:id",
        methods: {
          GET: {
            authRequired: true,
          },
          PUT: {
            authRequired: true,
          },
        },
      },
    ],
  },
  HISTORY_SERVICE: {
    path: "/v1/bloodPressure",
    target: configs.historyServiceUrl,
    nestedRoutes: [
      {
        path: "/latest",
        methods: {
          GET: {
            authRequired: true,
          },
        },
      },
      {
        path: "/",
        methods: {
          POST: {
            authRequired: true,
          },
        },
      },
      {
        path: "/:id",
        methods: {
          DELETE: {
            authRequired: true,
          },
        },
      },
    ],
  },
};

export default ROUTE_PATHS;
