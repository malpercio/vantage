var assert = require("assert")
  , should = require('should')
  , Vantage = require('../../')
  , http = require('http')
  ;

var create = function(fn, port, ssl) {
  
  var vantage = new Vantage();

  vantage
    .command('foo')
    .description('Should return "bar".')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){
        console.log('bar');
        resolve();
      });
    });

  vantage
    .command('fuzzy')
    .description('Should return "wuzzy".')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){
        console.log('wuzzy');
        resolve();
      });
    });

  vantage
    .command('optional [arg]')
    .description('Should optionally return an arg.')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){
        console.log(args.arg || '');
        resolve();
      });
    });

  vantage
    .command('required <arg>')
    .description('Must return an arg.')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){
        console.log(args.arg);
        resolve();
      });
    });

  vantage
    .command('deep command [arg]')
    .description('Tests execution of deep command.')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){
        console.log(args.arg);
        resolve();
      });
    });

  vantage
    .command('very deep command [arg]')
    .description('Tests execution of three-deep command.')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){
        console.log(args.arg);
        resolve();
      });
    });

  vantage
    .command('count <number>')
    .description('Tests execution of three-deep command.')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){
        console.log(args.number);
        resolve();
      });
    });

  vantage
    .command('very complicated deep command [arg]')
    .option('-r', 'Test Option.')
    .option('-a', 'Test Option.')
    .option('-d', 'Test Option.')
    .option('-s, --sleep', 'Test Option.')
    .option('-t', 'Test Option.')
    .option('-i [param]', 'Test Option.')
    .description('Tests execution of three-deep command.')
    .action(function(args, cb){
      return new Promise(function(resolve, reject){

        var str = '';
        str = (args.options.r === true) ? str + 'r' : str;
        str = (args.options.a === true) ? str + 'a' : str;
        str = (args.options.d === true) ? str + 'd' : str;
        str = (args.options.t === true) ? str + 't' : str;
        str = (args.options.i === 'j') ? str + args.options.i : str;
        str = (args.options.sleep === 'well') ? str + args.options.sleep : str;
        str = str + (args.arg || '');

        console.log(str);
        resolve();
      });
    });

  vantage
    .delimiter(port + ':')
    .listen(function(req, res) { }, {
      port: port,
      ssl: ssl
    });


  return vantage;
}

var handler = function(req, res) {
  console.log(this._port);
  res.write('');
  res.end();
}

var svr = create(handler, process.argv[2], process.argv[3]);

