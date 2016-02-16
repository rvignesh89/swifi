// Load native UI library
var gui = require('nw.gui');
var win = gui.Window.get();

// Create a tray icon
var tray = new gui.Tray({
  title: 'Tray',
  icon: 'img/tray.png'
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
    gui.Window.open('about.html', {
      position: 'center',
      toolbar: false,
      width: 368,
      height: 327
    });
  }
}));
menu.append(new gui.MenuItem({
  type: 'normal',
  label: 'Close',
  click: function() {
    win.close(true);
  }
}));
tray.menu = menu;

win.hide();
