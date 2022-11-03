
$(document).ready(function () {
    $('#row_dim').hide();
    $('#cash-icon').hide();
    $('#Paytype').change(function () {
        if ($('#Paytype').val() == '1') {
            $('#row_dim').show();
            $('#cash-icon').show();
        } else {
            $('#row_dim').hide();
            $('#cash-icon').hide();
        }
    });
});
$(document).ready(function () {
    $('#row_dim3').hide();
    $('#visa-icon').hide();
    $('#Paytype').change(function () {
        if ($('#Paytype').val() == '3') {
            $('#row_dim3').show();
            $('#visa-icon').show();
        } else {
            $('#row_dim3').hide();
            $('#visa-icon').hide();
        }
    });
});
$(document).ready(function () {
    $('#row_dim4').hide();
    $('#row_dim3').hide();
    $('#visa-icon').hide();
    //$('#upi-icon').hide();
    $('#Paytype').change(function () {
        if ($('#Paytype').val() == '2') {
            $('#row_dim3').show();
            $('#visa-icon').show();
        } else {
            if ($('#Paytype').val() == '3') {
                $('#row_dim3').hide();
                $('#row_dim4').show();
                $('#visa-icon').show();
            }
            else {
                $('#row_dim4').hide();
                $('#visa-icon').hide();
            }

        }
    });
});
$(document).ready(function () {
    $('#row_dim2').hide();
    $('#upi-icon').hide();
    $('#Paytype').change(function () {
        if ($('#Paytype').val() == '4') {
            $('#row_dim2').show();
            $('#upi-icon').show();
        } else {
            $('#row_dim2').hide();
            $('#upi-icon').hide();
        }
    });
});

///////////////////////////////////////////////
$('#patDlstTable tr').on('click', function (event) {
    event.preventDefault();
    var pname = $(this).find("#pname").text();
    var code = $(this).find("#code").text();
    var addrss = $(this).find("#addrss").text();
    var mobNo = $(this).find("#mobNo").text();
    var patObj = {
        AhMst_Phno: mobNo,
        AhMst_pName: pname,
        AhMst_Code: code,
        AhMst_Address: addrss
    }
    $.ajax({
        url: "/InvoiceRegister/PatientDetails",
        type: "POST",
        data: JSON.stringify(patObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // event.preventDefault();
            if (data.Result === "OK") {
                $('#dobDate').val("");
                $('#title').val("");
                $('#invName').val("");
                $('#ageyy').val("");
                $('#agemm').val("");
                $('#agedd').val("");
                $('#Phn').val("");
                $('#PatEmail').val("");
                $('#address').val("");
                //AhMst_Code AhMst_pName AhMst_Address AhMst_Phno AhMst_Dob AhMst_Email AhMst_Ismale AhMst_Prfx
                //title invName dobDate gender ageyy agemm agedd Phn PatEmail address
                ///////////////////////////////////////////////////////
                var dates = new Date();
                //var year=date
                //var nextDate=dates
                dates.setDate(dates.getDate() + 1);
                sMonth = '' + (dates.getMonth() + 1),
sDay = '' + dates.getDate(),
iYear = dates.getFullYear();

                if (sMonth.length < 2) { sMonth = '0' + sMonth; }
                if (sDay.length < 2) { sDay = '0' + sDay; }
                var CrntDay = sDay + "/" + sMonth + "/" + iYear;
                if (data.Records[0].testDOB == CrntDay) {
                    $('#dobDate').attr('placeholder', 'dd/MM/yyyy');
                }

                else {
                    document.querySelector("#dobDate").value = data.Records[0].testDOB;
                    var userinput = data.Records[0].testDOB;
                    var dob = new Date(userinput);
                    var emty = 0;
                    //check user provide input or not
                    if (userinput == null || userinput == '') {
                        document.getElementById("message").innerHTML = "**Choose DOB Please!";
                        return false;
                    }

                        //execute if the user entered a date
                    else {
                        //extract the year, month, and date from user date input
                        var dobYear = dob.getYear();
                        var dobMonth = dob.getMonth();
                        var dobDate = dob.getDate();

                        //get the current date from the system
                        var now = new Date();
                        //extract the year, month, and date from current date
                        var currentYear = now.getYear();
                        var currentMonth = now.getMonth();
                        var currentDate = now.getDate();

                        //declare a variable to collect the age in year, month, and days
                        var age = {};
                        var ageString = "";

                        //get years
                        yearAge = currentYear - dobYear;

                        //get months
                        if (currentMonth >= dobMonth)
                            //get months when current month is greater
                            var monthAge = currentMonth - dobMonth;
                        else {
                            yearAge--;
                            var monthAge = 12 + currentMonth - dobMonth;
                        }

                        //get days
                        if (currentDate >= dobDate)
                            //get days when the current date is greater
                            var dateAge = currentDate - dobDate;
                        else {
                            monthAge--;
                            var dateAge = 31 + currentDate - dobDate;

                            if (monthAge < 0) {
                                monthAge = 11;
                                yearAge--;
                            }
                        }
                        //group the age in a single variable
                        //ageyy agemm agedd
                        age = {
                            years: yearAge,
                            months: monthAge,
                            days: dateAge
                        };


                        if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
                            $("#ageyy").val(age.years);
                            $("#agemm").val(age.months);
                            $("#agedd").val(age.days);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }

                        else if ((age.years == 0) && (age.months > 0) && (age.days > 0)) {
                            $("#ageyy").val(emty);
                            $("#agemm").val(age.months);
                            $("#agedd").val(age.days);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }
                        else if ((age.years == 0) && (age.months == 0) && (age.days > 0)) {
                            $("#ageyy").val(emty);
                            $("#agemm").val(emty);
                            $("#agedd").val(age.days);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }
                        else if ((age.years == 0) && (age.months == 0) && (age.days == 0)) {
                            $("#ageyy").val(emty);
                            $("#agemm").val(emty);
                            $("#agedd").val(1);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }
                        else if ((age.years > 0) && (age.months > 0) && (age.days == 0)) {
                            $("#ageyy").val(age.years);
                            $("#agemm").val(age.months);
                            $("#agedd").val(emty);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }
                        else if ((age.years > 0) && (age.months == 0) && (age.days == 0)) {
                            $("#ageyy").val(age.years);
                            $("#agemm").val(emty);
                            $("#agedd").val(emty);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }
                        else if ((age.years == 0) && (age.months > 0) && (age.days == 0)) {
                            $("#ageyy").val(emty);
                            $("#agemm").val(age.months);
                            $("#agedd").val(emty);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }
                        else if ((age.years > 0) && (age.months == 0) && (age.days > 0)) {
                            $("#ageyy").val(age.years);
                            $("#agemm").val(emty);
                            $("#agedd").val(age.days);
                            $('#ageyy').attr('readonly', true);
                            $('#agemm').attr('readonly', true);
                            $('#agedd').attr('readonly', true);
                        }
                        else {
                            $("#dobDate").val("mm/dd/yyyy");
                            alert("Please Enter Valid Date Of Birth!");
                        }
                    }

                }
                ///////////////////////////////////////////////////////
                //AhMst_Code AhMst_pName AhMst_Address AhMst_Phno AhMst_Dob AhMst_Email AhMst_Ismale AhMst_Prfx
                //title invName dobDate gender ageyy agemm agedd Phn PatEmail address
                if (data.Records[0].AhMst_Ismale == 'M') {
                    //$("#gender").val('Male');
                    $('#gender option:selected').text('Male');
                }
                else {
                    $('#gender option:selected').text('Female');
                }

                //$('#SearchModel').hide();
                $("#foo").trigger("click");
                $('.close').trigger('click');
                $("#patId").val(data.Records[0].AhMst_Code);
                $("#title").val(data.Records[0].AhMst_Prfx);
                $("#invName").val(data.Records[0].AhMst_pName);

                $("#Phn").val(data.Records[0].AhMst_Phno);
                $("#PatEmail").val(data.Records[0].AhMst_Email);
                $("#address").val(data.Records[0].AhMst_Address);

            }
            else {

            }
        }
    })
    //alert('with attachment' + chk);
});
//patNameSrchBtn patIdSrchBtn
$("#patIdSrchBtn").on('click', function (event) {
    event.preventDefault();
    $('#SearchModel').show();
    $('#SrchOptn option:selected').text('Pat.Id');
    $("#SrchOptn").prop("disabled", true);
})
$("#patNameSrchBtn").on('click', function (event) {
    event.preventDefault();
    $('#SearchModel').show();
    $('#SrchOptn option:selected').text('Name');
    $("#SrchOptn").prop("disabled", true);
})
$(document).ready(function () {
    $('#rptPrsnly').attr('checked', true);
    //$('#invPrint').attr('readonly', true);
    $('#invPrint').prop('disabled', true);
})
$('#PatDtl').keyup(function () {
    //$("#PatDtl").change(function () {
    var patDtls = $('#PatDtl').val();
    var table = $("#patDlstTable").find('tbody');
    var row = $("#patDlstTable").find('tbody tr:first');
    $(table).children('tr:not(:first)').remove();
    $(row).find("#pname").text("");
    $(row).find("#code").text("");
    $(row).find("#addrss").text("");
    $(row).find("#mobNo").text("");
    var patdls = $('#SrchOptn option:selected').text();
    if (patdls == 'Name' && patDtls != "") {
        //$("#SrchOptn").prop("disabled", true);
        //var patObj = $("#PatDtl").val();
        //var patsrchobj = {
        //    patSrch: $("#PatDtl").val(),
        //    SrchChk: 0
        //}
        $.ajax({
            url: "/InvoiceRegister/PatientSearch",
            type: "POST",
            //data: JSON.stringify({}),
            data: JSON.stringify({ term: patDtls, Check :0}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Result === "OK") {
                    var currentrow = $("#patDlstTable").find('tbody tr');
                    $.each(data.Records, function (index, pat) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#patDlstTable tbody").append($(currentrow));
                            currentrow = $("#patDlstTable tbody tr:last");
                        }
                        //$(currentrow).find("#slno").val((index + 1));
                        $(currentrow).find("#pname").text(pat.AhMst_pName);
                        $(currentrow).find("#code").text(pat.AhMst_Code);
                        $(currentrow).find("#addrss").text(pat.AhMst_Address);
                        $(currentrow).find("#mobNo").text(pat.AhMst_Phno);

                    })
                }
                else {
                    alert(" patient not found!");
                }
            }
        })
    }
    else if (patdls == 'Pat.Id' && patDtls != "") {
        //var patObj = $("#PatDtl").val();
        //var patsrchobj = {
        //    patSrch: $("#PatDtl").val(),
        //    SrchChk: 1
        //}
        //var name = $("#PatDtl").val();
        $.ajax({
            url: "/InvoiceRegister/PatientSearch",
            type: "POST",
            data: JSON.stringify({ term: patDtls, Check: 1 }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Result === "OK") {
                    var currentrow = $("#patDlstTable").find('tbody tr');
                    $.each(data.Records, function (index, pat) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#patDlstTable tbody").append($(currentrow));
                            currentrow = $("#patDlstTable tbody tr:last");
                        }
                        //$(currentrow).find("#slno").val((index + 1));
                        $(currentrow).find("#pname").text(pat.AhMst_pName);
                        $(currentrow).find("#code").text(pat.AhMst_Code);
                        $(currentrow).find("#addrss").text(pat.AhMst_Address);
                        $(currentrow).find("#mobNo").text(pat.AhMst_Phno);

                    })
                }
                else {
                    alert(" patient not found!");
                }
            }
        })
    }
    else {
        //var patsrchobj = {
        //    patSrch: "",
        //    SrchChk: ""
        //}
        //var name = $("#PatDtl").val();
        $.ajax({
            url: "/InvoiceRegister/PatientSearch",
            type: "POST",
            data: JSON.stringify({ term: "", Check: 2 }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Result === "OK") {
                    var currentrow = $("#patDlstTable").find('tbody tr');
                    $.each(data.Records, function (index, pat) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#patDlstTable tbody").append($(currentrow));
                            currentrow = $("#patDlstTable tbody tr:last");
                        }
                        //$(currentrow).find("#slno").val((index + 1));
                        $(currentrow).find("#pname").text(pat.AhMst_pName);
                        $(currentrow).find("#code").text(pat.AhMst_Code);
                        $(currentrow).find("#addrss").text(pat.AhMst_Address);
                        $(currentrow).find("#mobNo").text(pat.AhMst_Phno);

                    })
                }
                else {
                    alert(" patient not found!");
                }
            }
        })
    }
})
////////////////////////////////////////////////////////
//$(document).on("click", "#SrchScan5", function (e) {
//    event.preventDefault();
//    $.ajax({
//        url: "/InvoiceRegister/ScanImage",
//        type: "POST",
//        data: {},
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            if (data.Result === "OK") {
//                //alert("Order Request(s) saved");
//                //window.location = "/InvoiceRegister/IvoiceRegistration";
//            }
//            else {
//            }

//        }

//    })
//})
function scanToJpg() {
    scanner.scan(displayImagesOnPage,
    {
        "twain_cap_setting": {
            "ICAP_PIXELTYPE": "TWPT_RGB", // Color
            "ICAP_XRESOLUTION": "100", // DPI: 100
            "ICAP_YRESOLUTION": "100",
            "ICAP_SUPPORTEDSIZES": "TWSS_USLETTER" // Paper size: TWSS_USLETTER, TWSS_A4, ...
        },
        "output_settings":
        [
           {
               "type": "return-base64",
               "format": "jpg"
           }
        ]
    }
    );
}
///////////////////////////////////////////////////////////////////////
function displayImagesOnPage(successful, mesg, response) {
    var scannedImages = scanner.getScannedImage(response, true, false); // returns an array of ScannedImage
    for (var i = 0; (scannedImages instanceof Array) && i < scannedImages.length; i++) {
        var scannedImage = scannedImages[i];
        processScannedImage(scannedImage);
    }
}

/** Images scanned so far. */
var imagesScanned = [];

/** Processes a ScannedImage */
function processScannedImage(scannedImage) {
    imagesScanned.push(scannedImage);
    var elementImg = createDomElementFromModel({
        'name': 'img',
        'attributes': {
            'class': 'scanned',
            'src': scannedImage.src
        }
    });
    document.getElementById('images').appendChild(elementImg);
}


//////////////////////////////////////////////////////////////////////




//function newTask() {

//    var myModal = $('#dailycollectionstmnt');
//    $.get('/LISFY/HomePage/', function (data) {
//        //$('#dailycollectionstmnt').html(data);
//        //$('#dailycollectionstmnt .modal-header .modal-title').html('Create Record');
//        $('#dailycollectionstmnt').appendTo("body").modal('show');
//    });

//}
//$(document).on("click", "#SrchScan", function () {
//    $.ajax({
//        type: "POST",
//        url: "/InvoiceRegister/ScanImage",
//        dataType: "json",
//        contentType: "application/json;charset=utf-8"

//    })
//})


//$(document).on("click", "#dlycltnStmnt", function () {
//    $.ajax({
//        type: 'GET',
//        url: "/LISFY/HomePage#dailycollectionstmnt",
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        async: true,
//        success: function (result) { $("#div1").html(result); }
//    });
//})

$('#PayCorp').autocomplete({
    source: function (request, response) {

        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchCorpWithName",
            data: { term: $("#PayCorp").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {


                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.AhMst_pName,
                            val: Record.AhMst_Key,
                            id: Record.AhMst_Key

                        }

                    }))


                }


            }
        });

    },

    minLength: 0,
    select: function (event, ui) {
        $("#PayCorp").val(ui.item.label);
        $("#PayCorpId").val(ui.item.id);
        //$("#PayCorp").prop("readonly", true);

    }
}).on('focus', function () { $(this).keydown(); });
$(document).on("click", "#invNext", function () {
    event.preventDefault();
    var labno = parseInt(($("#invNo").val())) + parseInt(1);
    var YrId = $("#yrid").val();
    var CpyId = $("#cpyid").val();
    var prev = {
        Inv_No: labno,
        Inv_YrId: YrId,
        Inv_CpyId: CpyId
    }

    $.ajax({
        url: "/InvoiceRegister/FillPatientData",
        type: "POST",
        data: JSON.stringify(prev),
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data.Result === "OK") {
                if ((data.Record).length == 1) {
                    var x = data.Record[0].Inv_No;
                    $("#invNo").val(data.Record[0].Inv_No);
                    $("#patId").val(data.Record[0].Inv_PntId);
                    $("#requestdate").val(data.Record[0].Inv_time);
                    $("#title option:selected").text(data.Record[0].Inv_Tittle);
                    $("#invName").val(data.Record[0].Inv_name);
                    ////////////
                    $("#dobDate").val(data.Record[0].Inv_DOBstring);
                    $("#gender option:selected").text(data.Record[0].Inv_Gender);
                    $("#ageyy").val(data.Record[0].Inv_ageYY);
                    $("#agemm").val(data.Record[0].Inv_ageMM);
                    $("#agedd").val(data.Record[0].Inv_ageDD);
                    $("#Phn").val(data.Record[0].Inv_phno);
                    $("#PatEmail").val(data.Record[0].Inv_Email);
                    $("#address").val(data.Record[0].Inv_Address);
                    $("#refby").val(data.Record[0].Doctor);
                    $("#collPerson").val(data.Record[0].CollStaff);
                    $("#collMode").val(data.Record[0].CollMode);
                    $("#corporate").val(data.Record[0].Corporate);
                    $("#PayCorp").val(data.Record[0].Corporate);
                    // mycheckbox
                    //
                    // bankId bankMob BnkCrdNum
                    //PayCorp
                    //bankName bankKey bankMobile BnkCrdNo
                    //
                    //$("#BnkName").val(data.Record[0].Inv_BalAmt);
                    var payMode = data.Record[0].Inv_PayMode;
                    if (payMode == 'Debit/Credit') {
                        $("#bankId").val(data.Record[0].Inv_BankId);
                        $("#BnkName").val(data.Record[0].BankName);
                        $("#BnkCrdNum").val(data.Record[0].Inv_InsNo);
                    }
                    else if (payMode == 'BHIM/UPI') {
                        $("#bankKey").val(data.Record[0].Inv_BankId);
                        $("#bankName").val(data.Record[0].BankName);
                        $("#BnkCrdNo").val(data.Record[0].Inv_InsNo);
                    }
                    $("#balance").val(data.Record[0].Inv_BalAmt);
                    $("#PaidAmt").val(data.Record[0].Inv_RcvdAmt);
                    $("#Paytype option:selected").text(data.Record[0].Inv_PayMode);
                    $("#SChrge").val(data.Record[0].Inv_Schrge);
                    $("#DiscRsnID").val(data.Record[0].Inv_DiscId);
                    $("#DiscReason").val(data.Record[0].DiscReason);
                    $("#DiscAmt").val(data.Record[0].Inv_DiscAmt);
                    $("#total").val(data.Record[0].Inv_GrosAmt);
                    $("#SampleOn").val(data.Record[0].Inv_SmplDatestring); ResultOn
                    $("#ResultOn").val(data.Record[0].Inv_RsltOnDatestring);
                    $("#note").val(data.Record[0].Inv_Comment);
                    $("#otherCmnt").val(data.Record[0].Inv_OthCmnt);
                    if (data.Record[0].Inv_RepThrEmail == true) {
                        $('#rptEmail').attr('checked', true);
                    }
                    else {
                        $('#rptEmail').attr('checked', false);
                    }
                    if (data.Record[0].Inv_RepThrSms == true) {
                        $('#rptSMS').attr('checked', true);
                    }
                    else {
                        $('#rptSMS').attr('checked', false);
                    }

                    if (data.Record[0].Inv_RepThrPhone == true) {
                        $('#rptTelePhn').attr('checked', true);
                    }
                    else {
                        $('#rptTelePhn').attr('checked', false);
                    }

                    if (data.Record[0].Inv_RepThrPersonal == true) {
                        $('#rptPrsnly').attr('checked', true);
                    }
                    else {
                        $('#rptPrsnly').attr('checked', false);
                    }

                    if (data.Record[0].Inv_WhatsApp == true) {
                        $('#rptWhtsApp').attr('checked', true);
                    }
                    else {
                        $('#rptWhtsApp').attr('checked', false);
                    }

                    if (data.Record[0].Inv_RepThrCourier == true) {
                        $('#rptCourier').attr('checked', true);
                    }
                    else {
                        $('#rptCourier').attr('checked', false);
                    }

                    $("#outDr").val(data.Record[0].OutDrName);
                    $("#clinic").val(data.Record[0].Clinic);
                    $("#CollStaff").val(data.Record[0].CollStaff);
                    $("#ipoptxt").val(data.Record[0].Inv_RsltNO);
                    var payMode = data.Record[0].Inv_PayMode;
                    ///
                    $('#row_dim').hide();
                    $('#cash-icon').hide();
                    $('#row_dim3').hide();
                    $('#visa-icon').hide();
                    $('#row_dim4').hide();
                    $('#upi-icon').hide();
                    $('#row_dim2').hide();
                    if (payMode == 'Cash') {
                        $('#row_dim').show();
                        $('#cash-icon').show();
                        $('#row_dim3').hide();
                        $('#visa-icon').hide();
                        $('#row_dim4').hide();
                        $('#upi-icon').hide();
                        $('#row_dim2').hide();
                    }
                    else if (payMode == 'Debit/Credit') {
                        $('#row_dim').hide();
                        $('#cash-icon').hide();
                        $('#row_dim3').show();
                        $('#visa-icon').show();
                        $('#row_dim4').hide();
                        $('#upi-icon').hide();
                        $('#row_dim2').hide();
                    }
                    else if (payMode == 'Credit') {
                        $('#row_dim4').show();
                        $('#visa-icon').show();
                        $('#row_dim').hide();
                        $('#cash-icon').hide();
                        $('#row_dim3').hide();
                        $('#upi-icon').hide();
                        $('#row_dim2').hide();

                    }
                    else if (payMode == 'BHIM/UPI') {
                        $('#row_dim2').show();
                        $('#upi-icon').show();
                        $('#row_dim4').hide();
                        $('#visa-icon').hide();
                        $('#row_dim').hide();
                        $('#cash-icon').hide();
                        $('#row_dim3').hide();

                    }
                    ///////////////////////////////////////

                    ///////////////////////////////////////
                    //$('#row_dim').hide();
                    //$('#cash-icon').hide();

                    //if ($('#Paytype').val() == '1') {
                    //    $('#row_dim').show();
                    //    $('#cash-icon').show();
                    //} else {
                    //    $('#row_dim').hide();
                    //    $('#cash-icon').hide();
                    //}

                    ///////////////////////////////////////
                    var currentrow = $("#tstTable").find('tbody tr');
                    var grandTotal = 0;
                    var table = $("#tstTable").find('tbody');
                    var row = $("#tstTable").find('tbody tr:first');
                    if ($(row).find("#tsname").text() != '') {
                        //var siblings = row.siblings();
                        //$(row).remove();
                        //siblings.each(function (index) {
                        //    $(this).children('td:first').find("#slno").val(index + 1);
                        //});
                        //$("#tstTable").find("tr:gt(0)").remove();
                        $(table).children('tr:not(:first)').remove();
                        $(row).find("#slno").text("");
                        $(row).find("#tsname").text("");
                        $(row).find("#tscode").text("");
                        $(row).find("#tsrate").text("");
                        $(row).find("#tsDisc").text("");
                        $(row).find("#tsDscPer").text("");
                        $(row).find("#tsTotal").text("");
                        $(row).find("#tsId").text("");
                        $(row).find("#tstType").text("");
                    }

                    $.each((data.Record[0].tstList), function (index, test) {


                        if (index > 0) {
                            var lastRow = $("#tstTable tbody").find('tr:last').clone();
                            $("#tstTable tbody").append($(lastRow));
                            lastRow = $("#tstTable tbody tr:last");
                            $(lastRow).find('input[type=text]').text("");
                            //(item.TstMst_DiscPer).toFixed(2)
                            $(lastRow).find("#slno").text((index + 1));
                            $(lastRow).find("#tsname").text(test.TstMst_name);
                            $(lastRow).find("#tscode").text(test.TstMst_ShortName);
                            $(lastRow).find("#tsrate").text(test.TstMst_Rate);
                            $(lastRow).find("#tsDisc").text(test.SplR_NRate);
                            $(lastRow).find("#tsDscPer").text((test.TstMst_DiscPer).toFixed(2));
                            $(lastRow).find("#tsTotal").text(test.TstMst_Total);
                            $(lastRow).find("#tsId").text(test.TstMst_Key);
                            $(lastRow).find("#tstType").text(test.TstMst_TypeId);
                            // tstTable slno tscode tsname tsrate tsDisc tsDscPer tsTotal tsId tstType
                            index++;
                            grandTotal = grandTotal + test.TstMst_Total;
                        }
                        else {
                            $(currentrow).find("#slno").text((index + 1));
                            $(currentrow).find("#tsname").text(test.TstMst_name);
                            $(currentrow).find("#tscode").text(test.TstMst_ShortName);
                            $(currentrow).find("#tsrate").text(test.TstMst_Rate);
                            $(currentrow).find("#tsDisc").text(test.SplR_NRate);
                            $(currentrow).find("#tsDscPer").text((test.TstMst_DiscPer).toFixed(2));
                            $(currentrow).find("#tsTotal").text(test.TstMst_Total);
                            $(currentrow).find("#tsId").text(test.TstMst_Key);
                            $(currentrow).find("#tstType").text(test.TstMst_TypeId);
                            index++;

                            grandTotal = grandTotal + test.TstMst_Total;
                        }





                    })

                    document.getElementById("grandTotal").innerHTML = "&#8377;" + grandTotal;
                }
                else {
                    alert("Record Not Found!");
                    window.location = "/InvoiceRegister/IvoiceRegistration";

                }

            }
        },
        error: function (xyz) {

        }
    })


})

