
	for (var i = 0; i < geojson.length; i++) {
		geojson[i]["type"] = "Feature";
		geojson[i]["properties"] = geojson[i]["fields"];
	
	}

	var map_img = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		maxZoom: 19
		
	});
   
	var map = new L.Map("map", {
		center: new L.LatLng(49.43685610791997, 1.1166951415971276),
		zoomControl: false,
		zoom: 15,
		layers: [map_img],
	});
	//Bouton de zoom
	L.control.zoom({
     position:'bottomright'
	}).addTo(map);

	var cats = [];
	for (var i = 0; i < geojson.length; i++) {
		var cat = getCat(cats, geojson[i].properties.categorie);
		if (cat === undefined) {
			cat = {
				"interestPoints" : createInterestPoints(),
				"id" : "cat" + i,
				"label" : geojson[i].properties.categorie,
				"test": geojson[i].properties.categorie1
			}
			cats.push(cat);
		}
		cat["interestPoints"].addData(geojson[i]);
	}
	
	var info = L.control({position: 'topright'});
	var command = L.control({position: 'topleft'});
	command.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'command');
div.innerHTML += '<div style="text-align:center;"><span style="font-size:18px;">Carte interactive</span><br /></div>';
		for (var i = 0; i < cats.length; i++) {
			div.innerHTML += '<form><input id="' + cats[i]["id"] + '" type="checkbox"/>' + cats[i]["label"] + '</form>';
		}
		return div;
	};

	command.addTo(map);
	for (var i = 0; i < cats.length; i++) {
		document.getElementById(cats[i]["id"]).addEventListener("click", handleCommand, false);
	}
	
	function handleCommand() {
		var selectedCat;
		for (var i = 0; i < cats.length; i++) {
			if (cats[i]["id"] === this.id) {
				selectedCat = cats[i];
				break;
			}
		}
		if (this.checked) {
			if (cats[i]["label"] == "Centres de soins et hôpitaux")  {
				map.setView([49.4286811,1.109418],12)
			}
			if (cats[i]["label"] == "Rouen Innovation Santé (ZAC)")  {
				map.setView([49.438111920499935,1.1161742681799534],15)
			}
			if (cats[i]["label"] == "Transports")  {
				map.setView([49.443999165975654,1.098323589917582],15)
			}
			if (cats[i]["label"] == "Services")  {
				map.setView([49.438327573875675, 1.1032464907464934],14)
			}
			if (cats[i]["label"] == "Patrimoine et Espaces culturels") {
				map.setView([49.43883021257284, 1.08849688770269],14)
			}
			if (cats[i]["label"] == "Institutions") {
				map.setView([49.44992763691069, 1.089151774426124],14)
			}
			if (cats[i]["label"] == "Formations Santé" ) {
				map.setView([49.26524239963064,1.1299396773813923],10)
			}
			if (cats[i]["label"] == "Infrastructures sportives" ) {
				map.setView([49.4490310096082, 1.0853055199047386],14)
			}
			if (cats[i]["label"] == "Écosystème" ||  cats[i]["label"] == "Unités de recherche et laboratoires" || cats[i]["label"] == "Associations") {
				map.setView([49.44912180807375, 1.0921026620252605],14)
			}
			selectedCat["interestPoints"].addTo(map);
		} else {
			map.removeLayer(selectedCat["interestPoints"]);
		}
	}
	
	function getCat(cats, cat) {
		for (var i = 0; i < cats.length; i++) {
			if (cats[i]["label"] === cat) {
				return cats[i];
			}
		}
		return ;
	}
	
	function createInterestPoints () {
		return new L.geoJson([], {
			pointToLayer: function(feature, latlng) {
				if (cats["label"] === "Rouen Innovation Santé") {
					return L.polygon(latlng);
				}else{
				var smallIcon = L.icon({
					iconUrl: "img/maps" + getIcon(feature.properties.categorie1, feature.properties.categorie, feature.properties.categorie2),
					//shadowUrl: 'icon-shadow.png',
					iconSize:     [33, 44], // taille de l'icone
					//shadowSize:   [50, 64], // taille de l'ombre
					iconAnchor:   [16, 44], // point de l'icone qui correspondra à la position du marker
					//shadowAnchor: [32, 64],  // idem pour l'ombre
					popupAnchor:  [-3, -76] // point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor

				});
				
			}
				return L.marker(latlng, {icon: smallIcon});
				
				
				
			},
			onEachFeature: function(feature, layer) {
				var html = '';
				html += '<img src=img/close.png id=close /></br>';
				if (feature.properties.titre) {
					html += '<h3>' + feature.properties.titre + '</h3>';

				}
				if (feature.properties.img) {
					html += '<img src=\'img/' + feature.properties.img + '\'/>';
					
				}
				if (feature.properties.description) {
					html += '<p>' + feature.properties.description + '</p><br/>';
				}
				
				if (feature.properties.adresse) {
					html += '<p>Adresse: ' + feature.properties.adresse + '<br/>';
				}
				if (feature.properties.url) {
					html += '<a href=\' ' + feature.properties.url + '\' target="_blank"/>Site web</a></br>';
				}
				if (feature.properties.telephone) {
					html += 'Contact: ' + feature.properties.telephone + '</p>';
				}
				


				layer.on('click', function(){

				//	map.setView(layer.getLatLng(),17)
					info.onAdd = function (map) {
						var divInfo = L.DomUtil.create('div','info');
						divInfo.innerHTML += html;
						
						return divInfo;
					}
					info.addTo(map);

					document.getElementById("close").addEventListener("click",Fermez)
					function Fermez(){
						map.removeControl(info);
					}
				})
			}
		});
	}
