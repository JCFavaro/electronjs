// main.js
const { app, BrowserWindow, ipcMain, dialog,Notification , Menu } = require('electron');
const template  = require('./menuTemplate')
app.allowRendererProcessReuse = false;


function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation:false,
      nodeIntegration:true,
    }
  });

  win.loadFile('index.html');
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function showNotification () {
  const NOTIFICATION_TITLE = 'Postman Abierto'
  const NOTIFICATION_BODY = 'Listo para usarse...'
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

app.whenReady().then(createWindow).then(showNotification);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') { 
    app.quit();
  }
});

ipcMain.handle("showDialog", (e, message,error) => {
  if (error){
    dialog.showErrorBox("Error",message)
 }
  else{
    dialog.showMessageBox({
      type: 'info',
      title: 'Consulta',
      message: message,
      buttons: ['OK'],
    })
  }
  ;});


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
