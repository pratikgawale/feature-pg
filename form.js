
$(document).ready(function() {
      $("#submit").click(function(event){
        event.preventDefault();
        alert("hi");
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

  console.log(params);
  $.ajax({
    url: 'http://localhost:3000/person',
    type: 'POST',
    data: params,
    dataType: 'json',
    contentType: 'application/json',
    success: function () {
      console.log(firstName);
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
});


