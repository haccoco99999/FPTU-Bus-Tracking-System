
const stationList = document.querySelector('#station-list');
const form_add = document.querySelector('#add-station-form');
const btnBusLine = document.querySelector('#btnListRoutes');
var table = document.getElementById('station-table');

let busline_id_chosen;

var lMarker = [];
var left = 106.809478;
var right = 10.844460;
mapboxgl.accessToken = 'pk.eyJ1IjoiZHVvbmd2bXNlNjE5NjkiLCJhIjoiY2ticWxrdGNnMm5qNzJxbXgyd2pzdHQzaSJ9.Exqn75WX503GTtWVQ0Vrkw';

let map;

function renderMap() {

    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [left, right],
        zoom: 14.50,
        attributionControl: false

    });

}


function rendereStationList(doc, busline_id) {

    let tr = document.createElement('tr');
    let stationName = document.createElement('td');
    let long = document.createElement('td');
    let lat = document.createElement('td');
    let button_delete = document.createElement("button");
    let button_update = document.createElement("button");

    tr.setAttribute('data-id', doc.id);
    tr.setAttribute('id', doc.id);
    stationName.setAttribute('id', 'stationName');
    //stationName.setAttribute('contenteditable','true');
    long.setAttribute('id', 'long');
    lat.setAttribute('id', 'lat');

    stationName.textContent = doc.data().name;
    long.textContent = doc.data().position.longitude;
    lat.textContent = doc.data().position.latitude;



    button_update.className = "btn btn-info btn-fill btn-wd";
    button_update.innerHTML = 'Update';

    button_delete.innerHTML = 'Delete';
    button_delete.className = "btn btn-info btn-fill btn-wd";


    tr.appendChild(stationName);
    tr.appendChild(long);
    tr.appendChild(lat);
    tr.appendChild(button_update);
    tr.appendChild(button_delete);
    //for marker and map
    stationList.appendChild(tr);

    renderMarker(doc);
    console.log(lMarker.length);

    button_update.addEventListener('click', (e) => {
        e.preventDefault();
        let id = e.target.parentElement.getAttribute('data-id');
        console.log(table.rows.namedItem(id).cells.namedItem('lat').innerHTML);
        console.log(table.rows.namedItem(id).cells.namedItem('long').innerHTML);

        let station_name = table.rows.namedItem(id).cells.namedItem('stationName').innerHTML;
        let lat = parseFloat(table.rows.namedItem(id).cells.namedItem('lat').innerHTML);
        let long = parseFloat(table.rows.namedItem(id).cells.namedItem('long').innerHTML);
        let timestamp = new Date();
        firebase.firestore()
            .collection('Schedule')
            .doc(busline_id)
            .collection('Stations')
            .doc(id).set({
                name: station_name,
                position: new firebase.firestore.GeoPoint(lat, long),
                timestamp: timestamp
            });
    })

    button_delete.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        //firebase.firestore().collection(busline_id).doc(id).delete();
        firebase.firestore().collection('Schedule').doc(busline_id).collection('Stations')
            .doc(id).delete();
    });
}


// firebase.firestore().collection('Routes').doc(route_id_chosen).collection('Stations')
//     .orderBy('station_name', 'asc')
//     .onSnapshot(snapshot => {
//         let changes = snapshot.docChanges();
//         changes.forEach(change => {
//             if (change.type == 'added') {
//                 rendereStationList(change.doc);

//             } else if (change.type == 'removed') {
//                 let li = stationList.querySelector('[data-id=' + change.doc.id + ']');
//                 stationList.removeChild(li);
//             }
//         })
//     })


var pos_lMarker;
function renderMarker(doc) {
    //var index;
    if (doc != null) {
        if (lMarker.length == 0) {
            index = lMarker.length;
        } else {
            lMarker.length + 1;
        }

        var marker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([doc.data().position.longitude, doc.data().position.latitude])
            .setPopup(new mapboxgl.Popup().setHTML("<h1>" + doc.data().name + "</h1>")) // add popup
            .addTo(map)
            .on('dragend', function () {
                var lngLat = marker.getLngLat();
                getPosOfRows(marker);
                table.rows[pos_lMarker + 1].cells[1].innerHTML = lngLat.lng;
                table.rows[pos_lMarker + 1].cells[2].innerHTML = lngLat.lat;
            });

        lMarker.push(marker);
    }


}
//add station
form_add.addEventListener('submit', (e) => {
    e.preventDefault();
    let timestamp = new Date();
    firebase.firestore().collection('Schedule')
        .doc(busline_id_chosen)
        .collection('Stations')
        .doc(form_add.station_name.value).set({
            name: form_add.station_name.value,
            position: new firebase.firestore.GeoPoint(10.842048, 106.809172),  //dh fpt
            timestamp: timestamp
        });
    form_add.station_name.value = '';
})

