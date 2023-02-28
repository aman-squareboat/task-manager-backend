import app from './app';
import db from './database';
import settings from './settings';
import cache from './cache';
import queue from './queue';
import auth from './auth';
import notification from './notification';


export default [
  app,
  db,
  settings,
  cache,
  queue,
  auth,
  notification,
];
