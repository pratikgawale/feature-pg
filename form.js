$(document).ready(function () {

  $('#first_form').submit(function (e) {
    e.preventDefault();
    var first_name = $('#first_name').val();
    var last_name = $('#last_name').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var confirm_password = $('#confirm-password').val();
    var phone_number = $('#phone_number').val();
    var date_birth = $('#date').val();
    var dropdown = $('#dropdown').val();

    $(".error").remove();

    if (first_name.length < 1) {
      $('#first_name').after('<span class="error">This field is required</span>');
    }
    if (last_name.length < 1) {
      $('#last_name').after('<span class="error">This field is required</span>');
    }
    if (email.length < 1) {
      $('#email').after('<span class="error">This field is required</span>');
    } else {
      var regEx = /^[A-Z0-9][A-Z0-9._%+-]{0,63}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/;
      var validEmail = regEx.test(email);
      if (!validEmail) {
        $('#email').after('<span class="error">Enter a valid email</span>');
      }
    }
    if (password.length < 8) {
      $('#password').after('<span class="error">Password must be at least 8 characters long</span>');
    }
    if (confirm_password.length < 8 && confirm_password != password) {
      $('#confirm-password').after('<span class="error">Password does not match</span>');
    }
    if (phone_number.length < 1) {
      $('#phone_number').after('<span class="error">This field is required</span>');
    } else {
      var regEx1 = /([0-9]{10})|(\([0-9]{3}\)\s+[0-9]{3}\-[0-9]{4})/;
      var validNumber = regEx1.test(phone_number);
      if (!validNumber) {
        $('#phone_number').after('<span class="error">Enter a valid number</span>');
      }
    }
    if (date_birth.length < 1) {
      $('#date').after('<span class="error">This field is required</span>');
    }
    if (dropdown.length < 1) {
      $('#dropdown').after('<span class="error">This field is required</span>');
    }

  });

});
document.getElementById('submit').addEventListener('click', function () {

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

  console.log(params)
  $.ajax({
    url: 'http://localhost:3000/person',
    type: 'post',
    data: params,
    dataType: 'json',
    contentType: 'application/json',
    success: function () {
      console.log(firstName);
    }
  });
  // var tbl = $("<table/>").attr("id", "mytable");
  // $("#div1").append(tbl);
  // for (var i = 0; i < person.length; i++) {
  //   var tr = "<tr>";
  //   var td1 = "<td>" + person[i]["id"] + "</td>";
  //   var td2 = "<td>" + person[i]["name"] + "</td>";
  //   var td3 = "<td>" + person[i]["color"] + "</td></tr>";

  //   $("#mytable").append(tr + td1 + td2 + td3);

  // }


  for (var i = 0; i < person.length; i++) {
    var tr = $('<tr/>');
    
    // Indexing into data.report for each td element
    $(tr).append("<td>" + person[i] + "</td>");
    $(tr).append("<td>" + person[i] + "</td>");
    $(tr).append("<td>" + params[i] + "</td>");
    $('.table1').append(tr);
  }
});
// $(document).ready(function() {
//   // Using the JSON format from your question
//   var data = {
//     "report": [{
//         "Mes": "Abril",
//         "Dia": "13",
//         "Local": "Lisboa",

//     }]
//   };

//   // Loop through data.report instead of data
//   for (var i = 0; i < data.report.length; i++) {
//     var tr = $('<tr/>');
    
//     // Indexing into data.report for each td element
//     $(tr).append("<td>" + data.report[i].Mes + "</td>");
//     $(tr).append("<td>" + data.report[i].Dia + "</td>");
//     $(tr).append("<td>" + data.report[i].Local + "</td>");
//     $('.table1').append(tr);
//   }
// });