$(document).on("click", "#invPrevious", function () {
    event.preventDefault();
    $('#invPrint').prop('disabled', false);
    var labno = ($("#invNo").val()) - 1;
    var Inv_Num = parseInt($("#invNo").val());
    var YrId = $("#yrid").val();
    var CpyId = $("#cpyid").val();
    var splrId = $("#corpKey").val();
    var prev = {
        Inv_No: labno,
        Inv_YrId: YrId,
        Inv_CpyId: CpyId,
        Inv_InsId: splrId
    }
    $.ajax({
        url: "/InvoiceRegister/InvNumCheck",
        type: "POST",
        data: JSON.stringify({ invNo: Inv_Num }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.Result === "OK") {
                if (data.Records == parseInt($("#invNo").val()))
                {
                    alert("Record Not Found!");
                }
                else{
                    $.ajax({
                        url: "/InvoiceRegister/FillPatientData",
                        type: "POST",
                        data: JSON.stringify(prev),
                        dataType: 'json',
                        contentType: 'application/json; charset=utf-8',
                        success: function (data) {
                            if (data.Result === "OK") {

                                var x = data.Record[0].Inv_No;
                                $("#invNo").val(data.Record[0].Inv_No);
                                $("#patId").val(data.Record[0].Inv_PntId);
                                $("#requestdate").val(data.Record[0].Inv_time);
                                $("#title option:selected").text(data.Record[0].Inv_Tittle);
                                $("#invName").val(data.Record[0].Inv_name);
                                ////////////Inv_DrId
                                $("#refbyId").val(data.Record[0].Inv_DrId);
                                $("#corpKey").val(data.Record[0].Inv_InsId);
                                $("#dobDate").val(data.Record[0].Inv_DOBstring);
                                $("#gender option:selected").text(data.Record[0].Inv_Gender);
                                $("#ageyy").val(data.Record[0].Inv_ageYY);
                                $("#agemm").val(data.Record[0].Inv_ageMM);
                                $("#agedd").val(data.Record[0].Inv_ageDD);
                                $("#Phn").val(data.Record[0].Inv_phno);
                                $("#PatEmail").val(data.Record[0].Inv_Email);
                                $("#address").val(data.Record[0].Inv_Address);
                                $("#refby").val(data.Record[0].Doctor);
                                $("#collPerson").val(data.Record[0].CollStaff);
                                $("#collMode").val(data.Record[0].CollMode);
                                $("#corporate").val(data.Record[0].Corporate);
                                $("#PayCorp").val(data.Record[0].Corporate);
                                // mycheckbox
                                //
                                // bankId bankMob BnkCrdNum
                                //PayCorp PayCorp
                                //bankName bankKey bankMobile BnkCrdNo
                                //
                                //$("#BnkName").val(data.Record[0].Inv_BalAmt);
                                var payMode = data.Record[0].Inv_PayMode;
                                if (payMode == 'Debit/Credit') {
                                    $("#bankId").val(data.Record[0].Inv_BankId);
                                    $("#BnkName").val(data.Record[0].BankName);
                                    $("#BnkCrdNum").val(data.Record[0].Inv_InsNo);
                                }
                                else if (payMode == 'BHIM/UPI') {
                                    $("#bankKey").val(data.Record[0].Inv_BankId);
                                    $("#bankName").val(data.Record[0].BankName);
                                    $("#BnkCrdNo").val(data.Record[0].Inv_InsNo);
                                }
                                $("#balance").val(data.Record[0].Inv_BalAmt);
                                $("#PaidAmt").val(data.Record[0].Inv_RcvdAmt);
                                $("#Paytype option:selected").text(data.Record[0].Inv_PayMode);
                                $("#SChrge").val(data.Record[0].Inv_Schrge);
                                $("#DiscRsnID").val(data.Record[0].Inv_DiscId);
                                $("#DiscReason").val(data.Record[0].DiscReason);
                                $("#DiscAmt").val(data.Record[0].Inv_DiscAmt);
                                $("#total").val(data.Record[0].Inv_GrosAmt);
                                $("#SampleOn").val(data.Record[0].Inv_SmplDatestring);
                                $("#ResultOn").val(data.Record[0].Inv_RsltOnDatestring);
                                $("#note").val(data.Record[0].Inv_Comment);
                                $("#otherCmnt").val(data.Record[0].Inv_OthCmnt);
                                if (data.Record[0].Inv_RepThrEmail == true) {
                                    $('#rptEmail').attr('checked', true);
                                }
                                else {
                                    $('#rptEmail').attr('checked', false);
                                }
                                if (data.Record[0].Inv_RepThrSms == true) {
                                    $('#rptSMS').attr('checked', true);
                                }
                                else {
                                    $('#rptSMS').attr('checked', false);
                                }

                                if (data.Record[0].Inv_RepThrPhone == true) {
                                    $('#rptTelePhn').attr('checked', true);
                                }
                                else {
                                    $('#rptTelePhn').attr('checked', false);
                                }

                                if (data.Record[0].Inv_RepThrPersonal == true) {
                                    $('#rptPrsnly').attr('checked', true);
                                }
                                else {
                                    $('#rptPrsnly').attr('checked', false);
                                }

                                if (data.Record[0].Inv_WhatsApp == true) {
                                    $('#rptWhtsApp').attr('checked', true);
                                }
                                else {
                                    $('#rptWhtsApp').attr('checked', false);
                                }

                                if (data.Record[0].Inv_RepThrCourier == true) {
                                    $('#rptCourier').attr('checked', true);
                                }
                                else {
                                    $('#rptCourier').attr('checked', false);
                                }

                                $("#outDr").val(data.Record[0].OutDrName);
                                $("#clinic").val(data.Record[0].Clinic);
                                $("#CollStaff").val(data.Record[0].CollStaff);
                                $("#ipoptxt").val(data.Record[0].Inv_RsltNO);
                                var payMode = data.Record[0].Inv_PayMode;
                                ///
                                $('#row_dim').hide();
                                $('#cash-icon').hide();
                                $('#row_dim3').hide();
                                $('#visa-icon').hide();
                                $('#row_dim4').hide();
                                $('#upi-icon').hide();
                                $('#row_dim2').hide();
                                if (payMode == 'Cash') {
                                    $('#row_dim').show();
                                    $('#cash-icon').show();
                                    $('#row_dim3').hide();
                                    $('#visa-icon').hide();
                                    $('#row_dim4').hide();
                                    $('#upi-icon').hide();
                                    $('#row_dim2').hide();
                                }
                                else if (payMode == 'Debit/Credit') {
                                    $('#row_dim').hide();
                                    $('#cash-icon').hide();
                                    $('#row_dim3').show();
                                    $('#visa-icon').show();
                                    $('#row_dim4').hide();
                                    $('#upi-icon').hide();
                                    $('#row_dim2').hide();
                                }
                                else if (payMode == 'Credit') {
                                    $('#row_dim4').show();
                                    $('#visa-icon').show();
                                    $('#row_dim').hide();
                                    $('#cash-icon').hide();
                                    $('#row_dim3').hide();
                                    $('#upi-icon').hide();
                                    $('#row_dim2').hide();

                                }
                                else if (payMode == 'BHIM/UPI') {
                                    $('#row_dim2').show();
                                    $('#upi-icon').show();
                                    $('#row_dim4').hide();
                                    $('#visa-icon').hide();
                                    $('#row_dim').hide();
                                    $('#cash-icon').hide();
                                    $('#row_dim3').hide();

                                }
                                ///////////////////////////////////////

                                ///////////////////////////////////////
                                //$('#row_dim').hide();
                                //$('#cash-icon').hide();

                                //if ($('#Paytype').val() == '1') {
                                //    $('#row_dim').show();
                                //    $('#cash-icon').show();
                                //} else {
                                //    $('#row_dim').hide();
                                //    $('#cash-icon').hide();
                                //}

                                ///////////////////////////////////////
                                var currentrow = $("#tstTable").find('tbody tr');
                                var grandTotal = 0;
                                var table = $("#tstTable").find('tbody');
                                var row = $("#tstTable").find('tbody tr:first');
                                if ($(row).find("#tsname").text() != '') {
                                    //var siblings = row.siblings();
                                    //$(row).remove();
                                    //siblings.each(function (index) {
                                    //    $(this).children('td:first').find("#slno").val(index + 1);
                                    //});
                                    //$("#tstTable").find("tr:gt(0)").remove();
                                    $(table).children('tr:not(:first)').remove();
                                    $(row).find("#slno").text("");
                                    $(row).find("#tsname").text("");
                                    $(row).find("#tscode").text("");
                                    $(row).find("#tsrate").text("");
                                    $(row).find("#tsDisc").text("");
                                    $(row).find("#tsDscPer").text("");
                                    $(row).find("#tsTotal").text("");
                                    $(row).find("#tsId").text("");
                                    $(row).find("#tstType").text("");
                                }

                                $.each((data.Record[0].tstList), function (index, test) {


                                    if (index > 0) {
                                        var lastRow = $("#tstTable tbody").find('tr:last').clone();
                                        $("#tstTable tbody").append($(lastRow));
                                        lastRow = $("#tstTable tbody tr:last");
                                        $(lastRow).find('input[type=text]').text("");
                                        //(item.TstMst_DiscPer).toFixed(2)
                                        $(lastRow).find("#slno").text((index + 1));
                                        $(lastRow).find("#tsname").text(test.TstMst_name);
                                        $(lastRow).find("#tscode").text(test.TstMst_ShortName);
                                        $(lastRow).find("#tsrate").text(test.TstMst_Rate);
                                        $(lastRow).find("#tsDisc").text(test.SplR_NRate);
                                        $(lastRow).find("#tsDscPer").text((test.TstMst_DiscPer).toFixed(2));
                                        $(lastRow).find("#tsTotal").text(test.TstMst_Total);
                                        $(lastRow).find("#tsId").text(test.TstMst_Key);
                                        $(lastRow).find("#tstType").text(test.TstMst_TypeId);
                                        // tstTable slno tscode tsname tsrate tsDisc tsDscPer tsTotal tsId tstType
                                        index++;
                                        grandTotal = grandTotal + test.TstMst_Total;
                                    }
                                    else {
                                        $(currentrow).find("#slno").text((index + 1));
                                        $(currentrow).find("#tsname").text(test.TstMst_name);
                                        $(currentrow).find("#tscode").text(test.TstMst_ShortName);
                                        $(currentrow).find("#tsrate").text(test.TstMst_Rate);
                                        $(currentrow).find("#tsDisc").text(test.SplR_NRate);
                                        $(currentrow).find("#tsDscPer").text((test.TstMst_DiscPer).toFixed(2));
                                        $(currentrow).find("#tsTotal").text(test.TstMst_Total);
                                        $(currentrow).find("#tsId").text(test.TstMst_Key);
                                        $(currentrow).find("#tstType").text(test.TstMst_TypeId);
                                        index++;

                                        grandTotal = grandTotal + test.TstMst_Total;
                                    }





                                })

                                document.getElementById("grandTotal").innerHTML = "&#8377;" + grandTotal;


                            }
                        },
                        error: function (xyz) {

                        }
                    })

                }
                //alert("Order Request(s) saved");
                //window.location = "/InvoiceRegister/IvoiceRegistration";

            }
            else {
            }

        }

    })

})
$(document).on("click", "#newInvoice", function () {
    event.preventDefault();
    window.location = "/InvoiceRegister/IvoiceRegistration";
})
//$(document).on("click", "#dailycollectionstmnt", function () {
//    $.ajax({
//        type: "POST",
//        url: "/LISFY/HomePage",
//        success: function (response) {
//            $('#dailycollectionstmnt').dialog('open');
//        },
//        error: function (response) {
//        }
//    })
//})
//$(document).on("click", "#dlycltnStmnt", function () {
//    $.ajax({
//        type: "POST",
//        url: "/LISFY/HomePage",
//        success: function (response) {
//            $("dailycollectionstmnt").modal('show');
//        },
//        error: function (response) {
//        }
//    })
//})
//$("#btnSave").on('click', function (e) {
//$(document).on("click", "#dlycltnStmnt", function () {
//    $.ajax({
//        url: '/LISFY/HomePage#dailycollectionstmnt'
//    });
//    //    .done(function (msg) {
//    //    $('/LISFY/HomePage#dailycollectionstmnt').modal('show');
//    //    //$("#dailycollectionstmnt").modal();

