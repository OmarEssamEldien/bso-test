const api_url = $("#api_url").data("url");
const api_token = $("#api_url").data("token");
console.log("Hello From Main.js");

function getFormDataJson(formElm){
    var unindexed_array = $(formElm).serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}