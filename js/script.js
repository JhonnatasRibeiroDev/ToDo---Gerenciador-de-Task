const addTask = document.querySelector(".fa-plus")
const telaPrincipal = document.querySelector(".telaPrincipal")
const telaPrincipal2 = document.querySelector(".telaPrincipal2")
const todoList = document.querySelector(".todoList")
const btnCancelar = document.querySelector(".btn-cancelar")
const btnCriar = document.querySelector(".btn-criar")
const inputTitulo = document.querySelector("#input-titulo")
const inputDrescricao = document.querySelector("#input-descricao")
const todo = document.querySelector(".todo")
const not1 = document.querySelector(".notificacao1")
const not2 = document.querySelector(".notificacao2")
let armazem = []
let i = 0
let teste

teste = JSON.parse(localStorage.getItem('jhonh'))
//console.log(teste)
if (localStorage.jhonh) {
    armazem = JSON.parse(localStorage.getItem('jhonh'))
    console.log(armazem.filter(Boolean))
    while (i < armazem.length) {
        if (armazem[i].length != 0 && armazem[i][2]) {
            todoList.innerHTML += `<section class="todo ${armazem[i][2]}">
        <article class="conteudo" id="conteudo">
            <h3 class="tituloConteudo">${armazem[i][0]}</h3>
            <p class="pConteudo">${armazem[i][1]}</p>
        </article>
        <div class="btn" id="btn">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-trash-can"></i>
        </div>
        </section>`
        }
        i++
    }
}
function removerLocalStorage(titulo, descricao) {
    for (let i = 0; i < armazem.length; i++) {
        for (let j = 0; j < armazem[i].length; j++) {
            if (armazem[i][j] == titulo) {
                console.log("Titulo: " + armazem[i][j])
                let indice = armazem[i].indexOf(titulo);
                if (indice !== -1) {
                    armazem[i].splice(indice, 1);

                }

            }
            if (armazem[i][j] == descricao) {
                console.log("Descrição: " + armazem[i][j])
                let indice = armazem[i].indexOf(descricao);
                if (indice !== -1) {
                    armazem[i].splice(indice, 1);
                    console.log(armazem)
                }
            }
        }
    }
    localStorage.jhonh = JSON.stringify(armazem)
}

const toggleForms = () => {
    telaPrincipal.classList.toggle("hide")
    telaPrincipal2.classList.toggle("hide")
}

addTask.addEventListener("click", () => {
    toggleForms()
    inputTitulo.focus()
})
btnCancelar.addEventListener("click", () => {
    toggleForms()
})


btnCriar.addEventListener("click", () => {
    if (inputTitulo.value && inputDrescricao.value) {
        toggleForms()
        todoList.innerHTML += `<section class="todo">
        <article class="conteudo" id="conteudo">
            <h3 class="tituloConteudo">${inputTitulo.value}</h3>
            <p class="pConteudo">${inputDrescricao.value}</p>
        </article>
        <div class="btn" id="btn">
            <i class="fa-solid fa-check"></i>
            <i class="fa-solid fa-trash-can"></i>
        </div>
        </section>`
        let tituDes = []
        tituDes[0] = inputTitulo.value
        tituDes[1] = inputDrescricao.value
        tituDes[2] = 'talvez'
        armazem.push(tituDes)
        localStorage.jhonh = JSON.stringify(armazem)
        inputTitulo.value = ""
        inputDrescricao.value = ""
        inputTitulo.focus()
    } else {
        not2.innerText = "Um dos campos está vazio!"
        not2.style.backgroundColor = "red"
        not2.style.boxShadow = "0px 0px 10px red"
        not2.style.opacity = "100%"
        setTimeout(function () {

            not2.style.opacity = "0%"
        }, 2000)

    }
})

document.addEventListener("click", (e) => {
    const elementSele = e.target
    const parent = elementSele.closest("section")
    const conteudo1 = (parent.childNodes[1])
    const titulo = conteudo1.childNodes[1].textContent
    const descricao = conteudo1.childNodes[3].textContent
    let arrayd = [titulo, descricao]
    console.log(titulo.length)

    // console.log(descricao)
    //console.log(arrayd)
    //console.log(JSON.stringify(armazem))
    //console.log(JSON.stringify(armazem).slice(''))


    console.log(armazem)






    if (elementSele.classList.contains("fa-check")) {
        parent.classList.toggle("completa")
        i=0
        console.log(titulo)
        while (i < armazem.length) {
                if(armazem[i][0]== titulo){
                    if(armazem[i][2] === "completa"){
                        armazem[i][2] = "talvez"
                    }else{
                        armazem[i][2] = "completa"
                    }
                    
                }
            
            i++
        }
        localStorage.jhonh = JSON.stringify(armazem)
        console.log(armazem)




        if (parent.classList.contains("completa")) {
            not1.innerText = "Tarefa Concluída!"
            not1.style.backgroundColor = "green"
            not1.style.boxShadow = "0px 0px 10px green"
            not1.style.opacity = "100%"
            setTimeout(function () {
                not1.style.opacity = "0%"
            }, 2000)
        }
    }
    if (elementSele.classList.contains("fa-trash-can") && parent.classList.contains("completa")) {
        removerLocalStorage(titulo, descricao)
        parent.classList.add("apagar")

        setTimeout(() => {
            parent.remove()
        }, 500);
    } else {
        if (elementSele.classList.contains("fa-trash-can")) {
            not1.innerText = "Tarefa não Concluída!"
            not1.style.backgroundColor = "red"
            not1.style.boxShadow = "0px 0px 10px red"
            not1.style.opacity = "100%"
            setTimeout(function () {

                not1.style.opacity = "0%"
            }, 2000)
        }
    }
})



