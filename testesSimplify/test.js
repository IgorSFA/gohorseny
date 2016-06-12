var http = require('http');
var qs = require('querystring');
var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_ZmQ0OGM2MTUtNWE5OC00MGVhLTg3NzYtNzcxNDlmYmUwMTg3',
        privateKey: 'JwCKHI0twcpfwV3uDlv15QEZWxHgA6dmfQBYVBum+IJ5YFFQL0ODSXAOkNtXTToq'
    });
// client.customer.create({
//     token : "[TOKEN ID]",
//     email : "customerToken@mastercard.com",
//     name : "Customer CustomerToken",
//     reference : "Ref1"
// }, function(errData, data){
 
//     if(errData){
//         console.error("Error Message: " + errData.data.error.message);
//         // handle the error
//         return;
//     }
 
//     console.log("Success Response: " + JSON.stringify(data));
// });

function handleRequest(req, res){
    var token = '';
    console.log('entrei');
    req.on('data', function(data){
        token+=data;
    })
    .on('end', function(){
        post = qs.parse(token);
        const TOKEN = post.postToken;
        console.log(TOKEN);
        client.payment.create({
            amount : "1000",
            token: TOKEN,
            description : "payment description",
            reference : "7a6ef6be31",
            currency : "USD"
        }, function(errData, data){ 
            if(errData){
                console.error("Error Message: " + errData.data.error.message);
                // handle the error
                res.end('Error');
            }
            //.paymentStatus
            console.log("Payment Status: " + data.paymentStatus);
            url ="http://www.google.com";
            body = "Goodbye cruel localhost";
            res.writeHead(301, {
                'Location': url,
                'Content-Length': body.length,
                'Content-Type': 'text/plain'
            });
        res.end(body);
        });
    });
}

http.createServer(handleRequest).listen(3000);