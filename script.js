function getDataBeranda(){
	fetch(`https://indonesia-covid-19.mathdro.id/api/`,{
		method: 'get'
	}).then((res)=>{
		if(res.ok){
            return res.json()
		}else{
			return Promise.reject({
				"status": res.status,
				"statusText": res.statusText
			})
		}
	}).then((data)=>{
        document.getElementById("loader").style.display = "none"
        document.getElementById("case").style.display = "flex"
		document.getElementById('totalCase').innerHTML = data.jumlahKasus
        document.getElementById('positive').innerHTML = data.perawatan
        document.getElementById('recovered').innerHTML = data.sembuh
    	document.getElementById('death').innerHTML = data.meninggal
	}).catch((error)=>{
		console.log("ERROR: " + JOSN.stringify(error))
	})
}

function getDataProvinsi(){
	fetch(`https://indonesia-covid-19.mathdro.id/api/provinsi/`,{
		method: 'get'
	}).then((res)=>{
		if(res.ok){
			return res.json()
		}else{
			return Promise.reject({
				"status": res.status,
				"statusText": res.statusText
			})
		}
	}).then((responData)=>{
        document.getElementById("loader").style.display = "none"
		displayDataProvisnsi(responData)
	}).catch((error)=>{
		console.log("ERROR: " + JOSN.stringify(error))
	})
}

function displayDataProvisnsi(dataProvinsi){
    var htmlString = " "
    for (i=0; i<dataProvinsi.data.length; i++) {
        htmlString = htmlString + "<div class='dataDetail'>" 
                + "<p class='numTitle'>" + "#" + (i+1) + "</p>"
                + "<div class='provinsiTitle' id='pT'>" 
                     + "<span>" + dataProvinsi.data[i].provinsi + "</span>"
                + "</div>"
                + "<div class='provinsiDetail'>" 
                    + "<span class='text'>" + "Positive" + "</span>" + "<span class='num'>" + dataProvinsi.data[i].kasusPosi + "</span>" 
                + "</div>"
                + "<div class='line'>" + "</div>"
                + "<div class='provinsiDetail'>" 
                    + "<span class='text'>" + "Recovered" + "</span>" + "<span class='num'>" + dataProvinsi.data[i].kasusSemb + "</span>" 
                + "</div>"
                + "<div class='line'>" + "</div>"
                + "<div class='provinsiDetail'>" 
                    + "<span class='text'>" + "Negative" + "</span>" + "<span class='num'>" + dataProvinsi.data[i].kasusMeni +"</span>"
                + "</div>"
            + "</div>"
    }
    document.getElementById("data").innerHTML = htmlString;
}

function valueFunction(){
    var input, filter, value, txtValue, x
    input = document.getElementById("inputValue")
    filter = input.value.toLowerCase()
    value = document.getElementById("data")
    target = value.getElementsByClassName("dataDetail")
    for(i = 0; i<target.length; i++){
        x = target[i].getElementsByTagName("span")[0]
        txtValue = x.textContent || x.innerHTML
        if(txtValue.toLowerCase().indexOf(filter) > -1){
            target[i].style.display = "flex"
        }else{
            target[i].style.display = "none"
        }
    }
}