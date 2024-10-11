let series = [
    [1, 'ONE PIECE', 1121, 23, 26928, 25, 'En emisión',3,'https://sm.ign.com/t/ign_br/tv/o/one-piece-/one-piece-2_1xby.1200.jpg'],
    [2, 'BREAKING BAD', 62, 47, 3100, 6, "Finalizado",2.5,'https://img.goodfon.com/wallpaper/big/e/cf/breaking-bad-aaron-paul-bryan.webp'],
    [3, 'LOS SIMPSONS', 770, 25, 17050, 37, 'En emisión',2,'https://wallpapers.com/images/hd/all-the-simpsons-characters-56qx061k73t2a1xo.jpg']
];

const calcminutos = document.querySelectorAll('.calculominutos');
const selectSerie = document.querySelector('#serie');
const caps = document.getElementById('caps');
const ano = new Date().getFullYear();
const anos = document.getElementById('anos');
const meses = document.getElementById('meses');
const dias = document.getElementById('dias');
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');


calcminutos.forEach(element => {
    element.addEventListener('change', () => {
    /*var mins = parseInt(document.getElementById('minuto').value);
    var hors = parseInt(document.getElementById('hora').value);*/

    var minhours = document.getElementById('horaminutosaldia').value;
    
    const partes = minhours.split(':');
    const horas1 = parseInt(partes[0], 10); 
    const minutos1 = parseInt(partes[1], 10);

    const check = document.getElementById('flexSwitchCheckChecked');
    
    document.getElementById('anoserie').setAttribute('max', ano);
    document.getElementById('anoserie').setAttribute('min', 1800);

    minimoano = document.getElementById('anoserie').value;

    document.getElementById('anofinalizado').setAttribute('max', ano);
    document.getElementById('anofinalizado').setAttribute('min', minimoano);

        series.forEach(elemento => {
            if (elemento[0] == selectSerie.value) {

                fondo(elemento[8]);

                let timeTotal = elemento[4]
                if (!check.checked) {
                    timeTotal = elemento[4] - (elemento[2] * elemento[7])
                }else{
                    timeTotal = elemento[4]
                }

                /*if (mins > 59 || hors > 23 || mins < 0 || hors < 0) {
                    if (mins > 59) { mins = 59; document.getElementById('minuto').value = mins;}
            
                    if (hors > 23) { hors = 23;  document.getElementById('hora').value = hors;}
               
                    if (mins < 0) { mins = 0; document.getElementById('minuto').value = mins;}

                    if (hors < 0) { hors = 0;  document.getElementById('hora').value = hors;}
                
                }*/
                var minhors = minutos1 + (horas1 * 60);

                tiempo = calcuhoras(timeTotal, minhors);



                caps.innerHTML = `
                <hr>
                <h1><b>` + elemento[1] + `</b></h1>
                <hr style='height:4px;'>
                <h2><b>Capítulos: </b>` + elemento[2] + `</h2>
                <h2><b>Duración por capítulo:</b> ` + elemento[3] + ` min</h2>
                <h2><b>Años en emisión: </b>` + elemento[5] + `</h2>
                <h2 ><b>Estado:</b> ` + elemento[6] + `</h2>
                `;

                anos.value = tiempo[0];
                meses.value = tiempo[1];
                dias.value = tiempo[2];
                horas.value = tiempo[3];
                minutos.value = tiempo[4];

            }
        });
    });
})


function calcuhoras(minutostotal,minhors){
   let tiempo = [];

   tiempo.push(Math.floor(minutostotal / (365 * minhors))); // AÑOS
    minutostotal -= (tiempo[0] * (365 * minhors))

   tiempo.push(Math.floor(minutostotal / (30 * minhors))); // MESES
    minutostotal -= (tiempo[1] * (30 * minhors))
   
    tiempo.push(Math.floor(minutostotal / minhors)); // DIAS
    minutostotal -= (tiempo[2] * minhors)
    
    tiempo.push(Math.floor(minutostotal / 60)); // HORAS
    minutostotal -= (tiempo[3] * 60)
   
    tiempo.push(minutostotal)

    return tiempo;
}