//    //})
//})cpyid yrid
$(document).on("click", "#btnSave", function (e) {
    event.preventDefault();
    var cpyid = $("input[name=cpyid]").val();
    var y= $("#cpyid").val();
    var x = $("#cpyid").val();
    var finyr = $("#yrid").val();
    var yrid = $("#yrid").val();
    var corp = $("#PayCorp").val();
    var cardno = 0;
    var bnkId = 0;
    var discper = 0;
    var isPndng;
    var total = $("#total").val();
    var rptPrsnly = false;
    var status = 0;
    var rptWhtsApp;
    var rptCourier;
    var rptEmail;
    var rptSMS;
    var rptTelePhn;
    var EmrgencySmple;
    if ($("#rptPrsnly").is(':checked') === true) {
        rptPrsnly = true;
    }
    else {
        rptPrsnly = false;
    }
    if ($("#rptWhtsApp").is(':checked') === true) {
        rptWhtsApp = true;
    }
    else {
        rptWhtsApp = false;
    }
    if ($("#rptCourier").is(':checked') === true) {
        rptCourier = true;
    }
    else {
        rptCourier = false;
    }
    if ($("#rptEmail").is(':checked') === true) {
        rptEmail = true;
    }
    else {
        rptEmail = false;
    }
    if ($("#rptSMS").is(':checked') === true) {
        rptSMS = true;
    }
    else {
        rptSMS = false;
    }
    if ($("#rptTelePhn").is(':checked') === true) {
        rptTelePhn = true;
    }
    else {
        rptTelePhn = false;
    }
    if ($("#EmrgencySmple").is(':checked') === true) {
        EmrgencySmple = true;
        status = 2;
    }
    else {
        EmrgencySmple = false;
        status = 0;
    }
    var paymode = $('#Paytype option:selected').text();
    //var netAmt = $("#DiscAmt").val();
    var netamt = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
    var discAmt = $("#DiscAmt").val();
    discper = (discAmt * 100 / total);
    var discReason = $("#DiscReason").val();
    var balAmt = $("#balance").val();
    var paidAmt = $("#PaidAmt").val();
    var bankName = "";
    //var bankName = $("#bankName").val();
    //BnkName Debit/Credit bankName BHIM/UPI
    if (paymode == 'Debit/Credit') {
        bankName = $("#BnkName").val();
    }
    if (paymode == 'BHIM/UPI') {
        bankName = $("#bankName").val();
    }
    if (paymode == 'Cash') {
        if (paidAmt == -(balAmt)) {
            isPndng = 0;
        }
        else {
            isPndng = 1;
        }
    }
    if (paymode == 'Credit') {
        isPndng = 1;
    }
    if (yrid != finyr) {
        alert("Can't Allowed to Bill in Previous Financial Year");
        return false;
    }
    else {
        if (paymode == '') {
            alert("Invalid PayMode");
            return false;
        }
        else {
            if (paymode == 'Credit' && corp == '') {

                alert("Invalid Credit A/C. Please Check");
                return false;
            }
            else {
                if (paymode == 'Debit/Credit' && bankName == '') {

                    alert("Enter Bank Details");
                    return false;

                }
                else {
                    if (paymode == 'BHIM/UPI' && bankName == '') {

                        alert("Enter Bank Details");
                        return false;

                    }
                    else {
                        if (parseInt(discAmt) != 0 && discReason == '') {
                            alert("Discount Reason Must Be Entered");
                            return;
                        }
                        else {
                            if (parseInt(paidAmt) > parseInt(netamt) && paidAmt != 0) {
                                alert("Paid Amount Must Not Be Greater Than Bill Amount");
                                return false;
                            }
                            else {
                                if (parseInt(discAmt) > parseInt(total) && parseInt(discAmt) != 0) {
                                    alert("Discount Amount Must Not Be Greater Than Net Amount");
                                    return false;
                                }
                                else {
                                    if (parseInt($("#SChrge").val()) < 0) {
                                        alert("S.Charge cannot be negative");
                                    }
                                    else {

                                        if (parseInt(paidAmt) < 0) {
                                            alert("PaidAmount cannot be negative");
                                        }
                                        else {
                                            //code to save
                                            // yrid  requestdate
                                            //refby   outDrId collMode  clinic  corporate  collPerson

                                            //
                                            //note otherCmnt emrgncySmpl
                                            //  DiscReason  DiscRsnVal
                                            //PaidAmt  bankName bankKey bankMobile BnkCrdNo BnkName bankId bankMob BnkCrdNum PayCorp grandTotal
                                            if (paymode == 'BHIM/UPI') {
                                                cardno = $("#BnkCrdNo").val();
                                                bnkId = $("#bankKey").val();
                                            }
                                            if (paymode == 'Debit/Credit') {
                                                cardno = $("#BnkCrdNum").val();
                                                bnkId = $("#bankId").val();
                                            }
                                            var request = {};
                                            var invNo = $("input[name=invNo]").val();
                                            request.Inv_No = $("input[name=invNo]").val();
                                            request.Inv_IsInsrnce = 0;
                                            request.Inv_BankId = bnkId;
                                            request.Inv_PntId = $("input[name=patId]").val();
                                            //request.Inv_PntInvId = $('#ymd option:selected').text();
                                            request.Inv_PntInvId = $("input[name=invNo]").val();
                                            request.Inv_PayMode = $("#Paytype option:selected").text();
                                            request.Inv_Tittle = $('#title option:selected').text();
                                            request.Inv_name = $("input[name=invName]").val();
                                            request.Inv_Gender = $('#gender option:selected').text();
                                            //request.Inv_age = $('#gender option:selected').text();
                                            request.Inv_ageYY = $("input[name=ageyy]").val();
                                            request.Inv_ageMM = $("input[name=agemm]").val();
                                            request.Inv_ageDD = $("input[name=agedd]").val();
                                            request.Inv_phno = $("input[name=Phn]").val();
                                            //request.Inv_Address = $("input[name=address]").val();
                                            request.Inv_Address = $('textarea#address').val();
                                            request.Inv_SmplDate = $("input[name=SampleOn]").val();
                                            request.Inv_RsltNO = $("input[name=ipoptxt]").val();
                                            request.Inv_BrID = $("input[name=cpyid]").val();//testtttttttttt
                                            request.Inv_Date = $("input[name=requestdate]").val();
                                            request.Inv_time = $("input[name=requestdate]").val();
                                            //PayCorp PayCorpId
                                            var crp = $("#corporate").val();
                                            if ($("#corporate").val() == '') {
                                                //PayCorp
                                                request.Inv_InsId = $("input[name=PayCorpId]").val();
                                            }
                                            else {
                                                request.Inv_InsId = $("input[name=corpKey]").val();
                                            }

                                            request.Inv_InsNo = cardno;
                                            request.Inv_AreaId = 0;
                                            request.Inv_EmailtoPatient = 0;
                                            request.Inv_Email = $("input[name=PatEmail]").val();
                                            request.Inv_EtoDr = 0;
                                            request.Inv_DrId = $("input[name=refbyId]").val();
                                            request.Inv_OutDr = $("input[name=outDr]").val();
                                            request.Inv_hospId = $("input[name=clinicId]").val();
                                            request.Inv_Schrge = $("input[name=SChrge]").val();
                                            request.Inv_DiscId = $("input[name=DiscRsnID]").val();
                                            request.Inv_CltnID = $("input[name=collPersonId]").val();
                                            request.Invl_DiscPer = discper;
                                            request.Inv_RepTime = $("input[name=ResultOn]").val();
                                            request.Inv_GrosAmt = $("input[name=total]").val();
                                            request.Inv_DiscAmt = $("input[name=DiscAmt]").val();
                                            request.Inv_OthAmt = 0;
                                            //request.Inv_Netamt = $("input[name=netamt]").val();///////////////////////////////netamt
                                            request.Inv_Netamt = netamt;
                                            request.Inv_RcvdAmt = $("input[name=PaidAmt]").val();//
                                            request.Inv_BalAmt = $("input[name=balance]").val();
                                            request.Inv_Comment = $("input[name=note]").val();//
                                            //request.Inv_CmpltdDate = $("input[name=requestdate]").val();
                                            //request.Inv_CmpltdTime = $('#ymd option:selected').text();
                                            request.Inv_OthCmnt = $("input[name=otherCmnt]").val();
                                            request.Inv_User = $("input[name=name]").val();//login username
                                            request.Invl_IsPending = isPndng;
                                            request.Inv_Status = status;
                                            //request.Inv_CnlComnt = $('#gender option:selected').text();//
                                            //request.Inv_Cnltmestmp = $("input[name=age]").val();//
                                            request.Inv_CurRcvdAmt = $("input[name=PaidAmt]").val();
                                            request.Inv_CurBalAmt = $("input[name=balance]").val();
                                            request.Inv_UsrId = "";//id of login user
                                            request.Inv_YrId = yrid;
                                            request.Inv_CpyId = $("input[name=cpyid]").val();
                                            request.Inv_RepThrPersonal = rptPrsnly;
                                            request.Inv_RepThrCourier = rptCourier;
                                            request.Inv_RepThrPhone = rptTelePhn;
                                            request.Inv_RepThrEmail = rptEmail;
                                            request.Inv_RepThrSms = rptSMS;
                                            request.Inv_RptMode = "";
                                            request.Inv_Updtd = 0;
                                            request.Inv_ItemDesc = null;
                                            request.Inv_WhatsApp = rptWhtsApp;
                                            request.Inv_DocPath1 = "";
                                            request.Inv_DocPath2 = "";
                                            request.Inv_DocPath3 = "";
                                            request.Inv_CollModeId = $("input[name=collModeId]").val();
                                            request.Inv_Ward = "";
                                            request.Inv_WardId = null;
                                            request.Inv_Area = "";
                                            request.Inv_RevInc = 0;
                                            request.Inv_MemberCode = 0;
                                            request.Inv_PresChck = 0;
                                            request.Inv_Dob = $("input[name=dobDate]").val();
                                            console.log(request);
                                            //////request.Inv_Passport = $('textarea#comments').val();//
                                            //////request.Inv_SRFno = $('#paymode option:selected').text();//
                                            //////request.Inv_ModalitDiv = null;
                                            //////request.Inv_Aadhaar = gm;//
                                            //////request.Inv_Nationality = $('#ymd option:selected').text();//
                                            //var totaldisc = 0;
                                            //$("input[name=discount]").each(function () {
                                            //    var net = $("input[name=netamt]").val();
                                            //    var disc = $("input[name=DiscAmt]").val();
                                            //    var totl = net - disc;
                                            //    totaldisc = totaldisc + parseInt(totl);
                                            //})
                                            request.Inv_DiscAmt = discAmt;
                                            //console.log(request);
                                            ////////////////////////////////////////////////////
                                            //request.InvItm_SmplId = rptCourier;
                                            //request.InvItm_SmplStats = rptTelePhn;
                                            var testTableRows = $("#tstTable tbody tr");
                                            var invDetDls = [];
                                            var totaldisc = 0;
                                            var tstShortName = "";
                                            $.each($(testTableRows), function (index, row) {
                                                var invDet = {};
                                                var tstIdVal = 0;
                                                tstIdVal = $(row).find("input[name=tsId]").val();
                                                if (tstIdVal == "") {
                                                    tstIdVal = $(row).find("input[name=tsId]").text();
                                                }
                                                //else
                                                //{
                                                //    tstIdVal = $(row).find("input[name=tsId]").val();
                                                //}

                                                invDet.InvItm_RptDay = $(row).find("input[name=tstrptDay]").val(),
                                                invDet.InvItm_RptTimeDays = $(row).find("input[name=tstrptTimedys]").val(),
                                                invDet.InvItm_TstId = tstIdVal,
                                                invDet.InvItm_TstOrgRate = parseInt($(row).find("#tsrate").text()),
                                                invDet.InvItm_YrId = $("#yrid").val(),
                                                invDet.Tst_TypeId = $(row).find('#tstType').val(),
                                                invDet.InvItm_CpyId = $("input[name=cpyid]").val(),
                                                invDet.InvItm_DiscAmt = parseInt($(row).find("#tsDisc").text()),
                                                invDet.InvItm_DiscPer = parseInt($(row).find("#tsDscPer").text()),
                                                invDet.InvItm_Invno = $("input[name=invNo]").val(),
                                                invDet.InvItm_Issued = 0,
                                                invDet.InvItm_Orgrate = parseInt($(row).find("#tsrate").text()),
                                                invDet.InvItm_rate = parseInt($(row).find("#tsTotal").text()),
                                                invDet.InvItm_RevDiscAmt = 0,
                                                totaldisc = totaldisc + (parseInt($(row).find("#tsTotal").text()) - (parseInt($(row).find('#tsDisc').text())));
                                                invDetDls.push(invDet);
                                                if (tstShortName == "") {
                                                    tstShortName += $(row).find("#tscode").text();
                                                }
                                                else {
                                                    tstShortName += "-" + $(row).find("#tscode").text();
                                                }
                                            })
                                            request.Inv_ShortName = tstShortName;
                                            request.Inv_ItemDisc = totaldisc;
                                            request.invDetlist = invDetDls;
                                            var vchrDtlss = [];
                                            var vchrDls = {};
                                            if (paymode == 'Credit') {
                                                var narratn = "Credit Bill :" + invNo;
                                                vchrDls.vchr_Narration = narratn;//creditbill:labnumber
                                                vchrDls.vchr_Payment = netamt;//netamt
                                                vchrDls.vchr_Receipt = 0;
                                                vchrDls.vchr_TimeStamp = "usrinfo";//usrinfo
                                                vchrDls.vchr_TransNo = $("input[name=invNo]").val();//invno
                                                vchrDls.vchr_TransType = "Credit bill";//
                                                vchrDls.vchr_UsrId = 0;//usrid
                                                vchrDls.vchr_YrId = yrid;
                                                vchrDls.vchr_BrId = $("#cpyid").val();
                                                vchrDls.vchr_CpyId = $("#cpyid").val();
                                                vchrDls.vchr_Date = $("input[name=requestdate]").val();//invdate
                                                var crp = $("#corporate").val();
                                                if ($("#corporate").val() == '') {
                                                    //PayCorp
                                                    vchrDls.vchr_Id = $("input[name=PayCorpId]").val();
                                                }
                                                else {
                                                    vchrDls.vchr_Id = $("input[name=corpKey]").val();
                                                }
                                                //vchrDls.vchr_Id = $("input[name=corpKey]").val();
                                                console.log(vchrDls);
                                                vchrDtlss.push(vchrDls);
                                                request.vchrList = vchrDtlss;
                                            }
                                            $.ajax({
                                                url: "/InvoiceRegister/InvoiceSave",
                                                type: "POST",
                                                data: JSON.stringify(request),
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                success: function (data) {
                                                    if (data.Result === "OK") {
                                                        alert("Patient Detail(s) saved");
                                                        window.location = "/InvoiceRegister/IvoiceRegistration";
                                                    }
                                                    else {
                                                    }

                                                }

                                            })
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
})

$(document).ready(function () {
    $('#collMode').val('DIRECT');
})
$('#BnkName').autocomplete({
    source: function (request, response) {

        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchBankWithName",
            data: { term: $("#BnkName").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {
                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.AhMst_pName,
                            val: Record.AhMst_Key,
                            id: Record.AhMst_mobile
                        }
                    }))
                }
            }
        });
    },
    minLength: 0,
    select: function (event, ui) {
        //bankName bankKey bankMobile
        $("#BnkName").val(ui.item.label);
        $("#bankId").val(ui.item.val);
        $("#bankMob").val(ui.item.id);
        $("#BnkName").prop("readonly", true);
    }
}).on('focus', function () { $(this).keydown(); });
$('#bankName').autocomplete({
    source: function (request, response) {

        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchBankWithName",
            data: { term: $("#bankName").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {
                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.AhMst_pName,
                            val: Record.AhMst_Key,
                            id: Record.AhMst_mobile
                        }
                    }))
                }
            }
        });
    },
    minLength: 0,
    select: function (event, ui) {
        //bankName bankKey bankMobile
        $("#bankName").val(ui.item.label);
        $("#bankKey").val(ui.item.val);
        $("#bankMobile").val(ui.item.id);
        $("#bankName").prop("readonly", true);
    }
}).on('focus', function () { $(this).keydown(); });
$("#PymntDls").on('click', function (e) {
    var name = $("#invName").val();
    var ageyy = $("#ageyy").val();
    var agemm = $("#agemm").val();
    var agedd = $("#agedd").val();
    var gndr = $('#gender option:selected').text();
    var collMode = $("#collMode").val();
    var emailVal = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   
    var email = $("#PatEmail").val();
    var phn = $("#Phn").val();
    var testTableRows = $("#tstTable tbody tr");
    if (name == '') {
        alert("Please Enter The Name");
        $("#invName").focus();
        event.stopPropagation();
        return false;
    }
    else {
        //$('#gender option:selected').text("Male");
        if (gndr == '') {
            alert("Gender Required!");
            //$("#gender").focus();
            event.stopPropagation();
            return;
        }
        else {
            if (ageyy == '' && agemm == '' && agedd == '') {
                alert("Please Enter Age");
                $("#ageyy").focus();
                event.stopPropagation();
                return false;
            }
            else {
                if (ageyy.match("[a-zA-Z]")) {
                    alert("No Alphabets Allowed Here");
                    $("#ageyy").val("");
                    $("#ageyy").focus();
                    return false;
                }
                else {
                    if (ageyy > 103) {
                        alert("Please Fill Age In Required Range");
                        $("#ageyy").val("");
                        $("#ageyy").focus();
                        return false;
                    }
                    else {
                        if (agemm.match("[a-zA-Z]")) {
                            alert("No Alphabets Allowed Here");
                            $("#agemm").val("");
                            $("#agemm").focus();
                            return false;
                        }
                        else {
                            if (agemm >= 12) {
                                alert("Please Fill Age In Required Range");
                                $("#agemm").val("");
                                $("#agemm").focus();
                                return false;
                            }
                            else {
                                if (agedd.match("[a-zA-Z]")) {
                                    alert("No Alphabets Allowed Here");
                                    $("#agedd").val("");
                                    $("#agedd").focus();
                                    return false;
                                }
                                else {
                                    if (agedd >= 30) {
                                        alert("Please Fill Age In Required Range");
                                        $("#agedd").val("");
                                        $("#agedd").focus();
                                        return false;
                                    }
                                    else {
                                        if (phn.match("[a-zA-Z]") && $("#Phn").val() != "") {
                                            alert("No Alphabets Allowed Here");
                                            $("#Phn").val("");
                                            $("#Phn").focus();
                                            return false;
                                        }
                                        else {
                                            if ((phn.length > 10 || phn.length < 10) && $("#Phn").val() != "") {
                                                alert("Please Fill The Phone Number In Required Format");
                                                $("#Phn").val("");
                                                $("#Phn").focus();
                                                return false;
                                            }
                                            else {
                                                //email PatEmail
                                                //
                                                //return regex.test(email);
                                                if (!email.match(emailVal) && $("#PatEmail").val() != "") {
                                                    alert("Enter Email In Required Format(eg.example@gmail.com)");
                                                    $("#PatEmail").val('');
                                                    $("#PatEmail").focus();
                                                    return false;
                                                }
                                                else {
                                                    if ($("#collModeId").val() == '') {
                                                        alert("Please Select Valid CollectionMode");
                                                        $("#collMode").val("");
                                                        $("#collMode").focus();
                                                        return false;
                                                    }
                                                    else {
                                                        if ($("#outDrId").val() == '' && $("#outDr").val() != '') {
                                                            alert("Please Select Valid OutDoctor");
                                                            $("#outDr").val("");
                                                            $("#outDr").focus();
                                                            return false;
                                                        }
                                                        else {
                                                            if ($("#corpKey").val() == '' && $("#corporate").val() != '') {
                                                                alert("Please Select Valid Corporate");
                                                                $("#corporate").val("");
                                                                $("#corporate").focus();
                                                                return false;
                                                            }
                                                            else {
                                                                if ($("#refbyId").val() == '' && $("#refby").val() != '') {
                                                                    alert("Please Select Valid Ref.Doctor");
                                                                    $("#refby").val("");
                                                                    $("#refby").focus();
                                                                    //event.stopPropagation();
                                                                    //return;
                                                                    return false;
                                                                }
                                                                else {
                                                                    if ($("#clinicId").val() == '' && $("#clinic").val() != '') {
                                                                        alert("Please Select Valid Clinic");
                                                                        $("#clinic").val("");
                                                                        $("#clinic").focus();
                                                                        return false;
                                                                    }
                                                                    else {
                                                                        if ($("#collPersonId").val() == '' && $("#collPerson").val() != '') {
                                                                            alert("Please Select Valid CollectedStaff");
                                                                            $("#collPerson").val("");
                                                                            $("#collPerson").focus();
                                                                            return false;
                                                                        }
                                                                        else {
                                                                            if ($(testTableRows).find('#tsname').text() == "" && $(testTableRows).find('#tscode').text() == "" && !(testTableRows.length > 1)) {
                                                                                alert("Add Atleast One Test");
                                                                                $("#testcode").focus();
                                                                                event.stopPropagation();
                                                                                return false;
                                                                            }
                                                                            else {
                                                                                event.preventDefault();
                                                                                var gm = $("#grandTotal").text().replace(/[^0-9]/gi, '');
                                                                                var namt = $("#netamt").text().replace(/[^0-9]/gi, '');
                                                                                document.getElementById("netamt").innerHTML = "&#8377;" + gm + "&#8725;&#9592;";
                                                                                //document.getElementById("total").innerHTML = gm;
                                                                                //document.getElementById("SChrge").innerHTML = 0;
                                                                                $("#total").val(gm);
                                                                                $("#SChrge").val(0);
                                                                                $("#DiscAmt").val(0);
                                                                                //return false;netamt
                                                                                // $("#paymentModel").fadeIn(300);
                                                                                //$("#paymentModel").modal('show');
                                                                                //$("#paymentModel").dialog("show");
                                                                                //$("#paymentModel").modal('show');
                                                                                //----code for show payment option
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

});
$('#DiscAmt').keyup(function () {
    var total = 0;
    var nScharge = 0;
    var discAmt = 0;
    var paidamt = 0;
    paidamt = parseInt($("#PaidAmt").val());
    if (isNaN(paidamt)) {
        paidamt = 0;
    }
    total = parseInt($("#total").val());
    if (isNaN(total)) {
        total = 0;
    }
    nScharge = parseInt($("#SChrge").val());
    if (isNaN(nScharge)) {
        nScharge = 0;
    }
    var discAmt = parseInt($("#DiscAmt").val());
    if (isNaN(discAmt)) {
        discAmt = 0;
    }
    var NetTotal = (total - discAmt + nScharge);
    var balance = (total - discAmt + nScharge) - paidamt;
    $("#balance").val(-(balance));
    document.getElementById("netamt").innerHTML = "&#8377;" + NetTotal + "&#8725;&#9592;";
})
$("#SChrge").keyup(function () {
    var total = 0;
    var disc = 0;
    var paidamt = 0;
    paidamt = parseInt($("#PaidAmt").val());
    if (isNaN(paidamt)) {
        paidamt = 0;
    }
    var SChrgAmt = parseInt($("#SChrge").val());
    total = parseInt($("#total").val());
    if (isNaN(total)) {
        total = 0;
    }
    disc = parseInt($("#DiscAmt").val());
    if (isNaN(disc)) {
        disc = 0;
    }
    if (isNaN(SChrgAmt)) {
        SChrgAmt = 0;

    }
    var netTotal = (total - disc + SChrgAmt);
    var balance = (total - disc + SChrgAmt) - paidamt;
    $("#balance").val(-(balance));
    document.getElementById("netamt").innerHTML = "&#8377;" + netTotal + "&#8725;&#9592;";

    //var s = NaN;
    //var total = 0;
    //var SChrgAmt = parseInt($("#SChrge").val());
    //if (isNaN(SChrgAmt)) {
    //    SChrgAmt = 0;
    //    //var total = parseInt($("#netamt").val());
    //    //var total = parseInt($("#total").val());
    //    var total = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
    //    var NetTotal = parseInt(total + SChrgAmt);
    //    document.getElementById("netamt").innerHTML = "&#8377;" + NetTotal + "&#8725;&#9592;";
    //}
    //else {
    //    //var total = parseInt($("#netamt").val());
    //    //var total = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
    //    //var total = parseInt($("#total").val());
    //    var total = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
    //    var NetTotal = parseInt(total + SChrgAmt);
    //    document.getElementById("netamt").innerHTML = "&#8377;" + NetTotal + "&#8725;&#9592;";
    //}

})
$('#DiscReason').autocomplete({
    source: function (request, response) {
        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchDiscReason",
            data: { term: $("#DiscReason").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {
                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.Mstr_Desc,
                            val: Record.Mstr_Value,
                            id: Record.Mstr_Key
                        }
                    }))
                }
            }
        });
    },
    minLength: 0,
    select: function (event, ui) {
        //DiscReason DiscRsnID DiscRsnVal
        $("#DiscReason").val(ui.item.label);
        $("#DiscRsnID").val(ui.item.id);
        $("#DiscRsnVal").val(ui.item.val);
        // $("#DiscReason").prop("readonly", true);
    }
}).on('focus', function () { $(this).keydown(); });
//name ageyy agemm agedd collMode
//tstTable slno tscode tsname tsrate tsDisc tsDscPer tsTotal tsId tstDelete
//$(document).ready(function () {
//    $(document).on("click", "#PymntDls", function (e) {
//        event.preventDefault();
//        var name = $("#name").val();
//        var ageyy = $("#ageyy").val();
//        var agemm = $("#agemm").val();
//        var agedd = $("#agedd").val();
//        var collMode = $("#collMode").val();
//        var testTableRows = $("#tstTable tbody tr");
//        if (name == '') {
//            alert("Please enter the name");
//            //$("#paymentModel").modal('hide');
//            $("#name").focus();
//            return false;
//            //event.preventDefault();
//            //$('#paymentModel').modal('hide');
//            //$('#paymentModel').modal().hide();
//            //event.stopPropagation();
//            //return false;
//            //$("#paymentModel").modal('hide');
//            //return;
//        }
//        else {
//            if (ageyy == '' && agemm == '' && agedd == '') {
//                alert("Please enter age");
//                $("#ageyy").focus();
//                return;
//            }
//            else {
//                if (collMode == '') {
//                    alert("Please select collectionMode");
//                    $("#collMode").focus();
//                    return;
//                }
//                else {
//                    if ($(testTableRows).find('#tsname').text() == "" && $(testTableRows).find('#tscode').text() == "" && !(testTableRows.length > 1)) {
//                        alert("Add atleast one test");
//                        $("#testcode").focus();
//                        return;
//                    }
//                    else {
//                        // $("#paymentModel").fadeIn(300);
//                        $("#paymentModel").modal('show');
//                        //$("#paymentModel").dialog("show");
//                        //$("#paymentModel").modal('show');
//                        //----code for show payment option
//                    }
//                }
//            }
//        }
//    })
//})
//$('#row_dim').keyup(function () {
$("#PaidAmt").keyup(function () {
    //var s = NaN;
    var PaidAmt = parseInt($("#PaidAmt").val());
    var SChrge = parseInt($("#SChrge").val());
    if (isNaN(SChrge)) {
        SChrge = 0;
    }
    var total = parseInt($("#total").val());
    if (isNaN(total)) {
        total = 0;
    }
    var disc = parseInt($("#DiscAmt").val());
    if (isNaN(disc)) {
        disc = 0;
    }
    if (isNaN(PaidAmt)) {
        PaidAmt = 0;
    }
    //var total = parseInt($("#netamt").val());
    var netamt = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
    //var TotalBalance = parseInt(netamt - PaidAmt);
    var TotalBalance = parseInt((total - disc + SChrge) - PaidAmt);
    $("#balance").val(-(TotalBalance));
    //document.getElementById("netamt").innerHTML = "&#8377;" + NetTotal + "&#8725;&#9592;";
    //}
    //else {
    //    //var total = parseInt($("#netamt").val());
    //    //var total = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
    //    var netamt = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
    //    var TotalBalance = parseInt(netamt - PaidAmt);
    //    $("#balance").val(-(TotalBalance));
    //    //document.getElementById("netamt").innerHTML = "&#8377;" + NetTotal + "&#8725;&#9592;";
    //}

})
$("#Paytype").change(function () {
    var pmode = $('#Paytype option:selected').text();
    if (pmode == "Credit") {
        //var corp = $("#corporate").val();
        var corp = $("#corporate").val();
        $("#PayCorp").val(corp);
    }
    else if (pmode == "Cash") {
        //var netamt = parseInt($("#netamt").text().replace(/[^0-9]/gi, ''));
        var PaidAmt = parseInt($("#PaidAmt").val());
        var SChrge = parseInt($("#SChrge").val());
        if (isNaN(SChrge)) {
            SChrge = 0;
        }
        var total = parseInt($("#total").val());
        if (isNaN(total)) {
            total = 0;
        }
        var disc = parseInt($("#DiscAmt").val());
        if (isNaN(disc)) {
            disc = 0;
        }
        if (isNaN(PaidAmt)) {
            PaidAmt = 0;
        }
        var TotalBalance = parseInt((total - disc + SChrge) - PaidAmt);
        $("#PaidAmt").val(0);
        $("#balance").val(-(TotalBalance));
    }
    //else if (title == "Mrs." || title == "Miss." || title == "Ms.") {$('#ymd option:selected').text();balance


    //}
    //else {

    //}
})
$(document).ready(function () {
    $('#mycheckbox').change(function () {
        $("#DiscReason").val("");
        $("#DiscRsnID").val("");
        $("#DiscRsnVal").val("");
        $("#DiscAmt").val("");
        $("#DiscAmt").val(0);
        //$('#mycheckboxdiv').toggle();
        if ($("#mycheckbox").is(':checked') === true) {
            $('#mycheckboxdiv').show();
        }
        else {
            $('#mycheckboxdiv').hide();
        }
    });
});
//$(document).ready(function () {
//    $('#row_dim').hide();
//    $('#cash-icon').hide();
//    $('#Paytype').change(function () {
//        if ($('#Paytype').val() == '1') {
//            $('#row_dim').show();
//            $('#cash-icon').show();
//        } else {
//            $('#row_dim').hide();
//            $('#cash-icon').hide();
//        }
//    });
//});
//$(document).ready(function () {
//    $('#row_dim3').hide();
//    $('#visa-icon').hide();
//    $('#Paytype').change(function () {
//        if ($('#Paytype').val() == '3') {
//            $('#row_dim3').show();
//            $('#visa-icon').show();
//        } else {
//            $('#row_dim3').hide();
//            $('#visa-icon').hide();
//        }
//    });
//});
//$(document).ready(function () {
//    $('#row_dim4').hide();
//    $('#row_dim3').hide();
//    $('#upi-icon').hide();
//    $('#Paytype').change(function () {
//        if ($('#Paytype').val() == '2') {
//            $('#row_dim3').show();
//            $('#visa-icon').show();
//        } else {
//            if ($('#Paytype').val() == '3') {
//                $('#row_dim3').hide();
//                $('#row_dim4').show();
//                $('#visa-icon').show();
//            }
//            else {
//                $('#row_dim4').hide();
//                $('#visa-icon').hide();
//            }
//        }
//    });
//});
//$(document).ready(function () {
//    $('#row_dim2').hide();
//    $('#upi-icon').hide();
//    $('#Paytype').change(function () {
//        if ($('#Paytype').val() == '4') {
//            $('#row_dim2').show();
//            $('#upi-icon').show();
//        } else {
//            $('#row_dim2').hide();
//            $('#upi-icon').hide();
//        }
//    });
//});
////////////////////////////////////////////////////////
document.onkeydown = function (evt) {
    var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    if (keyCode == 13) {
        evt.preventDefault();
    }
}
$('#testcode').keydown(function (e) {
    if (e.keyCode == 13) {
        //e.preventDefault();
        event.preventDefault();
        var testcode = $("#testcode").val();
        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchTestWithEnterClick",
            data: { term: $("#testcode").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {
                    //testcode testname testrate testDiscAmt testDiscPer testTotal testId
                    var currentrow = $("#tstAddTable").find('tbody tr');
                    $.each(data.Records, function (index, test) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#tstAddTable tbody").append($(currentrow));
                            currentrow = $("#tstAddTable tbody tr:last");
                        }

                        $(currentrow).find("#testRptDay").val(test.tst_RptDay);
                        $(currentrow).find("#testRptTimeDays").val(test.tst_RptTmeDays);
                        $(currentrow).find("#testcode").val(test.TstMst_ShortName);
                        $(currentrow).find("#testname").val(test.TstMst_name);
                        $(currentrow).find("#testrate").val(test.TstMst_Rate);
                        $(currentrow).find("#testId").val(test.TstMst_Key);
                        $(currentrow).find("#testType").val(test.TstMst_TypeId);
                        $(currentrow).find("#testDiscAmt").val(test.SplR_NRate);
                        $(currentrow).find("#testDiscPer").val((test.TstMst_DiscPer).toFixed(2));
                        $(currentrow).find("#testTotal").val(test.TstMst_Total);
                        $("#tstAdd").focus();
                    })
                }
            }
        });
    }
});
$("#ResultOn").change(function (e) {
    event.preventDefault();
    //var regEx = /^\d{4}-\d{2}-\d{2}$/;
    var dateString = $("#ResultOn").val();
    if (moment(dateString, 'MM/DD/YYYY HH:MM tt', true).isValid()) {
        return;
    }
    else {
        alert("Please enter the date in correct format!");
        var d = new Date();
        var shortMonth = d.toLocaleString('en-us', { month: 'short' });
        var m = d.getMonth() + 1;
        var mlength = m.toString.length;
        if (m < 10) {
            var mm = "0" + m;
            if (d.getDate() < 10) {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = mm + "/" + "0" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#ResultOn").value = smplOn;

            }
            else {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = mm + "/" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#ResultOn").value = smplOn;
            }
        }
        else {
            if (d.getDate() < 10) {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = m + "/" + "0" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#ResultOn").value = smplOn;
            }
            else {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = m + "/" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#ResultOn").value = smplOn;
            }
        }
    }
});
$("#SampleOn").change(function (e) {
    event.preventDefault();
    //var regEx = /^\d{4}-\d{2}-\d{2}$/;
    var dateString = $("#SampleOn").val();
    if (moment(dateString, 'MM/DD/YYYY HH:MM tt', true).isValid()) {
        return;
    }
    else {
        alert("Please enter the date in correct format!");
        var d = new Date();
        var shortMonth = d.toLocaleString('en-us', { month: 'short' });
        var m = d.getMonth() + 1;
        var mlength = m.toString.length;
        if (m < 10) {
            var mm = "0" + m;
            if (d.getDate() < 10) {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = mm + "/" + "0" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#SampleOn").value = smplOn;

            }
            else {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = mm + "/" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#SampleOn").value = smplOn;
            }
        }
        else {
            if (d.getDate() < 10) {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = m + "/" + "0" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#SampleOn").value = smplOn;
            }
            else {
                var datetime = new Date();
                let a = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
                let smplOn = m + "/" + d.getDate() + "/" + d.getFullYear() + " " + a;
                document.querySelector("#SampleOn").value = smplOn;
            }
        }
    }
});
$("input[type=date]").on('click', function () {
    return false;
});
$(document).on("click", "#tstDelete", function (e) {
    event.preventDefault();
    var testDelete = $(this);
    var row = $(this).closest("tr");
    var id = $(row).attr('slno');
    var gm = $("#grandTotal").text().replace(/[^0-9]/gi, '');
    gm = parseInt(gm, 10);
    var testcode = $(row).find('#slno').val();
    if (parseInt(testcode) == 0) {
        $(row).remove();
        return false;
    }
    var tstrow = $("#tstTable").find('tbody tr');
    var tstnm = $(row).find('#tsname').text();
    if (tstnm == "" && gm == 0 && tstrow.length <= 2) {
        $("#testcode").focus();
    }
    else if (tstnm != "" && gm != 0 && tstrow.length == 1) {
        if (confirm("Do you want to delete: " + tstnm)) {
            var amt = 0;
            //tstTable slno tscode tsname tsrate tsDisc tsDscPer tsTotal tsId tstDelete
            //document.getElementById("grandTotal").innerHTML = "Total : INR " + am;
            document.getElementById("grandTotal").innerHTML = "&#8377;" + amt;
            $(tstrow).find('#slno').text('');
            $(tstrow).find('#tscode').text('');
            $(tstrow).find('#tsname').text('');
            $(tstrow).find('#tsrate').text('');
            $(tstrow).find('#tsDisc').text('');
            $(tstrow).find('#tsDscPer').text('');
            $(tstrow).find('#tsTotal').text('');
            $(tstrow).find('#tsId').text('');
            $("#testcode").focus();
        }
        else {
        }
    }

    else {
        if ($("#testcode").val() == "" && $("#testname").val() == "" && $("#testTotal").val() == "") {
            if (confirm("Do you want to delete: " + tstnm)) {
                var siblings = $(row).siblings();
                $(row).remove();
                $('td#slno').text(function (i) {

                    // returning the sum of i + 1 to compensate for
                    // JavaScript's zero-indexing:
                    return i + 1;
                });
                var grandTotal = 0;
                //sum of amounts to get grand total
                $("td[name=tsTotal]").each(function () {
                    grandTotal = grandTotal + parseInt($(this).text());

                })
                document.getElementById("grandTotal").innerHTML = "&#8377;" + grandTotal;
                //siblings.each(function (index) {
                //    $(this).children('td:first').find("#slno").html(index + 1);
                //});
            }
            else {
            }
        }
        else {
        }

    }
})
$("#refByRfrsh").click(function () {
    $("#refby").val("");
    $("#refbyId").val("");
    $("#refby").prop("readonly", false);
    //$("#refby").focus();
})
$("#colModeRfrsh").click(function () {
    $("#collMode").val("");
    $("#collModeId").val("");
    $("#collMode").prop("readonly", false);
    //$("#collMode").focus();
})
$("#outDrRfrsh").click(function () {
    $("#outDr").val("");
    $("#outDrId").val("");
    $("#outDr").prop("readonly", false);
    //$("#outDr").focus();
})
$("#CorpRfrsh").click(function () {
    $("#corporate").val("");
    $("#corpKey").val("");
    $("#corporate").prop("readonly", false);
    //$("#collPerson").focus();
})
$("#colStfRfrsh").click(function () {
    $("#collPerson").val("");
    $("#collPersonId").val("");
    $("#collPerson").prop("readonly", false);
    //$("#collPerson").focus();
})
$("#clncRfrsh").click(function () {
    $("#clinic").val("");
    $("#clinicId").val("");
    $("#clinic").prop("readonly", false);
    //$("#clinic").focus();
})
var flag = 0;
$("#title").change(function () {
    var title = $('#title option:selected').text();
    if (title == "Mr." || title == "Master." || title == "Fr.") {
        $('#gender option:selected').text("Male");

    }
    else if (title == "Mrs." || title == "Miss." || title == "Ms." || title == "Sist." || title == "Smt." || title == "Sri." || title == "C/O Hosp." || title == "Km.") {
        $('#gender option:selected').text("Female");

    }
    else {
        $('#gender option:selected').text("");
    }
})
$("#searchCorp").click(function () {
    $("#corporate").val('');
    $("#corpKey").val('');
});
$(document).ready(function () {
    $('input[name=testcode]').focus(function () {
        $(this).val('');
    });
});
$(document).ready(function () {
    $('input[name=testname]').focus(function () {
        $(this).val('');
    });
});
$(function () {
    $('#clinic').autocomplete({
        autoFocus: true,
        source: function (request, response) {
            $.ajax({
                type: 'GET',
                url: "/InvoiceRegister/DoctorClinic",
                //data: { term: $("#clinic").val(), docId: $("#outDrId").val() },
                data: { term: $("#clinic").val() },
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.Result === "OK") {
                        //if (data.Records == null) {
                        //    $('#clinic').val("");
                        //    $('#clinicId').val("");
                        //}
                        //else {
                        response($.map(data.Records, function (Record) {
                            return {
                                label: Record.AhMst_pName,
                                val: Record.AhMst_Key,
                                id: Record.AhMst_HospName
                            }
                        }))
                        //}

                    }
                }
            });
        },
        minLength: 0,
        select: function (event, ui) {
            $("#clinicId").val(ui.item.val);
            $("#clinic").val(ui.item.label);
            //searchClinic
            $("#clinic").prop("readonly", true);

            //$('#clinic').setCursorPosition(1);
            flag = 1;
        }

    }).on('focus', function () { $(this).keydown(); });
});
$('#collPerson').autocomplete({
    autoFocus: true,
    source: function (request, response) {
        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/CollPerson",
            data: { term: $("#collPerson").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {
                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.AhMst_pName,
                            val: Record.AhMst_Key,
                            id: Record.AhMst_HospName
                        }
                    }))
                }
            }
        });
    },
    minLength: 0,
    select: function (event, ui) {
        $("#collPersonId").val(ui.item.val);
        $("#collPerson").val(ui.item.label);
        $("#collPerson").prop("readonly", true);
    }
}).on('focus', function () { $(this).keydown(); });
$('#outDr').autocomplete({
    source: function (request, response) {
        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/RefByDrName",
            data: { term: $("#outDr").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {


                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.AhMst_pName,
                            val: Record.AhMst_Key,
                            id: Record.AhMst_HospName

                        }

                    }))


                }


            }
        });

    },

    minLength: 0,
    select: function (event, ui) {
        $("#outDrId").val(ui.item.val);
        $("#outDr").val(ui.item.label);
        $("#outDr").prop("readonly", true);
    }

}).on('focus', function () { $(this).keydown(); });
$('#collMode').autocomplete({
    source: function (request, response) {

        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/CollMode",
            data: { term: $("#collMode").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {


                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.Mstr_Desc,
                            val: Record.Mstr_Key,
                            id: Record.Mstr_Key

                        }

                    }))


                }


            }
        });

    },

    minLength: 0,
    select: function (event, ui) {
        $("#collModeId").val(ui.item.id);

        $("#collMode").val(ui.item.label);
        $("#collMode").prop("readonly", true);
    }

}).on('focus', function () { $(this).keydown(); });;
function showPopUp() {
    $("#RefByModel").dialog({
        title: "Doctor",
        height: 450,
        width: 600,
        modal: true
        //,
        //buttons: {
        //    "OK": function () {
        //        $(this).dialog("close");
        //    },
        //    "Cancel": function () {
        //        $(this).dialog("close");
        //    }
        //}

    }).prev(".ui-dialog-titlebar").css("background", "#428bca");
}
$("#tstAdd").on("click.tstAdd", function () {
    event.preventDefault();
    debugger;
    var inx = 0;
    var addTests = $(this);
    var row = $(this).closest("tr");
    var pdetails = [];

    //tstAddTable testcode testname testrate testDiscAmt testDiscPer testTotal testId
    //tstTable tscode tsname tsrate tsDisc tsDscPer tsTotal tsId

    var tstaddtbl = $("#tstAddTable").find('tbody tr');
    var testSearch = {

        TstMst_TypeId: $("#testType").val(),
        TstMst_ShortName: $("#testcode").val(),
        TstMst_name: $("#testname").val(),
        TstMst_Rate: $("#testrate").val(),
        SplR_NRate: $("#testDiscAmt").val(),
        TstMst_DiscPer: $("#testDiscPer").val(),
        TstMst_Total: $("#testTotal").val(),
        TstMst_Key: $("#testId").val(),
        TstMst_TypeId: $("#testType").val(),
        tst_RptDay: $("#testRptDay").val(),
        tst_RptTmeDays: $("#testRptTimeDays").val()
    }
    var row = $("#tstTable").find("#tscode").html();
    //var rows = $("#tstTable").find('tbody tr ');$(this).find(".customerIDCell").html();
    var isExist = false;
    var tstid = $("#tstTable").find("#tsId").text();
    if (testSearch.TstMst_name == "" && testSearch.TstMst_ShortName == "") {
        alert("Please enter any test details");
        $("#testcode").focus();
    }
    else {
        //$(tr).find('td').
        $("input[name=tsId]").each(function () {
            var tstids = $(this).val();
            //var x = $(this).val();//not
            //var y = $(this).text();//ok
            if (testSearch.TstMst_Key == parseInt(tstids)) {
                isExist = true;
            }

        })
        //$.each(rows, function () {
        //    var id = $("#tstid").val();


        //})
        if (!isExist) {
            //tstAddTable testcode testname testrate testDiscAmt testDiscPer testTotal testId
            if ($('#testId').val() == "") {
                alert("Enter valid Test");
                $("#testcode").val("");
                $("#testname").val("");
                $("#testrate").val("");
                $("#testDiscAmt").val("");
                $("#testDiscPer").val("");
                $("#testTotal").val("");
                $("#testId").val("");
                $("#testcode").focus();
                $("#testType").val("");
                $("#testcode").text("");
                $("#testcode").html("");
                $("#testcode").val("");
                $("#testcode").val("");
                $("#testRptDay").val("");
                $("#testRptTimeDays").val("");
                return;
            }

            else {
                var currentrow = $("#tstTable").find('tbody tr');
                var nextRow = currentrow.next();
                var lngth = ($("#tstTable tr").length);
                var tstCodes = $(currentrow).find("#tscode").html();
                var tstname = $(currentrow).find("#tsname").html();
                //if (lngth == 2 && $(currentrow).find('input[type=text]').val() == "") {
                if (lngth == 2 && (tstCodes == "" && tstname == "")) {
                    $.each(testSearch, function (index, test) {

                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#tstTable tbody").append($(currentrow));
                            currentrow = $("#tstTable tbody tr:last");
                        }
                        var inx = 0;
                        var currentrow = $("#tstTable").find('tbody tr:last');
                        //tstTable tscode tsname tsrate tsDisc tsDscPer tsTotal tsId
                        //TstMst_ShortName TstMst_name TstMst_Rate SplR_NRate TstMst_DiscPer TstMst_Total TstMst_Key

                        $(currentrow).find("#slno").text(inx + 1);
                        $(currentrow).find("#tscode").text(testSearch.TstMst_ShortName);
                        $(currentrow).find("#tsname").text(testSearch.TstMst_name);
                        $(currentrow).find("#tsrate").text(testSearch.TstMst_Rate);
                        $(currentrow).find("#tsDisc").text(testSearch.SplR_NRate);
                        $(currentrow).find("#tsDscPer").text(testSearch.TstMst_DiscPer);
                        $(currentrow).find("#tsTotal").text(testSearch.TstMst_Total);
                        $(currentrow).find("#tstType").val(testSearch.TstMst_TypeId);
                        $(currentrow).find("#tsId").val(testSearch.TstMst_Key);
                        $(currentrow).find("#tstType").val(testSearch.tst_RptDay);
                        $(currentrow).find("#tstrptTimedys").val(testSearch.tst_RptTmeDays);
                        var grandTotal = 0;
                        //sum of amounts to get grand total
                        $("td[name=tsTotal]").each(function () {
                            grandTotal = grandTotal + parseInt($(this).text());

                        })
                        var serialNO = 0;
                        var id = serialNO + 1;
                        serialNO = id;
                        //$(currentrow).find("#slno").val((serialNO));
                        document.getElementById("grandTotal").innerHTML = "&#8377;" + grandTotal;
                        ////$(pdetailTableRows).find('input[type=text]').val("");
                        ////
                        //var a = 0;
                        //var customerId = 0;
                        //var grandTotal = 0;
                        ////sum of amounts to get grand total
                        //$("input[name=tsTotal]").each(function () {
                        //    //grandTotal = grandTotal + parseInt($(this).html());
                        //    customerId = $(this).find("#tsTotal").html();
                        //    a = document.getElementById("tsTotal").innerHTML;
                        //    grandTotal = parseInt(document.getElementById("tsTotal").innerText);
                        //    //grandTotal = grandTotal + ($("#tsTotal").html());
                        //})
                        //var x = customerId;
                        //var serialNO = 0;


                        //var id = serialNO + 1;


                        //serialNO = id;
                        //$(currentrow).find("#slno").text((serialNO));
                        //document.getElementById("grndTotal").innerHTML =  grandTotal;
                        //tstAddTable testcode testname testrate testDiscAmt testDiscPer testTotal testId
                        $("#testcode").val("");
                        $("#testname").val("");
                        $("#testrate").val("");
                        $("#testDiscAmt").val("");
                        $("#testDiscPer").val("");
                        $("#testTotal").val("");
                        $("#testId").val("");
                        $("#testcode").focus();
                        window.gnd = grandTotal;
                        window.codeindex = $("#slno").val();
                        $("#testcode").val("");
                        $("#testcode").val("");
                        $("#testType").val("");
                        $("#testcode").text("");
                        $("#testcode").html("");
                    })
                }

                else {

                    var lastRow = $("#tstTable tbody").find('tr:last');
                    var lastRow = $("#tstTable tbody").find('tr:last').clone();
                    $("#tstTable tbody").append($(lastRow));
                    lastRow = $("#tstTable tbody tr:last");
                    $(lastRow).find('input[type=text]').text("");

                    console.log(lastRow);

                    nextRow = $("#tstTable tbody tr:last");
                    var index = 0;
                    //var nextRow = $("#tstTable").find('tbody tr:last');
                    $(lastRow).find("#slno").text(index + 1);
                    $(lastRow).find("#tscode").text(testSearch.TstMst_ShortName);
                    $(lastRow).find("#tsname").text(testSearch.TstMst_name);
                    $(lastRow).find("#tsrate").text(testSearch.TstMst_Rate);
                    $(lastRow).find("#tsDisc").text(testSearch.SplR_NRate);
                    $(lastRow).find("#tsDscPer").text(testSearch.TstMst_DiscPer);
                    $(lastRow).find("#tsTotal").text(testSearch.TstMst_Total);
                    $(lastRow).find("#tstType").val(testSearch.TstMst_TypeId);
                    $(lastRow).find("#tsId").val(testSearch.TstMst_Key);
                    $(lastRow).find("#tstType").val(testSearch.tst_RptDay);
                    $(lastRow).find("#tstrptTimedys").val(testSearch.tst_RptTmeDays);
                    //$(pdetailTableRows).find('input[type=text]').val("");
                    var grandTotal = 0;
                    //sum of amounts to get grand total
                    $("td[name=tsTotal]").each(function () {
                        grandTotal = grandTotal + parseInt($(this).text());

                    })
                    var serialNO = 0;
                    var previousrow = lastRow.prev();
                    var id = parseInt($(previousrow).find('#slno').text());

                    ////
                    serialNO = id + 1;

                    //var id = serialNO + 1;


                    //serialNO = id;
                    $(lastRow).find("#slno").text((serialNO));
                    document.getElementById("grandTotal").innerHTML = "&#8377;" + grandTotal;
                    //var grandTotal = 0;
                    ////sum of amounts to get grand total
                    //$("input[name=tsTotal]").each(function () {
                    //    grandTotal = grandTotal + parseInt($(this).text());
                    //})

                    //var serialNO = 0;

                    //var previousrow = lastRow.prev();
                    //var id = parseInt($(previousrow).find('#slno').text());

                    //////
                    //serialNO = id + 1;
                    //$(lastRow).find("#slno").text((serialNO));
                    //document.getElementById("grndTotal").innerHTML =  grandTotal;

                    $("#testcode").val("");
                    $("#testname").val("");
                    $("#testrate").val("");
                    $("#testDiscAmt").val("");
                    $("#testDiscPer").val("");
                    $("#testTotal").val("");
                    $("#testId").val("");
                    $("#testcode").focus();

                    window.gnd = grandTotal;
                    window.codeindex = $("#slno").val();
                    $("#testcode").val("");
                    $("#testcode").val("");
                    $("#testType").val("");
                    $("#testcode").text("");
                    $("#testcode").html("");
                    $("#testRptDay").val("");
                    $("#testRptTimeDays").val("");
                }
            }
        }
        else {
            alert("This test is already added");
            $("#testcode").val("");
            $("#testname").val("");
            $("#testrate").val("");
            $("#testDiscAmt").val("");
            $("#testDiscPer").val("");
            $("#testTotal").val("");
            $("#testId").val("");
            $("#testcode").focus();
            $("#testcode").val("");
            $("#testcode").val("");
            $("#testType").val("");
            $("#testcode").text("");
            $("#testcode").html("");
            $("#testRptDay").val("");
            $("#testRptTimeDays").val("");
        }
    }


})
$(document).ready(function () {
    $("#tstSrchTble").find("tbody tr").keydown(function (e) {
        if (e.which == '40') {
            $(this).css("background-color", "red");
        }

    })
})
//$("#testcode").autocomplete({
//    open: function (event, ui) {
//        $(this).autocomplete("widget").css({
//            "width": ((1000) + "px")
//        });
//    },
//    //delay: 500,
//    //autoFocus: true,
//    closeOnSelect: true,
//    source: function (request, response) {
//        //var crpid = 0;

