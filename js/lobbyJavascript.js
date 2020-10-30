
window.addEventListener("load", () =>{
    let buttons = document.querySelectorAll("button");
    

    buttons.forEach(btn => {
        btn.onclick = () =>{sendForm(btn.name)};
    })
})


const sendForm = name =>{
    let formData = new FormData();
    formData.append("name", name);

    console.log("tha name: " + name);

    fetch("lobbyAjax.php",{
        method : "POST",
        credentials : "include",
        body : formData
    })
    //.then(response => console.log(response))
    .then(() =>{
        if(name == "quitter"){
            window.location.href = "index.php";
        }
    })
}