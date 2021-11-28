document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(() => {
        gerarlista()
        document.querySelector('#loading').style.display = 'none';
        document.querySelector('#tudo').style.display = 'flex';
        estados();

    }, 2000)


});

macaco = () => {
    document.querySelector('.fundo_modal').style.display = 'flex';
    console.log('clickei aqui no adicionar')
}

gerarlista = () => {

    let limpa = document.querySelectorAll('.itemslista')
    if (limpa[0]) {
        document.querySelectorAll('.itemslista').forEach((elemento, index) => {
            elemento.remove()
        })
    }
    if (localStorage.getItem("lista")) {
        let vetor = JSON.parse(localStorage.getItem("lista"))
        vetor.map((elemento, index) => {
            document.querySelector('#lista').innerHTML += `
            
            <div class="col-12 row itemslista">
            <div class="col-3 contcidade_img">
                <span> ${elemento.cidade}</span>
                <img src='${elemento.url}'  class="img-fluid"/>  
            </div>
            <div class="col-2">
                ${elemento.estado}
            </div>
            <div class="col-2">${elemento.data}</div>
            <div class="col-3">
            <span class='msglsita'>${elemento.mensagem}</span>
           
            </div>
            <div class="col-2 contfunçoes">
            <i class="fas fa-trash-alt" onclick="remover(${index})"></i>
            </div>
        </div> `
        })
    } else {

    }
}





remover = (a) => {
    let r = confirm('deseja remover este item?')
    if (r == true) {
        let vetor = JSON.parse(localStorage.getItem("lista"))
        var indice = vetor.indexOf(a);
        while (indice >= 0) {
            vetor.splice(indice, 1);
            indice = vetor.indexOf(buscar);
        }
        let novo = vetor.filter((elemento, index) => { if (index == a) { return false } else { return true } })
        let texto_vetor = JSON.stringify(novo)
        localStorage.setItem('lista', texto_vetor)
        gerarlista()
    } else {

    }
}


formatar = (textodata) => {
    let a = textodata.substring(8, 10) + '/' + textodata.substring(5, 7) + '/' + textodata.substring(0, 4)
    return a
}




document.querySelector('#adicionarvaii').addEventListener('click', async() => {
    document.querySelector('.fundo_modal').style.display = 'flex';
    console.log('clickei aqui no adicionar')
})

document.querySelector('.butaofecharmodal').addEventListener('click', () => {
    document.querySelector('.fundo_modal').style.display = 'none'
})

document.querySelector('#estado').addEventListener('change', (a) => {
    cidade(a.target.selectedOptions[0].value)
})