//        var tstObj = {
//            TstMst_name: $("#testcode").val(),
//            Corp_Id: parseInt($("#corpKey").val())
//        }
//        $.ajax({
//            type: 'POST',
//            url: "/InvoiceRegister/SearchTestWithCode",
//            data: JSON.stringify(tstObj),
//            contentType: "application/json; charset=utf-8",
//            dataType: 'json',
//            success: function (data) {
//                console.log(data);
//                if (data.Result === "OK") {
//                    response($.map(data.Records, function (item) {
//                        return {//tst_RptDay testRptDay tstrptDay     tst_RptTmeDays testRptTimeDays tstrptTimedys
//                            label: item.TstMst_ShortName,
//                            value: item.TstMst_Rate,
//                            test_shortName: item.TstMst_ShortName,
//                            test_name: item.TstMst_name,
//                            test_rate: item.TstMst_Rate,
//                            test_splRate: item.SplR_NRate,
//                            test_discper: (item.TstMst_DiscPer).toFixed(2),
//                            test_totalAmt: item.TstMst_Total,
//                            test_key: item.TstMst_Key,
//                            test_typeId: item.TstMst_TypeId,
//                            testRptDay: item.tst_RptDay,
//                            testRptTimeDays: item.tst_RptTmeDays
//                        }

