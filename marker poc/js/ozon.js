// GET HTTP request
var places = fetchJSON('./json/ozon.geojson')
            .then(function(places) {
              map.on('load', function () {

                  // looping trough each geojson feature
                  places.features.forEach(function (marker) {

                    // pulling data form Geojson and putting it in javascript variables
                    var soort = marker.properties['asset'];
                    var ozonlevel = marker.properties['level'];

                    // creating a div for each geojson feature
                    var el = document.createElement('div');

                    // comparing the ozonlevel to a maxium amount for each categorie
                    if (ozonlevel < 50) {

                        // connecting the div to an ID that can be styled and later selected / filtered
                        el.id = 'groen';
                        // setting the right backgroundimage matching the categorie
                        el.style.backgroundImage = 'url(assets/'+ soort + '1.png';

                    } else if (ozonlevel > 50 && ozonlevel < 70) {

                        el.id = 'geel';
                        el.style.backgroundImage = 'url(assets/'+ soort + '2.png';

                    } else if (ozonlevel > 70 && ozonlevel < 80) {

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
