$(document).ready(function() {

    $("#registerForm").on("submit", function(e) {
        e.preventDefault();

        const form = this
        const data = getFormDataJson(form);

        $.ajax({
            type:"POST",
            url:"api/register",
            data:JSON.stringify( { data : data } ),
            dataType:"json",
            headers:{"Content-Type": "application/json"},
            beforeSend:function() {
                $(form).find(".response").html('')
                $(form).find(".error").remove();
            },
            success:function(r) {
                if(r.success) {
                    $(form).trigger("reset");
                    $(form).find(".response").html('<div class="alert alert-success">Registered Successfully, You Can <a href="/login">Login</a> Now</div>')
                } else {
                    $(form).find(".response").html('<div class="alert alert-danger">'+(r.error ? r.error : 'Something Went Wrong #2')+'</div>')
                }
            },
            error: function(r) {
                $(form).find(".response").html('<div class="alert alert-danger">Something Went Wrong #1</div>')
                console.log("Error:\r\n", r);

                // console.log(r.responseJSON.error.message);
                // if(r.responseJSON.error.details && r.responseJSON.error.details.errors) {
                //     errors = r.responseJSON.error.details.errors
                //     for(let i = 0; i < errors.length; i++) {
                //         $(form).find(`[name=${errors[i]["path"][0]}]`).after(`<p class="error text-danger">${errors[i]["message"]}</p>`)
                //     }
                //     $(form).find(".response").html('<div class="alert alert-danger">'+(r.error.message || 'Something Went Wrong #2')+'</div>')
                // }

            }
        })

    });

});