function getPosOfRows(marker) {
    for (let i = 0; i < lMarker.length; i++) {
        if (marker == lMarker[i])
            pos_lMarker = i;
    }
}


//busline manage
firebase.firestore().collection('Schedule').orderBy('lineName','asc')
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
    let button = document.createElement('button');

    button.setAttribute('data-id', doc.id);
    button.id = doc.id;
    button.textContent = doc.data().lineName;

    button.addEventListener('click', (e) => {
        busline_id_chosen = e.target.getAttribute('data-id');
        console.log(lMarker.length);
        renderMap();
        removeAllChild(stationList);


        if (lMarker.length > 0) {
            lMarker = [];
        }

        console.log(e.target.getAttribute('data-id'));

        showStation(e.target.getAttribute('data-id'));
    })
    btnBusLine.appendChild(button);
}



function removeAllChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showStation(busline_id) {

    firebase.firestore().collection('Schedule').doc(busline_id).collection('Stations')
        .orderBy('name', 'asc')
        .onSnapshot(snapshot => {
            let changes = snapshot.docChanges();
            changes.forEach(change => {
                if (change.type == 'added') {
                    rendereStationList(change.doc, busline_id);

                } else if (change.type == 'removed') {
                    let li = stationList.querySelector('[data-id=' + change.doc.id + ']');
                    stationList.removeChild(li);
                }
            })
        })

}


//Vue


// let map_vue ;

// function renderMapVue() {
//     map = new mapboxgl.Map({
//         container: 'map',
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [left, right],
//         zoom: 15.15,
//         attributionControl: false

//     });
// }

let busline_control = new Vue({
    el: '#busline_vue',
    data: {
        buslineList: [],
        buslineID: '',
        stationlist: [],
        key: '',
        mapvue: ''
        //detailRows:[]

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
            console.log('onChangeDropdownBusline' + this.buslineID);
            
            this.mapvue = new mapboxgl.Map({
                container: 'map_vue',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [left, right],
                zoom: 15.15,
                attributionControl: false
            
            });

            fetch('https://asia-east2-fptbustracking.cloudfunctions.net/stations/api/v1/stationlist?buslineid=' + this.buslineID)
                .then(response => response.json())
                .then((data) => {
                    this.stationlist = data;
                    console.log(this.stationlist)
                    this.renderMarkerVue(this.stationlist);

                }); 
        },

        deleteStation(stationID) {
            fetch('https://asia-east2-fptbustracking.cloudfunctions.net/stations/api/v1/delete?buslineid=' + this.buslineID + '&stationid=' + stationID,
                { method: 'DELETE' })
                .then((response) => {
                    if(response.status==200){

                    }

                })
        },

        postStation(stationid,pos_lng,pos_lat){
            fetch('https://asia-east2-fptbustracking.cloudfunctions.net/stations/api/v1/station?buslineid='+this.buslineID+'&stationid='+stationid+'&lat='+pos_lat+'&lng='+pos_lng,
            {method: 'POST'})
        },

        renderMarkerVue(stationListE) {
           // console.log(this.$refs);
            stationListE.forEach((function (e, i) {
                this.marker = new mapboxgl.Marker({
                    draggable: true
                })
                    .setLngLat([e.position._longitude, e.position._latitude])
                    .setPopup(new mapboxgl.Popup().setHTML("<h1>" + e.name + "</h1>"))
                    .addTo(map_vue)
                    .on('dragend', function () {
                        var lnglat = marker.getLngLat();
                        e.position._longitude = lnglat.lng;
                        e.position._latitude = lnglat.lat;
                        console.log(e.name);
                        console.log(e.position._longitude);
                    })
            }))
        },
        renderMap: function(){
            
        }
    },

})

let map_vue = busline_control.$data.mapvue
// = new mapboxgl.Map({
//     container: 'map_vue',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [left, right],
//     zoom: 15.15,
//     attributionControl: false

// });




