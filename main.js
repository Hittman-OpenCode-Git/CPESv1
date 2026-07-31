// ============================================================
// CMA Learning Platform — Electron Desktop Shell (S124)
// ============================================================

const { app, BrowserWindow, dialog, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

const APP_NAME = 'CMA Learning Platform';
const APP_VERSION = '0.10.1-alpha';

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1024,
        minHeight: 700,
        title: APP_NAME,
        icon: path.join(__dirname, 'assets', 'icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        },
        backgroundColor: '#f0f2f5',
        show: false
    });

    mainWindow.loadFile('index_updated.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Remove default menu for clean desktop appearance
    Menu.setApplicationMenu(buildMenu());
}

function buildMenu() {
    const template = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Export Progress',
                    accelerator: 'CmdOrCtrl+E',
                    click: () => mainWindow.webContents.executeJavaScript('if(typeof CMAProfileManager!=="undefined")CMAProfileManager.backupAllProgress()')
                },
                {
                    label: 'Import Progress',
                    accelerator: 'CmdOrCtrl+I',
                    click: async () => {
                        const result = await dialog.showOpenDialog(mainWindow, {
                            title: 'Import CMA Learning Platform Progress',
                            filters: [{ name: 'JSON Backup', extensions: ['json'] }],
                            properties: ['openFile']
                        });
                        if (!result.canceled && result.filePaths.length > 0) {
                            const data = fs.readFileSync(result.filePaths[0], 'utf-8');
                            mainWindow.webContents.executeJavaScript(`(function(){try{var d=${data};if(typeof CMAProfileManager!=="undefined"){CMAProfileManager.executeImport(d);alert("Profile imported. Reloading to apply.");location.reload()}}catch(e){alert("Import failed: "+e.message)}})()`);
                        }
                    }
                },
                { type: 'separator' },
                { role: 'quit' }
            ]
        },
        {
            label: 'View',
            submenu: [
                { role: 'reload', label: 'Reload' },
                { role: 'toggleDevTools', label: 'Developer Tools' },
                { type: 'separator' },
                { role: 'resetZoom', label: 'Actual Size' },
                { role: 'zoomIn', label: 'Zoom In' },
                { role: 'zoomOut', label: 'Zoom Out' }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'Quick Start Guide',
                    click: () => mainWindow.webContents.executeJavaScript('if(typeof GuidedTour!=="undefined")GuidedTour.start("beginner")')
                },
                {
                    label: 'Help Center',
                    click: () => mainWindow.webContents.executeJavaScript('if(typeof showView!=="undefined")showView("helpView");if(typeof renderHelpCenter!=="undefined")renderHelpCenter()')
                },
                { type: 'separator' },
                {
                    label: 'About CMA Learning Platform',
                    click: () => {
                        dialog.showMessageBox(mainWindow, {
                            type: 'info',
                            title: 'About CMA Learning Platform',
                            message: APP_NAME,
                            detail: `Version ${APP_VERSION}\n\nCMA Part 1 Exam Simulator\n\n2,545 Part 1 MCQs across 5 question packs\n75 integrated case studies\nMay AI Coaching Layer\n\nOriginal study content. Not real CMA exam questions.\nNot endorsed by IMA.`,
                            buttons: ['OK']
                        });
                    }
                }
            ]
        }
    ];

    // macOS-specific menu adjustments
    if (process.platform === 'darwin') {
        template.unshift({
            label: app.getName(),
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services' },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideOthers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' }
            ]
        });
    }

    return Menu.buildFromTemplate(template);
}

// ── Single-instance lock ──
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
