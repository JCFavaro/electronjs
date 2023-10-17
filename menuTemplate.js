const template = [
    {
      label: 'Ventanas',
      submenu: [
        {
          label: 'Abrir Ventana',
          click: () => {
            createWindow();
          },
        },
        {
          label: 'Cerrar Ventana',
          click: () => {
            const win = BrowserWindow.getFocusedWindow();
            if (win) {
              win.close();
            }
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'Salir',
          role: 'quit',
        },
      ],
    },
  ];
module.exports = template  