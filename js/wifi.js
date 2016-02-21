var gui = require('nw.gui');
var spawn = require('child_process').spawn;
var _wifiMenu;
var _wifiNameItem;

function manageWifiMenuItem(menu) {
  _wifiMenu = menu;
  checkIfWifiIsConnected();
}

function getWifiStrength() {
  var child = spawn('powershell.exe', ['-Command', "(netsh wlan show interfaces) -Match '^\\s+Signal' -Replace '^\\s+Signal\\s+:\\s+',''"]);
  child.stdout.on("data", function(data) {
    var output = ('' + data).trim();
    _wifiNameItem.label += ' (' + output + ')';
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.on('exit',function(){
    console.log('getWifiStrength exits')
  });
  child.stdin.end(); //end input
}

function getWifiName() {
  var child = spawn('powershell.exe', ['-Command', "(netsh wlan show interfaces) -Match '^\\s+SSID' -Replace '^\\s+SSID\\s+:\\s+',''"]);
  child.stdout.on("data", function(data) {
    var output = ('' + data).trim();
    _wifiMenu.insert(new gui.MenuItem({
      type: 'separator'
    }), 0);
    _wifiNameItem = new gui.MenuItem({
      type: 'normal',
      label: output
    });
    _wifiMenu.insert(_wifiNameItem, 0);
    getWifiStrength();
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.stdin.end(); //end input
}

function checkIfWifiIsConnected() {
  var child = spawn('powershell.exe', ['-Command', '(Get-NetAdapter -Name Wi-fi).MediaConnectionState']);
  child.stdout.on("data", function(data) {
    var output = ('' + data).trim();
    console.log(output);
    if (output === 'Connected') {
      console.log('Connected! Yaay!');
      getWifiName();
    }
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.stdin.end(); //end input
}
