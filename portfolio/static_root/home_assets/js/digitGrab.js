// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function pullDigits() {

  // pull date from datepicker and format as "MMDDYYYY" string
  var dateSelected = $("#datepicker").datepicker("getDate");

  var monthSelected = "0";
  var daySelected = "0";
  var yearSelected = dateSelected.getFullYear();

  if (dateSelected.getMonth() + 1 < 10) {
    monthSelected += (dateSelected.getMonth() + 1).toString();
  } else {
    monthSelected = (dateSelected.getMonth() + 1).toString();
  }

  if (dateSelected.getDate() < 10) {
    daySelected += (dateSelected.getDate()).toString();
  } else {
    daySelected = (dateSelected.getDate()).toString();
  }

  // send AJAX request to grab corresponding digit
  var dictionaryKey = (monthSelected + daySelected + yearSelected).toString();
  console.log(dictionaryKey);

  $.ajax({
      type: 'GET',
      url: '/projects/birthday_pi/' + dictionaryKey,

      success: function(data) {

          var digitSuperNumber = parseInt(data[dictionaryKey]);

          var theDigit = numberWithCommas(data[dictionaryKey]);

          // if statement to determine proper superscript
          var digitSuper = "";

          if (digitSuperNumber % 10 == 1) {
            digitSuper = "st";
          } else if (digitSuperNumber % 10 == 2) {
            digitSuper = "nd";
          } else if (digitSuperNumber % 10 == 3) {
            digitSuper = "rd";
          } else {
            digitSuper = "th";
          }

          // create string and reveal in window
          var reportString = "Your birthday is the<br>" + theDigit + "<sup>" + digitSuper + "</sup> digit in pi.";

          $('#result').html(reportString);

          $('.output').css("color", "black");
      }
  });

}
