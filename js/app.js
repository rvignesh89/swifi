// Load native UI library
var gui = require('nw.gui');
var win = gui.Window.get();

var _windows = [];

// Create a tray icon
var tray = new gui.Tray({
  title: 'Tray',
  icon: 'img/logo_ico.png'
});


// Give it a menu
var menu = new gui.Menu();
menu.append(new gui.MenuItem({
  type: 'normal',
  label: 'Move',
  click: onMoveClick
}));
menu.append(new gui.MenuItem({
  type: 'separator'
}));
menu.append(new gui.MenuItem({
  type: 'normal',
  label: 'About',
  click: function() {
    _windows.push(gui.Window.open('about.html', {
      position: 'center',
      toolbar: false,
      width: 414,
      height: 409,
      icon: "img/logo_medium.png"
    }));
  }
}));
menu.append(new gui.MenuItem({
  type: 'normal',
  label: 'Close',
  click: function() {
    _windows.forEach(function(x){
      if(x){
        x.close();
      }
    });
    win.close();
  }
}));
tray.menu = menu;

manageWifiMenuItem(menu);

//win.hide();
