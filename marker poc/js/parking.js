// GET HTTP request
var places = fetchJSON('./json/parking.geojson')
            .then(function(places) {
              map.on('load', function () {

                  // looping trough each geojson feature
                  places.features.forEach(function (marker) {

                    // pulling data form Geojson and putting it in javascript variables
                    var soort = marker.properties['asset'];
                    var ocupied = marker.properties['places_used'];
                    var max = marker.properties['places_total'];

                    // calculating the percentage of the parkinglot that is filled
                    var per = (ocupied / max) * 100;

                    // creating a div for each geojson feature
                    var el = document.createElement('div');

                      // Checking the calculated percentage and assingning it to a categorie
                    if (per < 25) {

                        // connecting the div to an ID that can be styled and later selected / filtered
                        el.id = 'groen';
                        // setting the right backgroundimage matching the categorie
                        el.style.backgroundImage = 'url(assets/'+ soort + '1.png';

                    } else if (per > 25 && per < 50) {

                        el.id = 'geel';
                        el.style.backgroundImage = 'url(assets/'+ soort + '2.png';

                    } else if (per > 50 && per < 75) {

                        el.id = 'oranje';
                        el.style.backgroundImage = 'url(assets/'+ soort + '3.png';

                    } else {

                        el.id = 'rood';
                        el.style.backgroundImage = 'url(assets/'+ soort + '4.png';

                    }

                   // add markers to mapbox map
                    new mapboxgl.Marker(el)
                      .setLngLat(marker.geometry.coordinates)
                      .addTo(map)
                  });

                });

            });
