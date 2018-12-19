
$(document).ready(function() {
  $('#submit').on('click', function (event) {
    event.preventDefault();
    var valid = true,
    message = '';

  $('form input').each(function() {
    var $this = $(this);

    if(!$this.val()) {
        var inputName = $this.attr('name');
        valid = false;
        message += 'Please enter your ' + inputName + '\n';
    }
  });
      if(!valid) {
        $('form input').append(message);
      }
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

    // console.log(params);
    $.ajax({
      url: 'http://localhost:3000/person',
      type: 'post',
      data: params,
      dataType: 'json',
      contentType: 'application/json',
      success: function (response) {
      console.log('response', response);
        // debugger;
        // console.log(firstName);
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
    $( function() {
      $( "#date" ).datepicker();
    });

    $( function() {
      $("#firstname_Error").hide();
      $("#lastname_Error").hide();
      $("#emailError").hide();
      $("#password_Error").hide();
      $("#confirmPassword_Error").hide();
      $("#phoneNumber_Error").hide();
      $("#birthdate_Error").hide();


     var firstname_error = false;
     var lastname_error = false;
     var email_error = false;
     var password_error = false;
     var confirmPassword_error = false;
     var phoneNumber_error = false;
     var birthdate_error = false;

     $("#first_name").focusout(function(){
       
        check_firstname();
     });
     $("#last_name").focusout(function(){
      
      check_lastname();

    });
    $("#email").focusout(function(){
      
      check_email();

    });
    $("#password").focusout(function(){
      
      check_password();

    });
    $("#phone_number").focusout(function(){

      check_phoneNumber();

    });
    $("#confirm-password").focusout(function(){
      
      check_confirmPassword();

    });
    $("#date").focusout(function(){
      
      check_date();

    });

    function check_firstname(){
      var firstName_length = $("#first_name").val().length;
      if(firstName_length < 5 || firstName_length > 20){
        $("#firstname_Error").html("Should be between 5-20 characters");
        $("#firstname_Error").show();
        firstname_error = true;
      }else {
        $("#firstname_Error").hide();
        }
    }

    function check_lastname(){
      var lastName_length = $("#last_name").val().length;
      if(lastName_length < 5 || lastName_length > 20){
        $("#lastname_Error").html("Should be between 5-20 characters");
        $("#lastname_Error").show();
        lastname_error = true;
      }else {
        $("#lastname_Error").hide();
        }
    }

    function check_password(){
      var password_length = $("#password").val().length;
      if(password_length < 8){
        $("#password_Error").html("At least 8 characters");
        $("#password_Error").show();
        password_error = true;
      }else {
        $("#password_Error").hide();
        }
    }


    function check_confirmPassword(){
      var password = $("#password").val();
      var confirm_password = $("#confrim_password").val();

      if(password != confirm_password){
        $("#confirmPassword_Error").html("Password do not match!");
        $("#confirmPassword_Error").show(); 

        confirmPassword_Error = true;
      }else {
        $("#confirmPassword_Error").hide();
        }
    }

    function check_phoneNumber() {
       
      var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
      if (filter.test($("#phone_number").val())) {
        $("#phoneNumber_Error").hide();
      }
      else {
        $("#phoneNumber_Error").html("Invalid phone number");
        $("#phoneNumber_Error").show(); 
        phoneNumber_error = true;
      }
  }


    function check_email(){
      var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);

      if(pattern.test($("#email").val())){
        $("#emailError").hide();
       }else{
        $("#emailError").html("invalid email address");
        $("#emailError").show(); 
        email_error = true;
       }
    }
    
    function check_date(){
      var date_length = $("#date").val().length;
      if(date_length == "" ){
        $("#birthdate_Error").html("Please fill this field");
        $("#birthdate_Error").show();
        birthdate_error = true;
      }else {
        $("#birthdate_Error").hide();
        }
    }

    $("#first_form").submit(function(){
        firstname_error = false;
        lastname_error = false;
        email_error = false;
        password_error = false;
        confirmPassword_error = false;
        birthdate_error = false;
        phoneNumber_error = false;

      check_firstname();
      check_lastname();
      check_email();
      check_phoneNumber();
      check_password();
      check_confirmPassword();
      check_date();

      if(firstname_error == false && lastname_error == false && email_error == false && password_error == false && confirmPassword_error == false && phoneNumber_error == false && birthdate_error == false  ){
        return true;
      }else{
        return false;
      }
    });

  });
});

