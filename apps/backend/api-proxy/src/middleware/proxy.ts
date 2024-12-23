import ROUTE_PATHS from "../route-defs";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { IncomingMessage } from "http";
import express, { Response } from "express";

interface ProxyConfig {
  [context: string]: Options<IncomingMessage, Response>;
}

// loop routes to forward to the correct service
const proxyConfigs: ProxyConfig = {
  [ROUTE_PATHS.AUTH_SERVICE.path]: {
    target: ROUTE_PATHS.AUTH_SERVICE.target,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.AUTH_SERVICE.path}${path}`;
    },
  },
  [ROUTE_PATHS.PROFILE_USER_SERVICE.path]: {
    target: ROUTE_PATHS.PROFILE_USER_SERVICE.target,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.PROFILE_USER_SERVICE.path}${path}`;
    },
  },
  [ROUTE_PATHS.HISTORY_SERVICE.path]: {
    target: ROUTE_PATHS.HISTORY_SERVICE.target,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.HISTORY_SERVICE.path}${path}`;
    },
  },
};

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    // Apply the proxy middleware
    app.use(context, createProxyMiddleware(proxyConfigs[context]));
  });
};

export default applyProxy;
