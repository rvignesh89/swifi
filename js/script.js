var gui = require('nw.gui');

function _openPopup(){
  gui.Window.open('move.html', {
    position: 'center',
    toolbar: false,
    frame: false,
    width: 150,
    height: 150,
    icon: "img/logo_medium.png"
  });
}

function onMoveClick() {
  _openPopup();
}
