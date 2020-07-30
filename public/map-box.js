const btnBusLine = document.querySelector('#div1');


var button2 = document.getElementById("btnButton2");
var button1 = document.getElementById("btnButton1");

var left = 106.79699;
var right = 10.846159;
var l;
var r;


var firebase = app_fireBase;

//list station
var list = [];
//list car pos
var car = [];
//buslineID
let busline_chosen;



// const RoutesRef = firebase.firestore().collection('Routes');

// const route2Ref = RoutesRef.doc('Route02').collection('Stations');



// route2Ref.get().then(function (documentSnapshot) {
//     documentSnapshot.forEach(function (doc) {
//         let des = doc.get('description');
//         let name = doc.get('station_name');
//         let pos_lat = doc.get('pos').latitude;
//         let pos_lng = doc.get('pos').longitude;

//         featuresList.push({
//             "type": "Feature",
//             "geometry": {
//                 "type": "Point",
//                 "coordinates": [+ pos_lng, + pos_lat]
//             },
//             "properties": {
//                 "title": + name,
//                 "icon": "circle",
//                 "description": + des
//             }
//         });
//     })

// });
// route2Ref.forEach(doc => {

//     let des = doc.get('description');
//     let name = doc.get('station_name');
//     let pos_lat = doc.get('pos').latitude;
//     let pos_lng = doc.get('pos').longitude;

//     featuresList.push({
//         "type": "Feature",
//         "geometry": {
//             "type": "Point",
//             "coordinates": [pos_lng, pos_lat]
//         },
//         "properties": {
//             "title": name,
//             "icon": "circle",
//             "description": des
//         }
//     });
// });

firebase.firestore().collection('Schedule')
    .onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type == 'added') {
                renderBtnBusLine(change.doc);

            } else if (change.type == 'removed') {
                let li = btnBusLine.querySelector('[data-id=' + change.doc.id + ']');
                btnBusLine.removeChild(li);
            }
        })
    })

function renderBtnBusLine(doc) {
    let btn = document.createElement('button');

    btn.setAttribute('data-id',doc.id);
    btn.textContent = doc.data().lineName;
    
}


function addMap1() {
    //busline
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHVvbmd2bXNlNjE5NjkiLCJhIjoiY2ticWxrdGNnMm5qNzJxbXgyd2pzdHQzaSJ9.Exqn75WX503GTtWVQ0Vrkw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [left, right],
        zoom: 15.15,
        attributionControl: false
    });

    map.on('load', function () {

        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [106.794882, 10.845587],
                        [106.79699, 10.846159],
                        [106.79999, 10.846859],
                        [106.808711, 10.848939],
                        [106.815193, 10.842965],
                        [106.811981, 10.839540],
                        [106.811621, 10.839367],
                        [106.811327, 10.839391],
                        [106.809151, 10.841363],
                    ]
                }
            }
        });
        map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        // feature for FPT station
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [
                                106.809394,
                                10.841381
                            ]
                        },
                        'properties': {
                            'title': 'FPT Station',
                            'icon': 'school',
                            'description': 'Tram xe Bus DH FPT'
                        }
                    },
                    //feature for Station 2
                    {
                        // feature for Station 1
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [106.794882, 10.845487]
                        },
                        'properties': {
                            'title': 'Station 1',
                            'icon': 'monument',
                            'description': 'Tram xe Bus DH GTVT'
                        }
                    },
                    {
                        // feature for Station 2
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [106.79999, 10.847159]
                        },
                        'properties': {
                            'title': 'Station 2',
                            'icon': 'monument',
                            'description': 'Tram xe Bus Le Van Viet'

                        }
                    },
                    {
                        // feature for Bus 1
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [106.79699, 10.846159]
                        },
                        'properties': {
                            'title': 'Bus 1',
                            'icon': 'car',
                            'description': 'Xe Bus so 1'
                        }
                    }
                ]
            }
        });

        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                // get the icon name from the source's "icon" property
                // concatenate the name to get an icon from the style's sprite sheet
                'icon-image': ['concat', ['get', 'icon'], '-15'],
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top'
            }
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': 'red',
                'line-width': 8
            }
        });
    });
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['points'] // replace this with the name of the layer
        });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
            .addTo(map);
    });
}
function addMap2() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHVvbmd2bXNlNjE5NjkiLCJhIjoiY2ticWxrdGNnMm5qNzJxbXgyd2pzdHQzaSJ9.Exqn75WX503GTtWVQ0Vrkw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [l, r],
        zoom: 15.15,
        attributionControl: false
    });




    map.on('load', function () {

        map.addSource('route', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'properties': {},
                'geometry': {
                    'type': 'LineString',
                    'coordinates': [
                        [106.794882, 10.845587],
                        [106.79699, 10.846159],
                        [106.79999, 10.846859],
                        [106.808711, 10.848939],
                        [106.815193, 10.842965],
                        [106.811981, 10.839540],
                        [106.811621, 10.839367],
                        [106.811327, 10.839391],
                        [106.809151, 10.841363],
                    ]
                }
            }
        });
        map.addSource('points', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [
                    {
                        // feature for FPT station
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [
                                106.809394,
                                10.841381
                            ]
                        },
                        'properties': {
                            'title': 'FPT Station',
                            'icon': 'school',
                            'description': 'Tram xe Bus DH FPT'
                        }
                    },
                    //feature for Station 2
                    // {
                    //     // feature for Station 1
                    //     'type': 'Feature',
                    //     'geometry': {
                    //         'type': 'Point',
                    //         'coordinates': [106.794882, 10.845487]
                    //     },
                    //     'properties': {
                    //         'title': 'Station 1',
                    //         'icon': 'monument',
                    //         'description': 'Tram xe Bus DH GTVT'
                    //     }
                    // },
                    // {
                    //     // feature for Station 2
                    //     'type': 'Feature',
                    //     'geometry': {
                    //         'type': 'Point',
                    //         'coordinates': [106.79999, 10.847159]
                    //     },
                    //     'properties': {
                    //         'title': 'Station 2',
                    //         'icon': 'monument',
                    //         'description': 'Tram xe Bus Le Van Viet'

                    //     }
                    // },
                    // {
                    //     // feature for Bus 1
                    //     'type': 'Feature',
                    //     'geometry': {
                    //         'type': 'Point',
                    //         'coordinates': [106.79699, 10.846159]
                    //     },
                    //     'properties': {
                    //         'title': 'Bus 1',
                    //         'icon': 'car',
                    //         'description': 'Xe Bus so 1'
                    //     }
                    // },
                ]
            }
        });


        map.addSource('firebase', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': list
            }
        })

        map.addSource('carlocation', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': car
            }
        })


        map.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'points',
            'layout': {
                // get the icon name from the source's "icon" property
                // concatenate the name to get an icon from the style's sprite sheet
                'icon-image': ['concat', ['get', 'icon'], '-15'],
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top'
            }
        });

        map.addLayer({
            'id': 'firebase',
            'type': 'symbol',
            'source': 'firebase',
            'layout': {
                // get the icon name from the source's "icon" property
                // concatenate the name to get an icon from the style's sprite sheet
                'icon-image': ['concat', ['get', 'icon'], '-15'],
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top'
            }
        });

        map.addLayer({
            'id': 'carlocation',
            'type': 'symbol',
            'source': 'carlocation',
            'layout': {
                // get the icon name from the source's "icon" property
                // concatenate the name to get an icon from the style's sprite sheet
                'icon-image': ['concat', ['get', 'icon'], '-15'],
                // get the title name from the source's "title" property
                'text-field': ['get', 'title'],
                'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                'text-offset': [0, 0.6],
                'text-anchor': 'top'
            }
        });


        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': 'blue',
                'line-width': 8
            }
        });
    });
    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['points'] // replace this with the name of the layer
        });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        var popup = new mapboxgl.Popup({ offset: [0, -15] })
            .setLngLat(feature.geometry.coordinates)
            .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
            .addTo(map);
    });

    setTimeout(addMap2, 60000);
}

