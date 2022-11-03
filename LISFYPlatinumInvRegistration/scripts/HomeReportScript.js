//////////////////////////////////////START////////////////////
$('.DctrVisit').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#dctrVisitLst");
    var url = $("#dctrVisitLst").data('url');
    $.get(url, function (data) {
        $("#dctrVisitLst").html(data);
        $("#dctrVisitLst").modal('show');

        //$("#usrCheck").click(function () {
        if ($("#catgNameCheck").is(':checked') === true) {

            $('#catgName').autocomplete({
                source: function (request, response) {

                    $.ajax({
                        type: 'GET',
                        url: "/LISFY/SearchCategoryName",
                        data: { term: $("#catgName").val() },
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.Result === "OK") {


                                response($.map(data.Records, function (Record) {
                                    return {
                                        label: Record.AhMst_pName,
                                        val: Record.AhMst_pName,
                                        id: Record.AhMst_Key

                                    }

                                }))


                            }


                        }
                    });

                },

                minLength: 1,
                select: function (event, ui) {

                    $("#catgKey").val(ui.item.id);
                    $("#catgName").val(ui.item.label);
                }

            })
        }


        $("#catgNameCheck").click(function () {
            if ($("#catgNameCheck").is(':checked') === true) {

                $('#catgName').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchCategoryName",
                            data: { term: $("#catgName").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#catgKey").val(ui.item.id);
                        $("#catgName").val(ui.item.label);
                    }

                })
            }
        })
        $("#catgCodeCheck").click(function () {
            if ($("#catgCodeCheck").is(':checked') === true) {

                $('#catgName').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchCategoryCode",
                            data: { term: $("#catgName").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#catgKey").val(ui.item.id);
                        $("#catgName").val(ui.item.label);
                    }

                })
            }
        })

        $("#btnDctrVisit").on("click.btnDctrVisit", function () {
            //patientCheck

            event.preventDefault();

            var frmDate = $("#dctrVstFrm").val();
            var x = frmDate.split("/");
            var dd = x[0];
            var mm = x[1];
            var yy = x[2];
            var fdate = mm + "/" + dd + "/" + yy;
            var toDate = $("#dctrVstTo").val();
            var x1 = toDate.split("/");
            var dd1 = x1[0];
            var mm1 = x1[1];
            var yy1 = x1[2];
            var tdate = mm1 + "/" + dd1 + "/" + yy1;
            var PROKey = $("#PROKey").val();
            var catgryKey = $("#catgKey").val();
            var dctrVstObj = {
                PROKey: PROKey,
                catgryKey: catgryKey,
                ff: fdate,
                tt: tdate
            };
            $.ajax({
                url: "/LISFY/DoctorsVisit",
                type: "POST",
                data: JSON.stringify(dctrVstObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFDoctorsVisit";
                    }
                    else {
                    }
                }
            })

        })

        $('#dctrVstFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#dctrVstToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#dctrVstFrmClndr").change(function () {
            var val = $("#dctrVstFrmClndr").val();
            $("#dctrVstFrm").val(val);
        });
        $('#dctrVstFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#dctrVstToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#dctrVstToClndr").change(function () {
            var val = $("#dctrVstToClndr").val();
            $("#dctrVstTo").val(val);
        });

        //$("#usrCheck").click(function () {
        if ($("#PROnameCheck").is(':checked') === true) {

            $('#PROname').autocomplete({
                source: function (request, response) {

                    $.ajax({
                        type: 'GET',
                        url: "/LISFY/SearchStaffName",
                        data: { term: $("#PROname").val() },
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.Result === "OK") {


                                response($.map(data.Records, function (Record) {
                                    return {
                                        label: Record.AhMst_pName,
                                        val: Record.AhMst_pName,
                                        id: Record.AhMst_Key

                                    }

                                }))


                            }


                        }
                    });

                },

                minLength: 1,
                select: function (event, ui) {

                    $("#PROKey").val(ui.item.id);
                    $("#PROname").val(ui.item.label);
                }

            })
        }


        $("#PROnameCheck").click(function () {
            if ($("#PROnameCheck").is(':checked') === true) {

                $('#PROname').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchStaffName",
                            data: { term: $("#PROname").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#PROKey").val(ui.item.id);
                        $("#PROname").val(ui.item.label);
                    }

                })
            }
        })
        $("#PROcodeCheck").click(function () {
            if ($("#PROcodeCheck").is(':checked') === true) {

                $('#PROname').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchStaffCode",
                            data: { term: $("#PROname").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#PROKey").val(ui.item.id);
                        $("#PROname").val(ui.item.label);
                    }

                })
            }
        })



    })
});
//**********************************************
$('.DivWisePerfomance').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#divWsPrfmnce");
    var url = $("#divWsPrfmnce").data('url');
    $.get(url, function (data) {
        $("#divWsPrfmnce").html(data);
        $("#divWsPrfmnce").modal('show');

        $('#DivPerfmnceFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#DivPerfmnceToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#DivPerfmnceFrmClndr").change(function () {
            var val = $("#DivPerfmnceFrmClndr").val();
            $("#DivPerfmnceFrm").val(val);
        });
        $('#DivPerfmnceFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#DivPerfmnceToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#DivPerfmnceToClndr").change(function () {
            var val = $("#DivPerfmnceToClndr").val();
            $("#DivPerfmnceTo").val(val);
        });



        $("#btnDivPerfmnce").on("click.btnDivPerfmnce", function () {
            event.preventDefault();
            var frmDate = $("#DivPerfmnceFrm").val();
            var toDate = $("#DivPerfmnceTo").val();
            var DivPrfmnceObj = {

                ff: frmDate,
                tt: toDate
            };

            $.ajax({
                url: "/LISFY/DivsnWisePerfomance",
                type: "POST",
                data: JSON.stringify(DivPrfmnceObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFDivsnWisePerfomance";


                    }
                    else {


                    }


                }

            })


        })

    })
});
//*******************************************
$('.DptWiseInv').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#dptWsInvce");
    var url = $("#dptWsInvce").data('url');
    $.get(url, function (data) {
        $("#dptWsInvce").html(data);
        $("#dptWsInvce").modal('show');
        $("#btnDptInvoice").on("click.btnDptInvoice", function () {
            //FrmBsmryWise FrmBsmryWiseClndr ToBsmryWise ToBsmryWiseClndr

            var frmDate = $("#dptWiseFrm").val();
            var toDate = $("#dptWiseTo").val();
            //event.preventDefault();

            var dptClctnObj = [];
            var dptId = [];
            //var row = $(this).closest("tr"); parentcheck brnchsmryChk
            $.each($("input[name='dptChk']:checked"), function () {
                var dptnames = $(this).closest('tr').find('#dptName').text();
                var trimDpt = $.trim(dptnames);
                dptClctnObj.push(trimDpt);
                var dptkeys = $(this).closest('tr').find('#dptKey').text();
                var trimDptId = $.trim(dptkeys);
                dptId.push(trimDptId);
            });
            if (dptClctnObj.length == 0) {
                alert("Select atleast one department");
            }
            else {
                var dptInvObj = {
                    checkedDpt: dptClctnObj,
                    BrMst_Name: $('#dptWiseBrid option:selected').text(),
                    ff: frmDate,
                    tt: toDate,
                    checkedDptId: dptId
                };
                $.ajax({
                    url: "/LISFY/DptWiseInvoice",
                    type: "POST",
                    data: JSON.stringify(dptInvObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFDptWiseInvoice";
                        }
                        else {
                        }
                    }
                })
            }
        })

        $("#dptparent").click(function () {
            $(".childDpt").prop("checked", this.checked);
        });
        //parentcheck brnchsmryChk
        $('.childDpt').click(function () {
            if ($('.childDpt:checked').length == $('.childDpt').length) {
                $('#dptparent').prop('checked', true);
            } else {
                $('#dptparent').prop('checked', false);
            }
        });


        $('#dptWiseFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#dptWiseToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#dptWiseFrmClndr").change(function () {
            var val = $("#dptWiseFrmClndr").val();
            $("#dptWiseFrm").val(val);
        });
        $('#dptWiseFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#dptWiseToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#dptWiseToClndr").change(function () {
            var val = $("#dptWiseToClndr").val();
            $("#dptWiseTo").val(val);
        });



    })
});
//***************************************
$('.doctrMeeting').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#dctrMtng");
    var url = $("#dctrMtng").data('url');
    $.get(url, function (data) {
        $("#dctrMtng").html(data);
        $("#dctrMtng").modal('show');

        //$("#usrCheck").click(function () {
        if ($("#dctrNameCheck").is(':checked') === true) {

            $('#dctrName').autocomplete({
                source: function (request, response) {

                    $.ajax({
                        type: 'GET',
                        url: "/LISFY/SearchDctrName",
                        data: { term: $("#dctrName").val() },
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.Result === "OK") {


                                response($.map(data.Records, function (Record) {
                                    return {
                                        label: Record.AhMst_pName,
                                        val: Record.AhMst_pName,
                                        id: Record.AhMst_Key

                                    }

                                }))


                            }


                        }
                    });

                },

                minLength: 1,
                select: function (event, ui) {

                    $("#dctrKey").val(ui.item.id);
                    $("#dctrName").val(ui.item.label);
                }

            })
        }

        $("#dctrNameCheck").click(function () {
            if ($("#dctrNameCheck").is(':checked') === true) {

                $('#dctrName').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchDctrName",
                            data: { term: $("#dctrName").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#dctrKey").val(ui.item.id);
                        $("#dctrName").val(ui.item.label);
                    }

                })
            }
        })
        $("#dctrCodeCheck").click(function () {
            if ($("#dctrCodeCheck").is(':checked') === true) {

                $('#dctrName').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchDctrCode",
                            data: { term: $("#dctrName").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#dctrKey").val(ui.item.id);
                        $("#dctrName").val(ui.item.label);
                    }

                })
            }
        })

        //$("#usrCheck").click(function () {
        if ($("#corpDctrNameCheck").is(':checked') === true) {

            $('#corpDctrName').autocomplete({

                source: function (request, response) {
                    var AreaKey = $("#corpDctrAreaCode").val();
                    var PayType = $("#corpDctrPayMode option:selected").text();
                    var AhMst_pName = $("#corpDctrName").val();
                    var crpWithName = {
                        AhMst_pName: $("#corpDctrName").val(),
                        AreaKey: AreaKey,
                        PayType: PayType
                    };
                    $.ajax({
                        type: 'POST',
                        url: "/LISFY/SearchCorpName",
                        data: JSON.stringify(crpWithName),
                        //    {
                        //    AhMst_pName: $("#corporateName").val(),
                        //    PayType: $("#payType option:selected").text(),
                        //    AreaKey: $("#areaCode").val()
                        //},
                        //data: JSON.stringify(crpWithName),
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.Result === "OK") {


                                response($.map(data.Records, function (Record) {
                                    return {
                                        label: Record.AhMst_pName,
                                        val: Record.AhMst_mobile,
                                        id: Record.AhMst_Key

                                    }

                                }))


                            }


                        }
                    });

                },

                minLength: 1,
                select: function (event, ui) {

                    $("#corpDctrPhno").val(ui.item.val);
                    $("#corpDctrKey").val(ui.item.id);
                    $("#corpDctrName").val(ui.item.label);
                }

            })
        }




        $('#dctrmtngFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#dctrmtngToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#dctrmtngFrmClndr").change(function () {
            var val = $("#dctrmtngFrmClndr").val();
            $("#dctrmtngFrm").val(val);
        });
        $('#dctrmtngFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#dctrmtngToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#dctrmtngToClndr").change(function () {
            var val = $("#dctrmtngToClndr").val();
            $("#dctrmtngTo").val(val);
        });



        $("#btndctrmtng").on("click.btndctrmtng", function () {
            event.preventDefault();
            var frmDate = $("#dctrmtngFrm").val();
            var toDate = $("#dctrmtngTo").val();
            var dctrmtngObj = {
                BrMst_Name: $('#dctrmtngBrId option:selected').text(),
                ff: frmDate,
                tt: toDate,
                DctrName: $("#dctrName").val(),
                DctrKey: $("#dctrKey").val()
            };

            $.ajax({
                url: "/LISFY/DoctorMeeting",
                type: "POST",
                data: JSON.stringify(dctrmtngObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFDoctorMeeting";


                    }
                    else {


                    }


                }

            })


        })


    })
});
//*************************************
$('.CncldInvoices').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#cncldInv");
    var url = $("#cncldInv").data('url');
    $.get(url, function (data) {
        $("#cncldInv").html(data);
        $("#cncldInv").modal('show');
        $("#btnCncldInv").on("click.btnCncldInv", function () {
            event.preventDefault();
            var frmDate = $("#cncldFrm").val();
            var toDate = $("#cncldTo").val();
            var dailyColnStmnts = {
                BrMst_Name: $('#cncldBrid option:selected').text(),
                ff: frmDate,
                tt: toDate
            };

            $.ajax({
                url: "/LISFY/CancelledInvoice",
                type: "POST",
                data: JSON.stringify(dailyColnStmnts),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFCancelledInvoice";


                    }
                    else {


                    }


                }

            })


        })

        $('#cncldFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#cncldToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#cncldFrmClndr").change(function () {
            var val = $("#cncldFrmClndr").val();
            $("#cncldFrm").val(val);
        });
        $('#cncldFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#cncldToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#cncldToClndr").change(function () {
            var val = $("#cncldToClndr").val();
            $("#cncldTo").val(val);
        });



    })
});
//*************************************
$('.discWiseInv').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#discwiseInv");
    var url = $("#discwiseInv").data('url');
    $.get(url, function (data) {
        $("#discwiseInv").html(data);
        $("#discwiseInv").modal('show');
        $("#mstrparent").click(function () {
            $(".mstrchild").prop("checked", this.checked);
        });
        $('.child').click(function () {
            if ($('.mstrchild:checked').length == $('.mstrchild').length) {
                $('#mstrparent').prop('checked', true);
            } else {
                $('#mstrparent').prop('checked', false);
            }
        });
        $("#btnDiscInv").on("click.btnDiscInv", function () {
            var frmDate = $("#discInvFrm").val();
            var toDate = $("#discInvTo").val();
            var mstrDescClctnObj = [];
            var MasterKey = [];
            $.each($("input[name='mstrChk']:checked"), function () {
                var mname = $(this).closest('tr').find('#Mstr_Desc').text();
                var trimmstr = $.trim(mname);
                mstrDescClctnObj.push(trimmstr);
                var mkey = $(this).closest('tr').find('#Mstr_Key').text();
                var trimmstrId = $.trim(mkey);
                MasterKey.push(trimmstrId);
            });
            if (mstrDescClctnObj.length == 0) {
                alert("Select atleast one  branch");
            }
            else {
                var MasterObj = {
                    BrMst_Name: $('#discWiseBrid option:selected').text(),
                    checkedMasters: mstrDescClctnObj,
                    ff: frmDate,
                    tt: toDate,
                    checkedMstrKey: MasterKey
                };
                $.ajax({
                    url: "/LISFY/DiscWiseInvoices",
                    type: "POST",
                    data: JSON.stringify(MasterObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFDiscWiseInvoices";
                        }
                        else {
                        }
                    }
                })
            }
        })
        $('#discInvFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'
                $(this).change();
            }
        });
        $('#discInvToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'
                $(this).change();
            }
        });
        $("#discInvFrmClndr").change(function () {
            var val = $("#discInvFrmClndr").val();
            $("#discInvFrm").val(val);
        });
        $('#discInvFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#discInvToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#discInvToClndr").change(function () {
            var val = $("#discInvToClndr").val();
            $("#discInvTo").val(val);
        });



    })
});
//*************************************
$('.brnchWiseInv').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#bnchwiseInv");
    var url = $("#bnchwiseInv").data('url');
    $.get(url, function (data) {
        $("#bnchwiseInv").html(data);
        $("#bnchwiseInv").modal('show');
        $("#btnbrnchWiseInv").on("click.btnbrnchWiseInv", function () {
            event.preventDefault();
            var frmDate = $("#bnchInvFrm").val();
            var toDate = $("#bnchInvTo").val();
            var bnchWiseInvObj = {
                BrMst_Name: $('#bnchWiseInvBrKey option:selected').text(),
                ff: frmDate,
                tt: toDate
            };

            $.ajax({
                url: "/LISFY/brnchWiseInvoice",
                type: "POST",
                data: JSON.stringify(bnchWiseInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFBrnchWiseInvoice";


                    }
                    else {


                    }


                }

            })


        })

        $('#bnchInvFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#bnchInvToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#bnchInvFrmClndr").change(function () {
            var val = $("#bnchInvFrmClndr").val();
            $("#bnchInvFrm").val(val);
        });
        $('#bnchInvFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#bnchInvToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#bnchInvToClndr").change(function () {
            var val = $("#bnchInvToClndr").val();
            $("#bnchInvTo").val(val);
        });

    })
});
//**********************************
$('.usrTackRpt').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#usrTrckRpt");
    var url = $("#usrTrckRpt").data('url');
    $.get(url, function (data) {
        $("#usrTrckRpt").html(data);
        $("#usrTrckRpt").modal('show');

        //$("#usrCheck").click(function () {
        if ($("#usrNameCheck").is(':checked') === true) {

            $('#usrNames').autocomplete({
                source: function (request, response) {

                    $.ajax({
                        type: 'GET',
                        url: "/LISFY/SearchUsrName",
                        data: { term: $("#usrNames").val() },
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.Result === "OK") {


                                response($.map(data.Records, function (Record) {
                                    return {
                                        label: Record.AhMst_pName,
                                        val: Record.AhMst_pName,
                                        id: Record.AhMst_Key

                                    }

                                }))


                            }


                        }
                    });

                },

                minLength: 1,
                select: function (event, ui) {

                    $("#UsrKeys").val(ui.item.id);
                    $("#usrNames").val(ui.item.label);
                }

            })
        }


        $("#usrNameCheck").click(function () {
            if ($("#usrNameCheck").is(':checked') === true) {

                $('#usrNames').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchUsrName",
                            data: { term: $("#usrNames").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#UsrKeys").val(ui.item.id);
                        $("#usrNames").val(ui.item.label);
                    }

                })
            }
        })
        $("#usrCodesCheck").click(function () {
            if ($("#usrCodesCheck").is(':checked') === true) {

                $('#usrNames').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchUsrCode",
                            data: { term: $("#usrNames").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#UsrKeys").val(ui.item.id);
                        $("#usrNames").val(ui.item.label);
                    }

                })
            }
        })

        $('#usrTrckFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#usrTrckToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#usrTrckFrmClndr").change(function () {
            var val = $("#usrTrckFrmClndr").val();
            $("#usrTrckFrm").val(val);
        });
        $('#usrTrckFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#usrTrckToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#usrTrckToClndr").change(function () {
            var val = $("#usrTrckToClndr").val();
            $("#usrTrckTo").val(val);
        });



        $("#btnusrTrackRpt").on("click.btnDivWiseSmry", function () {
            event.preventDefault();
            var frmDate = $("#usrTrckFrm").val();
            var toDate = $("#usrTrckTo").val();
            var usrTrckObj = {
                BrMst_Name: $('#usrTrckBrnchKey option:selected').text(),
                ff: frmDate,
                tt: toDate,
                User_Name: $("#usrNames").val()
            };

            $.ajax({
                url: "/LISFY/UsrTrckRpt",
                type: "POST",
                data: JSON.stringify(usrTrckObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFUsrTrckRpt";


                    }
                    else {


                    }


                }

            })


        })


    })
});
//******************************************
$('.divWiseSmry').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#divWiseSmry");
    var url = $("#divWiseSmry").data('url');
    $.get(url, function (data) {
        $("#divWiseSmry").html(data);
        $("#divWiseSmry").modal('show');

        $(document).ready(function () {
            $("#btnDivWiseSmry").on("click.btnDivWiseSmry", function () {
                event.preventDefault();
                var frmDate = $("#divSmryFrm").val();
                var toDate = $("#divSmryTo").val();
                var divWiseSmryObj = {
                    BrMst_Name: $('#divWiseSmryBrKey option:selected').text(),
                    ff: frmDate,
                    tt: toDate
                };

                $.ajax({
                    url: "/LISFY/DivisionWiseSmry",
                    type: "POST",
                    data: JSON.stringify(divWiseSmryObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFDivisionWiseSmry";


                        }
                        else {


                        }


                    }

                })


            })
        })

        $('#divSmryFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#divSmryToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#divSmryFrmClndr").change(function () {
            var val = $("#divSmryFrmClndr").val();
            $("#divSmryFrm").val(val);
        });
        $('#divSmryFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#divSmryToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#divSmryToClndr").change(function () {
            var val = $("#divSmryToClndr").val();
            $("#divSmryTo").val(val);
        });

    })
});
//*******************************************
$('.DivWiseInv2').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#divWiseInv2");
    var url = $("#divWiseInv2").data('url');
    $.get(url, function (data) {
        $("#divWiseInv2").html(data);
        $("#divWiseInv2").modal('show');
        $("#btnDivInvoice2").on("click.btnDivInvoice2", function () {
            //FrmBsmryWise FrmBsmryWiseClndr ToBsmryWise ToBsmryWiseClndr
            var frmDate = $("#DivfrmDate").val();
            //var toDate = $("#divWiseTo").val();
            var divInvObj2 = {
                ff: frmDate
            };
            $.ajax({
                url: "/LISFY/DivWiseInvoice2",
                type: "POST",
                data: JSON.stringify(divInvObj2),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFDivWiseInvoices";
                    }
                    else {
                    }
                }
            })

        })

        $('#DivfrmCalender').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });

        $("#DivfrmCalender").change(function () {
            var val = $("#DivfrmCalender").val();
            $("#DivfrmDate").val(val);
        });
        $('#DivfrmCalender').datepicker({
            dateFormat: 'dd/mm/yy'

        });



    })
});
//*****************************
$('.DivWiseInvoice').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#divWiseInv");
    var url = $("#divWiseInv").data('url');
    $.get(url, function (data) {
        $("#divWiseInv").html(data);
        $("#divWiseInv").modal('show');
        $("#btnDivInvoice").on("click.btnDivInvoice", function () {
            //FrmBsmryWise FrmBsmryWiseClndr ToBsmryWise ToBsmryWiseClndr

            var frmDate = $("#divWiseFrm").val();
            var toDate = $("#divWiseTo").val();
            //event.preventDefault();

            var divClctnObj = [];
            var divId = [];
            //var row = $(this).closest("tr"); parentcheck brnchsmryChk
            $.each($("input[name='divChk']:checked"), function () {
                var divnames = $(this).closest('tr').find('#divName').text();
                var trimDiv = $.trim(divnames);
                divClctnObj.push(trimDiv);
                var divkeys = $(this).closest('tr').find('#divKey').text();
                var trimDivId = $.trim(divkeys);
                divId.push(trimDivId);
            });
            if (divClctnObj.length == 0) {
                alert("Select atleast one division");
            }
            else {
                var divInvObj = {
                    checkedDiv: divClctnObj,
                    BrMst_Name: $('#divWiseBrid option:selected').text(),
                    ff: frmDate,
                    tt: toDate,
                    Inv_PayMode: $('#divWisePaymode option:selected').text(),
                    checkedDivId: divId
                };
                $.ajax({
                    url: "/LISFY/DivWiseInvoice",
                    type: "POST",
                    data: JSON.stringify(divInvObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFDivWiseInvoice";
                        }
                        else {
                        }
                    }
                })
            }
        })

        $("#divparent").click(function () {
            $(".childDiv").prop("checked", this.checked);
        });
        //parentcheck brnchsmryChk
        $('.childDiv').click(function () {
            if ($('.childDiv:checked').length == $('.childDiv').length) {
                $('#divparent').prop('checked', true);
            } else {
                $('#divparent').prop('checked', false);
            }
        });


        $('#divWiseFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#divWiseToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#divWiseFrmClndr").change(function () {
            var val = $("#divWiseFrmClndr").val();
            $("#divWiseFrm").val(val);
        });
        $('#divWiseFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#divWiseToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#divWiseToClndr").change(function () {
            var val = $("#divWiseToClndr").val();
            $("#divWiseTo").val(val);
        });



    })
});
//***********************************
$('.PatWiseInvoice').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#patWiseInv");
    var url = $("#patWiseInv").data('url');
    $.get(url, function (data) {
        $("#patWiseInv").html(data);
        $("#patWiseInv").modal('show');
        $("#btnPatInvoice").on("click.btnPatInvoice", function () {
            event.preventDefault();

            var frmDate = $("#patInvFrm").val();
            var toDate = $("#patInvTo").val();
            var patInvObj = {

                BrMst_Name: $('#patInvBrid option:selected').text(),
                ff: frmDate,
                tt: toDate
            };
            $.ajax({
                url: "/LISFY/PatientWiseInvoice",
                type: "POST",
                data: JSON.stringify(patInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFPatientInvoice";
                    }
                    else {
                    }
                }
            })
        })

        $('#patInvFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#patInvToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#patInvFrmClndr").change(function () {
            var val = $("#patInvFrmClndr").val();
            $("#patInvFrm").val(val);
        });
        $('#patInvFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#patInvToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#patInvToClndr").change(function () {
            var val = $("#patInvToClndr").val();
            $("#patInvTo").val(val);
        });


    })
});
//**********************************
$('.usrWiseClctnSmry').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#usrWseColnSmry");
    var url = $("#usrWseColnSmry").data('url');
    $.get(url, function (data) {
        $("#usrWseColnSmry").html(data);
        $("#usrWseColnSmry").modal('show');
        $("#refreshUsrClSmry").on("click.refreshUsrClSmry", function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();

            today = dd + '/' + mm + '/' + yyyy;
            //$('#usrName').val("");
            $('#usrWsSmryFrm').val("");
            $('#usrWsSmryTo').val("");
            $('#usrWiseSmryFrm').val(today);
            $('#usrWiseSmryTo').val(today);
            //$("#usrName").focus();
        })
        $("#btnUsrClSmry").on("click.btnUsrClSmry", function () {
            //patientCheck
            if ($("#dateSmryCheck").is(':checked') === true) {
                event.preventDefault();

                var frmDate = $("#usrWiseSmryFrm").val();
                var x = frmDate.split("/");
                var dd = x[0];
                var mm = x[1];
                var yy = x[2];
                var fdate = mm + "/" + dd + "/" + yy;
                var toDate = $("#usrWiseSmryTo").val();
                var x1 = toDate.split("/");
                var dd1 = x1[0];
                var mm1 = x1[1];
                var yy1 = x1[2];
                var tdate = mm1 + "/" + dd1 + "/" + yy1;
                //var userKey = $("#usrKey").val();
                var usrWiseSmryObj = {
                    //userKey: userKey,
                    usrCheck: 0,
                    BrMst_Name: $('#usrbnchKey option:selected').text(),
                    ff: fdate,
                    tt: tdate
                };
                $.ajax({
                    url: "/LISFY/UserWiseSmryClctn",
                    type: "POST",
                    data: JSON.stringify(usrWiseSmryObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFUsrWiseSmryClctn";
                        }
                        else {
                        }
                    }
                })
            }
            else if ($("#billSmryCheck").is(':checked') === true) {
                event.preventDefault();
                var frmUsr = $("#usrWsSmryFrm").val();
                var toUsr = $("#usrWsSmryTo").val();
                if (frmUsr == 0 || toUsr == 0) {
                    alert("Invalid LabNo");
                }
                else {
                    var usrWiseSmryObj = {
                        usrCheck: 1,
                        BrMst_Name: $('#usrbnchKey option:selected').text(),
                        usrFrom: frmUsr,
                        usrTo: toUsr
                    };
                    $.ajax({
                        url: "/LISFY/UserWiseSmryClctn",
                        type: "POST",
                        data: JSON.stringify(usrWiseSmryObj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            event.preventDefault();
                            if (data.Result === "OK") {
                                window.location = "/LISFY/PDFUsrWiseSmryClctn";

                            }
                            else {
                            }
                        }
                    })
                }

            }
            else {

            }
        })

        let billfrm = document.querySelector("#usrWsSmryFrm");
        billfrm.disabled = true;
        let billto = document.querySelector("#usrWsSmryTo");
        billto.disabled = true;
        $("#dateSmryCheck").click(function () {
            if ($("#dateSmryCheck").is(':checked') === true) {
                $('.ui-datepicker-trigger').show();
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '/' + mm + '/' + yyyy;
                $('#usrWiseSmryFrm').val(today);
                $('#usrWiseSmryTo').val(today);
                $("#usrWsSmryFrm").val("");
                $("#usrWsSmryTo").val("");
                $("#usrWsSmryFrm").prop("disabled", true);
                $("#usrWsSmryTo").prop("disabled", true);
                $("#usrWiseSmryFrm").prop("disabled", false);
                $("#usrWiseSmryTo").prop("disabled", false);
                $("#usrWiseSmryFrmClndr").prop("disabled", false);
                $("#usrWiseSmryToClndr").prop("disabled", false);

            }
        })
        $("#billSmryCheck").click(function () {
            if ($("#billSmryCheck").is(':checked') === true) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '/' + mm + '/' + yyyy;
                $('#usrWiseSmryFrm').val(today);
                $('#usrWiseSmryTo').val(today);
                $("#usrWsSmryFrm").val("");
                $("#usrWsSmryTo").val("");
                $('.ui-datepicker-trigger').hide();

                $("#usrWsSmryFrm").prop("disabled", false);
                $("#usrWsSmryTo").prop("disabled", false);
                $("#usrWiseSmryFrm").prop("disabled", true);
                $("#usrWiseSmryTo").prop("disabled", true);
                $("#usrWiseSmryFrmClndr").prop("disabled", true);
                $("#usrWiseSmryToClndr").prop("disabled", true);

            }
        })


        $('#usrWiseSmryFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#usrWiseSmryToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#usrWiseSmryFrmClndr").change(function () {
            var val = $("#usrWiseSmryFrmClndr").val();
            $("#usrWiseSmryFrm").val(val);
        });
        $('#usrWiseSmryFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#usrWiseSmryToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#usrWiseSmryToClndr").change(function () {
            var val = $("#usrWiseSmryToClndr").val();
            $("#usrWiseSmryTo").val(val);
        });

    })


});
//***************************************
$('.usrWiseClctn').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#usrWseColn");
    var url = $("#usrWseColn").data('url');
    $.get(url, function (data) {
        $("#usrWseColn").html(data);
        $("#usrWseColn").modal('show');
        $("#usrCheck").click(function () {
            if ($("#usrCheck").is(':checked') === true) {
                $('#usrName').autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchUsrName",
                            data: { term: $("#usrName").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {
                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key
                                        }
                                    }))
                                }


                            }
                        });
                    },
                    minLength: 1,
                    select: function (event, ui) {
                        $("#usrKey").val(ui.item.id);
                        $("#usrName").val(ui.item.label);
                    }
                })
            }
        })
        if ($("#usrCheck").is(':checked') === true) {
            $('#usrName').autocomplete({
                source: function (request, response) {
                    $.ajax({
                        type: 'GET',
                        url: "/LISFY/SearchUsrName",
                        data: { term: $("#usrName").val() },
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        success: function (data) {
                            console.log(data);
                            if (data.Result === "OK") {
                                response($.map(data.Records, function (Record) {
                                    return {
                                        label: Record.AhMst_pName,
                                        val: Record.AhMst_pName,
                                        id: Record.AhMst_Key
                                    }
                                }))
                            }
                        }
                    });
                },
                minLength: 1,
                select: function (event, ui) {
                    $("#usrKey").val(ui.item.id);
                    $("#usrName").val(ui.item.label);
                }
            })
        }
        $("#rfrshUsrWiseClctn").on("click.rfrshUsrWiseClctn", function () {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = dd + '/' + mm + '/' + yyyy;
            $('#usrName').val("");
            $('#usrWsFrm').val(""); new Date()
            $('#usrWsTo').val("");
            $('#usrWiseFrm').val(today);
            $('#usrWiseTo').val(today);
            $("#usrName").focus();
        })
        $("#btnUsrWiseClctn").on("click.btnUsrWiseClctn", function () {
            if ($("#dateCheck").is(':checked') === true) {
                event.preventDefault();
                var frmDate = $("#usrWiseFrm").val();
                var x = frmDate.split("/");
                var dd = x[0];
                var mm = x[1];
                var yy = x[2];
                var fdate = mm + "/" + dd + "/" + yy;
                var toDate = $("#usrWiseTo").val();
                var x1 = toDate.split("/");
                var dd1 = x1[0];
                var mm1 = x1[1];
                var yy1 = x1[2];
                var tdate = mm1 + "/" + dd1 + "/" + yy1;
                var userKey = $("#usrKey").val();
                var usrWiseObj = {
                    userKey: userKey,
                    usrCheck: 0,
                    BrMst_Name: $('#bnchKey option:selected').text(),
                    ff: fdate,
                    tt: tdate
                };
                $.ajax({
                    url: "/LISFY/UserWiseClctn",
                    type: "POST",
                    data: JSON.stringify(usrWiseObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFUsrWiseCollection";
                        }
                        else {
                        }
                    }
                })
            }
            else if ($("#billCheck").is(':checked') === true) {
                event.preventDefault();
                var frmUsr = $("#usrWsFrm").val();
                var toUsr = $("#usrWsTo").val();
                if (frmUsr == 0 || toUsr == 0) {
                    alert("Invalid LabNo");
                }
                else {
                    var usrWiseObj = {
                        usrCheck: 1,
                        BrMst_Name: $('#bnchKey option:selected').text(),
                        usrFrom: frmUsr,
                        usrTo: toUsr
                    };
                    $.ajax({
                        url: "/LISFY/UserWiseClctn",
                        type: "POST",
                        data: JSON.stringify(usrWiseObj),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            event.preventDefault();
                            if (data.Result === "OK") {
                                window.location = "/LISFY/PDFUsrBillWiseClctn";

                            }
                            else {
                            }
                        }
                    })
                }
            }
            else {

            }
        })
        $('#usrWiseFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'
                $(this).change();
            }
        });
        $('#usrWiseToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'
                $(this).change();
            }
        });
        $("#usrWiseFrmClndr").change(function () {
            var val = $("#usrWiseFrmClndr").val();
            $("#usrWiseFrm").val(val);
        });
        $('#usrWiseFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $('#usrWiseToClndr').datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#usrWiseToClndr").change(function () {
            var val = $("#usrWiseToClndr").val();
            $("#usrWiseTo").val(val);
        });
        let billfrm = document.querySelector("#usrWsFrm");
        billfrm.disabled = true;
        let billto = document.querySelector("#usrWsTo");
        billto.disabled = true;
        $("#dateCheck").click(function () {
            if ($("#dateCheck").is(':checked') === true) {
                $('.ui-datepicker-trigger').show();
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = dd + '/' + mm + '/' + yyyy;
                $('#usrWiseFrm').val(today);
                $('#usrWiseTo').val(today);
                $("#usrWsFrm").val("");
                $("#usrWsTo").val("");
                $("#usrWsFrm").prop("disabled", true);
                $("#usrWsTo").prop("disabled", true);
                $("#usrWiseFrm").prop("disabled", false);
                $("#usrWiseTo").prop("disabled", false);
                $("#usrWiseFrmClndr").prop("disabled", false);
                $("#usrWiseToClndr").prop("disabled", false);
            }
        })
        $("#billCheck").click(function () {
            if ($("#billCheck").is(':checked') === true) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = dd + '/' + mm + '/' + yyyy;
                $('#usrWiseFrm').val(today);
                $('#usrWiseTo').val(today);
                $("#usrWsFrm").val("");
                $("#usrWsTo").val("");
                $('.ui-datepicker-trigger').hide();
                $("#usrWsFrm").prop("disabled", false);
                $("#usrWsTo").prop("disabled", false);
                $("#usrWiseFrm").prop("disabled", true);
                $("#usrWiseTo").prop("disabled", true);
                $("#usrWiseFrmClndr").prop("disabled", true);
                $("#usrWiseToClndr").prop("disabled", true);
            }
        })
        $("#codeCheck").click(function () {
            if ($("#codeCheck").is(':checked') === true) {

                $('#usrName').autocomplete({
                    source: function (request, response) {

                        $.ajax({
                            type: 'GET',
                            url: "/LISFY/SearchUsrCode",
                            data: { term: $("#usrName").val() },
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            success: function (data) {
                                console.log(data);
                                if (data.Result === "OK") {


                                    response($.map(data.Records, function (Record) {
                                        return {
                                            label: Record.AhMst_pName,
                                            val: Record.AhMst_pName,
                                            id: Record.AhMst_Key

                                        }

                                    }))


                                }


                            }
                        });

                    },

                    minLength: 1,
                    select: function (event, ui) {
                        $("#usrKey").val(ui.item.id);
                        $("#usrName").val(ui.item.label);
                    }

                })
            }
        })
        $('#usrName').keyup(function (event) {
            if (event.which == 120) {
                $('#MyForm').toggle(500);
            }
        });

    });
});
//********************************
$('.MonthlyCollBrnchWise').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#mnthcolsmryBnch");
    var url = $("#mnthcolsmryBnch").data('url');
    $.get(url, function (data) {
        $("#mnthcolsmryBnch").html(data);
        $("#mnthcolsmryBnch").modal('show');

        $("#parentchecks").click(function () {
            $(".childchecks").prop("checked", this.checked);
        });
        //parentcheck brnchsmryChk
        $('.childchecks').click(function () {
            if ($('.childcheck:checked').length == $('.childchecks').length) {
                $('#parentchecks').prop('checked', true);
            } else {
                $('#parentchecks').prop('checked', false);
            }
        });

        $("#btnMnthCollBchWise").on("click.btnMnthCollBchWise", function () {
            //FrmBsmryWise FrmBsmryWiseClndr ToBsmryWise ToBsmryWiseClndr

            var frmDate = $("#FrmMnthBrnch").val();
            var toDate = $("#ToMnthBrnch").val();
            //event.preventDefault();

            var brnchClctnObj = [];
            var brnchKey = [];
            //var row = $(this).closest("tr"); parentcheck brnchsmryChk
            $.each($("input[name='branchChk']:checked"), function () {
                var bname = $(this).closest('tr').find('#brname').text();
                var trimBrnch = $.trim(bname);
                brnchClctnObj.push(trimBrnch);
                var bkey = $(this).closest('tr').find('#brid').text();
                var trimId = $.trim(bkey);
                brnchKey.push(trimId);
            });
            if (brnchClctnObj.length == 0) {
                alert("Select atleast one  branch");
            }
            else {
                var BrnchMnthlysmryObj = {
                    checkedBrnch: brnchClctnObj,
                    ff: frmDate,
                    tt: toDate,
                    checkedBrnchId: brnchKey
                };
                $.ajax({
                    url: "/LISFY/MnthlyCollSmryBrnchWise",
                    type: "POST",
                    data: JSON.stringify(BrnchMnthlysmryObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFMnthlyCollSmryBrnchWise";
                        }
                        else {
                        }
                    }
                })
            }
        })

        $('#FrmMnthBrnchClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#ToMnthBrnchClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#FrmMnthBrnchClndr").change(function () {
            var val = $("#FrmMnthBrnchClndr").val();
            $("#FrmMnthBrnch").val(val);
        });
        $('#FrmMnthBrnchClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#ToMnthBrnchClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#ToMnthBrnchClndr").change(function () {
            var val = $("#ToMnthBrnchClndr").val();
            $("#ToMnthBrnch").val(val);
        });



    });
});
//********************************************************
$('.DivisionSummary').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#mnthlyColSmryDiv");
    var url = $("#mnthlyColSmryDiv").data('url');
    $.get(url, function (data) {
        $("#mnthlyColSmryDiv").html(data);
        $("#mnthlyColSmryDiv").modal('show');
        $("#btnMonDivCollSmry").on("click.btnMonDivCollSmry", function () {
            //patientCheck
            if ($("#dailyChck").is(':checked') === true) {
                event.preventDefault();

                var frmDate = $("#monDivFrm").val();
                var x = frmDate.split("/");
                var dd = x[0];
                var mm = x[1];
                var yy = x[2];
                var fdate = mm + "/" + dd + "/" + yy;
                var toDate = $("#monDivTo").val();
                var x1 = toDate.split("/");
                var dd1 = x1[0];
                var mm1 = x1[1];
                var yy1 = x1[2];
                var tdate = mm1 + "/" + dd1 + "/" + yy1;
                var objMonDivColl = {
                    dailyCheck: 0,
                    BrMst_Name: $('#brnchids option:selected').text(),
                    ff: fdate,
                    tt: tdate
                };
                $.ajax({
                    url: "/LISFY/MonthlyCollDivSmry",
                    type: "POST",
                    data: JSON.stringify(objMonDivColl),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {

                            window.location = "/LISFY/PDFMonthlyDivSmry";
                            //javascript: history.go(-1);
                            //location.reload(true);
                        }
                        else {
                        }
                    }
                })
            }
            else if ($("#monthlyChck").is(':checked') === true) {
                event.preventDefault();
                var frmDate = $("#monDivFrm").val();
                var x = frmDate.split("/");
                var dd = x[0];
                var mm = x[1];
                var yy = x[2];
                var fdate = mm + "/" + dd + "/" + yy;
                var toDate = $("#monDivTo").val();
                var x1 = toDate.split("/");
                var dd1 = x1[0];
                var mm1 = x1[1];
                var yy1 = x1[2];
                var tdate = mm1 + "/" + dd1 + "/" + yy1;
                var objMonDivColl = {
                    dailyCheck: 1,
                    BrMst_Name: $('#brnchids option:selected').text(),
                    ff: fdate,
                    tt: tdate
                };
                $.ajax({
                    url: "/LISFY/MonthlyCollDivSmry",
                    type: "POST",
                    data: JSON.stringify(objMonDivColl),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFMonthlyDivSmry";

                        }
                        else {
                        }
                    }
                })
            }
            else {

            }
        })

        $('#monDivFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#monDivToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#monDivFrmClndr").change(function () {
            var val = $("#monDivFrmClndr").val();
            $("#monDivFrm").val(val);
        });
        $('#monDivFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#monDivToClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#monDivToClndr").change(function () {
            var val = $("#monDivToClndr").val();
            $("#monDivTo").val(val);
        });



    });
});
//***********************************************************
$('.mnthlyClctnSmry').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#mnthlyColSmry");
    var url = $("#mnthlyColSmry").data('url');
    $.get(url, function (data) {
        $("#mnthlyColSmry").html(data);
        $("#mnthlyColSmry").modal('show');
        $("#btnMnthColl").on("click.btnMnthColl", function () {
            var frmdate = $("#frmMnthColl").val();
            var todate = $("#toMnthColl").val();
            //event.preventDefault();frmId: frm,
            //toId: to
            var mnthcollObj = {
                //BrMst_Name: $('#brids option:selected').text(),
                ff: frmdate,
                tt: todate
            };

            $.ajax({
                url: "/LISFY/MonthlyCollctnSmry",
                type: "POST",
                data: JSON.stringify(mnthcollObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFPMonthlyClctn";


                    }
                    else {


                    }


                }

            })
        })

        $('#frmMonthsClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#frmMnthClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#toMnthClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#frmMonthsClndr").change(function () {
            var val = $("#frmMonthsClndr").val();
            $("#frmMnthColl").val(val);
        });
        $('#frmMonthsClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#toMnthClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#toMnthClndr").change(function () {
            var val = $("#toMnthClndr").val();
            $("#toMnthColl").val(val);
        });



    });
});
//******************************************************
$('.pidWiseBillClctn').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#patIDwiseColn");
    var url = $("#patIDwiseColn").data('url');
    $.get(url, function (data) {
        $("#patIDwiseColn").html(data);
        $("#patIDwiseColn").modal('show');
        $("#btnPatientWiseClctn").on("click.btnPatientWiseClctn", function () {
            var frm = $("#idFrm").val();
            var to = $("#idTo").val();
            //event.preventDefault();frmId: frm,
            //toId: to
            var patntIdObj = {
                //BrMst_Name: $('#brids option:selected').text(),
                ff: frm,
                tt: to
            };

            $.ajax({
                url: "/LISFY/PatientIdWiseBillClctn",
                type: "POST",
                data: JSON.stringify(patntIdObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFPatientWiseClctn";


                    }
                    else {


                    }


                }

            })
        })

    });
});
//***************************************************
$('.dailyCashInvoice').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#dailycashInv");
    var url = $("#dailycashInv").data('url');
    $.get(url, function (data) {
        $("#dailycashInv").html(data);
        $("#dailycashInv").modal('show');
        $("#btnDlyInvPrnt").on("click.btnDlyInvPrnt", function () {
            var frmDate = $("#frmDailyCshInv").val();
            var toDate = $("#toDailyCshInv").val();
            //event.preventDefault();
            var dailycashInvObj = {
                BrMst_Name: $('#brids option:selected').text(),
                ff: frmDate,
                tt: toDate
            };

            $.ajax({
                url: "/LISFY/DailyCashInvoice",
                type: "POST",
                data: JSON.stringify(dailycashInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFDailyCashInvoice";


                    }
                    else {


                    }


                }

            })
        })

        $('#FromInvClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#toInvClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#FromInvClndr").change(function () {
            var val = $("#FromInvClndr").val();
            $("#frmDailyCshInv").val(val);
        });
        $('#FromInvClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#toInvClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#toInvClndr").change(function () {
            var val = $("#toInvClndr").val();
            $("#toDailyCshInv").val(val);
        });



    });
});
//***************************************************
$('.colsmrybrnch').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#collSmryBnchWise");
    var url = $("#collSmryBnchWise").data('url');
    $.get(url, function (data) {
        $("#collSmryBnchWise").html(data);
        $("#collSmryBnchWise").modal('show');
        $("#brnchClctnSmryPrint").on("click.brnchClctnSmryPrint", function () {
            //FrmBsmryWise FrmBsmryWiseClndr ToBsmryWise ToBsmryWiseClndr

            var frmDate = $("#FrmBsmryWise").val();
            var toDate = $("#ToBsmryWise").val();
            //event.preventDefault();

            var brnchClctnObj = [];
            var brnchKey = [];
            //var row = $(this).closest("tr"); parentcheck brnchsmryChk
            $.each($("input[name='brnchsmryChk']:checked"), function () {
                var bname = $(this).closest('tr').find('#dscrptn').text();
                var trimBrnch = $.trim(bname);
                brnchClctnObj.push(trimBrnch);
                var bkey = $(this).closest('tr').find('#ids').text();
                var trimId = $.trim(bkey);
                brnchKey.push(trimId);
            });
            if (brnchClctnObj.length == 0) {
                alert("Select atleast one  branch");
            }
            else {
                var BrnchsmryObj = {
                    checkedBrnch: brnchClctnObj,
                    ff: frmDate,
                    tt: toDate,
                    checkedBrnchId: brnchKey
                };
                $.ajax({
                    url: "/LISFY/CollSmryBranchWise",
                    type: "POST",
                    data: JSON.stringify(BrnchsmryObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFCollSmryBrnchWise";
                        }
                        else {
                        }
                    }
                })
            }
        })

        $('#FrmBsmryWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#ToBsmryWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#FrmBsmryWiseClndr").change(function () {
            var val = $("#FrmBsmryWiseClndr").val();
            $("#FrmBsmryWise").val(val);
        });
        $('#FrmBsmryWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#ToBsmryWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#ToBsmryWiseClndr").change(function () {
            var val = $("#ToBsmryWiseClndr").val();
            $("#ToBsmryWise").val(val);
        });



        $("#parentcheck").click(function () {
            $(".childcheck").prop("checked", this.checked);
        });
        //parentcheck brnchsmryChk
        $('.childcheck').click(function () {
            if ($('.childcheck:checked').length == $('.childcheck').length) {
                $('#parentcheck').prop('checked', true);
            } else {
                $('#parentcheck').prop('checked', false);
            }
        });


    });
});
//***************************************************
$('.colstmtbrnch').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#collSmtBnchWise");
    var url = $("#collSmtBnchWise").data('url');
    $.get(url, function (data) {
        $("#collSmtBnchWise").html(data);
        $("#collSmtBnchWise").modal('show');
        $("#brnchClctnPrint").on("click.brnchClctnPrint", function () {


            var frmDate = $("#FrmBrnchWise").val();
            var toDate = $("#ToBrnchWise").val();
            //event.preventDefault();

            var brnchClctnObj = [];
            var brnchKey = [];
            //var row = $(this).closest("tr");
            $.each($("input[name='brnchChk']:checked"), function () {
                var bname = $(this).closest('tr').find('#description').text();
                var trimBrnch = $.trim(bname);
                brnchClctnObj.push(trimBrnch);
                var bkey = $(this).closest('tr').find('#id').text();
                var trimId = $.trim(bkey);
                brnchKey.push(trimId);
            });
            if (brnchClctnObj.length == 0) {
                alert("Select atleast one  branch");
            }
            else {
                var BrnchObj = {
                    checkedBrnch: brnchClctnObj,
                    ff: frmDate,
                    tt: toDate,
                    checkedBrnchId: brnchKey
                };
                $.ajax({
                    url: "/LISFY/BranchWiseCollection",
                    type: "POST",
                    data: JSON.stringify(BrnchObj),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            window.location = "/LISFY/PDFBranchWiseCollection";
                        }
                        else {
                        }
                    }
                })
            }
        })

        $("#parent").click(function () {
            $(".child").prop("checked", this.checked);
        });

        $('.child').click(function () {
            if ($('.child:checked').length == $('.child').length) {
                $('#parent').prop('checked', true);
            } else {
                $('#parent').prop('checked', false);
            }
        });

        $('#FrmBrnchWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $('#ToBrnchWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'

                $(this).change();

            }
        });
        $("#FrmBrnchWiseClndr").change(function () {
            var val = $("#FrmBrnchWiseClndr").val();
            $("#FrmBrnchWise").val(val);
        });
        $('#FrmBrnchWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#ToBrnchWiseClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $("#ToBrnchWiseClndr").change(function () {
            var val = $("#ToBrnchWiseClndr").val();
            $("#FrmBrnchWise").val(val);
        });



    });
});
//**************************************************
$('.btndlyClnSmry2').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#dailycollectionsmry2");
    var url = $("#dailycollectionsmry2").data('url');
    $.get(url, function (data) {
        $("#dailycollectionsmry2").html(data);
        $("#dailycollectionsmry2").modal('show');
        $('#dlySmryFrmClndr2').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',

            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy',

                    $(this).change();

            }
        });
        $("#dlySmryFrmClndr2").change(function () {
            var val = $("#dlySmryFrmClndr2").val();
            $("#dlySmryFrm2").val(val);
        });
        $('#dlySmryFrmClndr2').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#dlySmryToClndr2').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy',

                    $(this).change();

            }
        });
        $("#dlySmryToClndr2").change(function () {
            var val = $("#dlySmryToClndr2").val();
            $("#dlySmryTo2").val(val);
        });

        $("#PrintCollnDls").on("click.PrintCollnDls", function () {
            //event.preventDefault();
            var frmDate = $("#dlySmryFrm2").val();
            var x = frmDate.split("/");
            var dd = x[0];
            var mm = x[1];
            var yy = x[2];
            var fdate = mm + "/" + dd + "/" + yy;
            var toDate = $("#dlySmryTo2").val();
            var x1 = toDate.split("/");
            var dd1 = x1[0];
            var mm1 = x1[1];
            var yy1 = x1[2];
            var tdate = mm1 + "/" + dd1 + "/" + yy1;
            var dailyCollnSmryObj = {
                //rowCount: rowCount,
                //dailyCheck: 0,
                ff: fdate,
                tt: tdate
            };
            $.ajax({
                url: "/LISFY/ClctnSummary2Print",
                type: "POST",
                data: JSON.stringify(dailyCollnSmryObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFCollectionSummary2";
                    }
                    else {
                    }
                }
            })
        })
        $("#ViewCollnDls").on("click.ViewCollnDls", function () {
            //patientCheck
            if ($("#dailyCheck").is(':checked') === true) {
                event.preventDefault();
                $('#ClctnSummary2 tbody tr:not(:last)').remove();
                var rowCount = $("#ClctnSummary tr").length;
                var frmDate = $("#dlySmryFrm2").val();
                var x = frmDate.split("/");
                var dd = x[0];
                var mm = x[1];
                var yy = x[2];
                var fdate = mm + "/" + dd + "/" + yy;
                var toDate = $("#dlySmryTo2").val();
                var x1 = toDate.split("/");
                var dd1 = x1[0];
                var mm1 = x1[1];
                var yy1 = x1[2];
                var tdate = mm1 + "/" + dd1 + "/" + yy1;
                var dailyCollnSmry2 = {
                    rowCount: rowCount,
                    dailyCheck: 0,
                    ff: fdate,
                    tt: tdate
                };
                $.ajax({
                    url: "/LISFY/DailyClctnSummary2",
                    type: "POST",
                    data: JSON.stringify(dailyCollnSmry2),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {

                            //window.location = "/LISFY/HomePage";
                            var currentrow = $("#ClctnSummary2").find('tbody tr');
                            //var currentrow = $("#tstAddTable").find('tbody tr');
                            $.each(data.Record, function (index, smry) {
                                if (index > 0) {
                                    currentrow = $(currentrow).clone();
                                    $("#ClctnSummary2 tbody").append($(currentrow));
                                    currentrow = $("#ClctnSummary2 tbody tr:last");
                                }
                                var mdate = smry.M_date;
                                var sp = mdate.split("/");
                                var dt3 = sp[1];
                                var mn3 = sp[0];
                                var x = sp[2];
                                var splt = x.split(" ");
                                var yr3 = splt[0];


                                if (mn3.length == 1 && dt3.length == 1) {
                                    var objedit = "0" + dt3 + "/" + "0" + mn3 + "/" + yr3;
                                    //$("#pdate").val(objedit);
                                    //document.querySelector("#pdate").value = objedit;
                                }
                                else if (mn3.length == 1) {
                                    var objedit = dt3 + "/" + "0" + mn3 + "/" + yr3;
                                    //$("#pdate").val(objedit);
                                }
                                else if (dt3.length == 1) {
                                    var objedit = "0" + dt3 + "/" + mn3 + "/" + yr3;
                                    //$("#pdate").val(objedit);
                                }
                                else {
                                    var objedit = dt3 + "/" + mn3 + "/" + yr3;
                                    //$("#pdate").val(objedit);
                                }
                                //$(currentrow).find("#slno").val((index + 1));

                                $(currentrow).find("#date").text(objedit);
                                $(currentrow).find("#totalClcted").text(smry.NetCash);
                                $(currentrow).find("#cashClctn").text(smry.CashColl);
                                $(currentrow).find("#cardClctn").text(smry.CardColl);
                                $(currentrow).find("#credit").text(smry.Credit);
                                $(currentrow).find("#pnding").text(smry.PndngOnSameDay);

                                $(currentrow).find("#prePendCashColl").text(smry.PrePendCashColl);
                                $(currentrow).find("#prePendCardColl").text(smry.PrePendCardColl);
                                $(currentrow).find("#payments").text(smry.Payment);
                                $(currentrow).find("#netCashBlnce").text(smry.Balance);
                                //$("#testname").focus();
                                //$("#testcode").val(prop("readonly", true));
                                //$("#testname").prop("readonly", true);



                            })

                        }
                        else {


                        }

                        //$("#ClctnSummary2 tbody tr").remove();
                    }

                })
            }
            else if ($("#monthlyCheck").is(':checked') === true) {
                //alert("hai");
                event.preventDefault();
                $('#ClctnSummary2 tbody tr:not(:last)').remove();
                var rowCount = $("#ClctnSummary tr").length;
                var frmDate = $("#dlySmryFrm2").val();
                var x = frmDate.split("/");
                var dd = x[0];
                var mm = x[1];
                var yy = x[2];
                var fdate = mm + "/" + dd + "/" + yy;
                var toDate = $("#dlySmryTo2").val();
                var x1 = toDate.split("/");
                var dd1 = x1[0];
                var mm1 = x1[1];
                var yy1 = x1[2];
                var tdate = mm1 + "/" + dd1 + "/" + yy1;
                var dailyCollnSmry2 = {
                    rowCount: rowCount,
                    dailyCheck: 1,
                    ff: fdate,
                    tt: tdate
                };
                $.ajax({
                    url: "/LISFY/DailyClctnSummary2",
                    type: "POST",
                    data: JSON.stringify(dailyCollnSmry2),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        event.preventDefault();
                        if (data.Result === "OK") {
                            //$("#ClctnSummary2 tbody tr").remove();
                            ////window.location = "/LISFY/HomePage";
                            var currentrow = $("#ClctnSummary2").find('tbody tr');
                            //var currentrow = $("#tstAddTable").find('tbody tr');
                            $.each(data.Record, function (index, smry) {
                                if (index > 0) {
                                    currentrow = $(currentrow).clone();
                                    $("#ClctnSummary2 tbody").append($(currentrow));
                                    currentrow = $("#ClctnSummary2 tbody tr:last");
                                }
                                var mdate = smry.M_date;
                                $(currentrow).find("#date").text(mdate);
                                $(currentrow).find("#totalClcted").text(smry.NetCash);
                                $(currentrow).find("#cashClctn").text(smry.CashColl);
                                $(currentrow).find("#cardClctn").text(smry.CardColl);
                                $(currentrow).find("#credit").text(smry.Credit);
                                $(currentrow).find("#pnding").text(smry.PndngOnSameDay);

                                $(currentrow).find("#prePendCashColl").text(smry.PrePendCashColl);
                                $(currentrow).find("#prePendCardColl").text(smry.PrePendCardColl);
                                $(currentrow).find("#payments").text(smry.Payment);
                                $(currentrow).find("#netCashBlnce").text(smry.Balance);
                                //$("#testname").focus();
                                //$("#testcode").val(prop("readonly", true));
                                //$("#testname").prop("readonly", true);



                            })

                        }
                        else {


                        }


                    }

                })
            }
            else {

            }
        })


    });
});
//**********************************************
$('.btndlyClnSmry').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#dailycollectionsmry");
    var url = $("#dailycollectionsmry").data('url');
    $.get(url, function (data) {
        $("#dailycollectionsmry").html(data);
        $("#dailycollectionsmry").modal('show');
        $(document).on('click', '#btnDlyClctnSmry', function () {
            event.preventDefault();

            var frmDate = $("#dlySmryFrm").val();
            var toDate = $("#dlySmryTo").val();
            var dailyCollnSmryObj = {

                BrMst_Name: $('#brid option:selected').text(),
                ff: frmDate,
                tt: toDate
            };
            $.ajax({
                url: "/LISFY/DailyClctnSummary",
                type: "POST",
                data: JSON.stringify(dailyCollnSmryObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFDailyCollctnSmry";
                    }
                    else {
                    }
                }
            })
        })
        $('#dlySmryFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',

            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy',

                    $(this).change();

            }
        });
        $("#dlySmryFrmClndr").change(function () {
            var val = $("#dlySmryFrmClndr").val();
            $("#dlySmryFrm").val(val);
        });
        $('#dlySmryFrmClndr').datepicker({
            dateFormat: 'dd/mm/yy'

        });
        $('#dlySmryToClndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy',

                    $(this).change();

            }
        });
        $("#dlySmryToClndr").change(function () {
            var val = $("#dlySmryToClndr").val();
            $("#dlySmryTo").val(val);
        });

    });
});
//**************************************************
$('.btndlyClnStmnt').click(function (event) {
    event.preventDefault();
    var modal = document.querySelector("#dailycollectionstmnt");
    var url = $("#dailycollectionstmnt").data('url');
    $.get(url, function (data) {
        $("#dailycollectionstmnt").html(data);
        $("#dailycollectionstmnt").modal('show');
        $("#datepicker").datepicker();
        $(document).on('click', '#btnDlyClctnStmnt', function () {
            event.preventDefault();
            var frmDate = $("#frmDate").val();
            var toDate = $("#toDate").val();
            var cncldInvObj = {
                BrMst_Name: $('#BrMst_Key option:selected').text(),
                ff: frmDate,
                tt: toDate
            };
            $.ajax({
                url: "/LISFY/DailyClctnStatements",
                type: "POST",
                data: JSON.stringify(cncldInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFDailyCollctnStmnts";
                    }
                    else {
                    }
                }
            })
        });
        //$(document).ready(function () {
        $('#FromCalender').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'
                $(this).change();
            }
        });
        $('#toCalndr').datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true,
            yearRange: '-90:+80',
            autoclose: true,
            showOn: 'both',
            timeFormat: 'hh:mm:ss',
            buttonImage: "/Content/logintemplate/img/calender.png",
            buttonImageOnly: true,
            onSelect: function () {
                dateFormat: 'dd/mm/yy'
                $(this).change();
            }
        });
        $("#FromCalender").change(function () {
            var val = $("#FromCalender").val();
            $("#frmDate").val(val);
        });
        $('#FromCalender').datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $('#toCalndr').datepicker({
            dateFormat: 'dd/mm/yy'
        });
        $("#toCalndr").change(function () {
            var val = $("#toCalndr").val();
            $("#toDate").val(val);
        });
        //})
    });
});
/////////////////////////////////////////////END///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
$("#btnBillWseDue").on("click.btnBillWseDue", function () {
    var AreaKey = $("#DueAreaCode").val();
    var PayType = $("#DuePayType option:selected").text();
    var AhMst_pName = $("#DueCorpName").val();
    var AhMst_Key = $('#DueCorpKey').val();
    var frmDate = $('#billDueFrm').val();
    var toDate = $('#billDueTo').val();
    var billWiseDueObj = {

        AhMst_pName: AhMst_pName,
        AreaKey: AreaKey,
        PayType: PayType,
        ff: frmDate,
        tt: toDate,
        AhMst_Key: AhMst_Key
        //
    };

    $.ajax({
        //url: "/LISFY/DailyClctnStatements",
        url: "/LISFY/BillWiseDue",
        type: "POST",
        data: JSON.stringify(billWiseDueObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFBillWiseStmnt";
                window.location = "/LISFY/PDFBillWiseDue";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#DueCorpNameCheck").is(':checked') === true) {

        $('#DueCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#DueAreaCode").val();
                var PayType = $("#DuePayType option:selected").text();
                var AhMst_pName = $("#DueCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#DueCorpName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#DueCorpPhno").val(ui.item.val);
                $("#DueCorpKey").val(ui.item.id);
                $("#DueCorpName").val(ui.item.label);
            }

        })
    }


})
$("#DueCorpNameCheck").click(function () {
    if ($("#DueCorpNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#DueCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#DueAreaCode").val();
                var PayType = $("#DuePayType option:selected").text();
                var AhMst_pName = $("#DueCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#DueCorpName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#DueCorpPhno").val(ui.item.val);
                $("#DueCorpKey").val(ui.item.id);
                $("#DueCorpName").val(ui.item.label);
            }

        })
    }
})
$("#DueCorpPhnoCheck").click(function () {
    if ($("#DueCorpPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#DueCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#DueAreaCode").val();
                var PayType = $("#DuePayType option:selected").text();
                var crpWithPhNo = {
                    AhMst_mobile: $("#DueCorpPhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#DueCorpPhno").val(ui.item.val);
                $("#DueCorpKey").val(ui.item.id);
                $("#DueCorpName").val(ui.item.label);
            }

        })
    }
})
$("#DueCorpCodeCheck").click(function () {
    if ($("#DueCorpCodeCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#DueCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#DueAreaCode").val();
                var PayType = $("#DuePayType option:selected").text();
                var crpWithCode = {
                    AhMst_Key: $("#DueCorpKey").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/ SearchCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#DueCorpPhno").val(ui.item.val);
                $("#DueCorpKey").val(ui.item.id);
                $("#DueCorpName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#DueAreaNameChk").is(':checked') === true) {

        $('#DueAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#DueAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#DueAreaCode").val(ui.item.id);
                $("#DueAreaName").val(ui.item.label);
            }

        })
    }

})
$("#DueAreaNameChk").click(function () {
    if ($("#DueAreaNameChk").is(':checked') === true) {

        $('#DueAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#DueAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#DueAreaCode").val(ui.item.id);
                $("#DueAreaName").val(ui.item.label);
            }

        })
    }
})
$("#DueAreaCodeChk").click(function () {
    if ($("#DueAreaCodeChk").is(':checked') === true) {

        $('#DueAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#DueAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#DueAreaCode").val(ui.item.id);
                $("#DueAreaName").val(ui.item.label);
            }

        })
    }
})
$("#refreshBillDue").on("click.refreshBillDue", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#DuePayType").val($("#DuePayType option:first").val());
    $('#DueAreaName').val("");
    $('#DueAreaCode').val("");
    $('#DueCorpName').val("");
    $('#DueCorpKey').val("");
    $('#DueCorpPhno').val("");
    $('#billDueFrm').val(today);
    $('#billDueTo').val(today);
})
$(document).ready(function () {
    $('#billDueFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#billDueToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#billDueFrmClndr").change(function () {
        var val = $("#billDueFrmClndr").val();
        $("#billDueFrm").val(val);
    });
    $('#billDueFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#billDueToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#billDueToClndr").change(function () {
        var val = $("#billDueToClndr").val();
        $("#billDueTo").val(val);
    });

})
$("#BillWiseDueClose").on("click.BillWiseDueClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////////////
$("#btnBillWseStmnt").on("click.btnBillWseStmnt", function () {
    var AreaKey = $("#areaCode").val();
    var PayType = $("#payType option:selected").text();
    var AhMst_pName = $("#corporateName").val();
    var AhMst_Key = $('#corporateKey').val();
    var frmDate = $('#billClctnFrm').val();
    var toDate = $('#billClctnTo').val();
    var billWiseObj = {

        AhMst_pName: AhMst_pName,
        AreaKey: AreaKey,
        PayType: PayType,
        ff: frmDate,
        tt: toDate,
        AhMst_Key: AhMst_Key
        //
    };

    $.ajax({
        //url: "/LISFY/DailyClctnStatements",
        url: "/LISFY/BillWiseStmnt",
        type: "POST",
        data: JSON.stringify(billWiseObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFDailyCollctnStmnts";
                window.location = "/LISFY/PDFBillWiseStmnt";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpNameCheck").is(':checked') === true) {

        $('#corporateName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#areaCode").val();
                var PayType = $("#payType option:selected").text();
                var AhMst_pName = $("#corporateName").val();
                var crpWithName = {
                    AhMst_pName: $("#corporateName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corporatePhno").val(ui.item.val);
                $("#corporateKey").val(ui.item.id);
                $("#corporateName").val(ui.item.label);
            }

        })
    }


})
$("#corpNameCheck").click(function () {
    if ($("#corpNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corporateName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#areaCode").val();
                var PayType = $("#payType option:selected").text();
                var AhMst_pName = $("#corporateName").val();
                var crpWithName = {
                    AhMst_pName: $("#corporateName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corporatePhno").val(ui.item.val);
                $("#corporateKey").val(ui.item.id);
                $("#corporateName").val(ui.item.label);
            }

        })
    }
})
$("#corpPhnoCheck").click(function () {
    if ($("#corpPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corporateName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#areaCode").val();
                var PayType = $("#payType option:selected").text();
                var crpWithPhNo = {
                    AhMst_mobile: $("#corporatePhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corporatePhno").val(ui.item.val);
                $("#corporateKey").val(ui.item.id);
                $("#corporateName").val(ui.item.label);
            }

        })
    }
})
$("#corpCodeCheck").click(function () {
    if ($("#corpCodeCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corporateName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#areaCode").val();
                var PayType = $("#payType option:selected").text();
                var crpWithCode = {
                    AhMst_Key: $("#corporateKey").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/ SearchCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corporatePhno").val(ui.item.val);
                $("#corporateKey").val(ui.item.id);
                $("#corporateName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#areaNameChk").is(':checked') === true) {

        $('#areaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#areaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#areaCode").val(ui.item.id);
                $("#areaName").val(ui.item.label);
            }

        })
    }

})
$("#areaNameChk").click(function () {
    if ($("#areaNameChk").is(':checked') === true) {

        $('#areaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#areaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#areaCode").val(ui.item.id);
                $("#areaName").val(ui.item.label);
            }

        })
    }
})
$("#areaCodeChk").click(function () {
    if ($("#areaCodeChk").is(':checked') === true) {

        $('#areaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#areaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#areaCode").val(ui.item.id);
                $("#areaName").val(ui.item.label);
            }

        })
    }
})
$("#refreshBillStmnt").on("click.refreshBillStmnt", function () {
    event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#payType").val($("#payType option:first").val());
    $('#areaName').val("");
    $('#areaCode').val("");
    $('#corporateName').val("");
    $('#corporateKey').val("");
    $('#corporatePhno').val("");
    $('#billClctnFrm').val(today);
    $('#billClctnTo').val(today);
})
$(document).ready(function () {
    $('#billClctnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#billClctnToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#billClctnFrmClndr").change(function () {
        var val = $("#billClctnFrmClndr").val();
        $("#billClctnFrm").val(val);
    });
    $('#billClctnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#billClctnToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#billClctnToClndr").change(function () {
        var val = $("#billClctnToClndr").val();
        $("#billClctnTo").val(val);
    });

})
$("#BillWiseClctnClose").on("click.BillWiseClctnClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////
$("#btnCorpTstPrfmnce").on("click.btnCorpTstPrfmnce", function () {
    event.preventDefault();
    var frmDate = $("#corpTstFrm").val();
    var toDate = $("#corpTstTo").val();
    var Smry_Chk = 0;
    if ($("#summary").prop('checked')) {
        Smry_Chk = 0;
    }
    else {
        Smry_Chk = 1;
    }
    //BrMst_Key: $('#BrMst_Key').val(),
    var CorpTstPrfmnceObj = {
        BrMst_Name: $('#corpTstprfmncBrid option:selected').text(),
        AhMst_pName: $('#corporateBrid option:selected').text(),
        AhMst_Key: $('#corporateBrid').val(),
        ff: frmDate,
        tt: toDate,
        Smry_Chk: Smry_Chk
    };

    $.ajax({
        //url: "/LISFY/DailyClctnStatements",
        url: "/LISFY/CorpTstPrfmnce",
        type: "POST",
        data: JSON.stringify(CorpTstPrfmnceObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFDailyCollctnStmnts";
                window.location = "/LISFY/PDFCorpTstPrfmnce";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#corpTstFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpTstToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpTstFrmClndr").change(function () {
        var val = $("#corpTstFrmClndr").val();
        $("#corpTstFrm").val(val);
    });
    $('#corpTstFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpTstToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpTstToClndr").change(function () {
        var val = $("#corpTstToClndr").val();
        $("#corpTstTo").val(val);
    });

})
$("#corpTstPrfmnceClose").on("click.corpTstPrfmnceClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////////////////
$("#btncorpDivPrfmc").on("click.btncorpDivPrfmc", function () {
    event.preventDefault();
    var frmDate = $("#corpDvPrfmncFrm").val();
    var toDate = $("#corpPrfmncTo").val();
    var corDivPmncObj = {
        //BrMst_Name: $('#collSmryDivBrId option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/CorpCollDivSummary",
        url: "/LISFY/CorpDivPerfmnce",
        type: "POST",
        data: JSON.stringify(corDivPmncObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFCorpDivPerfmnce";
                //window.location = "/LISFY/PDFCorpCollDivSummary";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#corpDvPrfmncFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpPrfmncToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpDvPrfmncFrmClndr").change(function () {
        var val = $("#corpDvPrfmncFrmClndr").val();
        $("#corpDvPrfmncFrm").val(val);
    });
    $('#corpDvPrfmncFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpPrfmncToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpPrfmncToClndr").change(function () {
        var val = $("#corpPrfmncToClndr").val();
        $("#corpPrfmncTo").val(val);
    });

})
$("#corpDivPrfmcClose").on("click.corpDivPrfmcClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////////
$("#corpOutPrint").on("click.corpOutPrint", function () {

    var rowCount = $("#CorpOutstanding tbody tr").length;
    var UpTo_Chk = 0;
    var AvdClctd_Chk = 0;
    if ($("#upto").prop('checked')) {
        UpTo_Chk = 0;
    }
    else {
        UpTo_Chk = 1;
    }
    if ($("#avoidclctdBill").prop('checked')) {
        AvdClctd_Chk = 0;
    }
    else {
        AvdClctd_Chk = 1;
    }
    var frmDate = $("#corpOutFrm").val();
    var toDate = $("#corpOutTo").val();
    var corpOutPrntObj = {
        User_Name: $("#stffName").val(),
        User_Key: $("#stffKey").val(),
        ff: frmDate,
        tt: toDate,
        uptoCheck: UpTo_Chk,
        avdClctdBillCheck: AvdClctd_Chk,
        rowCount: rowCount
    };
    $.ajax({
        //url: "/LISFY/CorpInvoiceList",
        url: "/LISFY/CorpOutPrint",
        type: "POST",
        data: JSON.stringify(corpOutPrntObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFCorpOutPrint";
            }
        }
    })
})
$("#corpOutFetch").on("click.corpOutFetch", function () {
    event.preventDefault();
    $('#CorpOutstanding tbody tr:not(:last)').remove();
    var currentrow = $("#CorpOutstanding").find('tbody tr:last');
    $(currentrow).find("#corpOutSlno").text("");
    $(currentrow).find("#corporate").text("");
    $(currentrow).find("#billed").text("");
    $(currentrow).find("#collctd").text("");
    $(currentrow).find("#debit").text("");
    $(currentrow).find("#credit").text("");
    if ($("#stffName").val() != "") {
        var stffKey = $("#stffKey").val();
    }
    else {
        var stffKey = 0;
    }
    var UpTo_Chk = 0;
    var AvdClctd_Chk = 0;
    if ($("#upto").prop('checked')) {
        UpTo_Chk = 0;
    }
    else {
        UpTo_Chk = 1;
    }
    if ($("#avoidclctdBill").prop('checked')) {
        AvdClctd_Chk = 0;
    }
    else {
        AvdClctd_Chk = 1;
    }
    var frmDate = $("#corpOutFrm").val();
    var toDate = $("#corpOutTo").val();
    var corpOutShowObj = {
        User_Name: $("#stffName").val(),
        User_Key: stffKey,
        ff: frmDate,
        tt: toDate,
        uptoCheck: UpTo_Chk,
        avdClctdBillCheck: AvdClctd_Chk
    };

    $.ajax({
        //url: "/LISFY/CorpInvoiceList",
        url: "/LISFY/CorpOutShow",
        type: "POST",
        data: JSON.stringify(corpOutShowObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/HomePage";totalGross totalDisc totalNetAmt

                var currentrow = $("#CorpOutstanding").find('tbody tr');
                //var currentrow = $("#tstAddTable").find('tbody tr');
                $.each(data.Record, function (index, corOut) {
                    if (index > 0) {
                        currentrow = $(currentrow).clone();
                        $("#CorpOutstanding tbody").append($(currentrow));
                        currentrow = $("#CorpOutstanding tbody tr:last");
                    }
                    $(currentrow).find("#corpOutSlno").text((index + 1));
                    $(currentrow).find("#corporate").text(corOut.corporate);
                    $(currentrow).find("#billed").text(corOut.billed);
                    $(currentrow).find("#collctd").text(corOut.collected);
                    $(currentrow).find("#debit").text(corOut.debit);
                    $(currentrow).find("#credit").text(corOut.credit);

                })
                if ($("#stffName").val() == "") {
                    $("#stffKey").val("");
                }
                // $("#stffKey").val("");

            }
            else {


            }


        }

    })


})
$("#CorpInvShow").on("click.CorpInvShow", function () {
    //patientCheck
    if ($("#consolRptCheck").is(':checked') === true) {
        event.preventDefault();
        $('#corpInvoice tbody tr:not(:last)').remove();
        var rowCount = $("#corpInvoice tbody tr").length;
        var frmDate = $("#corpInvFrm").val();
        var corpKey = $("#corpKey").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#corpInvTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var corpInvObj = {
            rowCount: rowCount,
            ff: fdate,
            tt: tdate,
            Corp_Key: $("#corpKey").val(),
            Corp_Name: $("#corpName").val(),
            rptCheck: 0

        };
        if (corpKey == 0) {
            alert("Invalid Corporate!");
        }
        else {
            $.ajax({
                url: "/LISFY/CorpInvoiceList",
                type: "POST",
                data: JSON.stringify(corpInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {

                        //window.location = "/LISFY/HomePage";totalGross totalDisc totalNetAmt

                        var currentrow = $("#corpInvoice").find('tbody tr');
                        //var currentrow = $("#tstAddTable").find('tbody tr');
                        $.each(data.Record, function (index, corInv) {
                            if (index > 0) {
                                currentrow = $(currentrow).clone();
                                $("#corpInvoice tbody").append($(currentrow));
                                currentrow = $("#corpInvoice tbody tr:last");
                            }
                            var mdate = corInv.Inv_Date;

                            //Inv_No Inv_name Inv_RsltNO Inv_Date Inv_Netamt Inv_Gross Inv_Disc TempGrossAmt TemDiscAmt TempNetAmt tgross tDisc tNetAmt
                            $(currentrow).find("#CorpInvSlno").text((index + 1));
                            $(currentrow).find("#corpDate").text(mdate);
                            $(currentrow).find("#corpLabNo").text(corInv.Inv_No);
                            $(currentrow).find("#corpIPno").text(corInv.Inv_RsltNO);
                            $(currentrow).find("#corpPatName").text(corInv.Inv_name);
                            $(currentrow).find("#corpGross").text(corInv.Inv_Gross);
                            $(currentrow).find("#corpDiscAmt").text(corInv.Inv_Disc);
                            $(currentrow).find("#corpNetAmt").text(corInv.Inv_Netamt);
                            $(currentrow).find("#tgross").text(corInv.TempGrossAmt);
                            $(currentrow).find("#tDisc").text(corInv.TemDiscAmt);
                            $(currentrow).find("#tNetAmt").text(corInv.TempNetAmt);

                        })
                        //var tstaddtbl = $("#tstAddTable").find('tbody tr ');
                        //OrdReqDet_DiscAmt: $(tstaddtbl).find('#discountt').val(),
                        var lastRow = $("#corpInvoice").find('tbody tr:last');
                        //$("#corpInvoice tbody tr:last");
                        var tgrs = $(lastRow).find("#tgross").text();
                        var tdsc = $(lastRow).find("#tDisc").text();
                        var tntAmt = $(lastRow).find("#tNetAmt").text();
                        $("#totalGross").val(tgrs);
                        $("#totalDisc").val(tdsc);
                        $("#totalNetAmt").val(tntAmt);

                    }
                    else {

                    }
                }

            })
        }
    }

    else {

    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#stffNameCheck").is(':checked') === true) {

        $('#stffName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchStaffName",
                    data: { term: $("#stffName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                //$("#collPhno").val(ui.item.val);
                $("#stffKey").val(ui.item.id);
                $("#stffName").val(ui.item.label);
            }

        })
    }

})
$("#stffNameCheck").click(function () {
    if ($("#stffNameCheck").is(':checked') === true) {

        $('#stffName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchStaffName",
                    data: { term: $("#stffName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                //$("#collPhno").val(ui.item.val);
                $("#stffKey").val(ui.item.id);
                $("#stffName").val(ui.item.label);
            }

        })
    }
})
$("#stffCodeCheck").click(function () {
    if ($("#stffCodeCheck").is(':checked') === true) {

        $('#stffName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchStaffCode",
                    data: { term: $("#stffName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                //$("#collPhno").val(ui.item.val);
                $("#stffKey").val(ui.item.id);
                $("#stffName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    $("#upto").prop('checked', true);
    if ($("#upto").prop('checked')) {
        $('#frmDiv .ui-datepicker-trigger').hide();
        $('#frmDiv').fadeTo('slow', .6);
        //$('#frmDiv').append('<div style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');

    }
    else {
        $("#frmDiv").css('opacity', '1');
        $('#frmDiv .ui-datepicker-trigger').show();
        //$('#frmDiv style').remove();

    }

})
jQuery(document).ready(function () {
    jQuery('#upto').change(function () {
        if ($(this).prop('checked')) {

            $('#frmDiv').fadeTo('slow', .6);
            //$('#frmDiv').append('<div style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');
            $('#frmDiv .ui-datepicker-trigger').hide();
        }
        else {
            $("#frmDiv").css('opacity', '1');
            $('#frmDiv .ui-datepicker-trigger').show();
            //$('#frmDiv style').remove();

        }
    });
});
$(document).ready(function () {
    $('#corpOutFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpOutToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpOutFrmClndr").change(function () {
        var val = $("#corpOutFrmClndr").val();
        $("#corpOutFrm").val(val);
    });
    $('#corpOutFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpOutToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpOutToClndr").change(function () {
        var val = $("#corpOutToClndr").val();
        $("#corpOutTo").val(val);
    });

})
$("#corpOutClose").on("click.corpOutClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////
$("#collSmryDivPrnt").on("click.collSmryDivPrnt", function () {
    event.preventDefault();
    var frmDate = $("#collSmryDivFrm").val();
    var toDate = $("#collSmryDivTo").val();
    var collSmryDivObj = {
        BrMst_Name: $('#collSmryDivBrId option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/CorpCollSummary",
        url: "/LISFY/CorpCollDivSummary",
        type: "POST",
        data: JSON.stringify(collSmryDivObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFCorpCollDivSummary";
                //window.location = "/LISFY/PDFCorpCollSummary";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#collSmryDivFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#collSmryDivToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#collSmryDivFrmClndr").change(function () {
        var val = $("#collSmryDivFrmClndr").val();
        $("#collSmryDivFrm").val(val);
    });
    $('#collSmryDivFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#collSmryDivToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#collSmryDivToClndr").change(function () {
        var val = $("#collSmryDivToClndr").val();
        $("#collSmryDivTo").val(val);
    });

})
$("#collSmryDivClose").on("click.collSmryDivClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////
$("#collSmryPrnt").on("click.collSmryPrnt", function () {
    event.preventDefault();
    var frmDate = $("#collSmryFrm").val();
    var toDate = $("#collSmryTo").val();
    var collSmryObj = {
        BrMst_Name: $('#collSmryBrId option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/CorpCollSummary",
        type: "POST",
        data: JSON.stringify(collSmryObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFCorpCollSummary";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#collSmryFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#collSmryToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#collSmryFrmClndr").change(function () {
        var val = $("#collSmryFrmClndr").val();
        $("#collSmryFrm").val(val);
    });
    $('#collSmryFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#collSmryToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#collSmryToClndr").change(function () {
        var val = $("#collSmryToClndr").val();
        $("#collSmryTo").val(val);
    });

})
$("#collSmryClose").on("click.collSmryClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////
$("#CorpInvPrint").on("click.CorpInvPrint", function () {
    //patientCheck
    if ($("#consolRptCheck").is(':checked') === true) {
        event.preventDefault();
        //$('#corpInvoice tbody tr:not(:last)').remove();
        var rowCount = $("#corpInvoice tbody tr").length;
        var frmDate = $("#corpInvFrm").val();
        var corpKey = $("#corpKey").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#corpInvTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var corpInvPrntObj = {
            rowCount: rowCount,
            ff: fdate,
            tt: tdate,
            Corp_Key: $("#corpKey").val(),
            Corp_Name: $("#corpName").val(),
            rptCheck: 0

        };


        $.ajax({
            url: "/LISFY/CorpInvoicePrint",
            type: "POST",
            data: JSON.stringify(corpInvPrntObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    window.location = "/LISFY/PDFCorpInvoicePrint";//CorpInvoicePrint
                }
                else {
                }
            }

        })

    }
    else if ($("#dtldRptCheck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#corpInvoice tbody tr:not(:last)').remove();
        var rowCount = $("#corpInvoice tbody tr").length;
        var frmDate = $("#corpInvFrm").val();
        var corpKey = $("#corpKey").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#corpInvTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var corpInvPrntObj = {
            rowCount: rowCount,
            ff: fdate,
            tt: tdate,
            Corp_Key: $("#corpKey").val(),
            Corp_Name: $("#corpName").val(),
            rptCheck: 1
        };
        if (corpKey == 0) {
            alert("Invalid Corporate!");
        }
        else {
            $.ajax({
                url: "/LISFY/CorpInvoicePrint",
                type: "POST",
                data: JSON.stringify(corpInvPrntObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFCorpInvoicePrint";//CorpInvoicePrint

                    }
                    else {


                    }


                }

            })
        }
    }
    else if ($("#rsltViewCheck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#corpInvoice tbody tr:not(:last)').remove();
        var rowCount = $("#corpInvoice tbody tr").length;
        var frmDate = $("#corpInvFrm").val();
        var corpKey = $("#corpKey").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#corpInvTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var corpInvPrntObj = {
            rowCount: rowCount,
            ff: fdate,
            tt: tdate,
            Corp_Key: $("#corpKey").val(),
            Corp_Name: $("#corpName").val(),
            rptCheck: 2
        };
        if (corpKey == 0) {
            alert("Invalid Corporate!");
        }
        else {
            $.ajax({
                url: "/LISFY/CorpInvoicePrint",
                type: "POST",
                data: JSON.stringify(corpInvPrntObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        window.location = "/LISFY/PDFCorpInvoicePrint";//CorpInvoicePrint
                    }
                    else {


                    }


                }

            })
        }
    }
    else {

    }
})
$("#CorpInvShow").on("click.CorpInvShow", function () {
    //patientCheck
    if ($("#consolRptCheck").is(':checked') === true) {
        event.preventDefault();
        $('#corpInvoice tbody tr:not(:last)').remove();
        var rowCount = $("#corpInvoice tbody tr").length;
        var frmDate = $("#corpInvFrm").val();
        var corpKey = $("#corpKey").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#corpInvTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var corpInvObj = {
            rowCount: rowCount,
            ff: fdate,
            tt: tdate,
            Corp_Key: $("#corpKey").val(),
            Corp_Name: $("#corpName").val(),
            rptCheck: 0

        };
        if (corpKey == 0) {
            alert("Invalid Corporate!");
        }
        else {
            $.ajax({
                url: "/LISFY/CorpInvoiceList",
                type: "POST",
                data: JSON.stringify(corpInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {

                        //window.location = "/LISFY/HomePage";totalGross totalDisc totalNetAmt

                        var currentrow = $("#corpInvoice").find('tbody tr');
                        //var currentrow = $("#tstAddTable").find('tbody tr');
                        $.each(data.Record, function (index, corInv) {
                            if (index > 0) {
                                currentrow = $(currentrow).clone();
                                $("#corpInvoice tbody").append($(currentrow));
                                currentrow = $("#corpInvoice tbody tr:last");
                            }
                            var mdate = corInv.Inv_Date;

                            //Inv_No Inv_name Inv_RsltNO Inv_Date Inv_Netamt Inv_Gross Inv_Disc TempGrossAmt TemDiscAmt TempNetAmt tgross tDisc tNetAmt
                            $(currentrow).find("#CorpInvSlno").text((index + 1));
                            $(currentrow).find("#corpDate").text(mdate);
                            $(currentrow).find("#corpLabNo").text(corInv.Inv_No);
                            $(currentrow).find("#corpIPno").text(corInv.Inv_RsltNO);
                            $(currentrow).find("#corpPatName").text(corInv.Inv_name);
                            $(currentrow).find("#corpGross").text(corInv.Inv_Gross);
                            $(currentrow).find("#corpDiscAmt").text(corInv.Inv_Disc);
                            $(currentrow).find("#corpNetAmt").text(corInv.Inv_Netamt);
                            $(currentrow).find("#tgross").text(corInv.TempGrossAmt);
                            $(currentrow).find("#tDisc").text(corInv.TemDiscAmt);
                            $(currentrow).find("#tNetAmt").text(corInv.TempNetAmt);

                        })
                        //var tstaddtbl = $("#tstAddTable").find('tbody tr ');
                        //OrdReqDet_DiscAmt: $(tstaddtbl).find('#discountt').val(),
                        var lastRow = $("#corpInvoice").find('tbody tr:last');
                        //$("#corpInvoice tbody tr:last");
                        var tgrs = $(lastRow).find("#tgross").text();
                        var tdsc = $(lastRow).find("#tDisc").text();
                        var tntAmt = $(lastRow).find("#tNetAmt").text();
                        $("#totalGross").val(tgrs);
                        $("#totalDisc").val(tdsc);
                        $("#totalNetAmt").val(tntAmt);

                    }
                    else {

                    }
                }

            })
        }
    }
    else if ($("#dtldRptCheck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#corpInvoice tbody tr:not(:last)').remove();
        var rowCount = $("#corpInvoice tbody tr").length;
        var frmDate = $("#corpInvFrm").val();
        var corpKey = $("#corpKey").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#corpInvTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var corpInvObj = {
            rowCount: rowCount,
            ff: fdate,
            tt: tdate,
            Corp_Key: $("#corpKey").val(),
            Corp_Name: $("#corpName").val(),
            rptCheck: 1
        };
        if (corpKey == 0) {
            alert("Invalid Corporate!");
        }
        else {
            $.ajax({
                url: "/LISFY/CorpInvoiceList",
                type: "POST",
                data: JSON.stringify(corpInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        //$("#ClctnSummary2 tbody tr").remove();
                        ////window.location = "/LISFY/HomePage";
                        var currentrow = $("#corpInvoice").find('tbody tr');
                        //var currentrow = $("#tstAddTable").find('tbody tr');
                        $.each(data.Record, function (index, newPat) {
                            if (index > 0) {
                                currentrow = $(currentrow).clone();
                                $("#corpInvoice tbody").append($(currentrow));
                                currentrow = $("#corpInvoice tbody tr:last");
                            }

                            var mdate = corInv.Inv_Date;

                            //Inv_No Inv_name Inv_RsltNO Inv_Date Inv_Netamt Inv_Gross Inv_Disc TempGrossAmt TemDiscAmt TempNetAmt
                            $(currentrow).find("#CorpInvSlno").text((index + 1));
                            $(currentrow).find("#corpDate").text(mdate);
                            $(currentrow).find("#corpLabNo").text(corInv.Inv_No);
                            $(currentrow).find("#corpIPno").text(corInv.Inv_RsltNO);
                            $(currentrow).find("#corpPatName").text(corInv.Inv_name);
                            $(currentrow).find("#corpGross").text(corInv.Inv_Gross);
                            $(currentrow).find("#corpDiscAmt").text(corInv.Inv_Disc);
                            $(currentrow).find("#corpNetAmt").text(corInv.Inv_Netamt);
                            $(currentrow).find("#tgross").text(corInv.TempGrossAmt);
                            $(currentrow).find("#tDisc").text(corInv.TemDiscAmt);
                            $(currentrow).find("#tNetAmt").text(corInv.TempNetAmt);


                        })
                        //var tstaddtbl = $("#tstAddTable").find('tbody tr ');
                        //OrdReqDet_DiscAmt: $(tstaddtbl).find('#discountt').val(),
                        var lastRow = $("#corpInvoice").find('tbody tr:last');
                        //$("#corpInvoice tbody tr:last");
                        var tgrs = $(lastRow).find("#tgross").text();
                        var tdsc = $(lastRow).find("#tDisc").text();
                        var tntAmt = $(lastRow).find("#tNetAmt").text();
                        $("#totalGross").val(tgrs);
                        $("#totalDisc").val(tdsc);
                        $("#totalNetAmt").val(tntAmt);

                    }
                    else {


                    }


                }

            })
        }
    }
    else if ($("#rsltViewCheck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#corpInvoice tbody tr:not(:last)').remove();
        var rowCount = $("#corpInvoice tbody tr").length;
        var frmDate = $("#corpInvFrm").val();
        var corpKey = $("#corpKey").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#corpInvTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var corpInvObj = {
            rowCount: rowCount,
            ff: fdate,
            tt: tdate,
            Corp_Key: $("#corpKey").val(),
            Corp_Name: $("#corpName").val(),
            rptCheck: 2
        };
        if (corpKey == 0) {
            alert("Invalid Corporate!");
        }
        else {
            $.ajax({
                url: "/LISFY/CorpInvoiceList",
                type: "POST",
                data: JSON.stringify(corpInvObj),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    event.preventDefault();
                    if (data.Result === "OK") {
                        //$("#ClctnSummary2 tbody tr").remove();
                        ////window.location = "/LISFY/HomePage";
                        var currentrow = $("#corpInvoice").find('tbody tr');
                        //var currentrow = $("#tstAddTable").find('tbody tr');
                        $.each(data.Record, function (index, newPat) {
                            if (index > 0) {
                                currentrow = $(currentrow).clone();
                                $("#corpInvoice tbody").append($(currentrow));
                                currentrow = $("#corpInvoice tbody tr:last");
                            }

                            var mdate = corInv.Inv_Date;

                            //Inv_No Inv_name Inv_RsltNO Inv_Date Inv_Netamt Inv_Gross Inv_Disc TempGrossAmt TemDiscAmt TempNetAmt
                            $(currentrow).find("#CorpInvSlno").text((index + 1));
                            $(currentrow).find("#corpDate").text(mdate);
                            $(currentrow).find("#corpLabNo").text(corInv.Inv_No);
                            $(currentrow).find("#corpIPno").text(corInv.Inv_RsltNO);
                            $(currentrow).find("#corpPatName").text(corInv.Inv_name);
                            $(currentrow).find("#corpGross").text(corInv.Inv_Gross);
                            $(currentrow).find("#corpDiscAmt").text(corInv.Inv_Disc);
                            $(currentrow).find("#corpNetAmt").text(corInv.Inv_Netamt);
                            $(currentrow).find("#tgross").text(corInv.TempGrossAmt);
                            $(currentrow).find("#tDisc").text(corInv.TemDiscAmt);
                            $(currentrow).find("#tNetAmt").text(corInv.TempNetAmt);


                        })
                        //var tstaddtbl = $("#tstAddTable").find('tbody tr ');
                        //OrdReqDet_DiscAmt: $(tstaddtbl).find('#discountt').val(),
                        var lastRow = $("#corpInvoice").find('tbody tr:last');
                        //$("#corpInvoice tbody tr:last");
                        var tgrs = $(lastRow).find("#tgross").text();
                        var tdsc = $(lastRow).find("#tDisc").text();
                        var tntAmt = $(lastRow).find("#tNetAmt").text();
                        $("#totalGross").val(tgrs);
                        $("#totalDisc").val(tdsc);
                        $("#totalNetAmt").val(tntAmt);


                    }
                    else {


                    }


                }

            })
        }
    }
    else {

    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpNameCheck").is(':checked') === true) {

        $('#corpName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCoprName",
                    data: { term: $("#corpName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpKey").val(ui.item.id);
                $("#corpName").val(ui.item.label);
            }

        })
    }

})
$("#corpNameCheck").click(function () {
    if ($("#corpNameCheck").is(':checked') === true) {

        $('#corpName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCoprName",
                    data: { term: $("#corpName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpKey").val(ui.item.id);
                $("#corpName").val(ui.item.label);
            }

        })
    }
})
$("#corpCodeCheck").click(function () {
    if ($("#corpCodeCheck").is(':checked') === true) {

        $('#corpName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCorpCodes",
                    data: { term: $("#corpName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpKey").val(ui.item.id);
                $("#corpName").val(ui.item.label);
            }

        })
    }
})
$("#corpInvClose").on("click.corpInvClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////
$(document).ready(function () {
    $('#corpInvFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpInvToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpInvFrmClndr").change(function () {
        var val = $("#corpInvFrmClndr").val();
        $("#corpInvFrm").val(val);
    });
    $('#corpInvFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpInvToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpInvToClndr").change(function () {
        var val = $("#corpInvToClndr").val();
        $("#corpInvTo").val(val);
    });

})
$("#btninsuranceWiseClctn").on("click.btninsuranceWiseClctn", function () {
    event.preventDefault();
    var frmDate = $("#insWiseFrm").val();
    var toDate = $("#insWiseTo").val();
    var insrncWiseObj = {
        BrMst_Name: $('#insWiseBrid option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        url: "/LISFY/InsuranceWiseColln",
        type: "POST",
        data: JSON.stringify(insrncWiseObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFInsuranceWiseColln";


            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#insWiseFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#insWiseToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#insWiseFrmClndr").change(function () {
        var val = $("#insWiseFrmClndr").val();
        $("#insWiseFrm").val(val);
    });
    $('#insWiseFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#insWiseToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#insWiseToClndr").change(function () {
        var val = $("#insWiseToClndr").val();
        $("#insWiseTo").val(val);
    });

})
$("#insWiseClose").on("click.insWiseClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////
$("#btnCrdtCardWiseClctn").on("click.btnCrdtCardWiseClctn", function () {
    event.preventDefault();
    var frmDate = $("#crWiseFrm").val();
    var toDate = $("#crWiseTo").val();
    var crCardWiseObj = {
        BrMst_Name: $('#crWiseBrid option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        url: "/LISFY/CreditCardWiseColln",
        type: "POST",
        data: JSON.stringify(crCardWiseObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFCreditCardWiseColln";


            }
            else {


            }


        }

    })


})
$("#crWiseClose").on("click.crWiseClose", function () {
    window.location = "HomePage";
})
$(document).ready(function () {
    $('#crWiseFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#crWiseToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#crWiseFrmClndr").change(function () {
        var val = $("#crWiseFrmClndr").val();
        $("#crWiseFrm").val(val);
    });
    $('#crWiseFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#crWiseToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#crWiseToClndr").change(function () {
        var val = $("#crWiseToClndr").val();
        $("#crWiseTo").val(val);
    });

})
///////////////////////////////////////////////////////
$("#btnOldPtntList").on("click.btnOldPtntList", function () {
    //patientCheck
    if ($("#WithOutDctrCheck").is(':checked') === true) {
        event.preventDefault();
        $('#OldPatientStmnt tbody tr:not(:last)').remove();
        var rowCount = $("#OldPatientStmnt tbody tr").length;
        var frmDate = $("#oldPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#oldPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var oldPatListObj = {
            rowCount: rowCount,
            dctrCheck: 0,
            ff: fdate,
            tt: tdate
        };

        $.ajax({
            url: "/LISFY/OldPatientListPrint",
            type: "POST",
            data: JSON.stringify(oldPatListObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    window.location = "/LISFY/PDFOldPatientListPrint";
                }
                else {

                }
            }

        })
    }
    else if ($("#WithDctrCheck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#OldPatientStmnt tbody tr:not(:last)').remove();
        var rowCount = $("#OldPatientStmnt tbody tr").length;
        var frmDate = $("#oldPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#oldPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var oldPatListObj = {
            rowCount: rowCount,
            dctrCheck: 1,
            ff: fdate,
            tt: tdate
        };
        $.ajax({
            url: "/LISFY/OldPatientListPrint",
            type: "POST",
            data: JSON.stringify(oldPatListObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    window.location = "/LISFY/PDFOldPatientListPrint";
                }
                else {


                }


            }

        })
    }
    else {

    }
})
$(document).ready(function () {
    $('#oldPtntFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#oldPtntToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#oldPtntFrmClndr").change(function () {
        var val = $("#oldPtntFrmClndr").val();
        $("#oldPtntFrm").val(val);
    });
    $('#oldPtntFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#oldPtntToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#oldPtntToClndr").change(function () {
        var val = $("#oldPtntToClndr").val();
        $("#oldPtntTo").val(val);
    });

})
$("#oldPtntStmntClose").on("click.oldPtntStmntClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////        
$("#btnCorpBillMnthly").on("click.btnCorpBillMnthly", function () {
    var AreaKey = $("#corpMnAreaCode").val();
    var PayType = $("#corpBillMnMode option:selected").text();
    var AhMst_pName = $("#corpMnName").val();
    var AhMst_Key = $('#corpMnKey').val();
    var frmDate = $('#corpBillMnFrm').val();
    var toDate = $('#corpBillMnTo').val();
    var corpBillMnthlySmryObj = {

        AhMst_pName: AhMst_pName,
        AreaKey: AreaKey,
        PayType: PayType,
        ff: frmDate,
        tt: toDate,
        AhMst_Key: AhMst_Key

    };

    $.ajax({
        //url: "/LISFY/BillWiseDue",
        url: "/LISFY/CorpBillMnthlySmry",
        type: "POST",
        data: JSON.stringify(corpBillMnthlySmryObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFBillWiseDue";
                window.location = "/LISFY/PDFCorpBillMnthlySmry";

            }
            else {


            }


        }

    })


})
$("#newCorpBillMnthly").on("click.newCorpBillMnthly", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#corpBillMnMode").val($("#corpBillMnMode option:first").val());
    $('#corpMnAreaName').val("");
    $('#corpMnAreaCode').val("");
    $('#corpMnName').val("");
    $('#corpMnKey').val("");
    $('#corpMnPhno').val("");
    $('#corpBillMnFrm').val(today);
    $('#corpBillMnTo').val(today);
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpMnNameCheck").is(':checked') === true) {

        $('#corpMnName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpMnAreaCode").val();
                var PayType = $("#corpBillMnMode option:selected").text();
                var AhMst_pName = $("#corpMnName").val();
                var crpWithName = {
                    AhMst_pName: $("#corpMnName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpMnPhno").val(ui.item.val);
                $("#corpMnKey").val(ui.item.id);
                $("#corpMnName").val(ui.item.label);
            }

        })
    }


})
$("#corpMnNameCheck").click(function () {
    if ($("#corpMnNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpMnName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpMnAreaCode").val();
                var PayType = $("#corpBillMnMode option:selected").text();
                var AhMst_pName = $("#corpMnName").val();
                var crpWithName = {
                    AhMst_pName: $("#corpMnName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#corpMnPhno").val(ui.item.val);
                $("#corpMnKey").val(ui.item.id);
                $("#corpMnName").val(ui.item.label);
            }
        })
    }
})
$("#corpMnPhnoCheck").click(function () {
    if ($("#corpMnPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpMnName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpMnAreaCode").val();
                var PayType = $("#corpBillMnMode option:selected").text();
                var crpWithPhNo = {
                    AhMst_mobile: $("#corpMnPhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpMnName").val(ui.item.val);
                $("#corpMnKey").val(ui.item.id);
                $("#corpMnPhno").val(ui.item.label);
            }

        })
    }
})
$("#corpMnAreaCodeChk").click(function () {
    if ($("#corpMnAreaCodeChk").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpMnName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpMnAreaCode").val();
                var PayType = $("#corpBillMnMode option:selected").text();
                var crpWithCode = {
                    AhMst_Key: $("#corpMnKey").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/ SearchCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpMnName").val(ui.item.val);
                $("#corpMnKey").val(ui.item.id);
                $("#corpMnPhno").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpMnAreaNameChk").is(':checked') === true) {

        $('#corpMnAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpMnAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#corpMnAreaCode").val(ui.item.id);
                $("#corpMnAreaName").val(ui.item.label);
            }

        })
    }

})
$("#corpMnAreaNameChk").click(function () {
    if ($("#corpMnAreaNameChk").is(':checked') === true) {

        $('#corpMnAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpMnAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpMnAreaCode").val(ui.item.id);
                $("#corpMnAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpMnAreaCodeChk").click(function () {
    if ($("#corpMnAreaCodeChk").is(':checked') === true) {

        $('#corpMnAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#corpMnAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpMnAreaCode").val(ui.item.id);
                $("#corpMnAreaName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    $('#corpBillMnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpBillMnToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpBillMnFrmClndr").change(function () {
        var val = $("#corpBillMnFrmClndr").val();
        $("#corpBillMnFrm").val(val);
    });
    $('#corpBillMnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpBillMnToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpBillMnToClndr").change(function () {
        var val = $("#corpBillMnToClndr").val();
        $("#corpBillMnTo").val(val);
    });

})
$("#corpMnthSmryClose").on("click.corpMnthSmryClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////////
$("#btnAreSmry").on("click.btnAreSmry", function () {
    var AreaKey = $("#areaWiseKey").val();
    var PayType = $("#areaMode option:selected").text();
    var frmDate = $('#areaSmryFrm').val();
    var toDate = $('#areaSmryTo').val();
    if ($("#areaWsDaily").is(":checked")) {
        var areaWsSmryObj = {
            AreaKey: AreaKey,
            PayType: PayType,
            ff: frmDate,
            dailyCheck: 0,
            tt: toDate,
            AreaName: $("#areaWiseName").val()
        };

        $.ajax({
            //url: "/LISFY/DailyClctnStatements",
            url: "/LISFY/AreaWiseSummary",
            type: "POST",
            data: JSON.stringify(areaWsSmryObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //window.location = "/LISFY/PDFBillWiseStmnt";
                    window.location = "/LISFY/PDFAreaWiseSummary";

                }
                else {


                }


            }

        })

    }
    else {
        var areaWsSmryObj = {
            AreaKey: AreaKey,
            PayType: PayType,
            ff: frmDate,
            dailyCheck: 1,
            tt: toDate,
            AreaName: $("#areaWiseName").val()
        };

        $.ajax({
            //url: "/LISFY/DailyClctnStatements",
            url: "/LISFY/AreaWiseSummary",
            type: "POST",
            data: JSON.stringify(areaWsSmryObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //window.location = "/LISFY/PDFBillWiseStmnt";
                    window.location = "/LISFY/PDFAreaWiseSummary";

                }
                else {


                }


            }

        })

    }


})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#areaWiseNameCheck").is(':checked') === true) {

        $('#areaWiseName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#areaWiseName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#areaWiseKey").val(ui.item.id);
                $("#areaWiseName").val(ui.item.label);
            }

        })
    }

})
$("#areaWiseNameCheck").click(function () {
    if ($("#areaWiseNameCheck").is(':checked') === true) {

        $('#areaWiseName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#areaWiseName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#areaWiseKey").val(ui.item.id);
                $("#areaWiseName").val(ui.item.label);
            }

        })
    }
})
$("#areaWiseCodeCheck").click(function () {
    if ($("#areaWiseCodeCheck").is(':checked') === true) {

        $('#areaWiseName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#areaWiseName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#areaWiseKey").val(ui.item.id);
                $("#areaWiseName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    $('#areaSmryFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#areaSmryToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#areaSmryFrmClndr").change(function () {
        var val = $("#areaSmryFrmClndr").val();
        $("#areaSmryFrm").val(val);
    });
    $('#areaSmryFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#areaSmryToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#areaSmryToClndr").change(function () {
        var val = $("#areaSmryToClndr").val();
        $("#areaSmryTo").val(val);
    });

})
$("#areaWsSmryClose").on("click.areaWsSmryClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////
$("#btnCorpPend").on("click.btnCorpPend", function () {
    event.preventDefault();
    var frmDate = $("#corpPndFrm").val();
    var toDate = $("#corpPndTo").val();
    var corpPendObj = {
        AhMst_pName: $('#pndCorpName').val(),
        AhMst_Key: $('#pndCorpKey').val(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        url: "/LISFY/CorpWisePendColln",
        type: "POST",
        data: JSON.stringify(corpPendObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFCorpWisePendColln";


            }
            else {


            }


        }

    })


})
$("#pndCorpCodeCheck").click(function () {
    if ($("#pndCorpCodeCheck").is(':checked') === true) {

        $('#pndCorpName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCorpCodes",
                    data: { term: $("#pndCorpName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#pndCorpKey").val(ui.item.id);
                $("#pndCorpName").val(ui.item.label);
            }

        })
    }
})
$("#pndCorpNameCheck").click(function () {
    if ($("#pndCorpNameCheck").is(':checked') === true) {

        $('#pndCorpName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCoprName",
                    data: { term: $("#pndCorpName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#pndCorpKey").val(ui.item.id);
                $("#pndCorpName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#pndCorpNameCheck").is(':checked') === true) {

        $('#pndCorpName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCoprName",
                    data: { term: $("#pndCorpName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#pndCorpKey").val(ui.item.id);
                $("#pndCorpName").val(ui.item.label);
            }

        })
    }

})
$(document).ready(function () {
    $('#corpPndFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpPndToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpPndFrmClndr").change(function () {
        var val = $("#corpPndFrmClndr").val();
        $("#corpPndFrm").val(val);
    });
    $('#corpPndFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpPndToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpPndToClndr").change(function () {
        var val = $("#corpPndToClndr").val();
        $("#corpPndTo").val(val);
    });

})
$("#corpPendCollClose").on("click.corpPendCollClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////
$("#btnMulTstInv").on("click.btnMulTstInv", function () {
    var frmDate = $("#MltplTstWsFrm").val();
    var toDate = $("#MltplTstWsTo").val();
    var TestClctnObj = [];
    var TestKeyObj = [];
    $.each($("input[name='tstChk']:checked"), function () {
        var tstname = $(this).closest('tr').find('#MulTstName').text();
        var trimTst = $.trim(tstname);
        TestClctnObj.push(trimTst);
        var tstkey = $(this).closest('tr').find('#MulTstId').text();
        var trimTstId = $.trim(tstkey);
        TestKeyObj.push(trimTstId);
    });
    if (TestClctnObj.length == 0) {
        alert("Select atleast one  test");
    }
    else {
        var multTstInvObj = {
            BrMst_Name: $('#MulTstBrid option:selected').text(),
            BrMst_Key: $('#MulTstBrid option:selected').val(),
            TestClctnObj: TestClctnObj,
            ff: frmDate,
            tt: toDate,
            TestKeyObj: TestKeyObj
        };

        $.ajax({
            //url: "/LISFY/CollSmryBranchWise",
            url: "/LISFY/MultplTstWiseInvce",
            type: "POST",
            data: JSON.stringify(multTstInvObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //window.location = "/LISFY/PDFCollSmryBrnchWise";
                    window.location = "/LISFY/PDFMultplTstWiseInvce";
                }
                else {
                }
            }
        })
    }
})
$(document).ready(function () {
    $("#mulTstparent").click(function () {
        $(".childTst").prop("checked", this.checked);
    });

    $('.childTst').click(function () {
        if ($('.childTst:checked').length == $('.childTst').length) {
            $('#mulTstparent').prop('checked', true);
        } else {
            $('#mulTstparent').prop('checked', false);
        }
    });
});
$(document).ready(function () {
    $('#MltplTstWsFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#MltplTstWsToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'
            $(this).change();

        }
    });
    $('#MltplTstWsFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#MltplTstWsFrmClndr").change(function () {
        var val = $("#MltplTstWsFrmClndr").val();
        $("#MltplTstWsFrm").val(val);
    });
    $('#MltplTstWsToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#MltplTstWsToClndr").change(function () {
        var val = $("#MltplTstWsToClndr").val();
        $("#MltplTstWsTo").val(val);
    });
})
$("#MultipleTstWiseInvClose").on("click.MultipleTstWiseInvClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////////////////
$("#btntstPrDivPfmnc").on("click.btntstPrDivPfmnc", function () {
    event.preventDefault();
    var frmDate = $("#tstPrDivFrm").val();
    var toDate = $("#tstPrDivTo").val();
    var tstPrfmncDivObj = {
        BrMst_Name: $('#tstPrDivBrid option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/TestPerfomance",
        url: "/LISFY/TestPerfomanceDivWise",
        type: "POST",
        data: JSON.stringify(tstPrfmncDivObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFTestPerfomance";
                window.location = "/LISFY/PDFTestPerfomanceDivWise";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#tstPrDivFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#tstPrDivToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'
            $(this).change();

        }
    });
    $('#tstPrDivFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#tstPrDivFrmClndr").change(function () {
        var val = $("#tstPrDivFrmClndr").val();
        $("#tstPrDivFrm").val(val);
    });
    $('#tstPrDivToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#tstPrDivToClndr").change(function () {
        var val = $("#tstPrDivToClndr").val();
        $("#tstPrDivTo").val(val);
    });
})
$("#tstPrDivWiseClose").on("click.tstPrDivWiseClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////////
$("#btnTstPrfmnce").on("click.btnTstPrfmnce", function () {
    event.preventDefault();
    var frmDate = $("#tstPrfmncFrm").val();
    var toDate = $("#tstPrfmncTo").val();
    var tstPrfmncObj = {
        BrMst_Name: $('#tstPrfmncBrid option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/TestPerfomance",
        type: "POST",
        data: JSON.stringify(tstPrfmncObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFTestPerfomance";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#tstPrfmncFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#tstPrfmncToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'
            $(this).change();

        }
    });
    $('#tstPrfmncFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#tstPrfmncFrmClndr").change(function () {
        var val = $("#tstPrfmncFrmClndr").val();
        $("#tstPrfmncFrm").val(val);
    });
    $('#tstPrfmncToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#tstPrfmncToClndr").change(function () {
        var val = $("#tstPrfmncToClndr").val();
        $("#tstPrfmncTo").val(val);
    });
})
$("#tstPrfmnceClose").on("click.tstPrfmnceClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////
$("#btnDocSplzd").on("click.btnDocSplzd", function () {
    var frmDate = $("#docSplzdFrm").val();
    var toDate = $("#docSplzdTo").val();
    var splzdNameObj = [];
    var splzdKeyObj = [];
    $.each($("input[name='docSplzdChk']:checked"), function () {
        var splzdName = $(this).closest('tr').find('#DocSplzdName').text();
        var trimSplzdName = $.trim(splzdName);
        splzdNameObj.push(trimSplzdName);
        var splzdKey = $(this).closest('tr').find('#DcSplzdId').text();
        var trimSplzdId = $.trim(splzdKey);
        splzdKeyObj.push(trimSplzdId);
    });
    if (splzdNameObj.length == 0) {
        alert("Select atleast one  branch");
    }
    else {
        var DrSplzdObj = {
            checkedSplzd: splzdNameObj,
            ff: frmDate,
            tt: toDate,
            checkedSplzdId: splzdKeyObj
        };
        $.ajax({
            //url: "/LISFY/BranchWiseCollection",
            url: "/LISFY/DoctrSplzdList",
            type: "POST",
            data: JSON.stringify(DrSplzdObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    window.location = "/LISFY/PDFDoctrSplzdList";
                    //window.location = "/LISFY/PDFBranchWiseCollection";
                }
                else {
                }
            }
        })
    }
})
$("#docSplzdLstClose").on("click.docSplzdLstClose", function () {
    window.location = "HomePage";
})
$(document).ready(function () {
    $('#docSplzdFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#docSplzdToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#docSplzdFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#docSplzdFrmClndr").change(function () {
        var val = $("#docSplzdFrmClndr").val();
        $("#docSplzdFrm").val(val);
    });
    $('#docSplzdToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#docSplzdToClndr").change(function () {
        var val = $("#docSplzdToClndr").val();
        $("#docSplzdTo").val(val);
    });

})
$(document).ready(function () {
    $("#docSplzdParent").click(function () {
        $(".docSplzdChild").prop("checked", this.checked);
    });
    //parentcheck brnchsmryChk
    $('.docSplzdChild').click(function () {
        if ($('.docSplzdChild:checked').length == $('.docSplzdChild').length) {
            $('#docSplzdParent').prop('checked', true);
        } else {
            $('#docSplzdParent').prop('checked', false);
        }
    });
});
/////////////////////////////////////////////////////////////////////
$("#btnDCPfmnc").on("click.btnDCPfmnc", function () {
    event.preventDefault();
    var frmDate = $("#docPfmncFrm").val();
    var toDate = $("#docPfmncTo").val();
    var dcPfmncObj = {
        BrMst_Name: $('#DCpfmncBrid option:selected').text(),
        ff: frmDate,
        tt: toDate,
        BrMst_Key: $('#DCpfmncBrid option:selected').val()
    };

    $.ajax({
        //url: "/LISFY/PendngRegister",
        url: "/LISFY/DoctorPerfomance",
        type: "POST",
        data: JSON.stringify(dcPfmncObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFPendngRegister";
                window.location = "/LISFY/PDFDoctorPerfomance";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#docPfmncFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#docPfmncToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#docPfmncFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#docPfmncFrmClndr").change(function () {
        var val = $("#docPfmncFrmClndr").val();
        $("#docPfmncFrm").val(val);
    });
    $('#docPfmncToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#docPfmncToClndr").change(function () {
        var val = $("#docPfmncToClndr").val();
        $("#docPfmncTo").val(val);
    });

})
$("#docPrfmnceClose").on("click.docPrfmnceClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////////////////
$("#btndcWsClcn").on("click.btndcWsClcn", function () {
    var AhMst_DrCode = $("#dcWsClcnDocCode").val();
    var AhMst_pName = $("#dcWsClcnDocname").val();
    var BrMstKey = $('#docClctnBrid option:selected').text();
    var AhMst_Key = $("#dcWsClcnDocKey").val();
    var frmDate = $('#dcWsClcnFrm').val();
    var toDate = $('#dcWsClcnTo').val();
    var BrMst_Name = $('#docClctnBrid option:selected').val();
    var dcWsClcnObj = {
        AhMst_pName: AhMst_pName,
        AhMst_DrCode: AhMst_DrCode,
        AhMst_Key: AhMst_Key,
        ff: frmDate,
        tt: toDate,
        BrMstKey: BrMstKey,
        BrMst_Name: BrMst_Name
    };

    $.ajax({
        url: "/LISFY/DoctorWiseColln",
        type: "POST",
        data: JSON.stringify(dcWsClcnObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFDoctorWiseColln";

            }
            else {


            }


        }

    })
})
$("#docClnDocCodeCheck").click(function () {
    if ($("#docClnDocCodeCheck").is(':checked') === true) {

        $('#dcWsClcnDocname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/srchDocWithCode",
                    data: { term: $("#dcWsClcnDocname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_DrCode,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#dcWsClcnDocCode").val(ui.item.val);
                $("#dcWsClcnDocKey").val(ui.item.id);
                $("#dcWsClcnDocname").val(ui.item.label);
            }

        })
    }
})
$("#docClnDocKeyCheck").click(function () {
    if ($("#docClnDocKeyCheck").is(':checked') === true) {

        $('#dcWsClcnDocname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/srchDocWithKey",
                    data: { term: $("#dcWsClcnDocname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_DrCode,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#dcWsClcnDocCode").val(ui.item.val);
                $("#dcWsClcnDocKey").val(ui.item.id);
                $("#dcWsClcnDocname").val(ui.item.label);
            }

        })
    }
})
$("#docClnDocnameCheck").click(function () {
    if ($("#docClnDocnameCheck").is(':checked') === true) {

        $('#dcWsClcnDocname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/srchDocWithname",
                    data: { term: $("#dcWsClcnDocname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_DrCode,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#dcWsClcnDocCode").val(ui.item.val);
                $("#dcWsClcnDocKey").val(ui.item.id);
                $("#dcWsClcnDocname").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#docClnDocnameCheck").is(':checked') === true) {

        $('#dcWsClcnDocname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/srchDocWithname",
                    data: { term: $("#dcWsClcnDocname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_DrCode,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#dcWsClcnDocCode").val(ui.item.val);
                $("#dcWsClcnDocKey").val(ui.item.id);
                $("#dcWsClcnDocname").val(ui.item.label);
            }

        })
    }

})
$(document).ready(function () {
    $('#dcWsClcnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#dcWsClcnToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#dcWsClcnFrmClndr").change(function () {
        var val = $("#dcWsClcnFrmClndr").val();
        $("#dcWsClcnFrm").val(val);
    });
    $('#dcWsClcnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#dcWsClcnToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#dcWsClcnToClndr").change(function () {
        var val = $("#dcWsClcnToClndr").val();
        $("#dcWsClcnTo").val(val);
    });

})
$("#docWiseClctnClose").on("click.docWiseClctnClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////////////////
$("#btnpndClctnRegister").on("click.btnpndClctnRegister", function () {
    event.preventDefault();
    var frmDate = $("#pndClctnRegFrm").val();
    var toDate = $("#pndClctnRegTo").val();
    var crCardWiseObj = {
        BrMst_Name: $('#pndClctnRegBrid option:selected').text(),
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/PndClctnReg",
        type: "POST",
        data: JSON.stringify(crCardWiseObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFPndClctnReg";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#pndClctnRegFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#pndClctnRegToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#pndClctnRegFrmClndr").change(function () {
        var val = $("#pndClctnRegFrmClndr").val();
        $("#pndClctnRegFrm").val(val);
    });
    $('#pndClctnRegFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#pndClctnRegToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#pndClctnRegToClndr").change(function () {
        var val = $("#pndClctnRegToClndr").val();
        $("#pndClctnRegTo").val(val);
    });

})
$("#pndClctnRegClose").on("click.pndClctnRegClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////
$("#pndRgstr2Print").on("click.pndRgstr2Print", function () {
    event.preventDefault();
    var Usr_Name = $('#pndRgstr2UsrKey option:selected').text();
    var Usr_EmpId = $('#pndRgstr2UsrKey option:selected').val();
    //$('#pndRgstr2Tble tbody tr:not(:last)').remove();
    var rowCount = $("#pndRgstr2Tble tbody tr").length;
    var frmDate = $("#pndRgstr2Frm").val();
    var x = frmDate.split("/");
    var dd = x[0];
    var mm = x[1];
    var yy = x[2];
    var fdate = mm + "/" + dd + "/" + yy;
    var toDate = $("#pndRgstr2To").val();
    var x1 = toDate.split("/");
    var dd1 = x1[0];
    var mm1 = x1[1];
    var yy1 = x1[2];
    var tdate = mm1 + "/" + dd1 + "/" + yy1;
    var pndReg2PrntObj = {
        ff: fdate,
        tt: tdate,
        Usr_Name: Usr_Name,
        Usr_EmpId: Usr_EmpId
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/PendngRegPrint",
        type: "POST",
        data: JSON.stringify(pndReg2PrntObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFPendngRegPrint";

            }
            else {


            }


        }

    })


})
$("#pndRgstr2Show").on("click.pndRgstr2Show", function () {
    event.preventDefault();
    var Usr_Name = $('#pndRgstr2UsrKey option:selected').text();
    var Usr_EmpId = $('#pndRgstr2UsrKey option:selected').val();
    $('#pndRgstr2Tble tbody tr:not(:last)').remove();
    var rowCount = $("#pndRgstr2Tble tbody tr").length;
    var frmDate = $("#pndRgstr2Frm").val();
    var x = frmDate.split("/");
    var dd = x[0];
    var mm = x[1];
    var yy = x[2];
    var fdate = mm + "/" + dd + "/" + yy;
    var toDate = $("#pndRgstr2To").val();
    var x1 = toDate.split("/");
    var dd1 = x1[0];
    var mm1 = x1[1];
    var yy1 = x1[2];
    var tdate = mm1 + "/" + dd1 + "/" + yy1;
    var pndReg2Obj = {
        ff: fdate,
        tt: tdate,
        Usr_Name: Usr_Name,
        Usr_EmpId: Usr_EmpId
    };
    //if (fdate > tdate)
    //{
    //    alert("Please Check from date");
    //}
    //else
    //{
    $.ajax({
        url: "/LISFY/pndReg2View",
        type: "POST",
        data: JSON.stringify(pndReg2Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {

                var currentrow = $("#pndRgstr2Tble").find('tbody tr');
                $.each(data.Record, function (index, pndReg2) {
                    if (index > 0) {
                        currentrow = $(currentrow).clone();
                        $("#pndRgstr2Tble tbody").append($(currentrow));
                        currentrow = $("#pndRgstr2Tble tbody tr:last");
                    }
                    //pndRegSlno pndRegDate pndRegUsrName pndRegLabNo pndRegPatName pndRegNetAmt pndRegRcvdAmt pndRegBlncAmt
                    //Inv_Date Inv_User Inv_No Inv_name Inv_Netamt balance ReceivedAmt Inv_RcvdAmt PendCollAmt
                    $(currentrow).find("#pndRegSlno").text((index + 1));
                    $(currentrow).find("#pndRegDate").text(pndReg2.Inv_Date);
                    $(currentrow).find("#pndRegUsrName").text(pndReg2.Inv_User);
                    $(currentrow).find("#pndRegLabNo").text(pndReg2.Inv_No);
                    $(currentrow).find("#pndRegPatName").text(pndReg2.Inv_name);
                    $(currentrow).find("#pndRegNetAmt").text(pndReg2.Inv_Netamt);
                    $(currentrow).find("#pndRegRcvdAmt").text(pndReg2.ReceivedAmt);
                    $(currentrow).find("#pndRegBlncAmt").text(pndReg2.balance);
                })

            }


        }

    })
    //}

})
$(document).ready(function () {
    $('#pndRgstr2FrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#pndRgstr2ToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#pndRgstr2FrmClndr").change(function () {
        var val = $("#pndRgstr2FrmClndr").val();
        $("#pndRgstr2Frm").val(val);
    });
    $('#pndRgstr2FrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#pndRgstr2ToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#pndRgstr2ToClndr").change(function () {
        var val = $("#pndRgstr2ToClndr").val();
        $("#pndRgstr2To").val(val);
    });

})
$("#pndRgstr2Close").on("click.pndRgstr2Close", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////////////////
$("#btnpndRgstrStmnt").on("click.btnpndRgstrStmnt", function () {
    event.preventDefault();
    var frmDate = $("#pndRgstrFrm").val();
    var toDate = $("#pndRgstrTo").val();
    var pndRegObj = {
        BrMst_Name: $('#pndRgstrBrid option:selected').text(),
        ff: frmDate,
        tt: toDate,
        User_Name: $('#pndRgstrUsrKey option:selected').text(),
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/PendngRegister",
        type: "POST",
        data: JSON.stringify(pndRegObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFPendngRegister";

            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#pndRgstrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#pndRgstrToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#pndRgstrFrmClndr").change(function () {
        var val = $("#pndRgstrFrmClndr").val();
        $("#pndRgstrFrm").val(val);
    });
    $('#pndRgstrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#pndRgstrToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#pndRgstrToClndr").change(function () {
        var val = $("#pndRgstrToClndr").val();
        $("#pndRgstrTo").val(val);
    });

})
$("#pndRgstrClose").on("click.pndRgstrClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////////////
$("#crLimitStmntPrint").on("click.crLimitStmntPrint", function () {
    var AhMst_pName = $("#crlmtCorpNames").val();
    var AhMst_Key = $('#crlmtCorpKey').val();
    $('#crLmtTable tbody tr:not(:last)').remove();
    var rowCount = $("#crLmtTable tbody tr").length;
    var frmDate = $("#crdtlmtstmntFrm").val();
    var x = frmDate.split("/");
    var dd = x[0];
    var mm = x[1];
    var yy = x[2];
    var fdate = mm + "/" + dd + "/" + yy;
    var toDate = $("#crdtlmtstmntTo").val();
    var x1 = toDate.split("/");
    var dd1 = x1[0];
    var mm1 = x1[1];
    var yy1 = x1[2];
    var tdate = mm1 + "/" + dd1 + "/" + yy1;
    var crLmtStmntPrntObj = {
        ff: fdate,
        tt: tdate,
        AhMst_pName: AhMst_pName,
        AhMst_Key: AhMst_Key
    };

    $.ajax({
        //url: "/LISFY/CorpInvoiceList",
        url: "/LISFY/CrdtLmtStmnt",
        type: "POST",
        data: JSON.stringify(crLmtStmntPrntObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFcorpAgntRpt";
                window.location = "/LISFY/PDFCrdtLmtStmnt";

            }
            else {
                alert("No Data Found!");
                window.location = "/LISFY/HomePage";
            }


        }

    })

})
$("#crLimitStmntView").on("click.crLimitStmntView", function () {
    event.preventDefault();

    var AhMst_pName = $("#crlmtCorpNames").val();
    var AhMst_Key = $('#crlmtCorpKey').val();
    $('#crLmtTable tbody tr:not(:last)').remove();
    var rowCount = $("#crLmtTable tbody tr").length;
    var frmDate = $("#crdtlmtstmntFrm").val();
    var x = frmDate.split("/");
    var dd = x[0];
    var mm = x[1];
    var yy = x[2];
    var fdate = mm + "/" + dd + "/" + yy;
    var toDate = $("#crdtlmtstmntTo").val();
    var x1 = toDate.split("/");
    var dd1 = x1[0];
    var mm1 = x1[1];
    var yy1 = x1[2];
    var tdate = mm1 + "/" + dd1 + "/" + yy1;
    var crLmtStmntObj = {
        ff: fdate,
        tt: tdate,
        AhMst_pName: AhMst_pName,
        AhMst_Key: AhMst_Key
    };
    //if (AhMst_Key == 0) {
    //    alert("Please Select Agent!");
    //}

    //else {
    $.ajax({
        //url: "/LISFY/CorpInvoiceList",
        url: "/LISFY/CrdtLmtStmntView",
        type: "POST",
        data: JSON.stringify(crLmtStmntObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                if (data.Record == "Credit Limit Not Found!") {
                    alert("Credit Limit Not Found!");
                }
                else {
                    var currentrow = $("#crLmtTable").find('tbody tr');
                    $.each(data.Record, function (index, crlmt) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#crLmtTable tbody").append($(currentrow));
                            currentrow = $("#crLmtTable tbody tr:last");
                        }
                        //crLmtSno crLmtLabNo crLmtDate crLmtName crLmtCorpName crLmtNetAmt crLmtRcvdAmt crLmtCurBal
                        //Inv_No Inv_name Inv_Date Inv_Netamt AhMst_pName Inv_CurRcvd Inv_CurBalAmt
                        $(currentrow).find("#crLmtSno").text((index + 1));
                        $(currentrow).find("#crLmtLabNo").text(crlmt.Inv_No);
                        $(currentrow).find("#crLmtDate").text(crlmt.Inv_Date);
                        $(currentrow).find("#crLmtName").text(crlmt.Inv_name);
                        $(currentrow).find("#crLmtCorpName").text(crlmt.AhMst_pName);
                        $(currentrow).find("#crLmtNetAmt").text(crlmt.Inv_Netamt);
                        $(currentrow).find("#crLmtRcvdAmt").text(crlmt.Inv_CurRcvd);
                        $(currentrow).find("#crLmtCurBal").text(crlmt.Inv_CurBalAmt);
                    })

                }

            }
            else {

            }
        }

    })
    //}
    //}

    //else {

    //}
})
$(document).ready(function () {
    $('#crdtlmtstmntFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#crdtlmtstmntToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#crdtlmtstmntFrmClndr").change(function () {
        var val = $("#crdtlmtstmntFrmClndr").val();
        $("#crdtlmtstmntFrm").val(val);
    });
    $('#crdtlmtstmntFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#crdtlmtstmntToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#crdtlmtstmntToClndr").change(function () {
        var val = $("#crdtlmtstmntToClndr").val();
        $("#crdtlmtstmntTo").val(val);
    });

})
$("#crLmtCorpKeyCheck").click(function () {
    if ($("#crLmtCorpKeyCheck").is(':checked') === true) {

        $('#crlmtCorpNames').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCorpCodes",
                    data: { term: $("#crlmtCorpNames").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_CRDays,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                //$("#crlmtCorpCRDays").val(ui.item.val);
                $("#crlmtCorpKey").val(ui.item.id);
                $("#crlmtCorpNames").val(ui.item.label);
            }

        })
    }
})
$("#crLmtCorpNameCheck").click(function () {
    if ($("#crLmtCorpNameCheck").is(':checked') === true) {

        $('#crlmtCorpNames').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCoprName",
                    data: { term: $("#crlmtCorpNames").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_CRDays,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                //$("#crlmtCorpCRDays").val(ui.item.val);
                $("#crlmtCorpKey").val(ui.item.id);
                $("#crlmtCorpNames").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#crLmtCorpNameCheck").is(':checked') === true) {

        $('#crlmtCorpNames').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCoprName",
                    data: { term: $("#crlmtCorpNames").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_CRDays,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                // $("#crlmtCorpCRDays").val(ui.item.val);
                $("#crlmtCorpKey").val(ui.item.id);
                $("#crlmtCorpNames").val(ui.item.label);
            }

        })
    }

})
$("#crLimitStmntClose").on("click.crLimitStmntClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////////////////////
$("#agntCorpStmntView").on("click.agntCorpStmntView", function () {
    event.preventDefault();
    var AgntKey = $("#agntKey").val();
    var AhMst_pName = $("#agentCorpName").val();
    var AhMst_Key = $('#agentCorpKey').val();
    $('#AgntCorpStmntTable tbody tr:not(:last)').remove();
    var rowCount = $("#AgntCorpStmntTable tbody tr").length;
    var frmDate = $("#agntCorpFrm").val();
    var x = frmDate.split("/");
    var dd = x[0];
    var mm = x[1];
    var yy = x[2];
    var fdate = mm + "/" + dd + "/" + yy;
    var toDate = $("#agntCorpTo").val();
    var x1 = toDate.split("/");
    var dd1 = x1[0];
    var mm1 = x1[1];
    var yy1 = x1[2];
    var tdate = mm1 + "/" + dd1 + "/" + yy1;
    var corpagntStmntObj = {
        ff: fdate,
        tt: tdate,
        AhMst_pName: AhMst_pName,
        AgntKey: AgntKey,
        AhMst_Key: AhMst_Key
    };
    if (AhMst_Key == 0) {
        alert("Please Select Agent!");
    }

    else {
        $.ajax({
            //url: "/LISFY/CorpInvoiceList",
            url: "/LISFY/agentCorpStmntView",
            type: "POST",
            data: JSON.stringify(corpagntStmntObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {

                    //AgntCorpStmntTable
                    //agntSno agntLabNo agntDate agntName agntCorpName agntNetAmt agntCurRcvdAmt agntCurBal

                    var currentrow = $("#AgntCorpStmntTable").find('tbody tr');
                    //var currentrow = $("#tstAddTable").find('tbody tr');
                    $.each(data.Record, function (index, agntCorStmnt) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#AgntCorpStmntTable tbody").append($(currentrow));
                            currentrow = $("#AgntCorpStmntTable tbody tr:last");
                        }
                        //var mdate = corInv.Inv_Date;

                        //Inv_No Inv_name Inv_Date Inv_Netamt AhMst_pName Inv_CurRcvd Inv_CurBalAmt
                        $(currentrow).find("#agntSno").text((index + 1));
                        $(currentrow).find("#agntLabNo").text(agntCorStmnt.Inv_No);
                        $(currentrow).find("#agntDate").text(agntCorStmnt.Inv_Date);
                        $(currentrow).find("#agntName").text(agntCorStmnt.Inv_name);
                        $(currentrow).find("#agntCorpName").text(agntCorStmnt.AhMst_pName);
                        $(currentrow).find("#agntNetAmt").text(agntCorStmnt.Inv_Netamt);
                        $(currentrow).find("#agntCurRcvdAmt").text(agntCorStmnt.Inv_CurRcvd);
                        $(currentrow).find("#agntCurBal").text(agntCorStmnt.Inv_CurBalAmt);
                    })

                }
                else {

                }
            }

        })
    }
    //}

    //else {

    //}
})
$("#agntCorpStmntPrint").on("click.agntCorpStmntPrint", function () {
    var AgntKey = $("#agntKey").val();

    var AhMst_pName = $("#agentCorpName").val();
    var AhMst_Key = $('#agentCorpKey').val();
    var frmDate = $('#agntCorpFrm').val();
    var toDate = $('#agntCorpTo').val();

    var agntCorpObj = {
        AhMst_pName: AhMst_pName,
        AgntKey: AgntKey,

        ff: frmDate,
        tt: toDate,
        AhMst_Key: AhMst_Key
    };
    if (AhMst_Key == 0) {
        alert("Please Select Agent!");
    }
    else {
        $.ajax({
            //url: "/LISFY/corpAgntRpt",
            url: "/LISFY/CorpAgntStmnt",
            type: "POST",
            data: JSON.stringify(agntCorpObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //window.location = "/LISFY/PDFcorpAgntRpt";
                    window.location = "/LISFY/PDFCorpAgntStmnt";

                }
                else {


                }


            }

        })
    }
})
$("#newagntCorpStmnt").on("click.newagntCorpStmnt", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    //$("#CorpBillDetPayMode").val($("#CorpBillDetPayMode option:first").val());
    $('#agntname').val("");
    $('#agntKey').val("");
    $('#agentCorpName').val("");
    $('#agentCorpKey').val("");
    // $('#BillDetCorpPhno').val("");

    $('#agntCorpFrm').val(today);
    $('#agntCorpTo').val(today);
    $('#AgntCorpStmntTable tbody tr:not(:last)').remove();
    var currentrow = $("#AgntCorpStmntTable").find('tbody tr');
    $(currentrow).find("#agntSno").text("");
    $(currentrow).find("#agntLabNo").text("");
    $(currentrow).find("#agntDate").text("");
    $(currentrow).find("#agntName").text("");
    $(currentrow).find("#agntCorpName").text("");
    $(currentrow).find("#agntNetAmt").text("");
    $(currentrow).find("#agntCurRcvdAmt").text("");
    $(currentrow).find("#agntCurBal").text("");

})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#agntnameCheck").is(':checked') === true) {

        $('#agntname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAgentWithName",
                    data: { term: $("#agntname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#agntKey").val(ui.item.id);
                $("#agntname").val(ui.item.label);
            }

        })
    }

})
$("#agntnameCheck").click(function () {
    if ($("#agntnameCheck").is(':checked') === true) {

        $('#agntname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAgentWithName",
                    data: { term: $("#agntname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#agntKey").val(ui.item.id);
                $("#agntname").val(ui.item.label);
            }

        })
    }
})
$("#agntKeyCheck").click(function () {
    if ($("#agntKeyCheck").is(':checked') === true) {

        $('#agntname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAgentWithKey",
                    data: { term: $("#agntname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#agntKey").val(ui.item.id);
                $("#agntname").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#agentCorpNameCheck").is(':checked') === true) {

        $('#agentCorpName').autocomplete({
            source: function (request, response) {
                var AgntKey = $("#agntKey").val();
                var crpWithagntName = {
                    AhMst_pName: $("#agentCorpName").val(),
                    AgntKey: AgntKey
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpWithAgntName",
                    data: JSON.stringify(crpWithagntName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#agentCorpKey").val(ui.item.id);
                $("#agentCorpName").val(ui.item.label);
            }

        })
    }

})
$("#agentCorpNameCheck").click(function () {
    if ($("#agentCorpNameCheck").is(':checked') === true) {

        $('#agentCorpName').autocomplete({
            source: function (request, response) {
                var AgntKey = $("#agntKey").val();
                var crpWithagntName = {
                    AhMst_pName: $("#agentCorpName").val(),
                    AgntKey: AgntKey
                };
                // data: { term: $("#agentCorpName").val() },
                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCorpWithAgntName",
                    data: JSON.stringify(crpWithagntName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#agentCorpKey").val(ui.item.id);
                $("#agentCorpName").val(ui.item.label);
            }

        })
    }
})
$("#agntCorpKeyCheck").click(function () {
    if ($("#agntCorpKeyCheck").is(':checked') === true) {

        $('#agentCorpName').autocomplete({
            source: function (request, response) {
                var AgntKey = $("#agntKey").val();
                var crpWithagntKey = {
                    AhMst_Key: $("#agentCorpKey").val(),
                    AgntKey: AgntKey
                };
                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCorpWithAgntKey",
                    data: JSON.stringify(crpWithagntKey),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#agentCorpKey").val(ui.item.id);
                $("#agentCorpName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    $('#agntCorpFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#agntCorpToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#agntCorpFrmClndr").change(function () {
        var val = $("#agntCorpFrmClndr").val();
        $("#agntCorpFrm").val(val);
    });
    $('#agntCorpFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#agntCorpToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#agntCorpToClndr").change(function () {
        var val = $("#agntCorpToClndr").val();
        $("#agntCorpTo").val(val);
    });

})
$("#agntCorpStmntClose").on("click.agntCorpStmntClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////
$("#btnCorpBillDet").on("click.btnCorpBillDet", function () {
    var AreaKey = $("#CorpBillDetAreaCode").val();
    var PayType = $("#CorpBillDetPayMode option:selected").text();
    var AhMst_pName = $("#BillDetCorpName").val();
    var AhMst_Key = $('#BillDetCorpKey').val();
    var frmDate = $('#CorpBillDetFrm').val();
    var toDate = $('#CorpBillDetTo').val();
    var billChked = 0;
    if ($("#corpBillFormatChk").is(':checked') === true) {
        billChked = 1;
    }
    var corpBillDetRpts = {
        AhMst_pName: AhMst_pName,
        AreaKey: AreaKey,
        PayType: PayType,
        ff: frmDate,
        tt: toDate,
        AhMst_Key: AhMst_Key,
        billDetCheck: billChked
    };

    $.ajax({
        //url: "/LISFY/corpAgntRpt",
        url: "/LISFY/CorpBillDet",
        type: "POST",
        data: JSON.stringify(corpBillDetRpts),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFcorpAgntRpt";
                window.location = "/LISFY/PDFCorpBillDet";

            }
            else {


            }


        }

    })
})
$("#newCorpBillDet").on("click.newCorpBillDet", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#CorpBillDetPayMode").val($("#CorpBillDetPayMode option:first").val());
    $('#CorpBillDetAreaName').val("");
    $('#CorpBillDetAreaCode').val("");
    $('#BillDetCorpName').val("");
    $('#BillDetCorpKey').val("");
    $('#BillDetCorpPhno').val("");
    $('#CorpBillDetFrm').val(today);
    $('#CorpBillDetTo').val(today);
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#BillDetCorpNameChk").is(':checked') === true) {

        $('#BillDetCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#CorpBillDetAreaCode").val();
                var PayType = $("#CorpBillDetPayMode option:selected").text();
                var AhMst_pName = $("#CorpBillDetMode").val();
                var crpWithName = {
                    AhMst_pName: $("#BillDetCorpName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#BillDetCorpPhno").val(ui.item.val);
                $("#BillDetCorpKey").val(ui.item.id);
                $("#BillDetCorpName").val(ui.item.label);
            }

        })
    }


})
$("#BillDetCorpNameChk").click(function () {
    if ($("#BillDetCorpNameChk").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#BillDetCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#CorpBillDetAreaCode").val();
                var PayType = $("#CorpBillDetPayMode option:selected").text();
                var AhMst_pName = $("#BillDetCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#BillDetCorpName").val(),
                    AreaKey: AreaKey
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#BillDetCorpPhno").val(ui.item.val);
                $("#BillDetCorpKey").val(ui.item.id);
                $("#BillDetCorpName").val(ui.item.label);
            }
        })
    }
})
$("#BillDetCorpPhnoChk").click(function () {
    if ($("#BillDetCorpPhnoChk").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#BillDetCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#CorpBillDetAreaCode").val();
                var PayType = $("#CorpBillDetPayMode option:selected").text();
                var crpWithPhNo = {
                    AhMst_mobile: $("#BillDetCorpPhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#BillDetCorpName").val(ui.item.val);
                $("#BillDetCorpKey").val(ui.item.id);
                $("#BillDetCorpPhno").val(ui.item.label);
            }

        })
    }
})
$("#BillDetCorpCodeChk").click(function () {
    if ($("#BillDetCorpCodeChk").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#BillDetCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#CorpBillDetAreaCode").val();
                var PayType = $("#CorpBillDetPayMode option:selected").text();
                var crpWithCode = {
                    AhMst_Key: $("#BillDetCorpKey").val(),
                    AreaKey: AreaKey
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#BillDetCorpName").val(ui.item.val);
                $("#BillDetCorpKey").val(ui.item.id);
                $("#BillDetCorpPhno").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpBillAreaNameChk").is(':checked') === true) {

        $('#CorpBillDetAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#CorpBillDetAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#CorpBillDetAreaCode").val(ui.item.id);
                $("#CorpBillDetAreaName").val(ui.item.label);
            }

        })
    }

})
$("#corpBillAreaNameChk").click(function () {
    if ($("#corpBillAreaNameChk").is(':checked') === true) {

        $('#CorpBillDetAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#CorpBillDetAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#CorpBillDetAreaCode").val(ui.item.id);
                $("#CorpBillDetAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpBillAreaCodeChk").click(function () {
    if ($("#corpBillAreaCodeChk").is(':checked') === true) {

        $('#CorpBillDetAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#CorpBillDetAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#CorpBillDetAreaCode").val(ui.item.id);
                $("#CorpBillDetAreaName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    $('#CorpBillDetFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#CorpBillDetToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#CorpBillDetFrmClndr").change(function () {
        var val = $("#CorpBillDetFrmClndr").val();
        $("#CorpBillDetFrm").val(val);
    });
    $('#CorpBillDetFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#CorpBillDetToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#CorpBillDetToClndr").change(function () {
        var val = $("#CorpBillDetToClndr").val();
        $("#CorpBillDetTo").val(val);
    });

})
$("#CorpBillDetClose").on("click.CorpBillDetClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////
$("#newCorpTstPrfmnceArea").on("click.newCorpTstPrfmnceArea", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#CorpTstAreaPayMode").val($("#CorpTstAreaPayMode option:first").val());
    $('#TstPrfmncCorpTstName').val("");
    $('#TstPrfmncCorpTstKey').val("");
    $('#CorpTstAreaName').val("");
    $('#CorpTstAreaCode').val("");
    $('#TstPrfmncCorpName').val("");
    $('#TstPrfmncCorpKey').val("");
    $('#TstPrfmncCorpPhno').val("");
    $('#CorpTstAreaFrm').val(today);
    $('#CorpTstAreaTo').val(today);
})
$("#btnCorpTstArea").on("click.btnCorpTstArea", function () {
    var AreaKey = $("#CorpTstAreaCode").val();
    var AhMst_pName = $("#TstPrfmncCorpName").val();
    var AhMst_Key = $('#TstPrfmncCorpKey').val();
    var frmDate = $('#CorpTstAreaFrm').val();
    var toDate = $('#CorpTstAreaTo').val();
    var PayType = $("#CorpTstAreaPayMode option:selected").text();
    var TestKey = $("#TstPrfmncCorpTstKey").val();
    var TestName = $("#TstPrfmncCorpTstName").val();

    var CorpTstAreaWiseObj = {
        AhMst_pName: AhMst_pName,
        AhMst_Key: AhMst_Key,
        AreaKey: AreaKey,
        ff: frmDate,
        tt: toDate,
        PayType: PayType,
        TestKey: TestKey,
        TestName: TestName
    };

    $.ajax({
        //url: "/LISFY/CorpDctrStmnt",
        url: "/LISFY/CorpTstPrfmncAreaWise",
        type: "POST",
        data: JSON.stringify(CorpTstAreaWiseObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCorpDctrStmnt";
                window.location = "/LISFY/PDFCorpTstPrfmncAreaWise";

            }
            else {


            }


        }

    })
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#TstPrfmncCorpTstNameChk").is(':checked') === true) {

        $('#TstPrfmncCorpTstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchTstWithName",
                    data: { term: $("#TstPrfmncCorpTstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#TstPrfmncCorpTstKey").val(ui.item.id);
                $("#TstPrfmncCorpTstName").val(ui.item.label);
            }

        })
    }

})
$("#TstPrfmncCorpTstNameChk").click(function () {
    if ($("#TstPrfmncCorpTstNameChk").is(':checked') === true) {

        $('#TstPrfmncCorpTstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchTstWithName",
                    data: { term: $("#TstPrfmncCorpTstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#TstPrfmncCorpTstKey").val(ui.item.id);
                $("#TstPrfmncCorpTstName").val(ui.item.label);
            }

        })
    }
})
$("#TstPrfmncCorpTstCodeChk").click(function () {
    if ($("#TstPrfmncCorpTstCodeChk").is(':checked') === true) {

        $('#TstPrfmncCorpTstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchTstWithKey",
                    data: { term: $("#TstPrfmncCorpTstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#TstPrfmncCorpTstKey").val(ui.item.id);
                $("#TstPrfmncCorpTstName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#TstPrfmncCorpNameCheck").is(':checked') === true) {

        $('#TstPrfmncCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#CorpTstAreaCode").val();
                var PayType = $("#CorpTstAreaPayMode option:selected").text();
                var AhMst_pName = $("#TstPrfmncCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#TstPrfmncCorpName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#TstPrfmncCorpPhno").val(ui.item.val);
                $("#TstPrfmncCorpKey").val(ui.item.id);
                $("#TstPrfmncCorpName").val(ui.item.label);
            }

        })
    }


})
$("#TstPrfmncCorpNameCheck").click(function () {
    if ($("#TstPrfmncCorpNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#TstPrfmncCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#CorpTstAreaCode").val();
                var PayType = $("#CorpTstAreaPayMode option:selected").text();
                var AhMst_pName = $("#TstPrfmncCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#TstPrfmncCorpName").val(),
                    AreaKey: AreaKey
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#TstPrfmncCorpPhno").val(ui.item.val);
                $("#TstPrfmncCorpKey").val(ui.item.id);
                $("#TstPrfmncCorpName").val(ui.item.label);
            }
        })
    }
})
$("#TstPrfmncCorpPhnoCheck").click(function () {
    if ($("#TstPrfmncCorpPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#TstPrfmncCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#CorpTstAreaCode").val();
                var PayType = $("#CorpTstAreaPayMode option:selected").text();
                var crpWithPhNo = {
                    AhMst_mobile: $("#TstPrfmncCorpPhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#TstPrfmncCorpName").val(ui.item.val);
                $("#TstPrfmncCorpKey").val(ui.item.id);
                $("#TstPrfmncCorpPhno").val(ui.item.label);
            }

        })
    }
})
$("#TstPrfmncCorpCodeCheck").click(function () {
    if ($("#TstPrfmncCorpCodeCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#TstPrfmncCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#CorpTstAreaCode").val();
                var PayType = $("#CorpTstAreaPayMode option:selected").text();
                var crpWithCode = {
                    AhMst_Key: $("#TstPrfmncCorpKey").val(),
                    AreaKey: AreaKey
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#TstPrfmncCorpName").val(ui.item.val);
                $("#TstPrfmncCorpKey").val(ui.item.id);
                $("#TstPrfmncCorpPhno").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#CorpTstAreaNameChk").is(':checked') === true) {

        $('#CorpTstAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#CorpTstAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#CorpTstAreaCode").val(ui.item.id);
                $("#CorpTstAreaName").val(ui.item.label);
            }

        })
    }

})
$("#CorpTstAreaNameChk").click(function () {
    if ($("#CorpTstAreaNameChk").is(':checked') === true) {

        $('#CorpTstAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#CorpTstAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#CorpTstAreaCode").val(ui.item.id);
                $("#CorpTstAreaName").val(ui.item.label);
            }

        })
    }
})
$("#CorpTstAreaCodeChk").click(function () {
    if ($("#CorpTstAreaCodeChk").is(':checked') === true) {

        $('#CorpTstAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#CorpTstAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#CorpTstAreaCode").val(ui.item.id);
                $("#CorpTstAreaName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    $('#CorpTstAreaFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#CorpTstAreaToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#CorpTstAreaFrmClndr").change(function () {
        var val = $("#CorpTstAreaFrmClndr").val();
        $("#CorpTstAreaFrm").val(val);
    });
    $('#CorpTstAreaFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#CorpTstAreaToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#CorpTstAreaToClndr").change(function () {
        var val = $("#CorpTstAreaToClndr").val();
        $("#CorpTstAreaTo").val(val);
    });

})
$("#CorpTstAreaWiseClose").on("click.CorpTstAreaWiseClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////
$("#btncorpDptStmnt").on("click.btncorpDptStmnt", function () {
    var AreaKey = $("#corpDptAreaCode").val();
    var AhMst_pName = $("#DptCorpName").val();
    var AhMst_Key = $('#DptCorpKey').val();
    var frmDate = $('#corpDptFrm').val();
    var toDate = $('#corpDptTo').val();
    var dptClctnObj = [];
    var dptClctnKeyObj = [];
    $.each($("input[name='crpDptChldChk']:checked"), function () {
        var DptName = $(this).closest('tr').find('#corpDptName').text();
        var trimBrnch = $.trim(DptName);
        dptClctnObj.push(trimBrnch);
        var Dptkey = $(this).closest('tr').find('#crpDptKey').text();
        var trimId = $.trim(Dptkey);
        dptClctnKeyObj.push(trimId);
    });

    var CorpDptStmntObj = {
        AhMst_pName: AhMst_pName,
        AhMst_Key: AhMst_Key,
        AreaKey: AreaKey,
        ff: frmDate,
        tt: toDate,
        dptClctnObj: dptClctnObj,
        dptClctnKeyObj: dptClctnKeyObj
    };

    $.ajax({
        //url: "/LISFY/CorpDctrStmnt",
        url: "/LISFY/CorpDptStmnt",
        type: "POST",
        data: JSON.stringify(CorpDptStmntObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCorpDctrStmnt";
                window.location = "/LISFY/PDFCorpDptStmnt";

            }
            else {


            }


        }

    })
})
$("#newcorpDptStmnt").on("click.newcorpDptStmnt", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $('#corpDptAreaName').val("");
    $('#corpDptAreaCode').val("");
    $('#DptCorpName').val("");
    $('#DptCorpKey').val("");
    $('#DptCorpPhno').val("");
    $('#corpDptFrm').val(today);
    $('#corpDptTo').val(today);
    if ($('#crpDptPrntCheck').prop('checked') == true) {
        $('#crpDptPrntCheck').prop('checked', false);
        $('.crpDptChldChk').prop('checked', false);
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#DptCorpNameCheck").is(':checked') === true) {

        $('#DptCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpDptAreaCode").val();
                //var PayType = $("#corpAgntRptMode option:selected").text();
                var AhMst_pName = $("#DptCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#DptCorpName").val(),
                    AreaKey: AreaKey
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#DptCorpPhno").val(ui.item.val);
                $("#DptCorpKey").val(ui.item.id);
                $("#DptCorpName").val(ui.item.label);
            }

        })
    }


})
$("#DptCorpNameCheck").click(function () {
    if ($("#DptCorpNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#DptCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpDptAreaCode").val();
                //var PayType = $("#corpAgntRptMode option:selected").text();
                var AhMst_pName = $("#DptCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#DptCorpName").val(),
                    AreaKey: AreaKey
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#DptCorpPhno").val(ui.item.val);
                $("#DptCorpKey").val(ui.item.id);
                $("#DptCorpName").val(ui.item.label);
            }
        })
    }
})
$("#DptCorpPhnoCheck").click(function () {
    if ($("#DptCorpPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#DptCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpDptAreaCode").val();
                var crpWithPhNo = {
                    AhMst_mobile: $("#DptCorpPhno").val(),
                    AreaKey: AreaKey
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchDptCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#DptCorpName").val(ui.item.val);
                $("#DptCorpKey").val(ui.item.id);
                $("#DptCorpPhno").val(ui.item.label);
            }

        })
    }
})
$("#DptCorpCodeCheck").click(function () {
    if ($("#DptCorpCodeCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#DptCorpName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpDptAreaCode").val();
                var crpWithCode = {
                    AhMst_Key: $("#DptCorpKey").val(),
                    AreaKey: AreaKey
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/ SearchDptCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#DptCorpName").val(ui.item.val);
                $("#DptCorpKey").val(ui.item.id);
                $("#DptCorpPhno").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpDptAreaNameChk").is(':checked') === true) {

        $('#corpDptAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpDptAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#corpDptAreaCode").val(ui.item.id);
                $("#corpDptAreaName").val(ui.item.label);
            }

        })
    }

})
$("#corpDptAreaNameChk").click(function () {
    if ($("#corpDptAreaNameChk").is(':checked') === true) {

        $('#corpDptAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpDptAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpDptAreaCode").val(ui.item.id);
                $("#corpDptAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpDptAreaCodeChk").click(function () {
    if ($("#corpDptAreaCodeChk").is(':checked') === true) {

        $('#corpDptAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#corpDptAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpDptAreaCode").val(ui.item.id);
                $("#corpDptAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpDepStmntsClose").on("click.corpDepStmntsClose", function () {
    window.location = "HomePage";
})
$(document).ready(function () {
    $('#corpDptFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpDptToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpDptFrmClndr").change(function () {
        var val = $("#corpDptFrmClndr").val();
        $("#corpDptFrm").val(val);
    });
    $('#corpDptFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpDptToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpDptToClndr").change(function () {
        var val = $("#corpDptToClndr").val();
        $("#corpDptTo").val(val);
    });

})
$(document).ready(function () {
    $("#crpDptPrntCheck").click(function () {
        $(".crpDptChldChk").prop("checked", this.checked);
    });
    //parentcheck brnchsmryChk
    $('.crpDptChldChk').click(function () {
        if ($('.crpDptChldChk:checked').length == $('.crpDptChldChk').length) {
            $('#crpDptPrntCheck').prop('checked', true);
        } else {
            $('#crpDptPrntCheck').prop('checked', false);
        }
    });
});
/////////////////////////////////////
$(document).ready(function () {
    $('#corpAgntRptFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpAgntRptToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpAgntRptFrmClndr").change(function () {
        var val = $("#corpAgntRptFrmClndr").val();
        $("#corpAgntRptFrm").val(val);
    });
    $('#corpAgntRptFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpAgntRptToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpAgntRptToClndr").change(function () {
        var val = $("#corpAgntRptToClndr").val();
        $("#corpAgntRptTo").val(val);
    });

})
$("#btncorpAgntRpt").on("click.btncorpDctrStmnt", function () {
    var AreaKey = $("#corpAgntAreaCode").val();
    var PayType = $("#corpAgntRptMode option:selected").text();
    var AhMst_pName = $("#agntCorpName").val();
    var AhMst_Key = $('#agntCorpKey').val();
    var frmDate = $('#corpAgntRptFrm').val();
    var toDate = $('#corpAgntRptTo').val();
    var corpAgntRpts = {
        AhMst_pName: AhMst_pName,
        AreaKey: AreaKey,
        PayType: PayType,
        ff: frmDate,
        tt: toDate,
        AhMst_Key: AhMst_Key
    };

    $.ajax({
        //url: "/LISFY/CorpDctrStmnt",
        url: "/LISFY/corpAgntRpt",
        type: "POST",
        data: JSON.stringify(corpAgntRpts),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCorpDctrStmnt";
                window.location = "/LISFY/PDFcorpAgntRpt";

            }
            else {


            }


        }

    })
})
$("#newcorpAgntRpt").on("click.newcorpAgntRpt", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#corpAgntRptMode").val($("#corpAgntRptMode option:first").val());
    $('#corpAgntAreaName').val("");
    $('#corpAgntAreaCode').val("");
    $('#agntCorpName').val("");
    $('#agntCorpKey').val("");
    $('#agntCorpPhno').val("");
    $('#corpAgntRptFrm').val(today);
    $('#corpAgntRptTo').val(today);
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#agntCorpNameCheck").is(':checked') === true) {

        $('#agntCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpAgntAreaCode").val();
                var PayType = $("#corpAgntRptMode option:selected").text();
                var AhMst_pName = $("#agntCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#agntCorpName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#agntCorpPhno").val(ui.item.val);
                $("#agntCorpKey").val(ui.item.id);
                $("#agntCorpName").val(ui.item.label);
            }

        })
    }


})
$("#agntCorpNameCheck").click(function () {
    if ($("#agntCorpNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#agntCorpName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpAgntAreaCode").val();
                var PayType = $("#corpAgntRptMode option:selected").text();
                var AhMst_pName = $("#agntCorpName").val();
                var crpWithName = {
                    AhMst_pName: $("#agntCorpName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#agntCorpPhno").val(ui.item.val);
                $("#agntCorpKey").val(ui.item.id);
                $("#agntCorpName").val(ui.item.label);
            }
        })
    }
})
$("#agntCorpPhnoCheck").click(function () {
    if ($("#agntCorpPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#agntCorpName').autocomplete({
            source: function (request, response) {
                var PayType = $("#corpAgntRptMode option:selected").text();
                var AreaKey = $("#corpAgntAreaCode").val();
                var crpWithPhNo = {
                    AhMst_mobile: $("#agntCorpPhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#agntCorpName").val(ui.item.val);
                $("#agntCorpKey").val(ui.item.id);
                $("#agntCorpPhno").val(ui.item.label);
            }

        })
    }
})
$("#agntCorpCodeCheck").click(function () {
    if ($("#agntCorpCodeCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#agntCorpName').autocomplete({
            source: function (request, response) {
                var PayType = $("#corpAgntRptMode option:selected").text();
                var AreaKey = $("#corpAgntAreaCode").val();
                var crpWithCode = {
                    AhMst_Key: $("#agntCorpKey").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/ SearchCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#agntCorpName").val(ui.item.val);
                $("#agntCorpKey").val(ui.item.id);
                $("#agntCorpPhno").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpAgntAreaNameChk").is(':checked') === true) {

        $('#corpAgntAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpAgntAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#corpAgntAreaCode").val(ui.item.id);
                $("#corpAgntAreaName").val(ui.item.label);
            }

        })
    }

})
$("#corpAgntAreaNameChk").click(function () {
    if ($("#corpAgntAreaNameChk").is(':checked') === true) {

        $('#corpAgntAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpAgntAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpAgntAreaCode").val(ui.item.id);
                $("#corpAgntAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpAgntAreaCodeChk").click(function () {
    if ($("#corpAgntAreaCodeChk").is(':checked') === true) {

        $('#corpAgntAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#corpAgntAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpDctrAreaCode").val(ui.item.id);
                $("#corpDctrAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpAgntRptClose").on("click.corpAgntRptClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////
$(document).ready(function () {
    $('#corpDctrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpDctrToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpDctrFrmClndr").change(function () {
        var val = $("#corpDctrFrmClndr").val();
        $("#corpDctrFrm").val(val);
    });
    $('#corpDctrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpDctrToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpDctrToClndr").change(function () {
        var val = $("#corpDctrToClndr").val();
        $("#corpDctrTo").val(val);
    });

})
$("#btncorpDctrStmnt").on("click.btncorpDctrStmnt", function () {
    var AreaKey = $("#corpDctrAreaCode").val();
    var PayType = $("#corpDctrPayMode option:selected").text();
    var AhMst_pName = $("#corpDctrName").val();
    var AhMst_Key = $('#corpDctrKey').val();
    var frmDate = $('#corpDctrFrm').val();
    var toDate = $('#corpDctrTo').val();
    var dctrKey = $('#crpDctrKey').val();
    var DctrName = $('#crpDctrName').val();

    var CorpDctrStmntObj = {

        AhMst_pName: AhMst_pName,
        AreaKey: AreaKey,
        PayType: PayType,
        ff: frmDate,
        tt: toDate,
        AhMst_Key: AhMst_Key,
        dctrKey: dctrKey,
        DctrName: DctrName
    };
    $.ajax({
        //url: "/LISFY/CorpMnthDetStmnt",
        url: "/LISFY/CorpDctrStmnt",
        type: "POST",
        data: JSON.stringify(CorpDctrStmntObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCorpMnthDetStmnt";
                window.location = "/LISFY/PDFCorpDctrStmnt";

            }
            else {


            }


        }

    })
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpDctrNameChk").is(':checked') === true) {

        $('#crpDctrName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchDctrName",
                    data: { term: $("#crpDctrName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#crpDctrKey").val(ui.item.id);
                $("#crpDctrName").val(ui.item.label);
            }

        })
    }

})
$("#corpDctrNameChk").click(function () {
    if ($("#corpDctrNameChk").is(':checked') === true) {

        $('#crpDctrName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchDctrName",
                    data: { term: $("#corpDctrAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#crpDctrKey").val(ui.item.id);
                $("#crpDctrName").val(ui.item.label);
            }

        })
    }
})
$("#corpDctrCodeChk").click(function () {
    if ($("#corpDctrCodeChk").is(':checked') === true) {

        $('#crpDctrName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchDctrCode",
                    data: { term: $("#corpDctrAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#crpDctrKey").val(ui.item.id);
                $("#crpDctrName").val(ui.item.label);
            }

        })
    }
})
$("#newcorpDctrStmnt").on("click.newcorpDctrStmnt", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#corpDctrPayMode").val($("#corpDctrPayMode option:first").val());
    $('#crpDctrName').val("");
    $('#crpDctrKey').val("");
    $('#corpDctrAreaName').val("");
    $('#corpDctrAreaCode').val("");
    $('#corpDctrName').val("");
    $('#corpDctrKey').val("");
    $('#corpDctrPhno').val("");
    $('#corpDctrFrm').val(today);
    $('#corpDctrTo').val(today);
})
//$(document).ready(function () {
//    //$("#usrCheck").click(function () {
//    if ($("#corpDctrNameCheck").is(':checked') === true) {

//        $('#corpDctrName').autocomplete({

//            source: function (request, response) {
//                var AreaKey = $("#corpDctrAreaCode").val();
//                var PayType = $("#corpDctrPayMode option:selected").text();
//                var AhMst_pName = $("#corpDctrName").val();
//                var crpWithName = {
//                    AhMst_pName: $("#corpDctrName").val(),
//                    AreaKey: AreaKey,
//                    PayType: PayType
//                };
//                $.ajax({
//                    type: 'POST',
//                    url: "/LISFY/SearchCorpName",
//                    data: JSON.stringify(crpWithName),
//                    //    {
//                    //    AhMst_pName: $("#corporateName").val(),
//                    //    PayType: $("#payType option:selected").text(),
//                    //    AreaKey: $("#areaCode").val()
//                    //},
//                    //data: JSON.stringify(crpWithName),
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function (data) {
//                        console.log(data);
//                        if (data.Result === "OK") {


//                            response($.map(data.Records, function (Record) {
//                                return {
//                                    label: Record.AhMst_pName,
//                                    val: Record.AhMst_mobile,
//                                    id: Record.AhMst_Key

//                                }

//                            }))


//                        }


//                    }
//                });

//            },

//            minLength: 1,
//            select: function (event, ui) {

//                $("#corpDctrPhno").val(ui.item.val);
//                $("#corpDctrKey").val(ui.item.id);
//                $("#corpDctrName").val(ui.item.label);
//            }

//        })
//    }


//})
$("#corpDctrNameCheck").click(function () {
    if ($("#corpDctrNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpDctrName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpDctrAreaCode").val();
                var PayType = $("#corpDctrPayMode option:selected").text();
                var AhMst_pName = $("#corpDctrName").val();
                var crpWithName = {
                    AhMst_pName: $("#corpDctrName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#corpDctrPhno").val(ui.item.val);
                $("#corpDctrKey").val(ui.item.id);
                $("#corpDctrName").val(ui.item.label);
            }
        })
    }
})
$("#corpDctrPhnoCheck").click(function () {
    if ($("#corpDctrPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpDctrName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpDctrAreaCode").val();
                var PayType = $("#corpDctrPayMode option:selected").text();
                var crpWithPhNo = {
                    AhMst_mobile: $("#corpDctrPhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpDctrName").val(ui.item.val);
                $("#corpDctrKey").val(ui.item.id);
                $("#corpDctrPhno").val(ui.item.label);
            }

        })
    }
})
$("#corpDctrCodeCheck").click(function () {
    if ($("#corpDctrCodeCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpDctrName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpDctrAreaCode").val();
                var PayType = $("#corpDctrPayMode option:selected").text();
                var crpWithCode = {
                    AhMst_Key: $("#corpDctrKey").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/ SearchCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpDctrName").val(ui.item.val);
                $("#corpDctrKey").val(ui.item.id);
                $("#corpDctrPhno").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpDctrAreaNameChk").is(':checked') === true) {

        $('#corpDctrAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpDctrAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#corpDctrAreaCode").val(ui.item.id);
                $("#corpDctrAreaName").val(ui.item.label);
            }

        })
    }

})
$("#corpDctrAreaNameChk").click(function () {
    if ($("#corpDctrAreaNameChk").is(':checked') === true) {

        $('#corpDctrAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpDctrAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpDctrAreaCode").val(ui.item.id);
                $("#corpDctrAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpDctrAreaCodeChk").click(function () {
    if ($("#corpDctrAreaCodeChk").is(':checked') === true) {

        $('#corpDctrAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#corpDctrAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpDctrAreaCode").val(ui.item.id);
                $("#corpDctrAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpDctrClose").on("click.corpDctrClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////////
$("#btncorpMnDetStmnt").on("click.btncorpMnDetStmnt", function () {
    var AreaKey = $("#corpMnDetAreaCode").val();
    var PayType = $("#corpMnDetMode option:selected").text();
    var AhMst_pName = $("#corpMnDetName").val();
    var AhMst_Key = $('#corpMnDetKey').val();
    var frmDate = $('#corpMnDetFrm').val();
    var toDate = $('#corpMnDetTo').val();
    if (AhMst_Key == 0) {
        alert("Please Select Corporate!");
    }
    else {


        var CorpMnthDetStmntObj = {

            AhMst_pName: AhMst_pName,
            AreaKey: AreaKey,
            PayType: PayType,
            ff: frmDate,
            tt: toDate,
            AhMst_Key: AhMst_Key

        };
        $.ajax({
            //url: "/LISFY/CorpBillMnthlySmry",
            url: "/LISFY/CorpMnthDetStmnt",
            type: "POST",
            data: JSON.stringify(CorpMnthDetStmntObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //window.location = "/LISFY/PDFCorpBillMnthlySmry";
                    window.location = "/LISFY/PDFCorpMnthDetStmnt";

                }
                else {


                }


            }

        })
    }


})
$("#newcorpMnDetStmnt").on("click.newcorpMnDetStmnt", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $("#corpMnDetMode").val($("#corpMnDetMode option:first").val());
    $('#corpMnDetAreaName').val("");
    $('#corpMnDetAreaCode').val("");
    $('#corpMnDetName').val("");
    $('#corpMnDetKey').val("");
    $('#corpMnDetPhno').val("");
    $('#corpMnDetFrm').val(today);
    $('#corpMnDetTo').val(today);
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpMnDetNameCheck").is(':checked') === true) {

        $('#corpMnDetName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpMnDetAreaCode").val();
                var PayType = $("#corpMnDetMode option:selected").text();
                var AhMst_pName = $("#corpMnDetName").val();
                var crpWithName = {
                    AhMst_pName: $("#corpMnDetName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpMnDetPhno").val(ui.item.val);
                $("#corpMnDetKey").val(ui.item.id);
                $("#corpMnDetName").val(ui.item.label);
            }

        })
    }


})
$("#corpMnDetNameCheck").click(function () {
    if ($("#corpMnDetNameCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpMnDetName').autocomplete({

            source: function (request, response) {
                var AreaKey = $("#corpMnDetAreaCode").val();
                var PayType = $("#corpMnDetMode option:selected").text();
                var AhMst_pName = $("#corpMnDetName").val();
                var crpWithName = {
                    AhMst_pName: $("#corpMnDetName").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                };
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpName",
                    data: JSON.stringify(crpWithName),
                    //    {
                    //    AhMst_pName: $("#corporateName").val(),
                    //    PayType: $("#payType option:selected").text(),
                    //    AreaKey: $("#areaCode").val()
                    //},
                    //data: JSON.stringify(crpWithName),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key
                                }
                            }))
                        }
                    }
                });
            },
            minLength: 1,
            select: function (event, ui) {
                $("#corpMnDetPhno").val(ui.item.val);
                $("#corpMnDetKey").val(ui.item.id);
                $("#corpMnDetName").val(ui.item.label);
            }
        })
    }
})
$("#corpMnDetPhnoCheck").click(function () {
    if ($("#corpMnDetPhnoCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpMnDetName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpMnDetAreaCode").val();
                var PayType = $("#corpMnDetMode option:selected").text();
                var crpWithPhNo = {
                    AhMst_mobile: $("#corpMnDetPhno").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/SearchCorpPhno",
                    data: JSON.stringify(crpWithPhNo),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpMnDetName").val(ui.item.val);
                $("#corpMnDetKey").val(ui.item.id);
                $("#corpMnDetPhno").val(ui.item.label);
            }

        })
    }
})
$("#corpMnDetCodeCheck").click(function () {
    if ($("#corpMnDetCodeCheck").is(':checked') === true) {

        //data: JSON.stringify(crpWithName),
        $('#corpMnDetName').autocomplete({
            source: function (request, response) {
                var AreaKey = $("#corpMnDetAreaCode").val();
                var PayType = $("#corpMnDetMode option:selected").text();
                var crpWithCode = {
                    AhMst_Key: $("#corpMnDetKey").val(),
                    AreaKey: AreaKey,
                    PayType: PayType
                }
                $.ajax({
                    type: 'POST',
                    url: "/LISFY/ SearchCorpCode",
                    data: JSON.stringify(crpWithCode),
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#corpMnDetName").val(ui.item.val);
                $("#corpMnDetKey").val(ui.item.id);
                $("#corpMnDetPhno").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#corpMnDetAreaNameChk").is(':checked') === true) {

        $('#corpMnDetAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpMnDetAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {


                $("#corpMnDetAreaCode").val(ui.item.id);
                $("#corpMnDetAreaName").val(ui.item.label);
            }

        })
    }

})
$("#corpMnDetAreaNameChk").click(function () {
    if ($("#corpMnDetAreaNameChk").is(':checked') === true) {

        $('#corpMnDetAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaName",
                    data: { term: $("#corpMnDetAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpMnDetAreaCode").val(ui.item.id);
                $("#corpMnDetAreaName").val(ui.item.label);
            }

        })
    }
})
$("#corpMnDetAreaCodeChk").click(function () {
    if ($("#corpMnDetAreaCodeChk").is(':checked') === true) {

        $('#corpMnDetAreaName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchAreaCode",
                    data: { term: $("#corpMnDetAreaName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.Mstr_Desc,
                                    val: Record.Mstr_Desc,
                                    id: Record.Mstr_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#corpMnDetAreaCode").val(ui.item.id);
                $("#corpMnDetAreaName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    $('#corpMnDetFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#corpMnDetToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#corpMnDetFrmClndr").change(function () {
        var val = $("#corpMnDetFrmClndr").val();
        $("#corpMnDetFrm").val(val);
    });
    $('#corpMnDetFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#corpMnDetToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#corpMnDetToClndr").change(function () {
        var val = $("#corpMnDetToClndr").val();
        $("#corpMnDetTo").val(val);
    });

})
$("#corpMnDetStmntClose").on("click.corpMnDetStmntClose", function () {
    window.location = "HomePage";
})

///////////////////////////////////////////////////////////
$("#btnTstWiseInv").on("click.btnTstWiseInv", function () {
    event.preventDefault();
    var frmDate = $("#tstWiseInvFrm").val();
    var toDate = $("#tstWiseInvTo").val();
    var tstid = $('#InvTstKey').val();
    var tstName = $('#InvTstName').val();
    var tstWiseInvObj = {
        BrMst_Name: $('#tstInvBrId option:selected').text(),
        ff: frmDate,
        tt: toDate,
        TstMst_name: tstName,
        TstMst_Key: tstid,
        BrMst_Key: $('#tstInvBrId option:selected').val()
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/TestWiseInvoice",
        type: "POST",
        data: JSON.stringify(tstWiseInvObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFTestWiseInvoice";

            }
            else {


            }


        }

    })


})
$("#InvTstNameCheck").click(function () {
    if ($("#InvTstNameCheck").is(':checked') === true) {

        $('#InvTstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchTestWithName",
                    data: { term: $("#InvTstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },
            max: 10,
            scroll: true,
            minLength: 1,
            select: function (event, ui) {
                $("#InvTstKey").val(ui.item.id);
                $("#InvTstName").val(ui.item.label);
            }

        })
    }
})
$("#InvTstKeyCheck").click(function () {
    if ($("#InvTstKeyCheck").is(':checked') === true) {

        $('#InvTstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchTestWithKey",
                    data: { term: $("#InvTstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },
            max: 10,
            scroll: true,
            minLength: 1,
            select: function (event, ui) {
                $("#InvTstKey").val(ui.item.id);
                $("#InvTstName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#InvTstNameCheck").is(':checked') === true) {

        $('#InvTstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchTestWithName",
                    data: { term: $("#InvTstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },
            max: 10,
            scroll: true,
            minLength: 1,
            select: function (event, ui) {
                // $("#crlmtCorpCRDays").val(ui.item.val);
                $("#InvTstKey").val(ui.item.id);

                $("#InvTstName").val(ui.item.label);
            }

        })
    }

})
$(document).ready(function () {
    $('#tstWiseInvFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#tstWiseInvToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'
            $(this).change();

        }
    });
    $('#tstWiseInvFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#tstWiseInvFrmClndr").change(function () {
        var val = $("#tstWiseInvFrmClndr").val();
        $("#tstWiseInvFrm").val(val);
    });
    $('#tstWiseInvToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#tstWiseInvToClndr").change(function () {
        var val = $("#tstWiseInvToClndr").val();
        $("#tstWiseInvTo").val(val);
    });
})
$("#tstWiseInvceClose").on("click.tstWiseInvceClose", function () {
    window.location = "HomePage";
})
/////////////////////
//$("#btnDctrVisit").on("click.btnDctrVisit", function () {
//    //patientCheck

//    event.preventDefault();

//    var frmDate = $("#dctrVstFrm").val();
//    var x = frmDate.split("/");
//    var dd = x[0];
//    var mm = x[1];
//    var yy = x[2];
//    var fdate = mm + "/" + dd + "/" + yy;
//    var toDate = $("#dctrVstTo").val();
//    var x1 = toDate.split("/");
//    var dd1 = x1[0];
//    var mm1 = x1[1];
//    var yy1 = x1[2];
//    var tdate = mm1 + "/" + dd1 + "/" + yy1;
//    var PROKey = $("#PROKey").val();
//    var catgryKey = $("#catgKey").val();
//    var dctrVstObj = {
//        PROKey: PROKey,
//        catgryKey: catgryKey,
//        ff: fdate,
//        tt: tdate
//    };
//    $.ajax({
//        url: "/LISFY/DoctorsVisit",
//        type: "POST",
//        data: JSON.stringify(dctrVstObj),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            event.preventDefault();
//            if (data.Result === "OK") {
//                window.location = "/LISFY/PDFDoctorsVisit";
//            }
//            else {
//            }
//        }
//    })

//})
//$(document).ready(function () {
//    //$("#usrCheck").click(function () {
//    if ($("#PROnameCheck").is(':checked') === true) {

//        $('#PROname').autocomplete({
//            source: function (request, response) {

//                $.ajax({
//                    type: 'GET',
//                    url: "/LISFY/SearchStaffName",
//                    data: { term: $("#PROname").val() },
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function (data) {
//                        console.log(data);
//                        if (data.Result === "OK") {


//                            response($.map(data.Records, function (Record) {
//                                return {
//                                    label: Record.AhMst_pName,
//                                    val: Record.AhMst_pName,
//                                    id: Record.AhMst_Key

//                                }

//                            }))


//                        }


//                    }
//                });

//            },

//            minLength: 1,
//            select: function (event, ui) {

//                $("#PROKey").val(ui.item.id);
//                $("#PROname").val(ui.item.label);
//            }

//        })
//    }

//})
//$("#PROnameCheck").click(function () {
//    if ($("#PROnameCheck").is(':checked') === true) {

//        $('#PROname').autocomplete({
//            source: function (request, response) {

//                $.ajax({
//                    type: 'GET',
//                    url: "/LISFY/SearchStaffName",
//                    data: { term: $("#PROname").val() },
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function (data) {
//                        console.log(data);
//                        if (data.Result === "OK") {


//                            response($.map(data.Records, function (Record) {
//                                return {
//                                    label: Record.AhMst_pName,
//                                    val: Record.AhMst_pName,
//                                    id: Record.AhMst_Key

//                                }

//                            }))


//                        }


//                    }
//                });

//            },

//            minLength: 1,
//            select: function (event, ui) {
//                $("#PROKey").val(ui.item.id);
//                $("#PROname").val(ui.item.label);
//            }

//        })
//    }
//})
//$("#PROcodeCheck").click(function () {
//    if ($("#PROcodeCheck").is(':checked') === true) {

//        $('#PROname').autocomplete({
//            source: function (request, response) {

//                $.ajax({
//                    type: 'GET',
//                    url: "/LISFY/SearchStaffCode",
//                    data: { term: $("#PROname").val() },
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function (data) {
//                        console.log(data);
//                        if (data.Result === "OK") {


//                            response($.map(data.Records, function (Record) {
//                                return {
//                                    label: Record.AhMst_pName,
//                                    val: Record.AhMst_pName,
//                                    id: Record.AhMst_Key

//                                }

//                            }))


//                        }


//                    }
//                });

//            },

//            minLength: 1,
//            select: function (event, ui) {
//                $("#PROKey").val(ui.item.id);
//                $("#PROname").val(ui.item.label);
//            }

//        })
//    }
//})
//$(document).ready(function () {
//    //$("#usrCheck").click(function () {
//    if ($("#catgNameCheck").is(':checked') === true) {

//        $('#catgName').autocomplete({
//            source: function (request, response) {

//                $.ajax({
//                    type: 'GET',
//                    url: "/LISFY/SearchCategoryName",
//                    data: { term: $("#catgName").val() },
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function (data) {
//                        console.log(data);
//                        if (data.Result === "OK") {


//                            response($.map(data.Records, function (Record) {
//                                return {
//                                    label: Record.AhMst_pName,
//                                    val: Record.AhMst_pName,
//                                    id: Record.AhMst_Key

//                                }

//                            }))


//                        }


//                    }
//                });

//            },

//            minLength: 1,
//            select: function (event, ui) {

//                $("#catgKey").val(ui.item.id);
//                $("#catgName").val(ui.item.label);
//            }

//        })
//    }

//})
//$("#catgNameCheck").click(function () {
//    if ($("#catgNameCheck").is(':checked') === true) {

//        $('#catgName').autocomplete({
//            source: function (request, response) {

//                $.ajax({
//                    type: 'GET',
//                    url: "/LISFY/SearchCategoryName",
//                    data: { term: $("#catgName").val() },
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function (data) {
//                        console.log(data);
//                        if (data.Result === "OK") {


//                            response($.map(data.Records, function (Record) {
//                                return {
//                                    label: Record.AhMst_pName,
//                                    val: Record.AhMst_pName,
//                                    id: Record.AhMst_Key

//                                }

//                            }))


//                        }


//                    }
//                });

//            },

//            minLength: 1,
//            select: function (event, ui) {
//                $("#catgKey").val(ui.item.id);
//                $("#catgName").val(ui.item.label);
//            }

//        })
//    }
//})
//$("#catgCodeCheck").click(function () {
//    if ($("#catgCodeCheck").is(':checked') === true) {

//        $('#catgName').autocomplete({
//            source: function (request, response) {

//                $.ajax({
//                    type: 'GET',
//                    url: "/LISFY/SearchCategoryCode",
//                    data: { term: $("#catgName").val() },
//                    contentType: "application/json; charset=utf-8",
//                    dataType: 'json',
//                    success: function (data) {
//                        console.log(data);
//                        if (data.Result === "OK") {


//                            response($.map(data.Records, function (Record) {
//                                return {
//                                    label: Record.AhMst_pName,
//                                    val: Record.AhMst_pName,
//                                    id: Record.AhMst_Key

//                                }

//                            }))


//                        }


//                    }
//                });

//            },

//            minLength: 1,
//            select: function (event, ui) {
//                $("#catgKey").val(ui.item.id);
//                $("#catgName").val(ui.item.label);
//            }

//        })
//    }
//})
//$(document).ready(function () {
//    $('#dctrVstFrmClndr').datepicker({
//        dateFormat: 'dd/mm/yy',
//        changeMonth: true,
//        changeYear: true,
//        yearRange: '-90:+80',
//        autoclose: true,
//        showOn: 'both',
//        timeFormat: 'hh:mm:ss',
//        buttonImage: "/Content/logintemplate/img/calender.png",
//        buttonImageOnly: true,
//        onSelect: function () {
//            dateFormat: 'dd/mm/yy'

//            $(this).change();

//        }
//    });
//    $('#dctrVstToClndr').datepicker({
//        dateFormat: 'dd/mm/yy',
//        changeMonth: true,
//        changeYear: true,
//        yearRange: '-90:+80',
//        autoclose: true,
//        showOn: 'both',
//        timeFormat: 'hh:mm:ss',
//        buttonImage: "/Content/logintemplate/img/calender.png",
//        buttonImageOnly: true,
//        onSelect: function () {
//            dateFormat: 'dd/mm/yy'

//            $(this).change();

//        }
//    });
//    $("#dctrVstFrmClndr").change(function () {
//        var val = $("#dctrVstFrmClndr").val();
//        $("#dctrVstFrm").val(val);
//    });
//    $('#dctrVstFrmClndr').datepicker({
//        dateFormat: 'dd/mm/yy'

//    });
//    $('#dctrVstToClndr').datepicker({
//        dateFormat: 'dd/mm/yy'

//    });
//    $("#dctrVstToClndr").change(function () {
//        var val = $("#dctrVstToClndr").val();
//        $("#dctrVstTo").val(val);
//    });

//})
$("#DctrVisitClose").on("click.DctrVisitClose", function () {
    window.location = "HomePage";
})
//$("#btnrfndStmnt").on("click.btnrfndStmnt", function () {
//    event.preventDefault();
//    var frmDate = $("#refundStmntfrm").val();
//    var toDate = $("#refundStmntTo").val();
//    var rfndStmntObj = {

//        ff: frmDate,
//        tt: toDate
//    };

//    $.ajax({
//        url: "/LISFY/RefundStmnt",
//        type: "POST",
//        data: JSON.stringify(rfndStmntObj),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            event.preventDefault();
//            if (data.Result === "OK") {
//                window.location = "/LISFY/PDFRefundStmnt";


//            }
//            else {


//            }


//        }

//    })


//})
//$(document).ready(function () {
//    $('#refundStmntfrmClndr').datepicker({
//        dateFormat: 'dd/mm/yy',
//        changeMonth: true,
//        changeYear: true,
//        yearRange: '-90:+80',
//        autoclose: true,
//        showOn: 'both',
//        timeFormat: 'hh:mm:ss',
//        buttonImage: "/Content/logintemplate/img/calender.png",
//        buttonImageOnly: true,
//        onSelect: function () {
//            dateFormat: 'dd/mm/yy'

//            $(this).change();

//        }
//    });
//    $('#refundStmntToClndr').datepicker({
//        dateFormat: 'dd/mm/yy',
//        changeMonth: true,
//        changeYear: true,
//        yearRange: '-90:+80',
//        autoclose: true,
//        showOn: 'both',
//        timeFormat: 'hh:mm:ss',
//        buttonImage: "/Content/logintemplate/img/calender.png",
//        buttonImageOnly: true,
//        onSelect: function () {
//            dateFormat: 'dd/mm/yy'

//            $(this).change();

//        }
//    });
//    $("#refundStmntfrmClndr").change(function () {
//        var val = $("#refundStmntfrmClndr").val();
//        $("#refundStmntfrm").val(val);
//    });
//    $('#refundStmntfrmClndr').datepicker({
//        dateFormat: 'dd/mm/yy'

//    });
//    $('#refundStmntToClndr').datepicker({
//        dateFormat: 'dd/mm/yy'

//    });
//    $("#refundStmntToClndr").change(function () {
//        var val = $("#refundStmntToClndr").val();
//        $("#refundStmntTo").val(val);
//    });

//})
$("#refundStmntClose").on("click.refundStmntClose", function () {
    window.location = "HomePage";
})
//$("#btnDivPerfmnce").on("click.btnDivPerfmnce", function () {
//    event.preventDefault();
//    var frmDate = $("#DivPerfmnceFrm").val();
//    var toDate = $("#DivPerfmnceTo").val();
//    var DivPrfmnceObj = {

//        ff: frmDate,
//        tt: toDate
//    };

//    $.ajax({
//        url: "/LISFY/DivsnWisePerfomance",
//        type: "POST",
//        data: JSON.stringify(DivPrfmnceObj),
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (data) {
//            event.preventDefault();
//            if (data.Result === "OK") {
//                window.location = "/LISFY/PDFDivsnWisePerfomance";


//            }
//            else {


//            }


//        }

//    })


//})
$("#DivPerfmnceFrmClose").on("click.DivPerfmnceFrmClose", function () {
    window.location = "HomePage";
})
$("#dptWiseClose").on("click.dptWiseClose", function () {
    window.location = "HomePage";
})
$("#dctrmtngClose").on("click.dctrmtngClose", function () {
    window.location = "HomePage";
})
$("#cnclledInvClose").on("click.cnclledInvClose", function () {
    window.location = "HomePage";
})
$("#discWiseInvClose").on("click.discWiseInvClose", function () {
    window.location = "HomePage";
})
$("#brnchInvClose").on("click.brnchInvClose", function () {
    window.location = "HomePage";
})
$("#usrTackClose").on("click.usrTackClose", function () {
    window.location = "HomePage";

})
$(document).ready(function () {
    $('#PROprfmceFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#PROprfmceToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#PROprfmceFrmClndr").change(function () {
        var val = $("#PROprfmceFrmClndr").val();
        $("#PROprfmceFrm").val(val);
    });
    $('#PROprfmceFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#PROprfmceToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#PROprfmceToClndr").change(function () {
        var val = $("#PROprfmceToClndr").val();
        $("#PROprfmceTo").val(val);
    });

})
$("#PROprfmnceClose").on("click.PROprfmnceClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$(document).ready(function () {
    $("#btnDivWiseSmry").on("click.btnDivWiseSmry", function () {
        event.preventDefault();
        var frmDate = $("#divSmryFrm").val();
        var toDate = $("#divSmryTo").val();
        var divWiseSmryObj = {
            BrMst_Name: $('#divWiseSmryBrKey option:selected').text(),
            ff: frmDate,
            tt: toDate
        };

        $.ajax({
            url: "/LISFY/DivisionWiseSmry",
            type: "POST",
            data: JSON.stringify(divWiseSmryObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    window.location = "/LISFY/PDFDivisionWiseSmry";


                }
                else {


                }


            }

        })


    })
})
$("#divWiseSmryClose").on("click.divWiseSmryClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#DivInv2Close").on("click.DivInv2Close", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#divWiseClose").on("click.divWiseClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#patInvClose").on("click.patInvClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#usrWisesmryClose").on("click.usrWisesmryClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#usrWiseClose").on("click.usrWiseClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#stmntClose").on("click.stmntClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#smryClose").on("click.smryClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#clctnBrnchWiseClose").on("click.clctnBrnchWiseClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#clctnSmryBrnchClose").on("click.clctnSmryBrnchClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#dlyInvClose").on("click.dlyInvClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#pidWiseBillClose").on("click.pidWiseBillClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#mnthlyClctnSmryClose").on("click.mnthlyClctnSmryClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#divSmryClose").on("click.divSmryClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
$("#MonthlyBrnchClose").on("click.MonthlyBrnchClose", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
function toggle_visibility(id) {
    var e = document.getElementById(id);
    var visivel = e.style.display == 'block';
    var menus = document.querySelectorAll('[id^=menu]');
    for (var i = 0; i < menus.length; i++) {
        menus[i].style.display = 'none';
    };
    if (visivel) e.style.display = 'none';
    else e.style.display = 'block';
}
$("#smryClose").on("click.smryClose", function () {

    $("#dailyclctnSmry").dialog("close");

})
$("#smry2Close").on("click.smry2Close", function () {

    //$("#dailyclctnSmry2").dialog("close");
    window.location = "HomePage";

})
////////////////////////////////////////////////////////////////////////
document.onkeydown = function (evt) {
    var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
    if (keyCode == 13) {
        evt.preventDefault();
    }
}
$("#IPOPrptClose").on("click.IPOPrptClose", function () {
    window.location = "HomePage";
})
//$("#IPOPnum").keypress(function (e) {
//    keycode = e.keyCode || e.charCode || e.which
//    if (keycode == 13) {
$("#SrchPatWithIPOP").on("click.SrchPatWithIPOP", function () {
    var IPOP_Num = $('#IPOPnum').val();
    $('#IpOptable tbody tr:not(:last)').remove();
    var currentrow = $("#IpOptable").find('tbody tr:last');
    $(currentrow).find("#ipopSlNo").text("");
    $(currentrow).find("#ipopDate").text("");
    $(currentrow).find("#ipopDctr").text("");
    $(currentrow).find("#ipopLabNo").text("");
    $(currentrow).find("#ipopTstRlst").text("");
    var ipopViewObj = {
        IPOP_num: IPOP_Num
    };
    //pndReg2View IPOPpatView
    //if (fdate > tdate)
    //{
    //    alert("Please Check from date");
    //}
    //else
    //{
    $.ajax({
        url: "/LISFY/IPOPpatView",
        type: "POST",
        data: JSON.stringify(ipopViewObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if (data.Result === "OK") {
                //IPOPnum IPOPpatName IPOPpatAge IPOPpatGndr IPOPpatEmail IPOPpatPhn
                //Inv_name Pat_Age Inv_Gender Inv_Email Inv_phno
                //$('#IPOPnum').val(data.Record.Inv_name);
                $('#IPOPpatName').text(data.Record.Inv_name);
                $('#IPOPpatAge').text(data.Record.Pat_Age);
                $('#IPOPpatGndr').text(data.Record.Inv_Gender);
                $('#IPOPpatEmail').text(data.Record.Inv_Email);
                $('#IPOPpatPhn').text(data.Record.Inv_phno);
                var currentrow = $("#IpOptable").find('tbody tr');
                $.each(data.Record.testdtls, function (index, ipopItm) {
                    if (index > 0) {
                        currentrow = $(currentrow).clone();
                        $("#IpOptable tbody").append($(currentrow));
                        currentrow = $("#IpOptable tbody tr:last");
                    }
                    //ipopSlNo ipopDate ipopDctr ipopLabNo ipopTstRlst
                    //Inv_Dates Doctor Lab_No Test_Result
                    $(currentrow).find("#ipopSlNo").text((index + 1));
                    $(currentrow).find("#ipopDate").text(ipopItm.Inv_Dates);
                    $(currentrow).find("#ipopDctr").text(ipopItm.Doctor);
                    $(currentrow).find("#ipopLabNo").text(ipopItm.Lab_No);
                    $(currentrow).find("#ipopTstRlst").text(ipopItm.Test_Result);

                })

            }


        }

    })

})

/////////////////////////////////////////////////////////
$("#btnNonBarcodedTsts").on("click.btnNonBarcodedTsts", function () {
    event.preventDefault();
    var frmDate = $("#nonBrCodeTstFrm").val();
    var toDate = $("#nonBrCodeTstTo").val();
    var nonBrCodedTstObj = {
        ff: frmDate,
        tt: toDate
    };
    $.ajax({
        //url: "/LISFY/AuthDetails",
        url: "/LISFY/NonBarcodedTest",
        type: "POST",
        data: JSON.stringify(nonBrCodedTstObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFAuthDetails";
                window.location = "/LISFY/PDFNonBarcodedTest";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#nonBrCodeTstFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#nonBrCodeTstToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'
            $(this).change();

        }
    });
    $('#nonBrCodeTstFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#nonBrCodeTstFrmClndr").change(function () {
        var val = $("#nonBrCodeTstFrmClndr").val();
        $("#nonBrCodeTstFrm").val(val);
    });
    $('#nonBrCodeTstToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#nonBrCodeTstToClndr").change(function () {
        var val = $("#nonBrCodeTstToClndr").val();
        $("#nonBrCodeTstTo").val(val);
    });
})
$("#nonBarcodedTstsClose").on("click.nonBarcodedTstsClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////////////
$("#btnTstWiseReg").on("click.btnTstWiseReg", function () {
    event.preventDefault();
    var frmDate = $("#tstWiseRstlFrm").val();
    var toDate = $("#tstWiseRstlTo").val();

    var tstRsltRegObj = {
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/AuthDetails",
        url: "/LISFY/TstWiseResultReg",
        type: "POST",
        data: JSON.stringify(tstRsltRegObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFAuthDetails";
                window.location = "/LISFY/PDFTstWiseResultReg";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#tstWiseRstlFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#tstWiseRstlToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#tstWiseRstlFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#tstWiseRstlFrmClndr").change(function () {
        var val = $("#tstWiseRstlFrmClndr").val();
        $("#tstWiseRstlFrm").val(val);
    });
    $('#tstWiseRstlToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#tstWiseRstlToClndr").change(function () {
        var val = $("#tstWiseRstlToClndr").val();
        $("#tstWiseRstlTo").val(val);
    });
})
$("#tstWiseRsltRegClose").on("click.tstWiseRsltRegClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////////
$("#btnCust2RsltRegStmnt").on("click.btnCust2RsltRegStmnt", function () {
    event.preventDefault();
    var frmDate = $("#cust2RsltFrm").val();
    var toDate = $("#cust2RsltTo").val();
    var branchid = $('#cust2Brid option:selected').val();
    var branchName = $('#cust2Brid option:selected').text();
    var tstid = $('#cust2TstCode').val();
    var tstName = $('#cust2TstName').val();
    if (tstName == "") {
        alert("Please Select a test!");
    }
    else {
        var cust2RegObj = {
            BrMst_Name: branchName,
            ff: frmDate,
            tt: toDate,
            BrMst_Key: branchid,
            TstMst_name: tstName,
            TstMst_Key: tstid
        };

        $.ajax({
            //url: "/LISFY/NoDctrPatTst",
            url: "/LISFY/Cust2RsltRegister",
            type: "POST",
            data: JSON.stringify(cust2RegObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //window.location = "/LISFY/PDFNoDctrPatTst";
                    window.location = "/LISFY/PDFCust2RsltRegister";
                }
                else {
                    alert("Result Row Not Assigned!");
                }
            }
        })
    }

})
$("#cust2TstCodeChk").click(function () {
    if ($("#cust2TstCodeChk").is(':checked') === true) {

        $('#cust2TstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCust2TstCode",
                    data: { term: $("#cust2TstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#cust2TstCode").val(ui.item.id);
                $("#cust2TstName").val(ui.item.label);
            }

        })
    }
})
$("#cust2TstNameChk").click(function () {
    if ($("#cust2TstNameChk").is(':checked') === true) {

        $('#cust2TstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCust2TstName",
                    data: { term: $("#cust2TstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#cust2TstCode").val(ui.item.id);
                $("#cust2TstName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#cust2TstNameChk").is(':checked') === true) {

        $('#cust2TstName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchCust2TstName",
                    data: { term: $("#cust2TstName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                // $("#crlmtCorpCRDays").val(ui.item.val);
                $("#cust2TstCode").val(ui.item.id);
                $("#cust2TstName").val(ui.item.label);
            }

        })
    }

})
$(document).ready(function () {
    $('#cust2RsltFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#cust2RsltToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#cust2RsltFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#cust2RsltFrmClndr").change(function () {
        var val = $("#cust2RsltFrmClndr").val();
        $("#cust2RsltFrm").val(val);
    });
    $('#cust2RsltToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#cust2RsltToClndr").change(function () {
        var val = $("#cust2RsltToClndr").val();
        $("#cust2RsltTo").val(val);
    });
})
$("#cust2RsltRegClose").on("click.cust2RsltRegClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////////////
$("#btnauthDls").on("click.btnauthDls", function () {
    event.preventDefault();
    var frmDate = $("#authDlsFrm").val();
    var toDate = $("#authDlsTo").val();

    var authDlsObj = {
        ff: frmDate,
        tt: toDate
    };

    $.ajax({
        //url: "/LISFY/RptDisp2",
        url: "/LISFY/AuthDetails",
        type: "POST",
        data: JSON.stringify(authDlsObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFSmpleCollWiseInv";
                window.location = "/LISFY/PDFAuthDetails";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#authDlsFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#authDlsToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#authDlsFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#authDlsFrmClndr").change(function () {
        var val = $("#authDlsFrmClndr").val();
        $("#authDlsFrm").val(val);
    });
    $('#authDlsToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#authDlsToClndr").change(function () {
        var val = $("#authDlsToClndr").val();
        $("#authDlsTo").val(val);
    });
})
$("#authDlsClose").on("click.authDlsClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////////////////
$("#btnTimeOvrStmnt").on("click.btnTimeOvrStmnt", function () {

    var avoidFinishd = 0;
    if ($("#avdFinshd").is(':checked') === true) {
        {
            avoidFinishd = 1;
        }
    }
    var frmDate = $("#timeOvrFrm").val();
    var toDate = $("#timeOvrTo").val();
    var branchid = $('#timeOvrBrid option:selected').val();
    var branchName = $('#timeOvrBrid option:selected').text();
    var timeOvrObj = {
        BrMst_Name: branchName,
        ff: frmDate,
        tt: toDate,
        BrMst_Key: branchid,
        avoidFinishd: avoidFinishd
    };

    $.ajax({
        //url: "/LISFY/RptDisp2",
        url: "/LISFY/TimeOverStmnts",
        type: "POST",
        data: JSON.stringify(timeOvrObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFRptDisp2";
                window.location = "/LISFY/PDFTimeOverStmnts";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#timeOvrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#timeOvrToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#timeOvrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#timeOvrFrmClndr").change(function () {
        var val = $("#timeOvrFrmClndr").val();
        $("#timeOvrFrm").val(val);
    });
    $('#timeOvrToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#timeOvrToClndr").change(function () {
        var val = $("#timeOvrToClndr").val();
        $("#timeOvrTo").val(val);
    });
})
$("#timeOvrStmntClose").on("click.timeOvrStmntClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////////////
$("#btnrptDisp2").on("click.btnrptDisp2", function () {
    event.preventDefault();
    var frmDate = $("#rptDisp2Frm").val();
    var toDate = $("#rptDisp2To").val();
    var branchid = $('#rptDisp2Brid option:selected').val();
    var branchName = $('#rptDisp2Brid option:selected').text();
    var RptDisp2Obj = {
        BrMst_Name: branchName,
        ff: frmDate,
        tt: toDate,
        BrMst_Key: branchid
    };

    $.ajax({
        //url: "/LISFY/SmpleCollWiseInv",
        url: "/LISFY/RptDisp2",
        type: "POST",
        data: JSON.stringify(RptDisp2Obj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFSmpleCollWiseInv";
                window.location = "/LISFY/PDFRptDisp2";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#rptDisp2FrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#rptDisp2ToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#rptDisp2FrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#rptDisp2FrmClndr").change(function () {
        var val = $("#rptDisp2FrmClndr").val();
        $("#rptDisp2Frm").val(val);
    });
    $('#rptDisp2ToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#rptDisp2ToClndr").change(function () {
        var val = $("#rptDisp2ToClndr").val();
        $("#rptDisp2To").val(val);
    });
})
$("#rptDisp2Close").on("click.rptDisp2Close", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////////////
$("#btnsSmplClctn").on("click.btnsSmplClctn", function () {
    event.preventDefault();
    var frmDate = $("#smplClctnFrm").val();
    var toDate = $("#smplClctnTo").val();
    var branchid = $('#SmplClctnBrid option:selected').val();
    var branchName = $('#SmplClctnBrid option:selected').text();
    var cmplCollObj = {
        BrMst_Name: branchName,
        ff: frmDate,
        tt: toDate,
        BrMst_Key: branchid
    };

    $.ajax({
        //url: "/LISFY/RptDispStmnts",
        url: "/LISFY/SmpleCollWiseInv",
        type: "POST",
        data: JSON.stringify(cmplCollObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFRptDispStmnts";
                window.location = "/LISFY/PDFSmpleCollWiseInv";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#smplClctnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#smplClctnToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#smplClctnFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#smplClctnFrmClndr").change(function () {
        var val = $("#smplClctnFrmClndr").val();
        $("#smplClctnFrm").val(val);
    });
    $('#smplClctnToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#smplClctnToClndr").change(function () {
        var val = $("#smplClctnToClndr").val();
        $("#smplClctnTo").val(val);
    });
})
$("#SmplClctnInvClose").on("click.SmplClctnInvClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////////////
$("#btnrptDispStmnt").on("click.btnrptDispStmnt", function () {
    event.preventDefault();
    var frmDate = $("#rptDispFrm").val();
    var toDate = $("#rptDispTo").val();
    var branchid = $('#rptDispBrid option:selected').val();
    var branchName = $('#rptDispBrid option:selected').text();
    var rptDispObj = {
        BrMst_Name: branchName,
        ff: frmDate,
        tt: toDate,
        BrMst_Key: branchid
    };

    $.ajax({
        //url: "/LISFY/RemoveAuthStmnt",
        url: "/LISFY/RptDispStmnts",
        type: "POST",
        data: JSON.stringify(rptDispObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFRemoveAuthStmnt";
                window.location = "/LISFY/PDFRptDispStmnts";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#rptDispFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#rptDispToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#rptDispFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#rptDispFrmClndr").change(function () {
        var val = $("#rptDispFrmClndr").val();
        $("#rptDispFrm").val(val);
    });
    $('#rptDispToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#rptDispToClndr").change(function () {
        var val = $("#rptDispToClndr").val();
        $("#rptDispTo").val(val);
    });
})
$("#rptDispStmntsClose").on("click.rptDispStmntsClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////////////////
$("#btnRemveAuthStmnt").on("click.btnRemveAuthStmnt", function () {
    event.preventDefault();
    var frmDate = $("#remveAuthFrm").val();
    var toDate = $("#remveAuthTo").val();
    var branchid = $('#RemoveAuthBrid option:selected').val();
    var branchName = $('#RemoveAuthBrid option:selected').text();
    var rmveAuthObj = {
        BrMst_Name: branchName,
        ff: frmDate,
        tt: toDate,
        BrMst_Key: branchid
    };

    $.ajax({
        //url: "/LISFY/ReferalLabStmnt",
        url: "/LISFY/RemoveAuthStmnt",
        type: "POST",
        data: JSON.stringify(rmveAuthObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFReferalLabStmnt";
                window.location = "/LISFY/PDFRemoveAuthStmnt";
            }
            else {
            }
        }
    })
})
$(document).ready(function () {
    $('#remveAuthFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#remveAuthToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#remveAuthFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#remveAuthFrmClndr").change(function () {
        var val = $("#remveAuthFrmClndr").val();
        $("#remveAuthFrm").val(val);
    });
    $('#remveAuthToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#remveAuthToClndr").change(function () {
        var val = $("#remveAuthToClndr").val();
        $("#remveAuthTo").val(val);
    });
})
$("#removeAuthStmntsClose").on("click.removeAuthStmntsClose", function () {
    window.location = "HomePage";
})
////////////////////////////////////////////////////////////
$("#btnrefLabRpt").on("click.btnrefLabRpt", function () {
    event.preventDefault();
    var frmDate = $("#refLabRptFrm").val();
    var toDate = $("#refLabRptTo").val();
    var branchid = $('#refLabBrId option:selected').val();
    var branchName = $('#refLabBrId option:selected').text();
    var labId = $('#LabCode').val();
    var labName = $('#LabName').val();

    var rfrlLabObj = {
        BrMst_Name: branchName,
        ff: frmDate,
        tt: toDate,
        BrMst_Key: branchid,
        AhMst_pName: labName,
        AhMst_Key: labId
    };

    $.ajax({
        //url: "/LISFY/NoDctrPatTst",
        url: "/LISFY/ReferalLabStmnt",
        type: "POST",
        data: JSON.stringify(rfrlLabObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFNoDctrPatTst";
                window.location = "/LISFY/PDFReferalLabStmnt";
            }
            else {
            }
        }
    })
})
$("#LabCodeCheck").click(function () {
    if ($("#LabCodeCheck").is(':checked') === true) {

        $('#LabName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchLabWithKey",
                    data: { term: $("#LabName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#LabCode").val(ui.item.id);
                $("#LabName").val(ui.item.label);
            }

        })
    }
})
$("#LabNameCheck").click(function () {
    if ($("#LabNameCheck").is(':checked') === true) {

        $('#LabName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchLabWithName",
                    data: { term: $("#LabName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#LabCode").val(ui.item.id);
                $("#LabName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#LabNameCheck").is(':checked') === true) {

        $('#LabName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchLabWithName",
                    data: { term: $("#LabName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                // $("#crlmtCorpCRDays").val(ui.item.val);
                $("#LabCode").val(ui.item.id);
                $("#LabName").val(ui.item.label);
            }

        })
    }

})
$(document).ready(function () {
    $('#refLabRptFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#refLabRptToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#refLabRptFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#refLabRptFrmClndr").change(function () {
        var val = $("#refLabRptFrmClndr").val();
        $("#refLabRptFrm").val(val);
    });
    $('#refLabRptToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#refLabRptToClndr").change(function () {
        var val = $("#refLabRptToClndr").val();
        $("#refLabRptTo").val(val);
    });
})
$("#refLabRptClose").on("click.refLabRptClose", function () {
    window.location = "HomePage";
})
//////////////////////////////////////////////////////////////
$("#btnNoDrPatTst").on("click.btnNoDrPatTst", function () {
    event.preventDefault();
    var frmDate = $("#NoDrPatTstFrm").val();
    var toDate = $("#NoDrPatTstTo").val();
    var branchid = $('#BranchKey').val();
    var branchName = $('#BranchNme').val();
    var tstid = $('#TestsKey').val();
    var tstName = $('#TestsName').val();
    var NoDrPatTstObj = {
        BrMst_Name: branchName,
        ff: frmDate,
        tt: toDate,
        BrMst_Key: branchid,
        TstMst_name: tstName,
        TstMst_Key: tstid
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/NoDctrPatTst",
        type: "POST",
        data: JSON.stringify(NoDrPatTstObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFNoDctrPatTst";
            }
            else {
            }
        }
    })
})
$("#newNoDrPatTst").on("click.newNoDrPatTst", function () {
    //event.preventDefault();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 01
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    $('#BranchNme').val("");
    $('#BranchKey').val("");
    $('#TestsName').val("");
    $('#TestsKey').val("");
    $('#NoDrPatTstFrm').val(today);
    $('#NoDrPatTstTo').val(today);
})
$("#TstKeyCheck").click(function () {
    if ($("#TstKeyCheck").is(':checked') === true) {

        $('#TestsName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchTSTWithKey",
                    data: { term: $("#TestsName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#TestsKey").val(ui.item.id);
                $("#TestsName").val(ui.item.label);
            }

        })
    }
})
$("#TstNameCheck").click(function () {
    if ($("#TstNameCheck").is(':checked') === true) {

        $('#TestsName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchTSTWithName",
                    data: { term: $("#TestsName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#TestsKey").val(ui.item.id);
                $("#TestsName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#TstNameCheck").is(':checked') === true) {

        $('#TestsName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchTSTWithName",
                    data: { term: $("#TestsName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.TstMst_Name,
                                    val: Record.TstMst_Name,
                                    id: Record.TstMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                // $("#crlmtCorpCRDays").val(ui.item.val);
                $("#TestsKey").val(ui.item.id);
                $("#TestsName").val(ui.item.label);
            }

        })
    }

})
$("#BrnchKeyCheck").click(function () {
    if ($("#BrnchKeyCheck").is(':checked') === true) {

        $('#BranchNme').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchBnchWithKey",
                    data: { term: $("#BranchNme").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.BrMst_Name,
                                    val: Record.BrMst_Name,
                                    id: Record.BrMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#BranchKey").val(ui.item.id);
                $("#BranchNme").val(ui.item.label);
            }

        })
    }
})
$("#BrnchNameCheck").click(function () {
    if ($("#BrnchNameCheck").is(':checked') === true) {

        $('#BranchNme').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchBnchWithName",
                    data: { term: $("#BranchNme").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.BrMst_Name,
                                    val: Record.BrMst_Name,
                                    id: Record.BrMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#BranchKey").val(ui.item.id);
                $("#BranchNme").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#BrnchNameCheck").is(':checked') === true) {

        $('#BranchNme').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchBnchWithName",
                    data: { term: $("#BranchNme").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.BrMst_Name,
                                    val: Record.BrMst_Name,
                                    id: Record.BrMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                // $("#crlmtCorpCRDays").val(ui.item.val);
                $("#BranchKey").val(ui.item.id);
                $("#BranchNme").val(ui.item.label);
            }

        })
    }

})
$(document).ready(function () {
    $('#NoDrPatTstFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#NoDrPatTstToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#NoDrPatTstFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#NoDrPatTstFrmClndr").change(function () {
        var val = $("#NoDrPatTstFrmClndr").val();
        $("#NoDrPatTstFrm").val(val);
    });
    $('#NoDrPatTstToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#NoDrPatTstToClndr").change(function () {
        var val = $("#NoDrPatTstToClndr").val();
        $("#NoDrPatTstTo").val(val);
    });

})
$("#NoDrPatLstClose").on("click.NoDrPatLstClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////////////////
$("#btnOutDrClctn").on("click.btnOutDrClctn", function () {
    event.preventDefault();
    var frmDate = $("#outDrFrm").val();
    var toDate = $("#outDrTo").val();
    var outDrWiseObj = {
        BrMst_Name: $('#outDrBrid option:selected').text(),
        ff: frmDate,
        tt: toDate,
        BrMst_Key: $('#outDrBrid option:selected').val()
    };

    $.ajax({
        //url: "/LISFY/CreditCardWiseColln",
        url: "/LISFY/OutDrWiseClctn",
        type: "POST",
        data: JSON.stringify(outDrWiseObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //window.location = "/LISFY/PDFCreditCardWiseColln";
                window.location = "/LISFY/PDFOutDrWiseClctn";
            }
            else {


            }


        }

    })


})
$(document).ready(function () {
    $('#outDrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#outDrToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#outDrFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });

    $("#outDrFrmClndr").change(function () {
        var val = $("#outDrFrmClndr").val();
        $("#outDrFrm").val(val);
    });
    $('#outDrToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#outDrToClndr").change(function () {
        var val = $("#outDrToClndr").val();
        $("#outDrTo").val(val);
    });

})
$("#outDrWiseClctnClose").on("click.outDrWiseClctnClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////////////////
$("#btnDocEnvlp").on("click.btnDocEnvlp", function () {

    var spelzdNameObj = [];
    var spelzdKeyObj = [];
    var checkedDctrObj = [];
    var checkedDctrIdObj = [];
    $.each($("input[name='speclzdChk']:checked"), function () {
        var spelzdName = $(this).closest('tr').find('#splezdName').text();
        var trimSpelzdName = $.trim(spelzdName);
        spelzdNameObj.push(trimSpelzdName);
        var spelzdKey = $(this).closest('tr').find('#SplID').text();
        var trimSpelzdId = $.trim(spelzdKey);
        spelzdKeyObj.push(trimSpelzdId);
    });
    $.each($("input[name='dctrChk']:checked"), function () {
        var doctrName = $(this).closest('tr').find('#doctorName').text();
        var trimDoctrName = $.trim(doctrName);
        checkedDctrObj.push(trimDoctrName);
        var doctrKey = $(this).closest('tr').find('#DctrId').text();
        var trimDctrId = $.trim(doctrKey);
        checkedDctrIdObj.push(trimDctrId);
    });

    var DrEnvlpObj = {
        checkedDctr: checkedDctrObj,
        checkedDctrId: checkedDctrIdObj,
        checkedSplzd: spelzdNameObj,
        checkedSplzdId: spelzdKeyObj

    };
    $.ajax({
        //url: "/LISFY/DoctrSplzdList",
        url: "/LISFY/DoctrsEnvelop",
        type: "POST",
        data: JSON.stringify(DrEnvlpObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFDoctrEnvelop";
                //window.location = "/LISFY/PDFBranchWiseCollection";
            }
            else {
            }
        }
    })

})
$("#newDocEnvlp").on("click.newDocEnvlp", function () {
    $("input[type=checkbox]").each(function () {
        //$('#dctrChk').prop('checked', false);spelzdParent
        //$('#speclzdChk').prop('checked', false);
        $(".dctrChild").prop("checked", false);
        $(".speclzdChild").prop("checked", false);
        $("#dctrParent").prop("checked", false);
        $("#spelzdParent").prop("checked", false);
    })
})
$("#docEnvelopClose").on("click.docEnvelopClose", function () {
    window.location = "HomePage";
})
$(document).ready(function () {
    $("#spelzdParent").click(function () {
        if ($('#spelzdParent').prop('checked') == true) {
            $(".dctrChild").prop("checked", this.checked);
            $(".speclzdChild").prop("checked", this.checked);
        }
        else {
            //$(".dctrChild").prop("checked", this.checked);
            $(".speclzdChild").prop("checked", this.checked);
        }

    });
    //parentcheck brnchsmryChk
    $('.speclzdChild').click(function () {
        if ($('.speclzdChild:checked').length == $('.speclzdChild').length) {
            $('#spelzdParent').prop('checked', true);
        } else {
            $('#spelzdParent').prop('checked', false);
        }
    });
});
$(document).ready(function () {
    $("#dctrParent").click(function () {
        $(".dctrChild").prop("checked", this.checked);
    });
    //parentcheck brnchsmryChk
    $('.dctrChild').click(function () {
        if ($('.dctrChild:checked').length == $('.dctrChild').length) {
            $('#dctrParent').prop('checked', true);
        } else {
            $('#dctrParent').prop('checked', false);
        }
    });
});
////////////////////////////////////////////////////////////////
$("#btnHospDoc").on("click.btnHospDoc", function () {
    var HospName = $("#SrchHospWithName").val();
    var HospKey = $("#SrchHospWithKey").val();
    var HosWiseDocObj = {
        AhMst_pName: HospName,
        AhMst_Key: HospKey
    };
    $.ajax({
        //url: "/LISFY/DoctrSplzdList",
        url: "/LISFY/HospWiseDocList",
        type: "POST",
        data: JSON.stringify(HosWiseDocObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                window.location = "/LISFY/PDFHospWiseDocList";
                //window.location = "/LISFY/PDFBranchWiseCollection";
            }
            else {
            }
        }
    })

})
$("#hospDocKeyCheck").click(function () {
    if ($("#hospDocKeyCheck").is(':checked') === true) {

        $('#hospDocName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchHospWithKey",
                    data: { term: $("#hospDocName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key
                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#hospDocKey").val(ui.item.id);
                $("#hospDocName").val(ui.item.label);
            }

        })
    }
})
$("#hospDocNameCheck").click(function () {
    if ($("#hospDocNameCheck").is(':checked') === true) {

        $('#hospDocName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchHospWithName",
                    data: { term: $("#hospDocName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key


                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#hospDocKey").val(ui.item.id);
                $("#hospDocName").val(ui.item.label);
            }

        })
    }
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#hospDocNameCheck").is(':checked') === true) {

        $('#hospDocName').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SrchHospWithName",
                    data: { term: $("#hospDocName").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_pName,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#hospDocKey").val(ui.item.id);
                $("#hospDocName").val(ui.item.label);
            }

        })
    }

})
$("#hospWiseDocClose").on("click.hospWiseDocClose", function () {
    window.location = "HomePage";
})
/////////////////////////////////////////////////////////////////////

