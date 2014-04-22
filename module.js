var http = require('http');

var Nodetsdb = function(configuration){
    if(!configuration.host || !configuration.port){
        throw 'Please provide a host and a port';
    }
    
    this.host = configuration.host;
    this.port = configuration.port;
    
    this.getDataPoints = function(query, callback){
        if(!query.start || !query.end || !query.metric || !query.aggregator){
            throw 'Query parameters missing, min start, end, metric, aggregator';
        }
        var queryURL = "http://"+this.host+":"+this.port+"/api/query?start="+query.start+"&end="+query.end+"&m="+query.aggregator+":"+query.metric;
        if(query.tags){
        queryURL += '{';
            var ntags = Object.keys(query.tags).length;
            var j = 1;
            for(i in query.tags){
                if(j != ntags){
                    queryURL += i+'='+query.tags[i]+",";
                }else{
                    queryURL += i+'='+query.tags[i];
                }
                j++;
            }
        queryURL += '}';            
        }else{
            queryURL +='{}';
        }
        
      //Query correctly created
      http.get(queryURL, function(ress) {
          var responseParts="";
          ress.on('data', function (chunk) {
                responseParts+=chunk;
          });
          ress.on('end', function () {
            callback(responseParts);
          });
       
       }).on('error', function(e) {
           callback();
       });
     
    }
}

module.exports = Nodetsdb;
