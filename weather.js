/* Defines all the necessary global variables that will be used to collect data from the Open Weather API
   Also contains numerous "key-value" pair arrays that are used for various purposes from changing the background to rendering 
   advice based on different parsed weather data. */
 

var link = 'http://api.openweathermap.org/data/2.5/weather?zip=';
var rest = '&appid=cc5a41fb95be101dacb32d7c4dbad2ac&units=imperial';
var temp, country, description, humidity, high, low, time, icon, cartoon, city;
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
	'01d' : 'Enjoy your run! Everything else seems fine outside.',
	'01n' : 'Enjoy your run! Everything else seems fine outside.',
	'02d': 'Enjoy your run! Everything else seems fine outside.',
	'02n': 'Enjoy your run! Everything else seems fine outside.',
	'03d': 'Enjoy your run! Everything else seems fine outside.',
	'03n': 'Enjoy your run! Everything else seems fine outside.',
	'04d': 'Enjoy your run! Everything else seems fine outside.',
	'04n': 'Enjoy your run! Everything else seems fine outside.',
	'09d': 'It looks like rain outside! Consider postponing.',
	'09n': 'It looks like rain outside! Consider postponing.',
	'10d': 'Light rain - be careful for slippery roads!',
	'10n': 'Light rain - be careful for slippery roads!',
	'11d': 'THUNDERSTORM WARNING! AVOID RUNNING AT ALL COSTS!',
	'11n': 'THUNDERSTORM WARNING! AVOID RUNNING AT ALL COSTS!',
	'50d': 'Low visibility. Wear a high visibility clothing and use extra caution!',
	'50n' : 'Low visibility. Wear a high visibility clothing and use extra caution!',
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

var tempAdvice = {
	'55' : '+5 sec/mile',
	'60' : '+15 sec/mile',
	'65' : '+30 sec/mile',
	'70' : '+40 sec/mile',
	'75' : '+1:10 sec/mile',
	'80' : '+2:00 sec/mile'
}

var humidAdvice = {
	'55' : '+10 sec/mile',
	'60' : '+25 sec/mile',
	'65' : '+45 sec/mile',
	'70' : '+1:05 sec/mile',
	'75' : '+1:45 sec/mile',
	'80' : '+3:00 sec/mile'
}

var alphaCountries = ["AR", "BN", "CA", "IE", "KZ", "MT", 
						"NL", "PE", "SO", "SZ", "UK"];

/* Used to reset all the output information after each API call */

function reset() {	
	$('#zip').addClass('boxes');
	$('#zip').removeClass('error');		
	$('#temp').val("");
	$('#description').val("");
	$('#humidity').val("");
	$('#high').val("");
	$('#city').val("");
	$('#low').val("");
	$('ul').empty();

	getValues();
}

/* Pulls the values for postal code and country name entered by the user. */

function getValues() {
	var zip = $('input').val();
	var country = $('select').val();
	checkInput(zip, country);
}

/* Checks to see if the entered postal code is valid for a given country and generates an error message 
   an error is detected. Hardest function to implement because of the great amount of variance in postal
   codes from county to country. */

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

	if(country == "US" && zip.length != 5) {
		$('#zip').addClass('error');
		alert("Please enter a valid postal code. U.S postal codes are 5 digits in length.");
		return;
	}

	if(isNaN(parseInt(zip))) {
		$('#zip').addClass('error');
		alert("Please enter a valid postal code");
		button = document.getElementById("bt");
	}
	else {
		json(zip, country);
	}
}

/* Performs the actuall call using the OpenWeater API and JSON. Uses AJAX to asyncronously retrieve information
   from OpenWeather. Stores information retireved into given variables and displays on screen in given spaces. */

function json(zip, country) {
	var final_url = link + zip + ',' + country + rest; //Creates the url for the API call
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
			country = data.sys.country;

			$('#city').val(city);
			$('select').val(country);
			$('#temp').val(temp + "˚F");
			$('#description').val(description);
			$('#humidity').val(humidity + '%');
			$('#high').val(high + "˚F");
			$('#low').val(low + "˚F");
			styleChange();
		}
	});
}

/* Uses the backGround array given above to change the look of the page based on the weather at that location. */
function styleChange() {
	$('.backdrop').css('background-image', "url("+backGround[icon]+")");
	$('.default_text').css('color', textStyle[icon]);
	makeTips();
}

/* Uses various pieces of data from temperature to humidity to redner a series of weather based running advice for each location.
   If there is a severe weather alert or excessive heat, warns the runner to abstain and returns. */

function makeTips() {
	if (icon == '11d' || icon == '11n') {
		$('.list-group').append('<li class="list-group-item list-group-item-action list-group-item-danger">' + iconAdvice[icon] + '</li>');
		return;
	}
	else if (temp > 85) {
		$('.list-group').append('<li class="list-group-item list-group-item-action list-group-item-danger">It seems excessively warm. Wait for temperatures to drop. Running is not advised!</li>');
		return;
	}

	if(icon.indexOf('n') > -1) {
		$('.list-group').append('<li class="list-group-item"> Looks like the sun is not up! Wear high-visibility clothing and use a head-lamp.</li>');
	}

	if (temp < 40) {
		$('.list-group').append('<li class="list-group-item"> It is quite chilly outside! Wear a layers to start out. Gloves may also be a necessary for the start. If temperatures are sub-zero, run not advised.</li>');
	}
	else if (temp < 55) {
		$('.list-group').append('<li class="list-group-item">Temperatures seem ideal, but keep reading for additional advice!</li>');
	}
	else {
		specialAdvice();
	}	
	
	$('.list-group').append('<li class="list-group-item">' + iconAdvice[icon] + '</li>');

	
}

/* Uses the tempAdvice and humidAdvice arrays to render expected pace drop based on calculated humidity and temperature. */

function specialAdvice() {
	if (55 < temp <= 60) {
		key = '55';
	}
	else if (60 < temp <= 65) {
		key = '60';
	}
	else if (65 < temp <= 70) {
		key = '65';
	}
	else if (70 < temp <= 75) {
		key = '70';
	}
	else if (75 < temp <= 80) {
		key = '75';
	}
	else {
		key = '80';
	}

	if (humidity > 60) {
		$('.list-group').append('<li class="list-group-item"> Calculated pace drop based on humidity & temperature: ' + humidAdvice[key] + '</li>');
	}
	else {
		$('.list-group').append('<li class="list-group-item"> Calculated pace drop based on humidity & temperature: ' + tempAdvice[key] + '</li>');
	}

}

function main() {
	button.addEventListener("click", reset);
}

main();
