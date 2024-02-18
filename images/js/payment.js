$(function(){
    $('.lc-subcribe-btn').click(function(){
       var stripe = Stripe('pk_live_51KXRLkSDUn4YO1Ua8nNCZle5jxd3nFPxboFxki6PhrehEyuHXSEgvEwVyDgGw548juM4P6gowtPBoIIE8z0LFXDS00aoTzcmMI');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1LGPWFSDUn4YO1UaV3BWLyKo', quantity: 1},
          ],
          mode: 'subscription',
          successUrl: 'https://leadchart.co/success.html',
          cancelUrl: 'https://leadchart.co/cancel.html',
        }).then(function(result) {});
    });
    
    $('#lc-get-access-btn-199').click(function(){
       var stripe = Stripe('pk_live_51KXRLkSDUn4YO1Ua8nNCZle5jxd3nFPxboFxki6PhrehEyuHXSEgvEwVyDgGw548juM4P6gowtPBoIIE8z0LFXDS00aoTzcmMI');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1LBusASDUn4YO1UakI5aaEhn', quantity: 1},
          ],
          mode: 'payment',
          successUrl: 'https://leadchart.co/success.html',
          cancelUrl: 'https://leadchart.co/cancel.html',
        }).then(function(result) {});
    });
    
    $('#lc-get-access-btn-299').click(function(){
       var stripe = Stripe('pk_live_51KXRLkSDUn4YO1Ua8nNCZle5jxd3nFPxboFxki6PhrehEyuHXSEgvEwVyDgGw548juM4P6gowtPBoIIE8z0LFXDS00aoTzcmMI');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1LBusxSDUn4YO1UaaQEPL8gw', quantity: 1},
          ],
          mode: 'payment',
          successUrl: 'https://leadchart.co/success.html',
          cancelUrl: 'https://leadchart.co/cancel.html',
        }).then(function(result) {});
    });
    
    $('.prospecting-99-dollor').click(function(){
       var stripe = Stripe('pk_live_51KXRLkSDUn4YO1Ua8nNCZle5jxd3nFPxboFxki6PhrehEyuHXSEgvEwVyDgGw548juM4P6gowtPBoIIE8z0LFXDS00aoTzcmMI');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1LG0YrSDUn4YO1Uaqbdh9BsO', quantity: 1},
          ],
          mode: 'payment',
          successUrl: 'https://leadchart.co/Contact_form.html',
          cancelUrl: 'https://leadchart.co/cancel.html',
        }).then(function(result) {});
    });
    
    $('.prospecting-299-dollor').click(function(){
       var stripe = Stripe('pk_live_51KXRLkSDUn4YO1Ua8nNCZle5jxd3nFPxboFxki6PhrehEyuHXSEgvEwVyDgGw548juM4P6gowtPBoIIE8z0LFXDS00aoTzcmMI');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1LG0ZJSDUn4YO1UarhjnAu7L', quantity: 1},
          ],
          mode: 'payment',
          successUrl: 'https://leadchart.co/Contact_form.html',
          cancelUrl: 'https://leadchart.co/cancel.html',
        }).then(function(result) {});
    });
    
    $('.prospecting-499-dollor').click(function(){
       var stripe = Stripe('pk_live_51KXRLkSDUn4YO1Ua8nNCZle5jxd3nFPxboFxki6PhrehEyuHXSEgvEwVyDgGw548juM4P6gowtPBoIIE8z0LFXDS00aoTzcmMI');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1LG0ZhSDUn4YO1UaQ5DU1DpR', quantity: 1},
          ],
          mode: 'payment',
          successUrl: 'https://leadchart.co/Contact_form.html',
          cancelUrl: 'https://leadchart.co/cancel.html',
        }).then(function(result) {});
    });

    $('.lc-free-btn').click(function(){
        if (document.getElementById("usemail").value != "" && document.getElementById("usemail").value != "") {
          var email = document.getElementById("usemail").value;
          if(ValidateEmail(email)){
            Email.send({
              Host: "smtp.gmail.com",
              Username : "contactskyrand@gmail.com",
              Password : "specdnaarjurabxo",
              To : 'hi@leadchart.co',
              From : "contactskyrand@gmail.com",
              Subject : "Free Subscriber Info",
              Body : '<h2 style="text-align:center;">Free Subscriber Info</h2><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tbody><tr><td align="center">Email : </td><td align="center">'+email+'</td></tr></tbody></table>',
            }).then(
              message => sendStatus(message)
            );
          } else {
            document.getElementById("usemail").style.borderColor = "red";
            document.getElementById("error-warning").innerHTML = "Please enter a valid email address."
            document.getElementById("error-div").style.display = "block";
          }
        } else {
            document.getElementById("usemail").style.borderColor = "red";
            document.getElementById("error-warning").innerHTML = "Please enter your email address."
            document.getElementById("error-div").style.display = "block";
        }
    });

    $('#usemail').keyup(function(){
        document.getElementById("usemail").style.borderColor = "black";
        document.getElementById("error-div").style.display = "none";
    });

    function ValidateEmail(mail) 
    {
       if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
        {
          return (true)
        } else {
          return (false)
        }
    }

    function sendStatus(status) {
      if (status == "OK"){
          alert("Thank You. You'll receive the data shortly.")
          document.getElementById("usemail").value = "";
      } else {
          alert("Mail has not been submitted. Please contact hi@leadchart.co")
      }
    }

 });