$(function(){
    $('.lc-subcribe-btn').click(function(){
       var stripe = Stripe('pk_live_51I3f8JB7pfMI27hUObooXVK7am11GVvyNkA9eEEPqvJ1TVE6DVujyhSL6XUlWrgQiW3SaZgvd5fo2frIXGD19xRh00g3Qqi69n');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1I3ltIB7pfMI27hUxlf5uiHA', quantity: 1},
          ],
          mode: 'subscription',
          successUrl: 'https://leadchart.co/success.html',
          cancelUrl: 'https://leadchart.co/cancel.html',
        }).then(function(result) {});
    });

    $('.lc-get-access-btn').click(function(){
       var stripe = Stripe('pk_live_51I3f8JB7pfMI27hUObooXVK7am11GVvyNkA9eEEPqvJ1TVE6DVujyhSL6XUlWrgQiW3SaZgvd5fo2frIXGD19xRh00g3Qqi69n');
         stripe.redirectToCheckout({
          lineItems: [
            {price: 'price_1J80o6B7pfMI27hUQ6qPE07w', quantity: 1},
          ],
          mode: 'payment',
          successUrl: 'https://leadchart.co/success.html',
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