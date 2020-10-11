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
    
    //---> Collect Credit card fields
    var ccNum = $('#card_number').val(),
      cvcNum = $('#card_code').val(),
      expMonth = $('#card_month').val(),
      expYear = $('#card_year').val();
    
    //---> Send the card informatino to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });

  //---> Once stripe returns the card token, 
  //---> Inject it as a hidden field 
  //---> Then add form to the database / rails app
});