//                    }))
//                }
//            }
//        });
//    },
//    minLength: 1,
//    delay: 500,
//    select: function (event, ui) {
//        var tsts = {
//            TstMst_name: $("#tcode").val(),
//            Corp_Id: parseInt($("#corpKey").val()),
//            TstMst_Key: parseInt($("#tId").val())
//        }
//        $.ajax({
//            type: "GET",
//            url: "/InvoiceRegister/TestDetailsWithcode",
//            data: JSON.stringify(tsts),
//            contentType: "application/json; charset=utf-8",
//            dataType: "json",
//            success: function (data) {

//                if (data.Result === "OK") {
//                    var currentrow = $("#tstAddTable").find('tbody tr');
//                    $.each(data.Record, function (index, test) {
//                        if (index > 0) {
//                            currentrow = $(currentrow).clone();
//                            $("#tstAddTable tbody").append($(currentrow));
//                            currentrow = $("#tstAddTable tbody tr:last");
//                        }
//                        //$(currentrow).find("#slno").val((index + 1));
//                        $(currentrow).find("#testcode").val(test.TstMst_ShortName);
//                        $(currentrow).find("#testname").val(test.TstMst_name);
//                        $(currentrow).find("#totalamount").val(test.SplR_NRate);

//                        $(currentrow).find("#Rate").val(test.TstMst_Rate);
//                        $(currentrow).find("#discountt").val((test.TstMst_Rate) - (test.SplR_NRate));
//                        $(currentrow).find("#testid").val(test.TstMst_Key);
//                        $("#testname").focus();
//                        //$("#testcode").val(prop("readonly", true));
//                        //$("#testname").prop("readonly", true);



