window.onload = function(){
    let darkMode = false
    let modoNocturno = document.getElementById('modoNocturno')
    let body = document.getElementById('body')
    let logo = document.getElementById('logo')
    let crearGifo = document.getElementById('crearGifo')
    let menu = document.getElementById('menu')
    let hamburguesa = document.getElementById('iconoMenu')
    let btnComenzar = document.getElementById('btnComenzar')
    let camaraPadre = document.getElementById('camaraPadre')
    let paso1 = document.getElementById('paso1')
    let paso2 = document.getElementById('paso2')
    let paso3 = document.getElementById('paso3')
    let camaraImg = document.getElementById('camaraImg')
    let form = new FormData();
    let misGifosLista = JSON.parse(localStorage.getItem('miGifo'))
    if(misGifosLista == null){
        misGifosLista = []
    }
    
    let pelicula = document.getElementById('pelicula') 
    let camaraPelicula = document.getElementById('camaraPelicula')
    
    
    function pagPrincipal(){
        logo.addEventListener('click', () =>{
            window.location.href = 'http://127.0.0.1:5500/index.html'
        })
    }

    function nightMode (){
        modoNocturno.addEventListener('click', () =>{
            body.classList.toggle('modoNocturnoBody')
            if(darkMode){
                modoNocturno.innerText = "Modo Nocturno"
                logo.setAttribute('src', "./images/logo-mobile.svg")
                crearGifo.setAttribute('src',"./images/button-crear-gifo.svg")
                hamburguesa.setAttribute('src', "./images/close.svg")
                camaraPelicula.setAttribute('src','./images/camara.svg')
                pelicula.setAttribute('src','./images/pelicula.svg')
                // hover de iconos segun el tema
                iconoHover('crearGifo', './images/button-crear-gifo.svg', './images/CTA-crear-gifo-hover.svg')
                iconoHover('instagram', './images/icon_instagram.svg', './images/icon_instagram-hover.svg')
                iconoHover('facebook', './images/icon_facebook.svg', './images/icon_facebook_hover.svg')
                iconoHover('twitter', './images/icon-twitter.svg', './images/icon-twitter-hover.svg')
                darkMode = false
            }else{
                modoNocturno.innerText = "Modo Diurno"
                logo.setAttribute('src', "./images/logo-mobile-modo-noct.svg")
                crearGifo.setAttribute('src',"./images/button-crear-gifo-noct.svg")
                hamburguesa.setAttribute('src', "./images/close-modo-noct.svg")
                camaraPelicula.setAttribute('src','./images/camara-modo-noc.svg')
                pelicula.setAttribute('src','./images/pelicula-modo-noc.svg')
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
    let camara = document.getElementById('camara')
    let h2cam =document.getElementById('h2Cam')
    let pCam = document.getElementById('pCam')
    //preguntando si hay se puede acceder a la camara
    
    function getStream () {
        navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            frameRate: { ideal: 10, max: 15 }
        }
    }).then(function(stream) {
        camara.srcObject = stream;
        camara.play()
    }
    )}
    btnComenzar.addEventListener('click', () => {
        camara.style.display='block'
        paso1.classList.add('pasoActivo')
        h2cam.innerHTML='¿Nos das acceso a tu camara?'
        pCam.innerHTML = 'El acceso a tu camara será válido sólo por el tiempo en el que estés creando el GIFO.'
        getMedia({video:true})

    })
    
    async function getMedia(videoReq){
        let stream;
        try{
            stream = await navigator.mediaDevices.getUserMedia(videoReq);
            h2cam.outerHTML=''
            pCam.outerHTML = ''
            getStream()
            btnComenzar.outerHTML='<button class="btnGrabar" id="btnGrabar">Grabar</button>'
            paso1.classList.remove('pasoActivo')
            paso2.classList.add('pasoActivo')
            let btnGrabar = document.getElementById('btnGrabar')
            // comenzar a grabar
            btnGrabar.addEventListener('click', ()=>{
                btnGrabar.outerHTML='<button class="btnGrabar" id="btnFinalizar">Finalizar</button>'
                let recorder = new GifRecorder(camara.srcObject);
                recorder.record();
                let cronometro;
                cronometros()
                
                //finalizar grabacion 
                let btnFinalizar = document.getElementById('btnFinalizar')
                btnFinalizar.addEventListener('click',()=>{
                    paso2.classList.remove('pasoActivo')
                    paso3.classList.add('pasoActivo')
                    detenerCronometro()
                    btnFinalizar.outerHTML ='<button class="btnGrabar" id="btnSubirGifo">Subir Gifo</button>'
                    recorder.stop(function(){
                        let blob= recorder.blob
                        let urlGif = URL.createObjectURL(blob);
                        camaraImg.src =`${urlGif}`
                        camara.style.display='none';
                        camaraImg.style.display='block'
                        form.append('file', blob, 'myGif.gif');
                        
                        //subir mi gifo
                        let btnSubirGifo = document.getElementById('btnSubirGifo')
                        btnSubirGifo.addEventListener('click',()=>{
                            let cargaDeSubida = document.createElement('div')
                            cargaDeSubida.innerHTML = ` <div class="cargaDeSubida" id="cargaDeSubida">
                                                            <img class="loader" id="loader" src="./images/loader.svg">
                                                            <p id="subiendoGifP" class="subiendoGifP">Estamos Subiendo tu GIFO...</p>
                                                        </div>`
                            camaraPadre.appendChild(cargaDeSubida)
                            btnSubirGifo.style.display = 'none'
                            fetch(`http://upload.giphy.com/v1/gifs?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq&file=${form}`,{method:'POST', body:form})
                            .then(response =>{
                                return response.json()
                            }).then(response =>{
                                let subiendoGifP = document.getElementById('subiendoGifP')
                                subiendoGifP.innerHTML = 'GIFO subido con éxito'
                                let loader = document.getElementById('loader')
                                loader.src ='./images/ok.svg'
                                misGifosLista.push(response)
                                localStorage.setItem('miGifo', JSON.stringify(misGifosLista))
                                recorder.clearRecordedData()
                            })
                            
                        })
                    });
                    // repetir la grabacion-----------------------------------------------------
                    cronometroRepCap.addEventListener('click',()=>{
                        paso2.classList.add('pasoActivo')
                        paso3.classList.remove('pasoActivo')
                        recorder.clearRecordedData()
                        btnSubirGifo.outerHTML = '<button class="btnGrabar" id="btnGrabar">Grabar</button>'
                        camaraImg.style.display='none'
                        camara.style.display='block';
                        getMedia({video:true})
                        
                        let btnGrabar = document.getElementById('btnGrabar')
                        btnGrabar.addEventListener('click', ()=>{
                            btnGrabar.outerHTML='<button class="btnGrabar" id="btnFinalizar">Finalizar</button>'
                            let recorder = new GifRecorder(camara.srcObject);
                            recorder.record();
                            let cronometro;
                            cronometroRepCap.innerHTML = '<span id="minutos">00</span>:<span id="segundos">00</span>'
                            cronometros()
                            //finalizar grabacion 
                            let btnFinalizar = document.getElementById('btnFinalizar')
                            btnFinalizar.addEventListener('click',()=>{
                                paso2.classList.remove('pasoActivo')
                                paso3.classList.add('pasoActivo')
                                detenerCronometro()
                                btnFinalizar.outerHTML ='<button class="btnGrabar" id="btnSubirGifo">Subir Gifo</button>'
                                recorder.stop(function(){
                                    let blob= recorder.blob
                                    let urlGif = URL.createObjectURL(blob);
                                    camaraImg.src =`${urlGif}`
                                    camara.style.display='none';
                                    camaraImg.style.display='block'
                                    form.append('file', blob, 'myGif.gif');
                                    
                                    
                                    //subir mi gifo
                                    let btnSubirGifo = document.getElementById('btnSubirGifo')
                                    btnSubirGifo.addEventListener('click',()=>{
                                        let cargaDeSubida = document.createElement('div')
                                        cargaDeSubida.innerHTML = ` <div class="cargaDeSubida">
                                                                        <img class="loader" id="loader" src="./images/loader.svg">
                                                                        <p id="subiendoGifP" class="subiendoGifP">Estamos Subiendo tu GIFO...</p>
                                                                    </div>`
                                        camaraPadre.appendChild(cargaDeSubida)
                                        fetch(`http://upload.giphy.com/v1/gifs?api_key=bCngMprE1xNasA9iSMDnhK5O3T4GufEq&file=${form}`,{method:'POST', body:form})
                                        .then(response =>{
                                            return response.json()
                                        }).then(response =>{let subiendoGifP = document.getElementById('subiendoGifP')
                                        subiendoGifP.innerHTML = 'GIFO subido con éxito'
                                            let loader = document.getElementById('loader')
                                            loader.src ='./images/ok.svg'
                                            misGifosLista.push(response)
                                            console.log(misGifosLista)
                                            localStorage.setItem('miGifo', misGifosLista)
                                            recorder.clearRecordedData()
                                        })
                                        
                                    })
                                });
                            })
                            
                        })
                    })
                    // repetir la grabacion------------------------------------------------------------
                    
                })
            })
        } catch(err){
            console.log('no permito el uso de mi camara')
        }
    }

    function cronometros(){
        let contadorSeg = 0
        let contadorMin = 0
        let segundos = document.getElementById('segundos')
        let minutos = document.getElementById('minutos')
            cronometro = setInterval(() => {
                if(contadorSeg == 60){
                    contadorSeg = 0
                    contadorMin++
                    minutos.innerHTML = contadorMin
                    if(contadorMin == 60){
                        contadorMin = 0
                    }
                }
                segundos.innerHTML = contadorSeg
                contadorSeg++
        }, 1000);
    }
    let cronometroRepCap = document.getElementById('cronometroRepCap')
    function detenerCronometro(){
        clearInterval(cronometro)
        cronometroRepCap.innerHTML ='Repetir Captura'
        cronometroRepCap.classList.add('repetirCap')
    }

    camara.style.display='none';
    
    async function downloadFile(index, gifs, downloadHref, url){
        let response = await fetch(url)
        let imageBlob = await response.blob()
        let urlBlob = URL.createObjectURL(imageBlob)
        downloadHref.href = urlBlob 
        downloadHref.setAttribute('download', `${gifs[index]}.gif`)
    }
    
    pagPrincipal()
    scrollHeader()
    desplegarMenu()
    nightMode()
}