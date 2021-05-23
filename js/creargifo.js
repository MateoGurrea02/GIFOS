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
            
            btnGrabar.addEventListener('click', ()=>{
                btnGrabar.outerHTML='<button class="btnGrabar" id="btnFinalizar">Finalizar</button>'
                let recorder = new GifRecorder(camara.srcObject);
                recorder.record();
                
                let btnFinalizar = document.getElementById('btnFinalizar')
                btnFinalizar.addEventListener('click',()=>{
                    btnFinalizar.outerHTML ='<button class="btnGrabar" id="btnSubirGifo">Subir Gifo</button>'
                    recorder.stop(function(blob) {
                        let urlGif = URL.createObjectURL(blob);
                        camaraImg.src =`${urlGif}`
                        camara.style.display='none';
                        camaraImg.style.display='block'
                        let form = new FormData();
                        form.append('file', blob, 'myGif.gif');
                        console.log(form.get('file'))
                    });
                    
                })
            })
        } catch(err){
            console.log('no permito el uso de mi camara')
        }
    }
    camara.style.display='none';
    

    
    pagPrincipal()
    scrollHeader()
    desplegarMenu()
    nightMode()
}