function fondo(url) { 
    document.body.style.backgroundImage = `url(${url})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backdropFilter = 'blur(4px)';
}


const radioFinalizado = document.getElementById('flexRadioDefault1');
const radioEnEmision = document.getElementById('flexRadioDefault2');
const anoFinalizadoInput = document.getElementById('anofinalizado');
const anoFinalizadoLabel = document.querySelector('label[for="anofinalizado"]');

radioFinalizado.addEventListener('change', function() {
    if (radioFinalizado.checked) {
        anoFinalizadoInput.style.display = 'block';
        anoFinalizadoLabel.style.display = 'block';
        document.getElementById('anofinalizado').required = true;
    }
});

radioEnEmision.addEventListener('change',function(){
    if (radioEnEmision.checked) {
        anoFinalizadoInput.style.display = 'none';
        anoFinalizadoLabel.style.display = 'none';
        document.getElementById('anofinalizado').required = false;
    }
});


anoFinalizadoInput.addEventListener('change' ,function(){
    let anofinvalue = anoFinalizadoInput.value;
    if (anofinvalue<0 || anofinvalue>ano) {
        if (anofinvalue < 0) { anofinvalue=0}

        if (anofinvalue > ano) { anofinvalue = ano}
   
    
    }
});

    const url = window.location.href;
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);

    var nombre = params.get('nombre');
    var episodiosserie = params.get('episodiosserie');
    /*var horaserie = params.get('horaserie');
    var minutoserie = params.get('minutoserie');*/

    var tiempoxepisodio = params.get('tiempoxepisodio');
        let horasepisodio = 0;
        let minutosepisodio = 0;

        if (tiempoxepisodio) {
            const partes = tiempoxepisodio.split(':');
            horasepisodio = parseInt(partes[0], 10); 
            minutosepisodio = parseInt(partes[1], 10); 
        }
    
    var anoserie = params.get('anoserie');
    var anofinalizado = params.get('anofinalizado');
    var flexRadioDefault = params.get('flexRadioDefault');
    var minutossegundoserieopening = params.get('minutoserieopening');
        let minutosopening = 0;
        let segundosopening = 0;

        if (minutossegundoserieopening) {
            const partes = minutossegundoserieopening.split(':');
            minutosopening = parseInt(partes[0], 10); 
            segundosopening= parseInt(partes[1], 10);
            console.log(minutosopening);
            console.log(segundosopening);
        }

    var minutossegundosserieending = params.get('minutoserieending');

        let minutosending = 0;
        let segundosending = 0;

        if (minutossegundosserieending) {
            const partes = minutossegundosserieending.split(':');
            minutosending = parseInt(partes[0], 10); 
            segundosending= parseInt(partes[1], 10); 
            console.log(minutosending);
            console.log(segundosending);
        }

    var rutaserie = params.get('rutaserie');

    
    
    console.log(ano);
    
    /*No funciona de momento el minimo de anofinalizado y ns el porque*/ 
    


    var anoemision = 0;

    if (flexRadioDefault == "Finalizado" ){
        anoemision = anofinalizado - anoserie ;
    }else if (flexRadioDefault == "En Emisión"){
        anoemision = ano - anoserie;
    }

    tiempocap = (horasepisodio*60)+minutosepisodio;

    tiemposerie = tiempocap * episodiosserie;

    // Redondear segundos a minutos
    inoutrominutos = minutosopening + Math.floor(segundosopening / 60); 
    inoutrominutos += minutosending + Math.floor(segundosending / 60);  

    inoutrominutos += (segundosopening % 60 > 0) ? 1 : 0; 
    inoutrominutos += (segundosending % 60 > 0) ? 1 : 0; 



    const botonaplicar =document.getElementById("btnAplicar");

    if (botonaplicar) {
       series.push([(series.length)+1, nombre, episodiosserie, tiempocap,tiemposerie,anoemision, flexRadioDefault, inoutrominutos, rutaserie]) 
    }

    const selectElement = document.getElementById('serie');

    const newOption = document.createElement('option');
    newOption.value = series.length; 
    newOption.textContent = nombre; 

    selectElement.appendChild(newOption);
