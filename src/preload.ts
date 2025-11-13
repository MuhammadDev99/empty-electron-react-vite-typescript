// preload.ts

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object.
contextBridge.exposeInMainWorld('electronAPI', {
    // Function to get tasks from the main process
    getTasks: (): Promise<any[]> => ipcRenderer.invoke('get-tasks'),

    // Function to send tasks to the main process for saving
    setTasks: (tasks: any[]) => ipcRenderer.send('set-tasks', tasks),
});