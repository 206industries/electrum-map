var boxes = new Array();


$(document).ready(function() {
    var map = new Microsoft.Maps.Map(
	document.getElementById("mapDiv"), 
	{
	    credentials: "INSERT KEY HERE",
	    zoom:3,
	    center: new Microsoft.Maps.Location(47.592, -45)
	}
    );

    $.ajax(
	{
	    type: 'POST',
	    url: 'data.json',
	    data: {},
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function (response) {
		var pins = response.d;

		$.each(pins, function (i, pin) {
		    var pinLocation = new Microsoft.Maps.Location(pin.lat, pin.lon);
		    var desc = pin.location + '<br />' + pin.ip;

		    var infobox = new Microsoft.Maps.Infobox(pinLocation, 
							     {
								 title:pin.hostname, 
								 description:desc, 
								 visible:false, 
								 showCloseButton:false
							     });    
		    map.entities.push(infobox);

		    var pinLocation = new Microsoft.Maps.Location(pin.lat, pin.lon);
		    var mapPin = new Microsoft.Maps.Pushpin(pinLocation, 
							    { 
								infobox: infobox, 
								text: i.toString()
							    });
		    map.entities.push(mapPin);

		    boxes[mapPin.getText()] = infobox;

		    Microsoft.Maps.Events.addHandler(mapPin, 'mouseover', function(e){
			if (e.target != null) { 
			    boxes[e.target.getText()].setOptions({ visible: true }); 
			}
		    });

		    pin.i = i;
                    var templ = "<tr><td align='right'>${i}.</td><td>${hostname}</td><td align='right'>${country}</td></tr>";
                    $.tmpl(templ, pin).appendTo("#serverList");
		});

		// hide all info boxes on click
		Microsoft.Maps.Events.addHandler(map, 'click', function(e){
		    for (var i=0; i<boxes.length; i++) 
		    { 
			boxes[i].setOptions({visible:false}); 
		    }
		});
		
	    }
	});


    // dynamic show/hide of server list
    $("#aboutBox").hover(
	function () { $("#serverList").show(); },
        function () { $("#serverList").hide(); }
    );

}
);
