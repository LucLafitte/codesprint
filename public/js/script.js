$("#selctCountry").on("change", function(){
    let country = $(this).val()
    $.ajax({
        method: "POST",
        url: "/country",
        data: {country: country},
        success: function(){
            console.log(success)
        }
    })
})