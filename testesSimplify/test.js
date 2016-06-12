var http = require('http');
var qs = require('querystring');
var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_ZmQ0OGM2MTUtNWE5OC00MGVhLTg3NzYtNzcxNDlmYmUwMTg3',
        privateKey: 'JwCKHI0twcpfwV3uDlv15QEZWxHgA6dmfQBYVBum+IJ5YFFQL0ODSXAOkNtXTToq'
    });
 
function handleRequest(req, res){
    var token = '';
    req.on('data', function(data){
        token+=data;
    })
    .on('end', function(){
        post = qs.parse(token);
        console.log(post.postToken);
        client.payment.create({
            amount : "1000",
            token: post.postToken,
            description : "payment description",
            reference : "7a6ef6be31",
            currency : "USD"
        }, function(errData, data){ 
            if(errData){
                console.error("Error Message: " + errData.data.error.message);
                // handle the error
                res.end('Sucesso');
            }
         
            console.log("Payment Status: " + data.paymentStatus);
        });
    });
}

http.createServer(handleRequest).listen(3000);