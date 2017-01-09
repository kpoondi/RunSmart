$(document).ready(function(){
	var link = 'http://api.openweathermap.org/data/2.5/weather?zip=';
	var rest = '&appid=cc5a41fb95be101dacb32d7c4dbad2ac&units=imperial';
	var temp, sundown, description, humidity, high, low, time, sunup, sundown, icon, cartoon, city;
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

	$('button').on('click', function() {
		reset();
		var zip = $('input').val();
		var country = $('select').val();
		var final_url = link + zip + ',' + country.toLowerCase() + rest;
		checkInput(zip);
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
				sunup = data.sys.sunrise;
				sundown = data.sys.sunset;
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
		
	});

	function styleChange() {
		$('.backdrop').css('background-image', "url("+backGround[icon]+")");
		$('.default_text').css('color', textStyle[icon]);
	}

	function reset() {			
		$('#temp').val("");
		$('#description').val("");
		$('#humidity').val("");
		$('#high').val("");
		$('#low').val("");
	}

	function checkInput(zip) {
		var error_count = 0;
		var error = "";
		if(isNaN(parseInt(zip))) {
			$('#zip').removeClass('boxes');
			$('#zip').addClass('error');
			error += "Please enter a valid zip code";
			error_count++;
		}

		if(error_count > 0) {
			alert(error);
		}
	}

});

