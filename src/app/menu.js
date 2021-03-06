const electron = require('electron')
const Menu = electron.Menu
const app = electron.app

let template = [{
  label: 'View',
  submenu: [{
    label: 'Toggle Full Screen',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'Corsi Block Tapping Test',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: 'Application Menu Demo',
          buttons: ['Ok'],
          message: 'Esta aplicación es desarrollada con fines de realizar pruebas de memoria a niños, analizar sus resultados y ayudar a mejorar sus transtornos.'
        }
        electron.dialog.showMessageBox(focusedWindow, options, function () {})
      }
    }
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: 'Reopen Window',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }]
}]

module.exports = {
  template: template,
  findReopenMenuItem: function findReopenMenuItem () {
                        const menu = Menu.getApplicationMenu()
                        if (!menu) return

                        let reopenMenuItem
                        menu.items.forEach(function (item) {
                          if (item.submenu) {
                            item.submenu.items.forEach(function (item) {
                              if (item.key === 'reopenMenuItem') {
                                reopenMenuItem = item
                              }
                            })
                          }
                        })
                        return reopenMenuItem
                      },
  addUpdateMenuItems: function addUpdateMenuItems (items, position) {
                        if (process.mas) return

                        const version = electron.app.getVersion()
                        let updateItems = [{
                          label: `Version ${version}`,
                          enabled: false
                        }, {
                          label: 'Checking for Update',
                          enabled: false,
                          key: 'checkingForUpdate'
                        }, {
                          label: 'Check for Update',
                          visible: false,
                          key: 'checkForUpdate',
                          click: function () {
                            require('electron').autoUpdater.checkForUpdates()
                          }
                        }, {
                          label: 'Restart and Install Update',
                          enabled: true,
                          visible: false,
                          key: 'restartToUpdate',
                          click: function () {
                            require('electron').autoUpdater.quitAndInstall()
                          }
                        }]

                        items.splice.apply(items, [position, 0].concat(updateItems))
                      }
}
