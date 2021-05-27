var braintree = require("braintree");

// var gateway = braintree.connect({
//     environment: braintree.Environment.Sandbox,
//     merchantId: "zdkjvgzx82r5hkhz",
//     publicKey: "kqdn2sqdv4d322rw",
//     privateKey: "69bfb92dd35ff9ff67fd38f869eed6ea"
//   });

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "zdkjvgzx82r5hkhz",       
  publicKey: "kqdn2sqdv4d322rw",
  privateKey: "69bfb92dd35ff9ff67fd38f869eed6ea"
});


exports.getToken = (req,res) =>{
    gateway.clientToken.generate({}, function(err, response) {
        // pass clientToken to your front-end
        if(err){
            res.status(500).json(err)
        }else{
            res.send(response)
        }
      });
}


exports.processPayment = (req,res) =>{
    let nonceFromTheClient = req.body.paymentMethodNonce;
    let amountFromTheClient =req.body.amount

    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function(err, result){
          if(err){
              res.status(500).json(err);
          }else{
              res.json(result);
          }
      });
}