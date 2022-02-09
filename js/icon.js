
function getIcon(categorie1, categorie, categorie2) {
	if (categorie === "Formations Santé") {
		return "/schools.png";
	}else if (categorie === "Centres de soins et hôpitaux") {
		return  "/medical.png";
	}else if (categorie1 === "Restauration") {
		if (categorie2 === "place") {
			return  "/places.png";
		}
		return  "/restaurants.png";

	}else if (categorie === "Transports") {
		if(categorie1 === "TEOR"){
			return "/busstop.png"
		}if (categorie1 === "Vélo") {
			return "/cycling.png"
		}
		if (categorie1 === "Parking") {
			return "/parking.png"
		}
		if (categorie1 === "Gare") {
			return "/train.png"
		}
		return  "/transport.png";


	}else if (categorie === "Institutions") {
		return  "/books-media.png";
	}
	else if (categorie === "Infrastructures sportives") {
		return  "/sports.png";
	}else if (categorie === "Membres fondateurs du campus") {
		return  "/employment.png";
	}else if (categorie === "Patrimoine et Espaces culturels") {
		return  "/religious-organizations.png";
	}else if (categorie1 === "Espaces verts") {
		return  "/birds.png";
	}else if (categorie === "Écosystème") {
		return  "/business.png";
	}else if (categorie === "Unités de recherche et laboratoires") {
		return  "/science.png";
	}else if (categorie1 === "Hébergements") {
		return  "/hotels.png";
	}else if (categorie === "Services") {
		return  "/community.png";
	}else if (categorie === "Associations") {
		return  "/clubs.png";
	}


	return "/default.png";
}


