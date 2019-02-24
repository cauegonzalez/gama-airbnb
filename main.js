var domReady = function(ready) {
    if (document.readyState != 'loading') return ready();
    document.addEventListener('DOMContentLoaded', ready);
    function _ready() {
        document.removeEventListener('DOMContentLoaded', ready);
        ready();
    }
}

var arrayDaBusca = [];

domReady(function() {
    // quando esta função correr o DOM está acessível
    try
    {
        var loader = new XMLHttpRequest();
    }
    catch (err)
    {
        // versões antigas do Internet Explorer não tem a classe XMLHttpRequest, precisa usar esse componente ActiveX
        var loader = new ActiveXObject('Microsoft.XMLHTTP');
    }

    var imoveisStr = '';
    var imoveis = [];

    loader.onreadystatechange = function ()
    {
        // esse callback é chamado várias vezes para cada mudança de readyState
        // readyState 4 é chamado quando o request é concluído (mesmo que .done() do jQuery)
        // você também pode checar o this.status para ver código de retorno HTTP
        // 200 é sucesso
        // 404 é página não encontrada
        // 403 é acesso negado
        // 500 é erro interno do servidor etc
        if (this.status == 200 && this.readyState == 4)
        {
            imoveis = JSON.parse(this.responseText);
            localStorage.setItem('imoveis', JSON.stringify(imoveis));
            console.log(imoveis);
            imoveis.forEach(function(imovel){
                // alimenta um array para realizar a busca por qualquer elemento
                arrayDaBusca.push({"text": imovel.name,"id": imovel.id});
                arrayDaBusca.push({"text": imovel.property_type,"id": imovel.id});
                arrayDaBusca.push({"text": imovel.city,"id": imovel.id});
                arrayDaBusca.push({"text": imovel.state,"id": imovel.id});
                arrayDaBusca.push({"text": imovel.address,"id": imovel.id});
                arrayDaBusca.push({"text": imovel.price,"id": imovel.id});

                // imoveisStr += `<div class="material-download">
                // <img src="${imovel.photo}" alt="${imovel.name}" width='200'>
                // <div class="row button botoes center">
                // <a href="index.html?${imovel.id}">
                // <button type="button" class="btn btn-dark">ver</button>
                // </a>
                // </div>
                // </div>`;

                imoveisStr += `<div class="acomodacao-page"> 
                    <div class="photo-acomodacao"> 
                        <img src="${imovel.photo}">
                    </div>
                    <div class="home-description">
                        <div class="tipo">${imovel.property_type}</div>
                        <div class="descript-acomodacao">${imovel.name}</div>
                        <div class="valor-acomodacao">
                            <span class="valor-diaria">R$ ${imovel.price}/noite</span> · <span class="valor-total">${imovel.rooms} quartos </span>
                        </div>
                    </div>
                </div> `;
            });
            // console.log(arrayDaBusca);
            document.getElementById('container').innerHTML = imoveisStr;
            // alert(this.responseText);
        }
    }
    loader.open('GET', 'http://airbnb.douglasmaia.com/api/properties', true);
    loader.send(); // use null para métodos que não forem POST


});

// function busca(texto) {
//     var arrayId;
//     arrayId = arrayDaBusca.filter(function(item) {
//         return item.text == texto;
//     });
//     id = arrayId[0];
//     console.log('aqui')
//     console.log(arrayId);
//     imoveis = JSON.parse(localStorage.getItem('imoveis'));
//     var imovel = imoveis.find(function(imovel){
//         return imovel.id == id;
//     });
//     console.log(arrayDaBusca);
// }

// busca('SP');