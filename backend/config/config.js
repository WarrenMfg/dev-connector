import { URI_dev, secret_dev, expiresIn_dev, githubAuthToken_dev } from './config_dev';

const isInProductionMode = false;

export const URI = isInProductionMode ?
  process.env.MONGO_URI :
  URI_dev;

export const secret = isInProductionMode ?
  process.env.SECRET :
  secret_dev;

export const expiresIn = isInProductionMode ?
  process.env.EXPIRES_IN :
  expiresIn_dev;

export const githubAuthToken = isInProductionMode ?
  process.env.GITHUB_AUTH_TOKEN :
  githubAuthToken_dev;

