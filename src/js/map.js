let map = L.map('map', {
    zoomControl: true, 
    maxZoom: 18, 
    minZoom: 13, 
    fadeAnimation: false,
    center: [43.905, 16.409],
    zoom: 14,
});

let openstreetmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity: 1.0});
let DOF2019 = L.tileLayer.wms('https://geoportal.dgu.hr/services/inspire/orthophoto_2019/wms', {
    layers: 'OI.OrthoimageCoverage',
    format: 'image/png',
    transparent: 'TRUE',
    opacity: 1.0}).addTo(map);

let kat_cesice_wms = L.tileLayer.wms('https://oss.uredjenazemlja.hr/OssWebServices/inspireService/wms?token=d1bd46789f84b49262aa5a779059fc6bf815b1ead16986f20a3230930a9131b3', {
    layers: 'CP.CadastralParcel',
    format: 'image/png',
    transparent: 'TRUE',
    opacity: 1.0});

map.zoomControl.setPosition('bottomright');
map.setMaxBounds([[43.80, 16.20], [43.96, 16.55]]);

let baseMaps = {"OpenStreetMap": openstreetmap, "DOF5 2019.": DOF2019};
let overlayMaps = {"Katastarske čestice": kat_cesice_wms};
let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

function styleCestice () {
    return {
        fillColor: 'white',
        weight: 2,
        opacity: 0.7,
        color: '#d8a63d',
        dashArray: '1',
        fillOpacity: 0
    }
}

let cestice_layer = L.geoJSON(null, {onEachFeature: onEachCestica, style: styleCestice}).addTo(map);

/*Preuzimanje podataka vrlike*/ 
fetch("http://localhost:3000/vrlika")
    .then(response => response.json())
    .then(data => {
        cestice_layer.clearLayers();
        cestice_layer.addData(data);
    })
    .catch(error => console.log(error));

function onEachCestica(feature, layer) {   
    let popupContent = document.createElement('div');
    popupContent.classList.add('main-popup-div');
    if (feature.properties.BROJ_CESTICE) {
        let div = document.createElement('div');
        div.classList.add('popup-div');
        let p = document.createElement('p');
        p.innerText = 'Broj katastarske čestice';
        let p_tekst = document.createElement('span');
        p_tekst.innerText = feature.properties.BROJ_CESTICE;
        p.appendChild(p_tekst);
        div.appendChild(p);
        popupContent.appendChild(div);
    };

    if (feature.properties.POVRSINA_A) {
        let div = document.createElement('div');
        div.classList.add('popup-div');
        let p = document.createElement('p');
        p.innerText = 'Površina čestice u m2';
        let p_tekst = document.createElement('span');
        p_tekst.innerText = feature.properties.POVRSINA_A;
        p.appendChild(p_tekst);
        div.appendChild(p);
        popupContent.appendChild(div);
    };
    layer.bindPopup(popupContent);
};


/*Preuzimanje podataka namjene povrsina*/ 
let namjena_povrsina = L.geoJSON(null, {onEachFeature: onEachNamjena, style: styleNamjena});
layerControl.addOverlay(namjena_povrsina, 'Namjena površine');
function onEachNamjena(feature, layer) {   
    let popupContent = document.createElement('div');
    popupContent.classList.add('main-popup-div');
    if (feature.properties.namjena_tekst) {
        let div = document.createElement('div');
        div.classList.add('popup-div');
        let p = document.createElement('p');
        p.innerText = 'Namjena površine';
        let p_tekst = document.createElement('span');
        p_tekst.innerText = feature.properties.namjena_tekst;
        p.appendChild(p_tekst);
        div.appendChild(p);
        popupContent.appendChild(div);
    };
    layer.bindPopup(popupContent);
};

