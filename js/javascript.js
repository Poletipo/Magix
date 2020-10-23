

window.addEventListener("load", () => {
    setInterval(updateLights, 50)
})


const updateLights = () =>{
    console.log("Doot");

    fetch("ajax.php", {
        method : "POST",
        credentials : "include"
    })
    .then(response => response.json())
    .then(data =>{
        data.forEach(light => {
            if(light.status == 1)
                document.querySelector("#" + light.name).src = "img/light-on.png"
            else
                document.querySelector("#" + light.name).src = "img/light-off.png"
        });
    })


}