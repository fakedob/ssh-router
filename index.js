var config = require('./config');

var address = config.address || 'localhost',    //address to forward (local or remote)
    port = config.port || 1880,                 //port to forward
    remotePort = config.remotePort || 9000,     //the port on the server, which will expouse our forwarding to the world
    autoRestartTime = (config.autoRestartTime || 24) * (60 * 60 * 1000), //24 hours to reset the process in case of broken pipes
    dateToString = function(date){
      date = date || new Date();
      return date.toString();
    },
    sshService = function(){
      var autoRestart = false,
      child = require('child_process')
              .exec('ssh -nNT -R ' +
                    remotePort +
                    ':' +
                    address +
                    ':' +
                    port +
                    ' ssh-router'),

      autoRestart = setTimeout(function(){
          autoRestart = true;
          console.info('Auto restart: ' + dateToString());
          child.kill();
      }, autoRestartTime);

      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);

      child.on('exit', function() {
          clearTimeout(autoRestart);
          if(!autoRestart){
            console.info('Service crashed: ' + dateToString());
          }
          setTimeout(function(){
            sshService();
          }, 1000);
      })
}
console.info('Service starting: ' + dateToString());

sshService();
