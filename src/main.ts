// main.ts

import { app, BrowserWindow, ipcMain } from 'electron'; // ← Add ipcMain
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import started from 'electron-squirrel-startup';
import Store from 'electron-store'; // ← Add this line to import electron-store

// Initialize the store. It will automatically create a JSON file in the correct app data directory.
const store = new Store();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (started) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Important: Ensure preload is correctly linked. Your existing path is correct.
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  mainWindow.webContents.openDevTools();
};

app.on('ready', () => {
  // --- Add these handlers before creating the window ---

  // This listens for the 'get-tasks' message from your React app (via preload.ts)
  ipcMain.handle('get-tasks', () => {
    // Retrieve tasks. If 'tasks' doesn't exist, it returns an empty array.
    return store.get('tasks', []);
  });

  // This listens for the 'set-tasks' message to save data
  ipcMain.on('set-tasks', (event, tasks) => {
    store.set('tasks', tasks); // Save the tasks array to the JSON file.
  });

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});