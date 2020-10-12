/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta["stripe-key"]').attr('content'))
    
    
  //When user clicks on the form submit, 
  submitBtn.click(function(event){
    //---> prevent default sumission behavior
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    //---> Collect Credit card fields
    var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
      
    //Use stripe js library to check for card errors(Make sure valid card information)
    var error = false;
    
    //Validate card number
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true
      alert("The credit card number is invalid.")
    }
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true
      alert("The CVC number is invalid.")
    }
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true
      alert("The expiration date is invalid.")
    }

    //---> Send the card informatino to stripe
    if(error){
      //If there are card errors, don't send to Stripe.
      submitBtn.prop('disabled', false).val("Sign Up");
    }
    else{
      //Send card information to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    return false;
  });
  
  //Stripe will return a card token
  function stripeResponseHandler(status, response){
    //Get token from response
    var token = response.id;
    
    //---> Once stripe returns the card token
    theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //---> Then add form to the database / rails app
    theForm.get(0).submit();
  }

});

