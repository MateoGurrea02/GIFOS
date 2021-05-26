window.onload = function(){
    let modoNocturno = document.getElementById('modoNocturno')
    let body = document.getElementById('body')
    let logo = document.getElementById('logo')
    let lupa = document.getElementById('lupa')
    let crearGifo = document.getElementById('crearGifo')
    let menu = document.getElementById('menu')
    let hamburguesa = document.getElementById('iconoMenu')
    let sliderR = document.getElementById('btnSliderR')
    let sliderL = document.getElementById('btnSliderL')
    let darkMode = false
    let tendenciasTitulo = document.getElementById('tendenciasTitulo')
    let card
    let gifHijo = document.getElementById('gifHijo')
    let overlay
    let input = document.getElementById('input')
    let gifFavLista = JSON.parse(localStorage.getItem('fav'))
    let ulBuscador = document.getElementById('ulBuscador')
    let busq = document.getElementById('busq')
    let tituloPrinc = document.getElementById('tituloPrinc')
    let form = document.getElementById('form') 
    let artBusqueda = document.getElementById('artBusqueda') 
    let cardPadre
    let btnVerMas
    let sugerenciaId
    
    function pagPrincipal(){
        logo.addEventListener('click', () =>{
            window.location.href = 'http://127.0.0.1:5500/index.html'
        })
    }

    //modo nocturno y diurno
    function nightMode (){
        modoNocturno.addEventListener('click', () =>{
            body.classList.toggle('modoNocturnoBody')
            if(darkMode){
                modoNocturno.innerText = "Modo Nocturno"
                logo.setAttribute('src', "./images/logo-mobile.svg")
                lupa.setAttribute('src', "./images/icon-search.svg")
                crearGifo.setAttribute('src',"./images/button-crear-gifo.svg")
                hamburguesa.setAttribute('src', "./images/close.svg")
                sliderL.classList.toggle('btnSliderLNoct')
                sliderL.classList.toggle('btnSliderL')
                sliderR.classList.toggle('btnSliderRNoct')
                sliderR.classList.toggle('btnSliderR')
                // hover de iconos segun el tema
                iconoHover('crearGifo', './images/button-crear-gifo.svg', './images/CTA-crear-gifo-hover.svg')
                iconoHover('instagram', './images/icon_instagram.svg', './images/icon_instagram-hover.svg')
                iconoHover('facebook', './images/icon_facebook.svg', './images/icon_facebook_hover.svg')
                iconoHover('twitter', './images/icon-twitter.svg', './images/icon-twitter-hover.svg')
                darkMode = false
            }else{
                modoNocturno.innerText = "Modo Diurno"
                logo.setAttribute('src', "./images/logo-mobile-modo-noct.svg")
                lupa.setAttribute('src', "./images/icon-search-modo-noct.svg")
                crearGifo.setAttribute('src',"./images/button-crear-gifo-noct.svg")
                hamburguesa.setAttribute('src', "./images/close-modo-noct.svg")
                sliderL.classList.toggle('btnSliderLNoct')
                sliderL.classList.toggle('btnSliderL')
                sliderR.classList.toggle('btnSliderRNoct')
                sliderR.classList.toggle('btnSliderR')
                // hover de iconos segun el tema
                iconoHover('crearGifo', './images/button-crear-gifo-noct.svg', './images/button-crear-gifo-noct-hover.svg')
                iconoHover('instagram', './images/icon_instagram.svg', './images/icon_instagram-hover.svg')
                iconoHover('facebook', './images/icon_facebook.svg', './images/icon_facebook_hover.svg')
                iconoHover('twitter', './images/icon-twitter.svg', './images/icon-twitter-hover.svg')
                darkMode = true
            }

        })
        if(!darkMode){
            iconoHover('crearGifo', './images/button-crear-gifo.svg', './images/CTA-crear-gifo-hover.svg')
            iconoHover('instagram', './images/icon_instagram.svg', './images/icon_instagram-hover.svg')
            iconoHover('facebook', './images/icon_facebook.svg', './images/icon_facebook_hover.svg')
            iconoHover('twitter', './images/icon-twitter.svg', './images/icon-twitter-hover.svg')
        }

    }




    //despliege del menu hamburguesa con estilos de modo nocturno y diurno
    function desplegarMenu (){
    let hamburguesa = document.getElementById('iconoMenu')
    hamburguesa.addEventListener('click',(e) =>{
        let despliega = e.target.getAttribute('src');

        if(despliega == "./images/burger.svg"){
            e.target.setAttribute('src', "./images/close.svg")
            menu.classList.toggle('noActivo')
            menu.classList.toggle('activo')
        }else if(despliega == "./images/close.svg"){
            e.target.setAttribute('src', "./images/burger.svg")
            menu.classList.toggle('noActivo')
            menu.classList.toggle('activo')
        }else if(despliega == "./images/close-modo-noct.svg"){
            e.target.setAttribute('src', "./images/burger-modo-noct.svg")
            menu.classList.toggle('noActivo')
            menu.classList.toggle('activo')
        }else if(despliega == "./images/burger-modo-noct.svg"){
            e.target.setAttribute('src', "./images/close-modo-noct.svg")
            menu.classList.toggle('noActivo')
            menu.classList.toggle('activo')
        }
    })

    }


    //funcion de Hover de iconos
    function iconoHover(idIcono, url, nuevaUrl){
        let  icono = document.getElementById(idIcono)
        icono.addEventListener('mouseover', () =>{
            icono.setAttribute('src',nuevaUrl)
        })
        icono.addEventListener('mouseout', ()=>{
            icono.setAttribute('src',url)
        })

    }
    //funcion para estilos de scroll del header
    function scrollHeader(){
        let headerId = document.getElementById('header')
        window.addEventListener('scroll', () =>{
            let posicionDelScroll = window.scrollY

            if(posicionDelScroll >= 1){
            headerId.classList.add('headerScroll')
            }else{
                headerId.classList.remove('headerScroll')
            }
        })
    }

    //fetch  de los gifos trending
    async function gifosTrending(){
        let response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq&limit=25&rating=g')
        let info = await response.json()
        renderGifos(info)
    }


    function renderGifos(info){
        let buttonFav = []
        for(let i = 0; i < 25;i++){
            card = document.createElement('div')
            card.classList.add('card')
            card.innerHTML = `<div class="original"><img class="trendingGif" src='${info.data[i].images.original.url}'></img></div>`;
            gifHijo.appendChild(card)
            overlay = document.createElement('div')
            overlay.classList.add('overlay')
            overlay.innerHTML = `<ul>
                                    <li><img class="fav" id="fav${i}" src="./images/icon-fav.svg"></li>
                                    <li><a  id="downloadHref${i}"><img class="download" id="download${i}" src="./images/icon-download.svg"></a></li>
                                    <li><a href="#header"><img class="fullScreen" id="fullScreen${i}" src="./images/icon-max-normal.svg"></a></li>
                                </ul>
                                <div class="userTitle">
                                    <p>${info.data[i].username}</p>
                                    <p>${info.data[i].title}</p>
                                </div`
            card.appendChild(overlay)           
            //boton de favoritos
            buttonFav[i] = document.getElementById(`fav${i}`)
            buttonFav[i].addEventListener('click', ()=>{                
                if(gifFavLista.some((element)=> element.id === info.data[i].id)){
                    let encontrarPosicion = gifFavLista.findIndex((element)=> element.id === info.data[i].id)                    
                    gifFavLista.splice(encontrarPosicion, 1)
                    let gifFavListaJson = JSON.stringify(gifFavLista)
                    localStorage.setItem('fav',gifFavListaJson)
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav.svg")
                }else{
                    gifFavLista.push(info.data[i])
                    let gifFavListaJson = JSON.stringify(gifFavLista)
                    localStorage.setItem('fav',gifFavListaJson)
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav-active.svg")
                }
            })

            //ver gif completo
            let fullScreen = document.getElementById(`fullScreen${i}`)
            let gif = info.data[i].images.original.url
            let titulo = info.data[i].title
            let user = info.data[i].username
            let favId = `fav${i}`
            gifTamañoOriginal(fullScreen, gif, titulo, user, favId)

            //descargar gif
            let downloadHref = document.getElementById(`downloadHref${i}`)
            let urlGifs = info.data[i].images.original.url
            downloadFile(i, info, downloadHref, urlGifs)
        }

    }
    
    async function textoTrending(){
        let response = await fetch('https://api.giphy.com/v1/trending/searches?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq')
        let info = await response.json()

        renderTextoTrending(info)
    }

    function renderTextoTrending(info){
        let nuevoItemPadre = document.createElement('div')
        nuevoItemPadre.classList.add('nuevoItemPadre')
        tendenciasTitulo.appendChild(nuevoItemPadre)
        for(let i = 0;i < 5;i++){
            let nuevoItem = document.createElement('div')
            nuevoItem.classList.add('trendingText')
            nuevoItem.innerHTML =`<p id="trendingText${i}">${info.data[i]} ,</p>`
            nuevoItemPadre.appendChild(nuevoItem)
            let busqueda = info.data[i]
            let trendingText = document.getElementById(`trendingText${i}`)
            trendingText.addEventListener('mouseenter',()=>{
                trendingText.classList.add('lineaVioleta')
            })
            trendingText.addEventListener('mouseout',()=>{
                trendingText.classList.remove('lineaVioleta')
            })
            trendingText.addEventListener('click',()=>{
                infoBusqueda(busqueda)
            })
        }
    }


    async function infoSugerencias(busqueda){
        try{
            let response = await fetch(`https://api.giphy.com/v1/tags/related/{${busqueda}}?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq`)
            let info = await response.json()
            renderSugBuscador(info)
        }
        catch{
            console.warn('Esa busqueda no tiene resultado')
        }
    }
    let sugerencia=[]
    function renderSugBuscador(info){
        ulBuscador.innerHTML = ''
        let newItem
        for(let i = 0;i < 5;i++){
            newItem = document.createElement('li')
            newItem.classList.add('lisugerencia')
            newItem.innerHTML = `<img src="./images/icon-search.svg"><p id="sugerencia${i}">${info.data[i].name}</p>`
            ulBuscador.appendChild(newItem)
            sugerencia[i] = document.getElementById(`sugerencia${i}`)
            sugerencia[i].addEventListener('click',()=>{
                infoBusqueda(info.data[i].name)
            })
        }
        
        
    }


    //eventos de la lupa con modo nocturno y diurno
    function inputListener(){
        //eliminando sugerencias de busqueda al tocar el icon close
        lupa.addEventListener('click',()=>{
            input.classList.remove('inputConSugerenciasActivadas')
            ulBuscador.innerHTML = ''
            input.value = ''
            ulBuscador.classList.remove('sugerenciasActivas')
        })
        //cambio de icono de lupa con close
        lupa.addEventListener('click',()=>{
            if(lupa.getAttribute('src') === './images/close.svg'){
                lupa.setAttribute('src', './images/icon-search.svg')
            }else if(lupa.getAttribute('src') === './images/close-modo-noct.svg'){
                lupa.setAttribute('src', './images/icon-search-modo-noct.svg')
            }
        })

        //cambio de icono de lupa con close en modo noctrno
        input.addEventListener('click',()=>{
            if(lupa.getAttribute('src') === './images/icon-search-modo-noct.svg'){
                lupa.setAttribute('src', './images/close-modo-noct.svg')
            }else if(lupa.getAttribute('src') === './images/icon-search.svg'){
                lupa.setAttribute('src', './images/close.svg')
            }
        })
        //despliege de sugerencias
        sugerenciaId  = document.getElementById(`sugerencia0`)
        input.addEventListener('keypress', e => {
            if(e.keyCode == 13){
                return false
            }else{
                infoSugerencias(input.value)
                input.classList.add('inputConSugerenciasActivadas')
                ulBuscador.classList.add('sugerenciasActivas')  
            }
            
        })
    }
    async function infoBusqueda(valueInput){
        try {
            let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq&q=${valueInput}}`)
            let info = await response.json()
            renderBusqueda(info,valueInput)
        }
        catch{
            console.warn('No hay un resultado para tu busqueda')
        }
    }
  
    function lanzarBusqueda(){
        input.addEventListener('keypress',e=>{    
            if(e.keyCode == 13){
                infoBusqueda(input.value)  
            }
            document.querySelectorAll('input[type=text]').forEach( node => node.addEventListener('keypress', e => {
                if(e.keyCode == 13) {
                  e.preventDefault(); 
                }
            }))
            
        })        

    } 
    
    function renderBusqueda(info,valueInput){
        tendenciasTitulo.innerHTML=""
        let buttonFav = []
        verMas = document.createElement('div')
        verMas.classList.add('verMasPadre')
        verMas.innerHTML ='<img id="verMas" class="verMas" src="./images/CTA-ver-mas.svg">'
        artBusqueda.insertAdjacentElement("afterbegin",verMas)
        cardPadre = document.createElement('div')
        cardPadre.classList.add('cardPadre')
        for(let i = 0; i < 12;i++){
            card = document.createElement('div')
            card.classList.add('cardBusqueda')
            card.innerHTML = `<div class="original"><img class="trendingGif" src='${info.data[i].images.original.url}'></img></div>`;
            artBusqueda.insertAdjacentElement("afterbegin", cardPadre)
            cardPadre.insertAdjacentElement("afterbegin", card)
            overlay = document.createElement('div')
            overlay.classList.add('overlay')
            overlay.innerHTML = `<ul>
                                    <li><img class="fav" id="fav${i}" src="./images/icon-fav.svg"></li>
                                    <li><a id="downloadHref${i}"><img class="download" id="download${i}" src="./images/icon-download.svg"></a></li>
                                    <li><a href="#header"><img class="fullScreen" id="fullScreen${i}" src="./images/icon-max-normal.svg"></a></li>
                                </ul>
                                <div class="userTitle">
                                    <p>${info.data[i].username}</p>
                                    <p>${info.data[i].title}</p>
                                </div`
            card.appendChild(overlay)   
            //boton de favoritos
            buttonFav[i] = document.getElementById(`fav${i}`)
            buttonFav[i].addEventListener('click', ()=>{                
                if(gifFavLista.some((element)=> element.id === info.data[i].id)){
                    let encontrarPosicion = gifFavLista.findIndex((element)=> element.id === info.data[i].id)                    
                    gifFavLista.splice(encontrarPosicion, 1)
                    let gifFavListaJson = JSON.stringify(gifFavLista)
                    localStorage.setItem('fav',gifFavListaJson)
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav.svg")
                }else{
                    gifFavLista.push(info.data[i])
                    let gifFavListaJson = JSON.stringify(gifFavLista)
                    localStorage.setItem('fav',gifFavListaJson)
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav-active.svg")
                }
            })
        
            //descargar gif
        let downloadHref = document.getElementById(`downloadHref${i}`)
        let urlGifs = info.data[i].images.original.url
        downloadFile(i, info, downloadHref, urlGifs)

        //ver gif completo
        let fullScreen = document.getElementById(`fullScreen${i}`)
        let gif = info.data[i].images.original.url
        let titulo = info.data[i].title
        let user = info.data[i].username
        gifTamañoOriginal(fullScreen, gif, titulo, user)         
        }
        tituloPrinc.style.display ='none'
        form.style.display ='none'
        btnVerMas = document.getElementById('verMas')
        btnVerMas.addEventListener('click',()=>{
            for(let i = 12; i < 24;i++){
                card = document.createElement('div')
                card.classList.add('cardBusqueda')
                card.innerHTML = `<div class="original"><img class="trendingGif" src='${info.data[i].images.original.url}'></img></div>`;
                artBusqueda.appendChild(cardPadre)
                cardPadre.appendChild(card)
                overlay = document.createElement('div')
                overlay.classList.add('overlay')
                overlay.innerHTML = `<ul>
                                        <li><img class="fav" id="fav${i}" src="./images/icon-fav.svg"></li>
                                        <li><a id="downloadHref${i}"><img class="download" id="download${i}" src="./images/icon-download.svg"></a></li>
                                        <li><a href="#header"><img class="fullScreen" id="fullScreen${i}" src="./images/icon-max-normal.svg"></a></li>
                                    </ul>
                                    <div class="userTitle">
                                        <p>${info.data[i].username}</p>
                                        <p>${info.data[i].title}</p>
                                    </div`
                card.appendChild(overlay)
               
               
                buttonFav[i] = document.getElementById(`fav${i}`)
                buttonFav[i].addEventListener('click', ()=>{                
                if(gifFavLista.some((element)=> element.id === info.data[i].id)){
                    let encontrarPosicion = gifFavLista.findIndex((element)=> element.id === info.data[i].id)                    
                    gifFavLista.splice(encontrarPosicion, 1)
                    let gifFavListaJson = JSON.stringify(gifFavLista)
                    localStorage.setItem('fav',gifFavListaJson)
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav.svg")
                }else{
                    gifFavLista.push(info.data[i])
                    let gifFavListaJson = JSON.stringify(gifFavLista)
                    localStorage.setItem('fav',gifFavListaJson)
                    favActive = buttonFav[i].setAttribute('src', "../images/icon-fav-active.svg")
                }
            })
            //descargar gif
            let downloadHref = document.getElementById(`downloadHref${i}`)
            let urlGifs = info.data[i].images.original.url
            downloadFile(i, info, downloadHref, urlGifs)

            //ver gif completo
            let fullScreen = document.getElementById(`fullScreen${i}`)
            let gif = info.data[i].images.original.url
            let titulo = info.data[i].title
            let user = info.data[i].username
            let informacion = info
            let favId = `fav${i}`
            gifTamañoOriginal(fullScreen, gif, titulo, user)   
            }
            verMas.innerHTML=''

        })
        titulo = document.createElement('h2')
        titulo.classList.add('tituloBusqueda')
        titulo.innerHTML = capitalizarPrimeraLetra(valueInput)
        artBusqueda.insertAdjacentElement("afterbegin", titulo)
    }
    
    function capitalizarPrimeraLetra(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    // gif en tamaño completo
    function gifTamañoOriginal(id, urlGif, titulo, userName){
        id.addEventListener('click',() => {
            let card = document.createElement('div')
            card.classList.add('gifCompleto')
            card.innerHTML =`<img src="./images/close.svg" id="cerrarGifMax" class="cerrarGifMax">
                            <div class="fff">
                            <img src="${urlGif}" class="gif">
                            <div class="divPadre">
                                <div class="divTexto">
                                    <p>${userName}</p>
                                    <p>${titulo}</p>
                                </div>
                                <div class="divFavDow">
                                    <img id="fav" src="./images/icon-fav.svg">
                                    <a id="downloadHref"><img src="./images/icon-download.svg"></a>
                                </div>
                            </div>
                            </div>
                            `
            body.appendChild(card)
            body.classList.add('noScroll')
            let cerrarGifMax = document.getElementById('cerrarGifMax')
            cerrarGifMax.addEventListener('click', ()=>{
            card.innerHTML = ''
            card.classList.remove('gifCompleto')
            body.classList.remove('noScroll')
        })
        })
        
    }
    async function downloadFile(index, gifs, downloadHref, url){
        let response = await fetch(url)
        let imageBlob = await response.blob()
        let urlBlob = URL.createObjectURL(imageBlob)
        downloadHref.href = urlBlob 
        downloadHref.setAttribute('download', `${gifs[index]}.gif`)
    }
    
    function Next(){
        let sliderCardFirst = document.querySelectorAll('.card')

    }



    lanzarBusqueda()
    inputListener()
    pagPrincipal()
    textoTrending()
    gifosTrending()
    scrollHeader()
    nightMode()
    desplegarMenu()

}