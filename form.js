
$(document).ready(function() {
  $('#submit').on('click', function (event) {
    event.preventDefault();
    $( "#date" ).datepicker();

    var person = {
      firstName: $("#first_name").val(),
      lastName: $("#last_name").val(),
      emailId: $("#email").val(),
      password: $("#password").val(),
      phone: $("#phone_number").val(),
      birthday: $("#date").val(),
      country: $('#dropdown option:selected').text(),
      gender: $("input[name=gender]:checked").val(),
      survey: $("input[name=survey]:checked").val()
    }


    var params = JSON.stringify(person);

    $.ajax({
      url: 'http://localhost:3000/person',
      type: 'post',
      data: params,
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {

        var emp_data ='<tr><td>'+data.firstName+'</td><td>'+data.lastName+'</td><td>'+data.emailId+'</td><td>'+data.password+'</td><td>'+data.phone+'</td><td>'+data.birthday+'</td><td>'+data.country +'</td><td>'+data.gender+'</td><td>'+data.survey+'</td></tr>';   
        $('#table').append(emp_data);   
      }
    });
  });

  $.getJSON("http://localhost:3000/person",function(data){
    var emp_data = '';
    $.each(data,function(key,value){
      emp_data +='<tr>';
      emp_data += '<td>'+value.firstName+'</td>';
      emp_data += '<td>'+value.lastName+'</td>';
      emp_data += '<td>'+value.emailId+'</td>';
      emp_data += '<td>'+value.password+'</td>';
      emp_data += '<td>'+value.phone+'</td>';
      emp_data += '<td>'+value.birthday+'</td>';
      emp_data += '<td>'+value.country +'</td>';
      emp_data += '<td>'+value.gender+'</td>';
      emp_data += '<td>'+value.survey+'</td>';
      emp_data += '</tr>';
    });
    $('#table').append(emp_data);
  });
      var email_regex = /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
      var number_regex = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[       \-]*[0-9]{3,4}?$/;
      var name_regex = /^(?!\s*$).+/;
      var pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      var date_regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;

      var isValid = false;
      var confirmPassword_error = false;
      var dropdown_error = false;
      var radio_error = false;
      var checkbox_error = false;



  function validate(fieldId, msg, maxLen, minLen, regEx){
   
    $(fieldId).focusout(function(){
        // alert("hi");
        var $this = $(this);
        var fieldLen = $(this).val().length;
        var fieldVal = $(this).val();
        if(fieldLen >= minLen && fieldLen <= maxLen && regEx.test(fieldVal)   ){
            $this.next('.error-message').text(msg).hide();
            $this.removeClass('ng-invalid');

        }else {
          $this.next('.error-message').text(msg).show();
            $this.addClass('ng-invalid');
            isValid = true;
        }
          
    });
  }
    validate("#first_name","Invalid Name",20,5,name_regex);
    validate("#last_name","Invalid Name",20,5,name_regex);
    validate("#password","Invalid password",15, 8,pass_regex);
    validate("#email","Invalid email",20, 5,email_regex);
    validate("#phone_number","Invalid number ",10,10,number_regex);
    validate("#confirm-password","Password does not match ",15,8,pass_regex);
    validate("#date","Invalid date",12  ,10,date_regex);

    $("#confirmPassword_Error").hide();

   $("#confirm-password").focusout(function(){
      
    var password = $("#password").val();
    var confirm_password = $("#confirm-password").val();
    if(password != confirm_password){
      $("#confirmPassword_Error").html("Password do not match!");
      $("#confirmPassword_Error").show(); 
      confirmPassword_error = true;
    }else {
      $("#confirmPassword_Error").hide();
      }
    });
    
      
      $("#dropdown").focusout(function(){
      
        var dropdown = $("#dropdown").val();
        if('none' == dropdown){
          $('#dropdown').val('');
          $("#dropdown_Error").html("Invalid selection..!");
          $("#dropdown_Error").show();
          dropdown_error = true;
      }else {
        $("#dropdown_Error").hide();
        }  
      });
      
      $("#radio").focusout(function(){
      
        if ($('input[name="gender"]:checked').length == 0) {
          $("#radio_Error").html("please check one field..!");
          $("#radio_Error").show();
          radio_error = true;
      }else {
        $("#radio_Error").hide();
        }  
      });
      
      $("#checkbox").focusout(function(){
      
        if ($("input[type='checkbox'][name='survey']:checked").length == 0) {
          $("#checkbox_Error").html("please check one field..!");
          $("#checkbox_Error").show();
          checkbox_error = true;
      }else {
        $("#checkbox_Error").hide();
        }  
      });
      $('#first_form').on('submit', function() {
        validate();

        if(isValid == false && confirmPassword_error == false && dropdown_error == false && radio_error == false && checkbox_error == false ){
            return true;
        }else{
          return false;
        }
    }); 

});