$("#btnOldPtntView").on("click.btnOldPtntView", function () {
    //patientCheck
    if ($("#WithOutDctrCheck").is(':checked') === true) {
        event.preventDefault();
        $('#OldPatientStmnt tbody tr:not(:last)').remove();
        var rowCount = $("#OldPatientStmnt tbody tr").length;
        var frmDate = $("#oldPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#oldPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var oldpatListObj = {
            rowCount: rowCount,
            dctrCheck: 0,
            ff: fdate,
            tt: tdate
        };

        $.ajax({
            url: "/LISFY/OldPatientList",
            type: "POST",
            data: JSON.stringify(oldpatListObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {

                    //window.location = "/LISFY/HomePage";
                    var currentrow = $("#OldPatientStmnt").find('tbody tr');
                    //var currentrow = $("#tstAddTable").find('tbody tr');
                    $.each(data.Record, function (index, newPat) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#OldPatientStmnt tbody").append($(currentrow));
                            currentrow = $("#OldPatientStmnt tbody tr:last");
                        }
                        var Invdate = newPat.Inv_Date;
                        //OldSlno Oldlabno OldPatname OldPatphone OldinvDate
                        $(currentrow).find("#OldSlno").text((index + 1));
                        $(currentrow).find("#Oldlabno").text(newPat.Inv_No);
                        $(currentrow).find("#OldPatname").text(newPat.Inv_name);
                        $(currentrow).find("#OldPatphone").text(newPat.Inv_phno);
                        $(currentrow).find("#OldinvDate").text(Invdate);

                    })

                }
                else {

                }
            }

        })
    }
    else if ($("#WithDctrCheck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#OldPatientStmnt tbody tr:not(:last)').remove();
        var rowCount = $("#OldPatientStmnt tbody tr").length;
        var frmDate = $("#oldPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#oldPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var oldpatListObj = {
            rowCount: rowCount,
            dctrCheck: 1,
            ff: fdate,
            tt: tdate
        };
        $.ajax({
            url: "/LISFY/OldPatientList",
            type: "POST",
            data: JSON.stringify(oldpatListObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //$("#ClctnSummary2 tbody tr").remove();
                    ////window.location = "/LISFY/HomePage";
                    var currentrow = $("#OldPatientStmnt").find('tbody tr');
                    //var currentrow = $("#tstAddTable").find('tbody tr');
                    $.each(data.Record, function (index, newPat) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#OldPatientStmnt tbody").append($(currentrow));
                            currentrow = $("#OldPatientStmnt tbody tr:last");
                        }

                        var Invdate = newPat.Inv_Date;
                        //OldSlno Oldlabno OldPatname OldPatphone OldinvDate
                        $(currentrow).find("#OldSlno").text((index + 1));
                        $(currentrow).find("#Oldlabno").text(newPat.Inv_No);
                        $(currentrow).find("#OldPatname").text(newPat.Inv_name);
                        $(currentrow).find("#OldPatphone").text(newPat.Inv_phno);
                        $(currentrow).find("#OldinvDate").text(Invdate);



                    })

                }
                else {


                }


            }

        })
    }
    else {

    }
})
$("#srvcChrgRpt").on("click.srvcChrgRpt", function () {
    //patientCheck
    //if ($("#WithOutDctrChck").is(':checked') === true) {
    event.preventDefault();
    //$('#SrvChrgStmnt tbody tr:not(:last)').remove();
    var rowCount = $("#SrvChrgStmnt tbody tr").length;
    var frmDate = $("#srvChrgFrm").val();
    var x = frmDate.split("/");
    var dd = x[0];
    var mm = x[1];
    var yy = x[2];
    var fdate = mm + "/" + dd + "/" + yy;
    var toDate = $("#srvChrgTo").val();
    var x1 = toDate.split("/");
    var dd1 = x1[0];
    var mm1 = x1[1];
    var yy1 = x1[2];
    var tdate = mm1 + "/" + dd1 + "/" + yy1;
    var srvcChprntObj = {
        rowCount: rowCount,
        dctrCheck: 0,
        ff: fdate,
        tt: tdate,
        User_Name: $("#collname").val(),
        User_Key: $("#collKey").val()
    };

    $.ajax({
        url: "/LISFY/SrChrgRptPrint",
        type: "POST",
        data: JSON.stringify(srvcChprntObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {

                window.location = "/LISFY/PDFSrChrgRptPrint";

            }
            else {

            }
        }

    })

})
$("#srvcChrgRptView").on("click.srvcChrgRptView", function () {
    //patientCheck
    //if ($("#WithOutDctrChck").is(':checked') === true) {collKey collPhno collname
    event.preventDefault();
    $('#SrvChrgStmnt tbody tr:not(:last)').remove();
    var lastrow = $("#SrvChrgStmnt tbody tr:last");
    $(lastrow).find("#srSlNo").text((""));
    $(lastrow).find("#SrDate").text((""));
    $(lastrow).find("#SrLabNo").text("");
    $(lastrow).find("#SrName").text("");
    $(lastrow).find("#SrPayMode").text("");
    $(lastrow).find("#SrCharge").text("");
    $(lastrow).find("#SrCollPerson").text("");

    var rowCount = $("#SrvChrgStmnt tbody tr").length;
    var frmDate = $("#srvChrgFrm").val();
    var x = frmDate.split("/");
    var dd = x[0];
    var mm = x[1];
    var yy = x[2];
    var fdate = mm + "/" + dd + "/" + yy;
    var toDate = $("#srvChrgTo").val();
    var x1 = toDate.split("/");
    var dd1 = x1[0];
    var mm1 = x1[1];
    var yy1 = x1[2];
    var tdate = mm1 + "/" + dd1 + "/" + yy1;
    var srvcChObj = {
        rowCount: rowCount,
        dctrCheck: 0,
        ff: fdate,
        tt: tdate,
        User_Name: $("#collname").val(),
        User_Key: $("#collKey").val()
    };

    $.ajax({
        url: "/LISFY/SrChrgRptView",
        type: "POST",
        data: JSON.stringify(srvcChObj),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            event.preventDefault();
            if (data.Result === "OK") {
                //srSlNo SrDate SrLabNo SrName SrPayMode SrCharge SrCollPerson
                //window.location = "/LISFY/HomePage";
                var currentrow = $("#SrvChrgStmnt").find('tbody tr');
                //var currentrow = $("#tstAddTable").find('tbody tr');
                $.each(data.Record, function (index, srvcChrg) {
                    if (index > 0) {
                        currentrow = $(currentrow).clone();
                        $("#SrvChrgStmnt tbody").append($(currentrow));
                        currentrow = $("#SrvChrgStmnt tbody tr:last");
                    }
                    var Invdate = srvcChrg.Inv_Date;

                    $(currentrow).find("#srSlNo").text((index + 1));
                    $(currentrow).find("#SrDate").text(Invdate);
                    $(currentrow).find("#SrLabNo").text(srvcChrg.Inv_No);
                    $(currentrow).find("#SrName").text(srvcChrg.Inv_name);
                    $(currentrow).find("#SrPayMode").text(srvcChrg.Inv_PayMode);
                    $(currentrow).find("#SrCharge").text(srvcChrg.Inv_Schrge);
                    $(currentrow).find("#SrCollPerson").text(srvcChrg.AhMst_pName);

                })
                $('#collKey').val("");
                $('#collPhno').val("");
                $('#collname').val("");

            }
            else {

            }
        }

    })

})
$("#newSrvcChrgRpt").on("click.newSrvcChrgRpt", function () {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    //$('#usrName').val("");collnameCheck
    //$('#collnameCheck').checked;
    //$('#collnameCheck').checked = true;
    $("input[name='collCheck']").each(function () {
        if ($(this).val() !== "Name") {
            $(this).prop("checked", false);
            //$('#collnameCheck').prop("checked", true);
        }
    });
    $('#collname').val("");
    //$('#usrWsSmryTo').val("");collKey collPhno collname
    $('#SrvChrgStmnt tbody tr:not(:last)').remove();
    var currentrow = $("#SrvChrgStmnt tbody tr:last");
    $(currentrow).find("#srSlNo").text((""));
    $(currentrow).find("#SrDate").text("");
    $(currentrow).find("#SrLabNo").text("");
    $(currentrow).find("#SrName").text("");
    $(currentrow).find("#SrPayMode").text("");
    $(currentrow).find("#SrCharge").text("");
    $(currentrow).find("#SrCollPerson").text("");
    $('#srvChrgFrm').val(today);
    $('#srvChrgTo').val(today);
    $('#collKey').val("");
    $('#collPhno').val("");
    $('#collname').val("");
    //$("#usrName").focus();
})
$(document).ready(function () {
    //$("#usrCheck").click(function () {
    if ($("#collnameCheck").is(':checked') === true) {

        $('#collname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchSrvcUsrName",
                    data: { term: $("#collname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {

                $("#collPhno").val(ui.item.val);
                $("#collKey").val(ui.item.id);
                $("#collname").val(ui.item.label);
            }

        })
    }

})
$("#collnameCheck").click(function () {
    if ($("#collnameCheck").is(':checked') === true) {

        $('#collname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchSrvcUsrName",
                    data: { term: $("#collname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#collPhno").val(ui.item.val);
                $("#collKey").val(ui.item.id);
                $("#collname").val(ui.item.label);
            }

        })
    }
})
$("#collPhnoCheck").click(function () {
    if ($("#collPhnoCheck").is(':checked') === true) {

        $('#collname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchSrvcUsrPhno",
                    data: { term: $("#collname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#collPhno").val(ui.item.val);
                $("#collKey").val(ui.item.id);
                $("#collname").val(ui.item.label);
            }

        })
    }
})
$("#collcodeCheck").click(function () {
    if ($("#collcodeCheck").is(':checked') === true) {

        $('#collname').autocomplete({
            source: function (request, response) {

                $.ajax({
                    type: 'GET',
                    url: "/LISFY/SearchSrvcUsrCode",
                    data: { term: $("#collname").val() },
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.Result === "OK") {


                            response($.map(data.Records, function (Record) {
                                return {
                                    label: Record.AhMst_pName,
                                    val: Record.AhMst_mobile,
                                    id: Record.AhMst_Key

                                }

                            }))


                        }


                    }
                });

            },

            minLength: 1,
            select: function (event, ui) {
                $("#collPhno").val(ui.item.val);
                $("#collKey").val(ui.item.id);
                $("#collname").val(ui.item.label);
            }

        })
    }
})
$("#srvcChrgClose").on("click.srvcChrgClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////
$(document).ready(function () {
    $('#srvChrgFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#srvChrgToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#srvChrgFrmClndr").change(function () {
        var val = $("#srvChrgFrmClndr").val();
        $("#srvChrgFrm").val(val);
    });
    $('#srvChrgFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#srvChrgToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#srvChrgToClndr").change(function () {
        var val = $("#srvChrgToClndr").val();
        $("#srvChrgTo").val(val);
    });

})
$("#btnNewPtntList").on("click.btnNewPtntList", function () {
    //patientCheck
    if ($("#WithOutDctrChck").is(':checked') === true) {
        event.preventDefault();
        //$('#NewPatientStmnt tbody tr:not(:last)').remove();

        var rowCount = $("#NewPatientStmnt tbody tr").length;
        var frmDate = $("#newPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#newPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var patListPrintObj = {
            rowCount: rowCount,
            dctrCheck: 0,
            ff: fdate,
            tt: tdate
        };

        $.ajax({
            url: "/LISFY/NewPatientListPrint",
            type: "POST",
            data: JSON.stringify(patListPrintObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    var currentrow = $("#NewPatientStmnt tbody tr:last");
                    $(currentrow).find("#serlNmbr").text((""));
                    $(currentrow).find("#labno").text("");
                    $(currentrow).find("#name").text("");
                    $(currentrow).find("#phone").text("");
                    $(currentrow).find("#invDate").text("");
                    window.location = "/LISFY/PDFNewPatientListPrint";
                }
                else {

                }
            }

        })
    }
    else if ($("#WithDctrChck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#NewPatientStmnt tbody tr:not(:last)').remove();
        var rowCount = $("#NewPatientStmnt tbody tr").length;
        var frmDate = $("#newPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#newPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var patListPrintObj = {
            rowCount: rowCount,
            dctrCheck: 1,
            ff: fdate,
            tt: tdate
        };
        $.ajax({
            url: "/LISFY/NewPatientListPrint",
            type: "POST",
            data: JSON.stringify(patListPrintObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    window.location = "/LISFY/PDFNewPatientListPrint";
                }
                else {


                }
                btnNewPtntView

            }

        })
    }
    else {

    }
})
$("#btnNewPtntView").on("click.btnNewPtntView", function () {
    //patientCheck
    if ($("#WithOutDctrChck").is(':checked') === true) {
        event.preventDefault();
        $('#NewPatientStmnt tbody tr:not(:last)').remove();
        var rowCount = $("#NewPatientStmnt tbody tr").length;
        var frmDate = $("#newPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#newPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var patListObj = {
            rowCount: rowCount,
            dctrCheck: 0,
            ff: fdate,
            tt: tdate
        };
        $.ajax({
            url: "/LISFY/NewPatientList",
            type: "POST",
            data: JSON.stringify(patListObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {

                    //window.location = "/LISFY/HomePage";
                    var currentrow = $("#NewPatientStmnt").find('tbody tr');
                    //var currentrow = $("#tstAddTable").find('tbody tr');
                    $.each(data.Record, function (index, newPat) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#NewPatientStmnt tbody").append($(currentrow));
                            currentrow = $("#NewPatientStmnt tbody tr:last");
                        }
                        var Invdate = newPat.Inv_Date;

                        $(currentrow).find("#serlNmbr").text((index + 1));
                        $(currentrow).find("#labno").text(newPat.Inv_No);
                        $(currentrow).find("#name").text(newPat.Inv_name);
                        $(currentrow).find("#phone").text(newPat.Inv_phno);
                        $(currentrow).find("#invDate").text(Invdate);

                    })

                }
                else {

                }
            }

        })
    }
    else if ($("#WithDctrChck").is(':checked') === true) {
        //alert("hai");
        event.preventDefault();
        $('#NewPatientStmnt tbody tr:not(:last)').remove();
        var rowCount = $("#NewPatientStmnt tbody tr").length;
        var frmDate = $("#newPtntFrm").val();
        var x = frmDate.split("/");
        var dd = x[0];
        var mm = x[1];
        var yy = x[2];
        var fdate = mm + "/" + dd + "/" + yy;
        var toDate = $("#newPtntTo").val();
        var x1 = toDate.split("/");
        var dd1 = x1[0];
        var mm1 = x1[1];
        var yy1 = x1[2];
        var tdate = mm1 + "/" + dd1 + "/" + yy1;
        var patListObj = {
            rowCount: rowCount,
            dctrCheck: 1,
            ff: fdate,
            tt: tdate
        };
        $.ajax({
            url: "/LISFY/NewPatientList",
            type: "POST",
            data: JSON.stringify(patListObj),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                event.preventDefault();
                if (data.Result === "OK") {
                    //$("#ClctnSummary2 tbody tr").remove();
                    ////window.location = "/LISFY/HomePage";
                    var currentrow = $("#NewPatientStmnt").find('tbody tr');
                    //var currentrow = $("#tstAddTable").find('tbody tr');
                    $.each(data.Record, function (index, newPat) {
                        if (index > 0) {
                            currentrow = $(currentrow).clone();
                            $("#NewPatientStmnt tbody").append($(currentrow));
                            currentrow = $("#NewPatientStmnt tbody tr:last");
                        }

                        var Invdate = newPat.Inv_Date;

                        $(currentrow).find("#serlNmbr").text((index + 1));
                        $(currentrow).find("#labno").text(newPat.Inv_No);
                        $(currentrow).find("#name").text(newPat.Inv_name);
                        $(currentrow).find("#phone").text(newPat.Inv_phno);
                        $(currentrow).find("#invDate").text(Invdate);



                    })

                }
                else {


                }


            }

        })
    }
    else {

    }
})
$(document).ready(function () {
    $('#newPtntFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $('#newPtntToClndr').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-90:+80',
        autoclose: true,
        showOn: 'both',
        timeFormat: 'hh:mm:ss',
        buttonImage: "/Content/logintemplate/img/calender.png",
        buttonImageOnly: true,
        onSelect: function () {
            dateFormat: 'dd/mm/yy'

            $(this).change();

        }
    });
    $("#newPtntFrmClndr").change(function () {
        var val = $("#newPtntFrmClndr").val();
        $("#newPtntFrm").val(val);
    });
    $('#newPtntFrmClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $('#newPtntToClndr').datepicker({
        dateFormat: 'dd/mm/yy'

    });
    $("#newPtntToClndr").change(function () {
        var val = $("#newPtntToClndr").val();
        $("#newPtntTo").val(val);
    });

})
$("#newPtntStmntClose").on("click.newPtntStmntClose", function () {
    window.location = "HomePage";
})
///////////////////////////////////////////////////////