//                    })


//                }


//                else {
//                    alert(" test not found!");
//                }
//            }
//        });
//    }

//,
//}).focus(function () {
//    $(this).trigger('keydown.autocomplete');
//}).data("autocomplete")._renderItem = function (ul, item) {
//    var i = 0;
//    return $('<li id="tstList">')
//        .append('<a>'
//         + '<table style="width:970px;border:thick" id="tstSrchTble" class="table table-bordered"><tr>'
//            + '<td style="width:90px;" id="tcode">' + item.test_shortName + '</td>'
//            + '<td style="width:500px;" id="tname">' + item.test_name + '</td>'
//            + '<td style="width:95px;" id="trate">' + item.test_rate + '</td>'
//             + '<td style="width:95px;" id="tDiscAmt">' + item.test_splRate + '</td>'
//            + '<td style="width:95px;" id="tDiscPer">' + item.test_discper + '</td>'
//            + '<td style="width:95px;" id="tTotal">' + item.test_totalAmt + '</td>'
//            + '<td style="width:95px;display:none" id="tId">' + item.test_key + '</td>'
//             + '<td style="width:95px;display:none" id="tType">' + item.test_typeId + '</td>'
//             + '<td style="width:95px;display:none" id="tRptDay">' + item.testRptDay + '</td>'
//             + '<td style="width:95px;display:none" id="tRptTime">' + item.testRptTimeDays + '</td>'
//            + '</tr></table></a>')
//        .appendTo(ul);
//    i++;
//}
/////////////////////////////////////////////////////////////////////////////////
//$("#testcode").autocomplete({
//    open: function (event, ui) {
//        $(this).autocomplete("widget").css({
//            "width": ((1000) + "px")
//        });
//    },
//    delay: 100,
//    //autoFocus: true,$(currentrow).find("#testType").val(test.TstMst_TypeId);

