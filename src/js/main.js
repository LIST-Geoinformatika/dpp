const dropdown_namjena = document.getElementById('namjena-zemljista');

fetch("http://localhost:3000/namjenaVrsta")
    .then(response => response.json())
    .then(data => {
       // data.sort((a, b) => a.namjena.localeCompare(b.namjena));
        for (let i=0;i<data.length;i++) {
            dropdown_namjena.innerHTML+=`<option id="namjena_option_${data[i].id}" value="${data[i].id}">`+data[i].namjena+`</option>`
        };
    })
    .catch(error => console.log(error));

dropdown_namjena.addEventListener('change', handleNamjenaChange);

function handleNamjenaChange() {
    if (this.value && document.getElementById('odabrane-cestice').hasChildNodes()) {
        document.getElementById('union-polygons').removeAttribute('disabled');
    } else document.getElementById('union-polygons').setAttribute('disabled', true);
};