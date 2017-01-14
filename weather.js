/* Defines all the necessary global variables that will be used to collect data from the Open Weather API
   Also contains two large "key-value pair" arrays that contains links to different backgrounds that will
   appear based on weather conditions.
 */

var link = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var rest = '&appid=cc5a41fb95be101dacb32d7c4dbad2ac&units=imperial';
var temp, description, humidity, high, low, time, icon, cartoon, city;
button = document.getElementById("bt");
var JSON;

var backGround  = {
	'01d' : 'http://oakdome.com/k5/cartoons/cartoon-gallery/images/sunny.png',
	'01n' : 'http://www.skyhdwallpaper.com/wp-content/uploads/2014/11/starry-starry-night.jpeg',
	'02d': 'http://cliparts.co/cliparts/8iA/6jd/8iA6jdoBT.svg',
	'02n': 'http://www.clker.com/cliparts/y/s/e/B/Z/B/night-sky.svg',
	'03d': 'http://cliparts.co/cliparts/8iA/6jd/8iA6jdoBT.svg',
	'03n': 'http://www.clker.com/cliparts/y/s/e/B/Z/B/night-sky.svg',
	'04d': 'http://www.wallpaper4computer.com/gal/sunsetclouds/1600/Sky-Sun-Clouds-C7274443.jpg',
	'04n': 'http://www.wallpaper4computer.com/gal/sunsetclouds/1600/Sky-Sun-Clouds-C7274443.jpg',
	'09d': 'http://3.bp.blogspot.com/-WT6okx33JeI/UcfjBQ2QPwI/AAAAAAAAbU0/pxhtLAvTpy0/s1600/HD+Rain+Wallpapers3.jpg',
	'09n': 'http://3.bp.blogspot.com/-WT6okx33JeI/UcfjBQ2QPwI/AAAAAAAAbU0/pxhtLAvTpy0/s1600/HD+Rain+Wallpapers3.jpg',
	'10d': 'http://3.bp.blogspot.com/-WT6okx33JeI/UcfjBQ2QPwI/AAAAAAAAbU0/pxhtLAvTpy0/s1600/HD+Rain+Wallpapers3.jpg',
	'10n': 'http://3.bp.blogspot.com/-WT6okx33JeI/UcfjBQ2QPwI/AAAAAAAAbU0/pxhtLAvTpy0/s1600/HD+Rain+Wallpapers3.jpg',
	'11d': 'http://vector.me/files/images/1/5/155353/cloud_map_symbol_card_cartoon_signs_symbols_lightning_weather_spite_thunder.jpg',
	'11n': 'http://vector.me/files/images/1/5/155353/cloud_map_symbol_card_cartoon_signs_symbols_lightning_weather_spite_thunder.jpg',
	'13d': 'http://images.freepicturesweb.com/img1/02/04/30.jpg',
	'13n' : 'http://images.freepicturesweb.com/img1/02/04/30.jpg',
	'50d' : 'https://cruciality.files.wordpress.com/2010/11/mist.jpg',
	'50n' : 'https://cruciality.files.wordpress.com/2010/11/mist.jpg'
};

var iconAdvice = {
	'09d': 'It looks like rain outside! Consider postponing.',
	'09n': 'It looks like rain outside! Consider postponing.',
	'10d': 'Light rain - be careful for slippery roads!',
	'10n': 'Light rain - be careful for slippery roads!',
	'11d': 'THUNDERSTORM WARNING! AVOID RUNNING AT ALL COSTS!',
	'11n': 'THUNDERSTORM WARNING! AVOID RUNNING AT ALL COSTS!',
	'50d': 'Low visibility. Wear a high visibility jacket and use extra caution!',
	'50n' : 'Low visibility. Wear a high visibility jacket and use extra caution!',
	'13d' : 'It looks like snow! Be weary of icy roads and consider wearing a few extra layers!',
	'13n' : 'It looks like snow! Be weary of icy roads and consider wearing a few extra layers!'
};

var textStyle  = {
	'01d' : 'navy',
	'01n' : 'white',
	'02d': 'navy',
	'02n': 'red',
	'03d': 'navy',
	'03n': 'red',
	'04d': 'navy',
	'04n': 'navy',
	'09d': 'black',
	'09n': 'black',
	'10d': 'black',
	'10n': 'black',
	'11d': 'navy',
	'11n': 'navy',
	'13d': 'navy',
	'13n' : 'navy',
	'50d' : 'navy',
	'50n' : 'navy'
};

var alphaCountries = ["AR", "BN", "CA", "IE", "KZ", "MT", 
						"NL", "PE", "SO", "SZ", "UK"];
function reset() {	
	$('#zip').addClass('boxes');
	$('#zip').removeClass('error');		
	$('#temp').val("");
	$('#description').val("");
	$('#humidity').val("");
	$('#high').val("");
	$('#low').val("");
	getValues();
}

function getValues() {
	var zip = $('input').val();
	var country = $('select').val();
	checkInput(zip, country);
}

function checkInput(zip, country) {
	var error = "";

	for (var i = 0; i < alphaCountries.length; i++) {
		if (country == alphaCountries[i]) {
			json(zip, country);
			return;
		}
	}

	if (country == "JM") {
		alert("Jamica does not use the postal code system. Please enter another country");
		return;
	}

	if(isNaN(parseInt(zip))) {
		$('#zip').removeClass('boxes');
		$('#zip').addClass('error');
		alert("Please enter a valid postal code");
		button = document.getElementById("bt");
	}
	else {
		json(zip, country);
	}
}

function json(zip, country) {
	var final_url = link + zip + ',' + country + rest;
	$.ajax({
		type: 'GET',
		url: final_url,
		data: 'jsonp',
		cache: false,
		success: function(data) {
			city = data.name;
			temp = data.main.temp;
			description = data.weather[0].main;
			humidity = data.main.humidity;
			high = data.main.temp_max;
			low = data.main.temp_min;
			time = data.dt;
			icon = data.weather[0].icon;

			$('#city').val(city);
			$('#temp').val(temp + "˚F");
			$('#description').val(description);
			$('#humidity').val(humidity + '%');
			$('#high').val(high + "˚F");
			$('#low').val(low + "˚F");
			styleChange();
		}
	});
}

function styleChange() {
	$('.backdrop').css('background-image', "url("+backGround[icon]+")");
	$('.default_text').css('color', textStyle[icon]);
	makeTips();
}

function makeTips() {
	$('.list-group').append('<li class="list-group-item">' + iconAdvice[icon] + '</li>');

}

function main() {
	button.addEventListener("click", reset);
}

main();
