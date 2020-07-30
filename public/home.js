const btnBusLine = document.querySelector('#div1');

var left = 106.809478;
var right = 10.844460;


let poslist_car = [];
let poslist_station = [];

//let buslineid_chosen;



//render button
firebase.firestore().collection('Schedule').orderBy('lineName', 'asc')
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

    btn.setAttribute('data-id', doc.id);
    btn.textContent = doc.data().lineName;
    btn.setAttribute('onclick', 'addMap()');

    btn.addEventListener('click', (e) => {
        let id = e.target.getAttribute('data-id');
        getCar();
        getStation(id);
        console.log(e.target.getAttribute('data-id'));
    })

    btnBusLine.appendChild(btn);
}

//get data of car

function getCar() {
    if (poslist_car.length > 0) {
        poslist_car = [];
    }

    firebase.firestore().collection('User Locations')
        .onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == 'added' || change.type=='modified') {
                    var data = change.doc.data();
                    let pos_lat = data.geo_point.latitude;
                    let pos_lng = data.geo_point.longitude;
                    let driver_name = data.user.username;
                    poslist_car.push(JSON.parse('{"type": "Feature","geometry": {"type": "Point","coordinates": [' + pos_lng + ', ' + pos_lat + '] },"properties": {"title":"' + driver_name + '","icon": "car","description": "Xe buyt"}}'));
                }
            })
        })
}

// getCar();

//get data of station based on busline
function getStation(busline_id) {
    if (poslist_station.length > 0) {
        poslist_station = [];
    }

    firebase.firestore().collection('Schedule').doc(busline_id)
        .collection('Stations')
        .get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                let name = doc.data().name;
                let pos_lat = doc.data().position.latitude;
                let pos_lng = doc.data().position.longitude;
                poslist_station.push(JSON.parse('{"type": "Feature","geometry": {"type": "Point","coordinates": [' + pos_lng + ', ' + pos_lat + '] },"properties": {"title": "' + name + '","icon": "monument","description": "Station"}}'));

            })
        })
}

// render mapbox
function addMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZHVvbmd2bXNlNjE5NjkiLCJhIjoiY2ticWxrdGNnMm5qNzJxbXgyd2pzdHQzaSJ9.Exqn75WX503GTtWVQ0Vrkw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [left, right],
        zoom: 15.15,
        attributionControl: false
    });

    map.on('load', function () {
        //road
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

        //FPTU
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

                ]
            }
        });

        //render satation and pos of bus
        map.addSource('stations', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': poslist_station
            }
        })

        map.addSource('carlocation', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': poslist_car
            }
        })

        //Add layer
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
            'id': 'stations',
            'type': 'symbol',
            'source': 'stations',
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
    })
    setTimeout(addMap, 60000);
}


let departurevue = new Vue({
    el: '#departurevue',
    data: {
        buslineList: [],
        buslineID: 'Select Busline.',
        routeList: []
    },
    mounted() {
        fetch('https://asia-east2-fptbustracking.cloudfunctions.net/buslinelists/api/v1/buslinelist')
            .then(response => response.json())
            .then((data) => {
                this.buslineList = data;
            })
    },
    methods: {
        onChangeDropdownBusline: function () {
            if(this.buslineID!=  'Select Busline.'){
            fetch('https://asia-east2-fptbustracking.cloudfunctions.net/routes/api/v1/routelist?buslineid=' + this.buslineID)
                .then(response => response.json())
                .then((data) => {
                    this.routeList = data;
                })}
        },
        millisToMinutesAndSeconds: function (millis) {
            var time = new Date(millis).getTime();
            var hours = new Date(time).getHours();
            var minutes = new Date(time).getMinutes();
            return hours + ":" + minutes;
        }
    },

})