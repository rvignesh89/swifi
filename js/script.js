var spawn = require('child_process').spawn;

var _disableWifi = function(){
  var child = spawn('powershell.exe', ['-Command', 'Get-NetAdapter -Name "wi-fi" | Disable-NetAdapter -Confirm:$false']);
  child.stdout.on("data", function(data) {
    console.log("Powershell Data: " + data);
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.on("exit", function() {
    console.log("Disable wi-fi Powershell Script finished");
    _enableWifi();
  });
  child.stdin.end(); //end input
}

var _enableWifi = function(){
  var child = spawn('powershell.exe', ['-Command', 'Get-NetAdapter -Name "wi-fi" | Enable-NetAdapter']);
  child.stdout.on("data", function(data) {
    console.log("Powershell Data: " + data);
  });
  child.stderr.on("data", function(data) {
    console.log("Powershell Errors: " + data);
  });
  child.on("exit", function() {
    console.log("Enable wi-fi Powershell Script finished");
  });
  child.stdin.end(); //end input
}

function onMoveClick() {
  _disableWifi();
}