function styleNamjena(feature)  {
    if (feature.properties.namjena_value === '1') {
        return {
            fillColor: '#f79647',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '2') {
        return {
            fillColor: '#f55251',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '3') {
        return {
            fillColor: '#9a66ff',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '4') {
        return {
            fillColor: '#66fe66',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '5') {
        return {
            fillColor: '#4dcd66',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '3',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '6') {
        return {
            fillColor: '#f587e2',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '7') {
        return {
            fillColor: '#4b4727',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '8') {
        return {
            fillColor: '#a6a6a6',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '9') {
        return {
            fillColor: '#e1e1e1',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '10') {
        return {
            fillColor: '#39c4ff',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '11') {
        return {
            fillColor: '#9acd00',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    } else if (feature.properties.namjena_value === '12') {
        return {
            fillColor: '#21611f',
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 0.7
        }
    };
};

function fetchNamjenaPovrsine() {
    namjena_povrsina.clearLayers();
    fetch("http://localhost:3000/namjenaPovrsine")
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                namjena_povrsina.addData(data);
                namjena_povrsina.addTo(map)
            };
        })
        .catch(error => console.log(error));
};


let clickedCestice = new Array;
let clickedNamjena = new Array;

const button_merge = document.getElementById('merge-polygons');
const button_union = document.getElementById('union-polygons');
const button_union_cancel = document.getElementById('union-cancel');
const button_x_modal_union = document.getElementById('x-modal-union');

const button_open_modal_union = document.getElementById('open-modal-union');
button_open_modal_union.addEventListener('click', handleOpenUnionModalClick);


function handleOpenUnionModalClick() {
    namjena_povrsina.eachLayer(function (layer) {
        layer.off({click: handleNamjenaClick});
        onEachNamjena(layer.feature, layer);
        layer.setStyle(styleNamjena(layer.feature));
    });
    clickedNamjena = [];

   /* cestice_layer.eachLayer(function (layer) {layer.bringToBack(), layer.off({click: handleCesticeClick});
        onEachCestica(layer.feature, layer);
        layer.setStyle(styleCestice(layer.feature));
        });*/

   // handleCancelDifferenceNamjenaClick(); //POPRAVITI
};

let clicked_modal_button;
let clicked_odaberi_button;

button_merge.addEventListener('click', handleMergeClick);

button_union_cancel.addEventListener('click', handleCancelMergeClick);
button_x_modal_union.addEventListener('click', handleCancelMergeClick);

function handleMergeClick() {
    clicked_odaberi_button = this;

    let a  = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    clicked_modal_button = document.querySelector(`button[data-bs-target="#${a}"]`);    
    
    if (a.includes('union')) {

        cestice_layer.eachLayer(function (layer) {
           /* namjena_povrsina.eachLayer(function (layera) {
                console.log(turf.booleanOverlap(layera.feature, ));
            });*/
            

            layer.on({click: handleCesticeClick}), 
            layer.unbindPopup();
        });
    } else  cestice_layer.eachLayer(function (layer) {layer.on({click: handleCesticeClick}), layer.bringToFront(), layer.unbindPopup();});


    this.classList.add('clicked-button');

    namjena_povrsina.eachLayer(function (layer) {
        layer.off({click: handleNamjenaClick});
        onEachNamjena(layer.feature, layer);
    });

   /* console.log(clickedNamjena)

    if(clickedNamjena.length > 0) {
        console.log(namjena_povrsina)
    }*/

  /*  if (clicked_modal_button.getAttribute('data-bs-target') === '#differenceModal') {
        if (map.hasLayer(namjena_povrsina)) {
            map.removeLayer(namjena_povrsina);
        };
    };*/

    //console.log(clicked_modal_button.getAttribute('data-bs-target'));

   /* if (map.hasLayer(namjena_povrsina)) {
        map.removeLayer(namjena_povrsina);
    };*/
};

window.oncontextmenu = (e) => {
    e.preventDefault(); 

    if (clicked_odaberi_button) {
        if (clicked_odaberi_button.getAttribute('data-selected') === 'cestice' && clickedCestice.length > 0 && clicked_modal_button) {
            clicked_modal_button.click();

            //document.querySelector(clicked_modal_button.getAttribute('data-bs-target')+' .ispis-odabranih').innerHTML = '';
            clicked_odaberi_button.nextElementSibling.innerHTML = '';
            handleReopenModalClick(clicked_odaberi_button);
            clicked_modal_button = '';
            if (!map.hasLayer(namjena_povrsina)) {
                map.addLayer(namjena_povrsina);
            };
        };
        
        if (clicked_odaberi_button.getAttribute('data-selected') === 'namjena' && clickedNamjena.length > 0  && clicked_modal_button) {
            clicked_modal_button.click();
            clicked_odaberi_button.nextElementSibling.innerHTML = '';
            handleReopenModalNamjenaClick(clicked_odaberi_button);
    
           /* document.querySelector(clicked_modal_button.getAttribute('data-bs-target')+' .ispis-odabranih').innerHTML = '';
            handleReopenModalClick(clicked_modal_button);*/
            clicked_modal_button = '';
        };
    }


};
//odabrane-cestice

function handleReopenModalClick(clicked_odaberi_button) {

    let div_ispis = clicked_odaberi_button.nextElementSibling;
    div_ispis.innerHTML += `<p>Odabrane su sljedeće čestice (kčbr.):</p>`;

    for (let i=0; i<clickedCestice.length; i++) {
        div_ispis.innerHTML += `<p class="p-odabrane-cestice">${clickedCestice[i].properties.BROJ_CESTICE}</p>`;
    };

    if (clickedCestice.length > 0 && document.getElementById('namjena-zemljista').selectedIndex !== 0) {
        document.getElementById('union-polygons').removeAttribute('disabled');
    } else document.getElementById('union-polygons').setAttribute('disabled', true);


    if (clickedNamjena.length > 0 && clickedCestice.length > 0) {
        button_difference_polygons.removeAttribute('disabled');
    } else button_difference_polygons.disabled = true;
};



function handleCesticeClick(e) {
    let layer = this;
    if (clickedCestice.indexOf(layer.feature) > -1) {
        layer.feature.properties.NAMJENA = false;
        clickedCestice.splice(clickedCestice.indexOf(layer.feature), 1);
        layer.setStyle(styleCestice(layer.feature));
    } else {
        layer.feature.properties.NAMJENA = true;
        clickedCestice.push(layer.feature);
        layer.setStyle({weight: 3, color: '#fdcc00', fillOpacity: 0.9, fillColor: '#fff5d5'});
    };

    if (clickedCestice.length > 0) {
        button_union.addEventListener('click', handleMergePolygonsClick);
    } else {
        button_union.removeEventListener('click', handleMergePolygonsClick);
    };
};

function handleMergePolygonsClick() {

    //merge geometrije odabranih cestica
    let unionTemp;
    for (let i=0; i<clickedCestice.length; i++) {
        if (i == 0) {
            unionTemp = clickedCestice[i];
        } else {
          unionTemp = turf.union(unionTemp, clickedCestice[i]);
        };
    };

    let max = 0;

    namjena_povrsina.eachLayer(function(layer) {
        if (layer.feature.properties.id > max) {
            max = layer.feature.properties.id;
        };
    });

    unionTemp.properties.id = max+1;
    unionTemp.properties.namjena_value = document.getElementById('namjena-zemljista').value;
    unionTemp.properties.namjena_tekst = document.getElementById('namjena-zemljista').options[document.getElementById('namjena-zemljista').selectedIndex].text;   
    unionTemp.id = max+1;

    fetch('http://localhost:3000/namjenaPovrsine', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(unionTemp),
        })
        .then(() => fetchNamjenaPovrsine())
        .catch((error) => {
            console.error('Error:', error);
        });

    cestice_layer.eachLayer(function (layer) {layer.setStyle(styleCestice(layer.feature));});
    clickedCestice = [];
    document.getElementById('odabrane-cestice').innerHTML = '';
    resetNamjenaDropdown();


};

function handleCancelMergeClick() {
    button_union.disabled = true;

    button_merge.classList.remove('clicked-button');
    cestice_layer.eachLayer(function (layer) {
        layer.off({
            click: handleCesticeClick
        });
       onEachCestica(layer.feature, layer);
       layer.setStyle(styleCestice(layer.feature));
    });

    clickedCestice = [];

    document.getElementById('odabrane-cestice').innerHTML = '';
    button_union.removeEventListener('click', handleMergePolygonsClick);
    resetNamjenaDropdown();
};

function resetNamjenaDropdown() {
    document.getElementById('namjena-zemljista').selectedIndex = 0;
};

fetchNamjenaPovrsine();







/*Difference*/


const button_difference_namjena = document.getElementById('difference-namjena');
const button_difference_cestice = document.getElementById('difference-cestice');
const x_modal_difference = document.getElementById('x-modal-difference');
const difference_cancel = document.getElementById('difference-cancel');
const button_difference_polygons = document.getElementById('difference-polygons');

button_difference_namjena.addEventListener('click', handleOdabirNamjenaClick);
difference_cancel.addEventListener('click', handleCancelDifferenceNamjenaClick);
x_modal_difference.addEventListener('click', handleCancelDifferenceNamjenaClick);

button_difference_cestice.addEventListener('click', handleMergeClick);

function handleOdabirNamjenaClick() {
    clicked_odaberi_button = this;
    let a  = this.parentElement.parentElement.parentElement.parentElement.getAttribute('id');
    clicked_modal_button = document.querySelector(`button[data-bs-target="#${a}"]`);   
    namjena_povrsina.eachLayer(function (layer) {layer.on({click: handleNamjenaClick}),layer.unbindPopup();});


    cestice_layer.eachLayer(function (layer) {
        layer.off({
            click: handleCesticeClick
        });
       onEachCestica(layer.feature, layer);
    });

};

function handleNamjenaClick() {
    let layer = this;
    if (clickedNamjena.indexOf(layer.feature) > -1) {
        layer.setStyle(styleNamjena((layer.feature)));
        clickedNamjena.splice(clickedNamjena.indexOf(layer.feature), 1);
    } else {
        clickedNamjena.push(layer.feature);
        layer.setStyle({weight: 6, color: 'red', dashArray: '', fillOpacity: 0.5, fillColor: 'red'});
    };

    /*if (namjena_povrsina.length > 0) {
        button_union.addEventListener('click', handleMergePolygonsClick);
    } else {
        button_union.removeEventListener('click', handleMergePolygonsClick);
    };*/
};

function handleCancelDifferenceNamjenaClick() {
   // button_merge.classList.remove('clicked-button');

    namjena_povrsina.eachLayer(function (layer) {
        layer.off({click: handleNamjenaClick});
        onEachNamjena(layer.feature, layer);
        layer.setStyle(styleNamjena(layer.feature));
    });
    clickedNamjena = [];


  //  button_merge.classList.remove('clicked-button');
    cestice_layer.eachLayer(function (layer) {layer.bringToBack(), layer.off({click: handleCesticeClick});
        onEachCestica(layer.feature, layer);
        layer.setStyle(styleCestice(layer.feature));
        });

    clickedCestice = [];

   // cestice_layer.eachLayer(function (layer) {layer.on({click: handleCesticeClick}), layer.sendToBack(), layer.unbindPopup();});


    for (let i=0; i<document.getElementsByClassName('ispis-odabranih').length; i++) {
        document.getElementsByClassName('ispis-odabranih')[i].innerHTML = '';
    };

    button_difference_polygons.disabled = true;
};


function handleReopenModalNamjenaClick(clicked_odaberi_button) {
    let div_ispis = clicked_odaberi_button.nextElementSibling;
    div_ispis.innerHTML += `<p>Odabrane površine namjena:</p>`;

    for (let i=0; i<clickedNamjena.length; i++) {
        div_ispis.innerHTML += `<p class="p-odabrane-cestice">${clickedNamjena[i].properties.namjena_tekst}</p>`;
    };

    if (clickedNamjena.lenght > 0 && clickedCestice.length > 0) {
        button_difference_polygons.removeAttribute('disabled');
    } else button_difference_polygons.disabled = true;
   
};

button_difference_polygons.addEventListener('click', handleDifferenceClick);

function handleDifferenceClick() {
    let unionTemp;
    for (let i=0; i<clickedCestice.length; i++) {
        if (i == 0) {
            unionTemp = clickedCestice[i];
        } else {
          unionTemp = turf.union(unionTemp, clickedCestice[i]);
        };
    };
    let differenceTemp = turf.difference(clickedNamjena[0], unionTemp);
    let id = clickedNamjena[0].properties.id;
    if (differenceTemp) {
        fetch(`http://localhost:3000/namjenaPovrsine/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(differenceTemp),
        })
        .then(() => fetchNamjenaPovrsine()
        )
        .catch((error) => {
            console.error('Error:', error);
        })
    } else {
        fetch(`http://localhost:3000/namjenaPovrsine/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        })
        .then(() => fetchNamjenaPovrsine()
        )
        .catch((error) => {
            console.error('Error:', error);
        })
    };

    let ispis_odabranih = document.getElementsByClassName('ispis-odabranih');

    for (let i=0; i<ispis_odabranih.length; i++) {
        ispis_odabranih[i].innerHTML = '';
    };
    cestice_layer.eachLayer(function (layer) {layer.setStyle(styleCestice(layer.feature));});
    clickedCestice = [];
    clickedNamjena = [];

};


