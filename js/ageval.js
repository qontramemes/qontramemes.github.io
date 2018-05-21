function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if (key < 48 || key > 57) {
        return false;
    } else {
        return true;
    }
}

//var ageval_validated = localStorage['ageval_validated'];
//if ($.session('ageval_validated')=='validated') {$("#ageval").show();}
if (localStorage['ageval_validated'] != 'validated') {
    $("#ageval").show();
}
//l(localStorage)
$("#ageval_form").submit(function () {
    var day = $("#day").val();
    var month = $("#month").val();
    var year = $("#year").val();
    var age = 18;
    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);
    var currdate = new Date();
    currdate.setFullYear(currdate.getFullYear() - age);
    if (day != '' && month != '' && year != '') {
        if ((currdate - mydate) < 0) {
            $("#ageval .wrap .response").text("Debe tener al menos " + age + " años para ingresar al sitio.");
            return false;
        } else {
            $("#ageval").hide();
            //$.session('ageval_validated', 'validated')
            localStorage['ageval_validated'] = 'validated';
            return false;
        }
    } else {
        $("#ageval .wrap .response").text("Por favor complete todos los campos.");
        return false;
    }
});

$("#ageval_form input").keypress(validateNumber);

$("#ageval_form input").keyup(function () {
    
    if (this.value.length == this.maxLength) {
        $(this).next('#ageval_form input').focus();
    }
    
    var day = $("#day").val() != '' && $("#day").val().length >= 2 ? $("#day").val() : 31 ;
    var month = $("#month").val() != '' && $("#month").val().length >= 2 ? $("#month").val() : 12 ;
    var year = $("#year").val();
    var age = 18;
    var mydate = new Date();
    mydate.setFullYear(year, month - 1, day);
    var currdate = new Date();
    currdate.setFullYear(currdate.getFullYear() - age);
    
    if(year.length>=4){
        if ((currdate - mydate) < 0) {
            return false;
        } else {
            $("#ageval").hide();
            localStorage['ageval_validated'] = 'validated';
            return false;
        }
    }
});