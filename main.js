const { app, BrowserWindow } = require('electron');
const path = require('path');
const Store = require('electron-store');
const store = new Store();

const createWindow = () => {
    const win = new BrowserWindow({
        width: store.get('browserWindow.width') || 800,
        height: store.get('browserWindow.height') || 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        alwaysOnTop: true,
        opacity: 0.75
    })
    win.on('resize', function() {
        const size = win.getSize();
        store.set('browserWindow.width', size[0]);
        store.set('browserWindow.height', size[1]);
    });

    win.setMenu(null);
    //win.loadFile('index.html')
    win.loadURL('https://ricmsd.github.io/timer/pomodoro1/index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