document.querySelector('#salvar').addEventListener('click', () => {
    let estado_selecinado = document.querySelector('#estado').selectedOptions[0];
    let cidade_selecionado = document.querySelector('#cidade').selectedOptions[0];
    let data_selecionado = document.querySelector('#data').value
    if (estado_selecinado && cidade_selecionado && data_selecionado != '') {
        let data2 = formatar(data_selecionado)
        if (localStorage.getItem("lista")) {
            let vetor = JSON.parse(localStorage.getItem("lista"))
            let foto = document.querySelector('#img').files[0];
            let url = '';
            if (foto) {
                const files = new FileReader();
                files.addEventListener('load', () => {

                    let item = {
                        "cidade": document.querySelector('#cidade').selectedOptions[0].label,
                        "estado": document.querySelector('#estado').selectedOptions[0].label,
                        "mensagem": document.querySelector('#memoria').value,
                        "data": data2,
                        "url": files.result
                    }

                    vetor.push(item)

                    let texto_vetor = JSON.stringify(vetor)

                    localStorage.setItem('lista', texto_vetor)
                    document.querySelector('#cidade').disabled = true;
                    document.querySelector('#cidade').innerHTML = ``;
                    document.querySelector('#cidade').parentNode.children[2].style.display = 'none';
                    document.querySelector('#memoria').value = '';
                    document.querySelector('#img').value = ''
                    document.querySelector('.fundo_modal').style.display = 'none'



                })
                files.readAsDataURL(foto)
                gerarlista()
            } else {
                let item = {
                    "cidade": document.querySelector('#cidade').selectedOptions[0].label,
                    "estado": document.querySelector('#estado').selectedOptions[0].label,
                    "mensagem": document.querySelector('#memoria').value,
                    "data": data2,
                    "url": ''
                }
                vetor.push(item)

                let texto_vetor = JSON.stringify(vetor)

                localStorage.setItem('lista', texto_vetor)
                document.querySelector('#cidade').disabled = true;
                document.querySelector('#cidade').innerHTML = ``;
                document.querySelector('#cidade').parentNode.children[2].style.display = 'none';
                document.querySelector('#memoria').value = '';
                document.querySelector('#img').value = ''
                document.querySelector('.fundo_modal').style.display = 'none'
                gerarlista()
            }




        } else {
            let vetor = []
            let foto = document.querySelector('#img').files[0];
            let url = '';
            if (foto) {
                const files = new FileReader();
                files.addEventListener('load', () => {

                    let item = {
                        "cidade": document.querySelector('#cidade').selectedOptions[0].label,
                        "estado": document.querySelector('#estado').selectedOptions[0].label,
                        "mensagem": document.querySelector('#memoria').value,
                        "data": data2,
                        "url": files.result
                    }

                    vetor.push(item)

                    let texto_vetor = JSON.stringify(vetor)

                    localStorage.setItem('lista', texto_vetor)
                    document.querySelector('#cidade').disabled = true;
                    document.querySelector('#cidade').innerHTML = ``;
                    document.querySelector('#cidade').parentNode.children[2].style.display = 'none';
                    document.querySelector('#memoria').value = '';
                    document.querySelector('#img').value = ''
                    document.querySelector('.fundo_modal').style.display = 'none'



                })
                files.readAsDataURL(foto)
                gerarlista()
            } else {
                let item = {
                    "cidade": document.querySelector('#cidade').selectedOptions[0].label,
                    "estado": document.querySelector('#estado').selectedOptions[0].label,
                    "mensagem": document.querySelector('#memoria').value,
                    "data": data2,
                    "url": ''
                }
                vetor.push(item)

                let texto_vetor = JSON.stringify(vetor)

                localStorage.setItem('lista', texto_vetor)
                document.querySelector('#cidade').disabled = true;
                document.querySelector('#cidade').innerHTML = ``;
                document.querySelector('#cidade').parentNode.children[2].style.display = 'none';
                document.querySelector('#memoria').value = '';
                document.querySelector('#img').value = '';
                document.querySelector('.fundo_modal').style.display = 'none'

                gerarlista()
            }
        }

    } else {
        alert('verifique os dados!')
    }
})
https: //servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios


    estados = async() => {

        const resposta = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            cache: 'default'
        });
        let dados_mesmos = await resposta.json();
        dados_mesmos.map(elemento => {
            document.querySelector('#estado').innerHTML += `<option value=${elemento.sigla}>${elemento.nome}</option>`
        })

    }


cidade = async(UF) => {
    document.querySelector('#cidade').disabled = true
    document.querySelector('#cidade').innerHTML = ``
    document.querySelector('#cidade').parentNode.children[2].style.display = 'flex'
    const resposta = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${UF}/municipios`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        cache: 'default'
    });
    let dados_mesmos = await resposta.json();

    if (dados_mesmos) {
        dados_mesmos.map(elemento => {
            document.querySelector('#cidade').innerHTML += `<option value=${elemento.id}>${elemento.nome}</option>`
        })
        document.querySelector('#cidade').parentNode.children[2].style.display = 'none'
        document.querySelector('#cidade').disabled = false
    } else {
        document.querySelector('#cidade').parentNode.children[2].style.display = 'none'
        document.querySelector('#cidade').disabled = true
        alert('erro ao carregar cidades tente novamente!')
    }


}