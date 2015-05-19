var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

app.set('port', (process.env.PORT || 5000));


app.engine('handlebars', exphbs({}));
app.set('view engine', 'handlebars');

app.use("/examples", express.static(__dirname +"/examples/"));
app.use("/presentation",express.static(__dirname +"/reveal.js/"));

app.get("/", function (req, resp) {
    resp.redirect("/presentation/");
});


var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};

app.get("/testData.json", function (req, resp) {
    execute("uptime",function(uptime){
        resp.json({
            serverUptime: uptime
        });
    });;
});

/**
 * Bootstrap the server
 */
var server = app.listen(app.get('port'), function () {
    console.log('Listening on port %d', server.address().port);
});