//    closeOnSelect: true,
//    source: function (request, response) {
//        $.ajax({
//            type: 'GET',
//            url: "/InvoiceRegister/SearchTestWithName",
//            data: { term: $("#testcode").val() },
//            contentType: "application/json; charset=utf-8",
//            dataType: 'json',
//            success: function (data) {
//                console.log(data);
//                if (data.Result === "OK") {
//                    response($.map(data.Records, function (item) {
//                        return {
//                            label: item.TstMst_ShortName,
//                            value: item.TstMst_Rate,
//                            test_shortName: item.TstMst_ShortName,
//                            test_name: item.TstMst_name,
//                            test_rate: item.TstMst_Rate,
//                            test_splRate: item.TstMst_Rate,
//                            test_discper: (item.TstMst_DiscPer).toFixed(2),
//                            test_totalAmt: item.TstMst_Total,
//                            test_key: item.TstMst_Key,
//                            test_typeId: item.TstMst_TypeId,
//                            testRptDay: item.tst_RptDay,
//                            testRptTimeDays: item.tst_RptTmeDays
//                        }

//                    }))
//                }
//            }
//        });
//    },
//    minLength: 1,
//    select: function (event, ui) {
//        //$("#testname").val(ui.item.id);
//    }

//}).focus(function () {
//    $(this).trigger('keydown.autocomplete');
//}).data("autocomplete")._renderItem = function (ul, item) {
//    var i = 0;
//    return $('<li id="tstList">')
//        .append('<a>'
//         + '<table style="width:970px;border:thick" id="tstSrchTble" class="table table-bordered"><tr id="tstRow">'
//         //+ '<tr><th style="width:90px;" >TestCode</th><th style="width:500px;" >TestName</th><th style="width:95px;" >TestRate</th><th style="width:95px;" >TestSplrRate</th><th style="width:95px;" >TestDiscPer</th><th style="width:95px;" >TestTotal</th></tr>'
//            + '<td style="width:90px;" id="tcode">' + item.test_shortName + '</td>'
//            + '<td style="width:500px;" id="tname">' + item.test_name + '</td>'
//            + '<td style="width:95px;" id="trate">' + item.test_rate + '</td>'
//             + '<td style="width:95px;" id="tDiscAmt">' + item.test_splRate + '</td>'
//            + '<td style="width:95px;" id="tDiscPer">' + item.test_discper + '</td>'
//            + '<td style="width:95px;" id="tTotal">' + item.test_totalAmt + '</td>'
//                + '<td style="width:95px;display:none" id="tId">' + item.test_key + '</td>'
//                 + '<td style="width:95px;display:none" id="tType">' + item.test_typeId + '</td>'
//                  + '<td style="width:95px;display:none" id="tRptDay">' + item.testRptDay + '</td>'
//             + '<td style="width:95px;display:none" id="tRptTimeDays">' + item.testRptTimeDays + '</td>'
//            + '</tr></table></a>')
//        .appendTo(ul);
//    i++;
//}
$("#testcode").autocomplete({
    open: function (event, ui) {
        $(this).autocomplete("widget").css({
            "width": ((1000) + "px")
        });
    },
    //delay: 500,
    //autoFocus: true,$(currentrow).find("#testType").val(test.TstMst_TypeId);

    closeOnSelect: true,
    source: function (request, response) {
        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchTestDetails",
            data: { term: $("#testcode").val(), nameCode: "tstCode" },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {
                    response($.map(data.Records, function (item) {
                        return {
                            label: item.TstMst_ShortName,
                            value: item.TstMst_Rate,
                            test_shortName: item.TstMst_ShortName,
                            test_name: item.TstMst_name,
                            test_rate: item.TstMst_Rate,
                            test_splRate: item.TstMst_Rate,
                            test_discper: (item.TstMst_DiscPer).toFixed(2),
                            test_totalAmt: item.TstMst_Total,
                            test_key: item.TstMst_Key,
                            test_typeId: item.TstMst_TypeId,
                            testRptDay: item.tst_RptDay,
                            testRptTimeDays: item.tst_RptTmeDays
                        }

                    }))
                }
            }
        });
    },
    minLength: 1,
    select: function (event, ui) {
        //$("#testname").val(ui.item.id);
    }

}).data("autocomplete")._renderItem = function (ul, item) {
    var i = 0;
    return $('<li id="tstList">')
        .append('<a>'
         + '<table style="width:970px;border:thick" id="tstSrchTble" class="table table-bordered"><tr id="tstRow">'
         //+ '<tr><th style="width:90px;" >TestCode</th><th style="width:500px;" >TestName</th><th style="width:95px;" >TestRate</th><th style="width:95px;" >TestSplrRate</th><th style="width:95px;" >TestDiscPer</th><th style="width:95px;" >TestTotal</th></tr>'
            + '<td style="width:90px;" id="tcode">' + item.test_shortName + '</td>'
            + '<td style="width:500px;" id="tname">' + item.test_name + '</td>'
            + '<td style="width:95px;" id="trate">' + item.test_rate + '</td>'
             + '<td style="width:95px;" id="tDiscAmt">' + item.test_splRate + '</td>'
            + '<td style="width:95px;" id="tDiscPer">' + item.test_discper + '</td>'
            + '<td style="width:95px;" id="tTotal">' + item.test_totalAmt + '</td>'
                + '<td style="width:95px;display:none" id="tId">' + item.test_key + '</td>'
                 + '<td style="width:95px;display:none" id="tType">' + item.test_typeId + '</td>'
                  + '<td style="width:95px;display:none" id="tRptDay">' + item.testRptDay + '</td>'
             + '<td style="width:95px;display:none" id="tRptTimeDays">' + item.testRptTimeDays + '</td>'
            + '</tr></table></a>')
        .appendTo(ul);
    i++;
}
/////////////////////////////////////////////////////////////////////////////////
$("#testname").autocomplete({
    open: function (event, ui) {
        $(this).autocomplete("widget").css({
            "width": ((1000) + "px")
        });
    },
    //delay: 500,
    //autoFocus: true,$(currentrow).find("#testType").val(test.TstMst_TypeId);

    closeOnSelect: true,
    source: function (request, response) {
        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchTestDetails",
            data: { term: $("#testname").val(), nameCode: "tstName" },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {
                    response($.map(data.Records, function (item) {
                        return {
                            label: item.TstMst_ShortName,
                            value: item.TstMst_Rate,
                            test_shortName: item.TstMst_ShortName,
                            test_name: item.TstMst_name,
                            test_rate: item.TstMst_Rate,
                            test_splRate: item.TstMst_Rate,
                            test_discper: (item.TstMst_DiscPer).toFixed(2),
                            test_totalAmt: item.TstMst_Total,
                            test_key: item.TstMst_Key,
                            test_typeId: item.TstMst_TypeId,
                            testRptDay: item.tst_RptDay,
                            testRptTimeDays: item.tst_RptTmeDays
                        }

                    }))
                }
            }
        });
    },
    minLength: 1,
    select: function (event, ui) {
        //$("#testname").val(ui.item.id);
        //$("#testcode").val(ui.item.label);
        //TstMst_ShortName = ui.item.label;

    }

}).data("autocomplete")._renderItem = function (ul, item) {
    var i = 0;
    return $('<li id="tstList">')
        .append('<a>'
         + '<table style="width:970px;border:thick" id="tstSrchTble" class="table table-bordered"><tr id="tstRow">'
         //+ '<tr><th style="width:90px;" >TestCode</th><th style="width:500px;" >TestName</th><th style="width:95px;" >TestRate</th><th style="width:95px;" >TestSplrRate</th><th style="width:95px;" >TestDiscPer</th><th style="width:95px;" >TestTotal</th></tr>'
            + '<td style="width:90px;" id="tcode">' + item.test_shortName + '</td>'
            + '<td style="width:500px;" id="tname">' + item.test_name + '</td>'
            + '<td style="width:95px;" id="trate">' + item.test_rate + '</td>'
             + '<td style="width:95px;" id="tDiscAmt">' + item.test_splRate + '</td>'
            + '<td style="width:95px;" id="tDiscPer">' + item.test_discper + '</td>'
            + '<td style="width:95px;" id="tTotal">' + item.test_totalAmt + '</td>'
                + '<td style="width:95px;display:none" id="tId">' + item.test_key + '</td>'
                 + '<td style="width:95px;display:none" id="tType">' + item.test_typeId + '</td>'
                  + '<td style="width:95px;display:none" id="tRptDay">' + item.testRptDay + '</td>'
             + '<td style="width:95px;display:none" id="tRptTimeDays">' + item.testRptTimeDays + '</td>'
            + '</tr></table></a>')
        .appendTo(ul);
    i++;
}

