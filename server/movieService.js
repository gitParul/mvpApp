var https = require('https');

exports.fetch = function(callback) {
  https.get('https://api.themoviedb.org/3/movie/popular?api_key=161ad3ef264e122af96d624fd87a2ff6', (res) => {
    var st = '';
      res.on('data', (chunk) => {
        st += chunk;
        //console.log(st);
      });
      res.on('end', ()=> {
        //console.log(st);
        callback(st);
      });
  });
}