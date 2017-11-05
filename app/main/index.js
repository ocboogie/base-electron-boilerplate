/* eslint global-require: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import * as path from 'path';

import { app, BrowserWindow } from 'electron';

let mainWindow = null;

if (process.env.NODE_ENV !== 'development') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  let nodeModules;
  if (process.env.HOT === 'true') {
    nodeModules = path.join(__dirname, '../app/node_modules');
  } else {
    nodeModules = path.join(__dirname, 'node_modules');
  }
  // $FlowFixMe
  require('module').globalPaths.push(nodeModules);
}

// eslint-disable-next-line no-unused-vars
const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = Boolean(process.env.UPGRADE_EXTENSIONS);
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */
app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    require('electron-debug')();
    // @TODO: Need to get installExtensions to work.
    //        An issue talking about it https://github.com/MarshallOfSound/electron-devtools-installer/issues/55
    // await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });
  if (process.env.HOT === 'true') {
    mainWindow.loadURL(`http://localhost:${process.env.PORT || 1212}`);
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  }

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  // Open dev tools when debugging
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});