$('body').on('click', '#tstList', function (evt) {
    var index = $(this).index();
    //var table = $(this).find("#tstSrchTble");
    //var row = $(table).find('tbody tr');
    //$("#testcode").text($(row).find("#tcode").text());
    //$("#testcode").val($(row).find("#tcode").text());
    //$("#testname").val($(row).find("#tname").text());
    //$("#testrate").val($(row).find("#trate").text());
    //$("#testDiscAmt").val($(row).find("#tDiscAmt").text());
    //$("#testDiscPer").val($(row).find("#tDiscPer").text());
    //$("#testTotal").val($(row).find("#tTotal").text());
    //$("#testId").val($(row).find("#tId").text());
    //$("#testType").val($(row).find("#tType").text());
    //$("#testRptDay").val($(row).find("#tRptDay").text());
    //$("#testRptTimeDays").val($(row).find("#tRptTimeDays").text());
    // TstMst_Key TstMst_name TstMst_ShortName Inv_InsId
    var table = $(this).find("#tstSrchTble");
    var row = $(table).find('tbody tr');
    var tstObj = {
        TstMst_Key: parseFloat($(row).find("#tId").text()),
        TstMst_name: $(row).find("#tname").text(),
        TstMst_ShortName: $(row).find("#tcode").text(),
        Inv_InsId: parseFloat($("#corpKey").val())
    }
    $.ajax({
        type: "POST",
        url: "/InvoiceRegister/TestDetailsWithcode",
        data: JSON.stringify(tstObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            if (data.Result === "OK") {
                var currentrow = $("#tstAddTable").find('tbody tr');
                $.each(data.Records, function (index, test) {
                    if (index > 0) {
                        currentrow = $(currentrow).clone();
                        $("#tstAddTable tbody").append($(currentrow));
                        currentrow = $("#tstAddTable tbody tr:last");
                    }
                    //testcode testname testrate testDiscAmt testDiscPer testTotal testId testType testRptDay testRptTimeDays
                    $(currentrow).find("#testcode").val(test.TstMst_ShortName);
                    $(currentrow).find("#testname").val(test.TstMst_name);
                    $(currentrow).find("#testrate").val(test.TstMst_Rate);
                    $(currentrow).find("#testDiscAmt").val(test.SplR_NRate);
                    $(currentrow).find("#testDiscPer").val((test.TstMst_DiscPer).toFixed(2));
                    $(currentrow).find("#testTotal").val(test.TstMst_Total);
                    $(currentrow).find("#testId").val(test.TstMst_Key);
                    $(currentrow).find("#testType").val(test.TstMst_TypeId);
                    $(currentrow).find("#testRptDay").val(test.tst_RptDay);
                    $(currentrow).find("#testRptTimeDays").val(test.tst_RptTmeDays);
                    $("#tstAdd").focus();
                    //$("#testcode").val(prop("readonly", true));
                    //$("#testname").prop("readonly", true);



                })


            }


            else {
                alert(" test not found!");
            }
        }
    });
    //$("#tstAdd").focus();
});
function addslashes(string) {
    return string.replace(/\\/g, '\\\\').
    replace(/\u0008/g, '\\b').
    replace(/\t/g, '\\t').
    replace(/\n/g, '\\n').
    replace(/\f/g, '\\f').
    replace(/\r/g, '\\r').
    replace(/'/g, '\\\'').
    replace(/"/g, '\\"');
}
$(function () {
    $('#refby').autocomplete({

        source: function (request, response) {

            $.ajax({
                type: 'GET',
                url: "/InvoiceRegister/RefByDrName",
                data: { term: $("#refby").val() },
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.Result === "OK") {


                        response($.map(data.Records, function (Record) {
                            return {
                                label: Record.AhMst_pName,
                                val: Record.AhMst_Key,
                                id: Record.AhMst_HospName

                            }

                        }))


                    }


                }
            });

        },

        minLength: 0,
        select: function (event, ui) {
            $("#refbyId").val(ui.item.val);

            $("#refby").val(ui.item.label);
            $("#refby").prop("readonly", true);
        }

    }).on('focus', function () { $(this).keydown(); });
});
$('#corporate').autocomplete({

    closeOnSelect: false,
    source: function (request, response) {

        $.ajax({
            type: 'GET',
            url: "/InvoiceRegister/SearchCorpWithName",
            data: { term: $("#corporate").val() },
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.Result === "OK") {


                    response($.map(data.Records, function (Record) {
                        return {
                            label: Record.AhMst_pName,
                            val: Record.AhMst_Key,
                            id: Record.AhMst_Key

                        }

                    }))


                }


            }
        });

    },

    minLength: 0,
    select: function (event, ui) {
        $("#corporate").val(ui.item.label);
        $("#corpKey").val(ui.item.id);
        $("#corporate").prop("readonly", true);
        var request = {};
        var invNo = $("input[name=invNo]").val();
        var insId = $("input[name=corpKey]").val();
        request.Inv_No = $("input[name=invNo]").val();
        request.Inv_InsId = $("input[name=corpKey]").val();
        console.log(request);

        var testTableRows = $("#tstTable tbody tr");
        var invDetDls = [];
        var totaldisc = 0;
        var tstShortName = "";
        var table = $("#tstTable tbody");
        $.each($(testTableRows), function (index, row) {
            var invDet = {};
            var tstIdVal = 0;
            //var prev = $("#tsId").closest('tr').prev().children('td').val();
            //var prevce = $("#tsId").closest('tr').prev().children('td').attr("#tsId").text();
            //tstIdVal = $(row).find("input[name=tsId]").val();
            tstIdVal = $(row).find("input[name=tsId]").text();
            if (tstIdVal == "") {
                tstIdVal = $(row).find("input[name=tsId]").val();
            }
            invDet.InvItm_RptDay = $(row).find("input[name=tstrptDay]").val(),
            invDet.InvItm_RptTimeDays = $(row).find("input[name=tstrptTimedys]").val(),
            invDet.InvItm_TstId = tstIdVal,
            invDet.InvItm_TstOrgRate = parseInt($(row).find("#tsrate").text()),
            invDet.InvItm_YrId = $("#yrid").val(),
            invDet.Tst_TypeId = $(row).find('#tstType').val(),
            invDet.InvItm_CpyId = 2,
            invDet.InvItm_DiscAmt = parseInt($(row).find("#tsDisc").text()),
            invDet.InvItm_DiscPer = parseInt($(row).find("#tsDscPer").text()),
            invDet.InvItm_Invno = $("input[name=invNo]").val(),
            invDet.InvItm_Issued = 0,
            invDet.InvItm_Orgrate = parseInt($(row).find("#tsrate").text()),
            invDet.InvItm_rate = parseInt($(row).find("#tsTotal").text()),
            invDet.InvItm_RevDiscAmt = 0,
            totaldisc = totaldisc + (parseInt($(row).find("#tsTotal").text()) - (parseInt($(row).find('#tsDisc').text())));
            invDetDls.push(invDet);
            if (tstShortName == "") {
                tstShortName += $(row).find("#tscode").text();
            }
            else {
                tstShortName += "-" + $(row).find("#tscode").text();
            }
        })
        request.invDetlist = invDetDls;
        $.ajax({
            url: "/InvoiceRegister/CheckTestDetails",
            type: "POST",
            data: JSON.stringify(request),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Result === "OK") {
                    //alert("Order Request(s) saved");
                    //window.location = "/InvoiceRegister/IvoiceRegistration";
                    var currentrow = $("#tstTable").find('tbody tr');
                    var grandTotal = 0;
                    var table = $("#tstTable").find('tbody');
                    var row = $("#tstTable").find('tbody tr:first');
                    //if ($(row).find("#tsname").text() != '') {
                    //var siblings = row.siblings();
                    //$(row).remove();
                    //siblings.each(function (index) {
                    //    $(this).children('td:first').find("#slno").val(index + 1);
                    //});
                    //$("#tstTable").find("tr:gt(0)").remove();
                    $(table).children('tr:not(:first)').remove();
                    $(row).find("#slno").text("");
                    $(row).find("#tsname").text("");
                    $(row).find("#tscode").text("");
                    $(row).find("#tsrate").text("");
                    $(row).find("#tsDisc").text("");
                    $(row).find("#tsDscPer").text("");
                    $(row).find("#tsTotal").text("");
                    $(row).find("#tsId").text("");
                    $(row).find("#tstType").text("");
                    //}
                    var i = 0;
                    $.each((data.Records), function (index, test) {

                        var x = data.Records.TstMst_Key;
                        if (index > 0) {
                            var lastRow = $("#tstTable tbody").find('tr:last').clone();
                            $("#tstTable tbody").append($(lastRow));
                            lastRow = $("#tstTable tbody tr:last");
                            $(lastRow).find('input[type=text]').text("");
                            //(item.TstMst_DiscPer).toFixed(2)
                            $(lastRow).find("#slno").text((index + 1));
                            $(lastRow).find("#tsname").text(test.TstMst_name);
                            $(lastRow).find("#tscode").text(test.TstMst_ShortName);
                            $(lastRow).find("#tsrate").text(test.TstMst_Rate);
                            $(lastRow).find("#tsDisc").text(test.SplR_NRate);
                            $(lastRow).find("#tsDscPer").text((test.TstMst_DiscPer).toFixed(2));
                            $(lastRow).find("#tsTotal").text(test.TstMst_Total);
                            $(lastRow).find("#tsId").text(test.TstMst_Key);
                            $(lastRow).find("#tstType").text(test.TstMst_TypeId);
                            // tstTable slno tscode tsname tsrate tsDisc tsDscPer tsTotal tsId tstType
                            index++;
                            grandTotal = grandTotal + test.TstMst_Total;
                        }
                        else {
                            $(currentrow).find("#slno").text((index + 1));
                            $(currentrow).find("#tsname").text(test.TstMst_name);
                            $(currentrow).find("#tscode").text(test.TstMst_ShortName);
                            $(currentrow).find("#tsrate").text(test.TstMst_Rate);
                            $(currentrow).find("#tsDisc").text(test.SplR_NRate);
                            $(currentrow).find("#tsDscPer").text((test.TstMst_DiscPer).toFixed(2));
                            $(currentrow).find("#tsTotal").text(test.TstMst_Total);
                            $(currentrow).find("#tsId").text(test.TstMst_Key);
                            $(currentrow).find("#tstType").text(test.TstMst_TypeId);
                            index++;

                            grandTotal = grandTotal + test.TstMst_Total;
                        }





                    })

                    document.getElementById("grandTotal").innerHTML = "&#8377;" + grandTotal;
                }
                else {
                }

            }

        })
        $("#corporate").prop("readonly", true);
        //$('#corporate').autocomplete('close');
        //$("tstAdd").focus();
        //$(this).siblings().addBack().addClass("ui-screen-hidden");
        //return;
    }
}).on('focus', function () { $(this).keydown(); });
$('#dobDate').datepicker({
    dateFormat: 'dd-M-yy',
    changeMonth: true,
    changeYear: true,
    yearRange: '-90:+80'
});
//$("#corporate").keydown(function (e) {
//    if (e.keyCode == 120) {
//        e.preventDefault();
//        $('#test_modal').modal('show');
//    }
//})
$(document).ready(function () {
    var d = new Date();
    var shortMonth = d.toLocaleString('en-us', { month: 'short' });
    var m = d.getMonth() + 1;
    var mlength = m.toString.length;
    if (m < 10) {
        var mm = "0" + m;
        if (d.getDate() < 10) {
            var time = new Date();
            let a = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            let requestdate = "0" + d.getDate() + "-" + shortMonth + "-" + d.getFullYear() + " " + a;
            document.querySelector("#requestdate").value = requestdate;
            let smplOn = mm + "/" + "0" + d.getDate() + "/" + d.getFullYear() + " " + a;
            document.querySelector("#SampleOn").value = smplOn;
            document.querySelector("#ResultOn").value = smplOn;
        }
        else {
            var time = new Date();
            let a = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            let requestdate = d.getDate() + "-" + shortMonth + "-" + d.getFullYear() + " " + a;
            document.querySelector("#requestdate").value = requestdate;
            let smplOn = mm + "/" + d.getDate() + "/" + d.getFullYear() + " " + a;
            document.querySelector("#SampleOn").value = smplOn;
            document.querySelector("#ResultOn").value = smplOn;
        }
    }
    else {
        if (d.getDate() < 10) {
            let requestdate = "0" + d.getDate() + "-" + shortMonth + "-" + d.getFullYear();
            document.querySelector("#requestdate").value = requestdate;
            let smplOn = m + "/" + "0" + d.getDate() + "/" + d.getFullYear() + " " + a;
            document.querySelector("#SampleOn").value = smplOn;
            document.querySelector("#ResultOn").value = smplOn;
            //document.querySelector("#SampleOn").value = requestdate;
        }
        else {
            let requestdate = d.getDate() + "-" + shortMonth + "-" + d.getFullYear();
            let smplOn = m + "/" + d.getDate() + "/" + d.getFullYear() + " " + a;
            document.querySelector("#SampleOn").value = smplOn;
            document.querySelector("#requestdate").value = requestdate;
            document.querySelector("#ResultOn").value = smplOn;
            //document.querySelector("#SampleOn").value = requestdate;
        }
    }
})
$("#dobDate").change(function () {
    //collect input from HTML form and convert into date format
    var userinput = document.getElementById("dobDate").value;
    var dob = new Date(userinput);
    var emty = 0;
    //check user provide input or not
    if (userinput == null || userinput == '') {
        document.getElementById("message").innerHTML = "**Choose DOB Please!";
        return false;
    }

        //execute if the user entered a date
    else {
        //extract the year, month, and date from user date input
        var dobYear = dob.getYear();
        var dobMonth = dob.getMonth();
        var dobDate = dob.getDate();

        //get the current date from the system
        var now = new Date();
        //extract the year, month, and date from current date
        var currentYear = now.getYear();
        var currentMonth = now.getMonth();
        var currentDate = now.getDate();

        //declare a variable to collect the age in year, month, and days
        var age = {};
        var ageString = "";

        //get years
        yearAge = currentYear - dobYear;

        //get months
        if (currentMonth >= dobMonth)
            //get months when current month is greater
            var monthAge = currentMonth - dobMonth;
        else {
            yearAge--;
            var monthAge = 12 + currentMonth - dobMonth;
        }

        //get days
        if (currentDate >= dobDate)
            //get days when the current date is greater
            var dateAge = currentDate - dobDate;
        else {
            monthAge--;
            var dateAge = 31 + currentDate - dobDate;

            if (monthAge < 0) {
                monthAge = 11;
                yearAge--;
            }
        }
        //group the age in a single variable
        //ageyy agemm agedd
        age = {
            years: yearAge,
            months: monthAge,
            days: dateAge
        };


        if ((age.years > 0) && (age.months > 0) && (age.days > 0)) {
            $("#ageyy").val(age.years);
            $("#agemm").val(age.months);
            $("#agedd").val(age.days);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }

        else if ((age.years == 0) && (age.months > 0) && (age.days > 0)) {
            $("#ageyy").val(emty);
            $("#agemm").val(age.months);
            $("#agedd").val(age.days);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }
        else if ((age.years == 0) && (age.months == 0) && (age.days > 0)) {
            $("#ageyy").val(emty);
            $("#agemm").val(emty);
            $("#agedd").val(age.days);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }
        else if ((age.years == 0) && (age.months == 0) && (age.days == 0)) {
            $("#ageyy").val(emty);
            $("#agemm").val(emty);
            $("#agedd").val(1);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }
        else if ((age.years > 0) && (age.months > 0) && (age.days == 0)) {
            $("#ageyy").val(age.years);
            $("#agemm").val(age.months);
            $("#agedd").val(emty);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }
        else if ((age.years > 0) && (age.months == 0) && (age.days == 0)) {
            $("#ageyy").val(age.years);
            $("#agemm").val(emty);
            $("#agedd").val(emty);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }
        else if ((age.years == 0) && (age.months > 0) && (age.days == 0)) {
            $("#ageyy").val(emty);
            $("#agemm").val(age.months);
            $("#agedd").val(emty);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }
        else if ((age.years > 0) && (age.months == 0) && (age.days > 0)) {
            $("#ageyy").val(age.years);
            $("#agemm").val(emty);
            $("#agedd").val(age.days);
            $('#ageyy').attr('readonly', true);
            $('#agemm').attr('readonly', true);
            $('#agedd').attr('readonly', true);
        }
        else {
            $("#dobDate").val("mm/dd/yyyy");
            alert("Please Enter Valid Date Of Birth!");
        }
    }
});
