nodetsdb
========

Simple Node module to get datapoints from an OpenTSDB database

## Authors

* Roberto Martin

## Installation

```bash
  npm install nodetsdb --save
```

## Usage


```javascript
var nodetsdb = new Nodetsdb({host:'opentsdbserver.com', port:4242});

var queryconf = {start:'2013/04/04-12:00:00',end:'2013/04/18-15:46:17'
                , metric:'city.weather.temp', aggregator:'avg'
                , tags:{id:44640, quality:0}};
  
nodetsdb.getDataPoints(queryconf, function(datapoints){
    if(datapoints){
        console.log(datapoints);
    }else{
        console.log('No datapoints');
    }
});
```

## Release History

* 0.1.0 Initial release
