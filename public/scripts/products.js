$(document).ready(function() {

    $(".product .add-to-cart").on("click", function() {
        $(this).addClass("btn-success").removeClass("btn-primary").prop("disabled", true).text("Added to Cart");
    });
    
    const api_url = $("#api_url").data("url");
    
})