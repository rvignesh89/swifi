var spawn = require('child_process').spawn;
var _progressBar = document.getElementById('progress');

var _disableWifi = function() {
  var child = spawn('powershell.exe', ['-Command', 'Get-NetAdapter -Name "wi-fi" | Disable-NetAdapter -Confirm:$false']);
  child.stdout.on("data", function(data) {
    console.log("Powershell Data: " + data);
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.on("exit", function() {
    console.log("Disable wi-fi Powershell Script finished");
    _progressBar.innerHTML += 'Disabled Wifi<br/>';
    _enableWifi();
  });
  child.stdin.end(); //end input
}

var _enableWifi = function() {
  _progressBar.innerHTML += 'Reconnecting...<br/>';
  var child = spawn('powershell.exe', ['-Command', 'Get-NetAdapter -Name "wi-fi" | Enable-NetAdapter']);
  child.stdout.on("data", function(data) {
    console.log("Powershell Data: " + data);
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.on("exit", function() {
    console.log("Enable wi-fi Powershell Script finished");
    _progressBar.innerHTML += 'Re enabled!<br/>';
    setTimeout(function() {
      window.close();
    }, 500);
  });
  child.stdin.end(); //end input
}

_disableWifi();
