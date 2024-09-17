$(document).ready(function() {

    $("#loginForm").on("submit", function(e) {
        e.preventDefault();

        const form = this
        const data = getFormDataJson(form);

        $.ajax({
            type:"POST",
            url:"api/login",
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
                    $(form).find(".response").html('<div class="alert alert-success">Logged in Successfully, Redirecting...</div>')
                    setTimeout(()=>{window.location.href="./"}, 3000);
                } else {
                    $(form).find(".response").html('<div class="alert alert-danger">'+(r.error ? r.error : 'Something Went Wrong #2')+'</div>')
                }
            },
            error: function(r) {
                $(form).find(".response").html('<div class="alert alert-danger">Something Went Wrong #1</div>')
                console.log("Error:\r\n", r);

            }
        })

    });

});