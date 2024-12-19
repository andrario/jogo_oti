const socket = io({autoConnect: false});

document.getElementById("join-btn").addEventListener("click", function() {
    let username = document.getElementById("username").value;

    socket.connect();

    socket.on("connect", function() {
        socket.emit("user_join", username);
    })

    document.getElementById("jogo").style.display = "inline-block";
    document.getElementById("cartaFace").innerHTML = document.getElementById("username").value
    let textoCarta = document.getElementById("cartaFace").innerHTML;
    document.getElementById("cartaFace").style.fontSize = `${75/textoCarta.length}vw`

    document.getElementById("landing").style.display = "none";
})

 document.getElementById("sortear").addEventListener("click", function (event) {
    socket.emit("sortear", "ola");
})

document.getElementById("cor").addEventListener("change", function (event) {
    let cor = document.getElementById("cor").value
    document.getElementById("frente").style.backgroundColor = cor;
    document.getElementById("verso").style.backgroundColor = cor;
})

// document.getElementById("carta").addEventListener("click", function (event) {
//     let estado = document.getElementById("numeroCarta").style.display
//     if(estado!="none"){
//         document.getElementById("numeroCarta").style.display = "none";
//     }
//     else{
//         document.getElementById("numeroCarta").style.display = "inline-block";
//     }
// })

socket.on("chat", function(data) {
    console.log(data)
    document.getElementById("numeroCarta").innerHTML = data["message"]
})

document.getElementById("carta").addEventListener("click", function (event){
    let rotacao = document.getElementsByClassName("carta-conteudo")[0].style.transform
    if (rotacao=="rotateY(180deg)"){
        document.getElementsByClassName("carta-conteudo")[0].style.transform = "rotateY(0deg)"
    }
    else{
        document.getElementsByClassName("carta-conteudo")[0].style.transform = "rotateY(180deg)"
    }
})

function setup(){
    let cor = document.getElementById("cor").value
    document.getElementById("frente").style.backgroundColor = cor;
    document.getElementById("verso").style.backgroundColor = cor;
    document.getElementById("numeroCarta").style.display = "inline-block";
}
setup()