button1.addEventListener('click', addMap1);
button2.addEventListener('click', addMap2);

function getAllDataMap() {
    // const routeRef =  firebase.firestore().collection('Routes').doc('Route01').collection('Stations');
    const routeRef = firebase.firestore().collection('Stations');

    routeRef.onSnapshot(function (snapshot) {
        snapshot.forEach(function (doc) {
            let des = doc.get('lineID');
            let name = doc.get('name');
            let pos_lat = doc.get('position').latitude;
            let pos_lng = doc.get('position').longitude;
            // list.push({
            // "type": "Feature",
            // "geometry": {
            //     "type": "Point",
            //     "coordinates": [pos_lng, pos_lat]
            // },
            // "properties": {
            //     "title": name,
            //     "icon": "monument",
            //     "description": des
            //     }
            // })

            list.push(JSON.parse('{"type": "Feature","geometry": {"type": "Point","coordinates": [' + pos_lng + ', ' + pos_lat + '] },"properties": {"title": "' + name + '","icon": "monument","description": "' + des + '"}}'));




            //est.push(JSON.parse('{"type": "Feature", "geometry": {"type": "Point", "coordinates": ['+d.location.lon+','+ d.location.lat+']}}'));
        });

    })
}
;

function getCar() {
    //var query = firebase.firestore().collection('Car').orderBy('time_stamp','desc').limit(1);
    var query = firebase.firestore().collection('User Locations');
    // query.get().then(function(doc) {
    //     let pos_lat = doc.data().geo_point.latitude;
    //     let pos_lng = doc.data().geo_point.longitude;

    //     car = JSON.parse('{"type": "Feature","geometry": {"type": "Point","coordinates": [' + pos_lng +', '+pos_lat+'] },"properties": {"title": "Bus 1","icon": "car","description": "Xe buyt so 1"}}');
    // });
    car = [];
    query.onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type == 'added') {

                var data = change.doc.data();
                let pos_lat = data.geo_point.latitude;
                let pos_lng = data.geo_point.longitude;
                let driver_name = data.user.username;
                console.log(pos_lat);
                console.log(pos_lng);
                l = pos_lng;
                r = pos_lat;
                car.push(JSON.parse('{"type": "Feature","geometry": {"type": "Point","coordinates": [' + pos_lng + ', ' + pos_lat + '] },"properties": {"title":"' + driver_name + '","icon": "car","description": "Xe buyt so 1"}}'));
            }


        })

    });


}


function getLeftMap(pos_lng) {
    return pos_lat;
}

getAllDataMap();
getCar();
// var firebaseGeojsonFeatures = [];
// for(var i in getAllDataMap() )
// {
//     var f = getAllDataMap()[i];
//     f.type = "Feature";
//     firebaseGeojsonFeatures.push(f);
// }