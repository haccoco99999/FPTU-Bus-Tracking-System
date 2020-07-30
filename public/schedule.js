// const buslineList = document.querySelector('#dropdown-buslinelist');
// const busSchedule = document.querySelector('#schedule_bus');

// //form render
// const form_update = document.querySelector('#update-schedule-form');
// const form_add = document.querySelector('#add-schedule-form')

// //driver list for options render
// const driverListU = document.querySelector('#dropdown-driverlist_u');
// const driverListA = document.querySelector('#dropdown-driverlist_a');

// //bus list for options render
// const busList = document.querySelector('#dropdown-buslist');
// const busListA = document.querySelector('#dropdown-buslist_a');

// let busline_id_chosen;
// let available_chosen = [];
// let bus_list = [];

// //hide options if not click on
// busList.style.display = 'none';
// busListA.style.display = 'none';

// driverListU.style.display = 'none';
// driverListA.style.display = 'none';


// //sdk manager firebase
// firebase.firestore().collection('Drivers')
//     .onSnapshot(snapshot => {
//         let changes = snapshot.docChanges();
//         changes.forEach(change => {
//             if (change.type == 'added') {
//                 renderDriverListA(change.doc);
//                 renderDriverListU(change.doc)
//             } else if (change.type == 'removed') {
//                 removeChildBusListA(change.doc);
//                 removeChildBusListU(change.doc);
//             }


//         })
//     })
// //render busline
// firebase.firestore().collection('Schedule').orderBy('lineID', 'asc')
//     .get()
//     .then((snapshot) => {
//         snapshot.docs.forEach(doc => {
//             console.log(doc.data().busline_id);
//             renderBusLineList(doc);
//         })
//     });

// firebase.firestore().collection('Buses').orderBy('bus_id', 'asc')
//     .get()
//     .then((snapshot) => {
//         snapshot.docs.forEach(doc => {
//             console.log(doc.data().bus_id);

//             renderBusOptionAdd(doc);
//             renderBusOptionUpdate(doc);
//         })
//     });

// // render function

// function renderBusOptionUpdate(doc) {
//     let busline_name = document.createElement('option');
//     busline_name.textContent = doc.data().bus_id;
//     //add data
//     busList.appendChild(busline_name)


// };

// function renderBusOptionAdd(doc) {
//     let busline_name = document.createElement('option');
//     busline_name.textContent = doc.data().bus_id;
//     //add data
//     busListA.appendChild(busline_name)
// }

// function renderBusLineList(doc) {

//     let busline_name = document.createElement('option');

//     busline_name.textContent = doc.data().lineID;

//     buslineList.appendChild(busline_name);
// }

// function renderBusSchedule(doc) {
//     let tr = document.createElement('tr');
//     //let time = document.createElement('td');
//     let name = document.createElement('td')
//     let time_start = document.createElement('td');
//     let time_end = document.createElement('td');
//     let bus_available = document.createElement('td');
//     let driver_available = document.createElement('td');
//     let button_delete = document.createElement('button');
//     let button_update = document.createElement('button');
//     //let select = document.createElement('select');
//     tr.setAttribute('data-id', doc.id);
//     tr.id = doc.id;
//     name.id = 'name';
//     time_start.id = 'time_start';
//     time_end.id = 'time_end';
//     bus_available.id = 'bus_available';
//     driver_available.id = 'driver_available';

//     name.textContent = doc.data().routeName;
//     time_start.textContent = millisToMinutesAndSeconds(parseInt(doc.data().timeStart.toMillis()));
//     time_end.textContent = millisToMinutesAndSeconds(parseInt(doc.data().timeEnd.toMillis()));

//     if (doc.data().currentBusID != null) {
//         let span = document.createElement('span');
//         const element = document.createElement('span');
//         span.id = doc.data().currentBusID;
//         span.className = 'badge badge-pill badge-primary';
//         element.textContent = String(doc.data().currentBusID) + " ";

//         span.appendChild(element);
//         bus_available.appendChild(span);
//     }

//     if (doc.data().currentDriverID != null) {
//         let span = document.createElement('span');
//         const element = document.createElement('span');
//         span.id = doc.data().currentDriverID;
//         span.className = 'badge badge-pill badge-primary';
//         element.textContent = String(doc.data().currentDriverID) + " ";

//         span.appendChild(element);
//         driver_available.appendChild(span);
//     }


//     button_delete.textContent = 'Delete';
//     button_update.textContent = 'Update'
//     button_delete.className = 'btn btn-info btn-fill btn-wd';
//     button_update.className = 'btn btn-info btn-fill btn-wd'
//     button_update.setAttribute('data-toggle', 'modal');
//     button_update.setAttribute('data-target', '#myModal');
//     tr.appendChild(name);
//     tr.appendChild(time_start);
//     tr.appendChild(time_end);
//     tr.appendChild(bus_available);
//     tr.appendChild(driver_available);
//     tr.appendChild(button_update);
//     tr.appendChild(button_delete);

//     busSchedule.appendChild(tr);

//     button_update.addEventListener('click', (e) => {

//         let id = e.target.parentElement.getAttribute('data-id');
//         updateSchedule(id);
//     })

//     button_delete.addEventListener('click', (e) => {
//         let id = e.target.parentElement.getAttribute('data-id');
//         firebase.firestore().collection('Schedule').doc(busline_id_chosen).collection('Routes').doc(id).delete();
//     });
// }




// buslineList.addEventListener('change', (e) => {
//     removeAllChild(document.getElementById('schedule_bus'));
//     busline_id_chosen = String(e.target.value);
//     firebase.firestore().collection('Schedule').doc(e.target.value).collection('Routes')
//         .get().then((snapshot) => {
//             snapshot.docs.forEach(doc => {
//                 renderBusSchedule(doc);
//             });
//         })
// });

// function millisToMinutesAndSeconds(millis) {
//     console.log(millis);
//     var time = new Date(millis).getTime();
//     var hours = new Date(time).getHours();
//     var minutes = new Date(time).getMinutes();
//     return hours + ":" + minutes;
// }

// //render driver list
// function renderDriverListA(doc) {
//     let driver_name = document.createElement('option');
//     driver_name.setAttribute('data-id', doc.data().driverID);
//     driver_name.textContent = doc.data().driverID;
//     //add data
//     driverListA.appendChild(driver_name);
// }

// function renderDriverListU(doc) {
//     let driver_name = document.createElement('option');
//     driver_name.setAttribute('data-id', doc.data().driverID);
//     driver_name.textContent = doc.data().driverID;
//     //add data
//     driverListU.appendChild(driver_name);
// }

// //eventlistener list
// busList.addEventListener('change', (e) => {
//     if (e.target.value !== 'Add more bus ') {
//         ;
//         addSpanBusAvailable(e.target.value, 1);
//         busList.style.display = 'none';
//     }

// });

// //add bus in update form
// document.getElementById('add_bus_btn').addEventListener('click', (e) => {
//     e.preventDefault();
//     busList.style.display = 'block';
//     // buslistOption(1);
// });

// document.getElementById('btnAddSchedule').addEventListener('click', (e) => {
//     e.preventDefault();
//     busListA.style.display = 'block';
// })

// busListA.addEventListener('change', (e) => {
//     if (e.target.value !== 'Add more bus ') {
//         addSpanBusAvailable(e.target.value, 0);
//         busListA.style.display = 'none';
//     }
// });


// document.getElementById('btnDriverU').addEventListener('click', (e) => {
//     e.preventDefault();
//     driverListU.style.display = 'block';
// })

// driverListU.addEventListener('change', (e) => {
//     if (e.target.value !== 'Add more driver ') {
//         addSpanDriverAvailable(e.target.value, 1);
//         driverListU.style.display = 'none';
//     }
// })


// document.getElementById('btnDriverA').addEventListener('click', (e) => {
//     e.preventDefault();
//     driverListA.style.display = 'block';
// })

// driverListA.addEventListener('change', (e) => {
//     if (e.target.value !== 'Add more driver ') {
//         addSpanDriverAvailable(e.target.value, 0);
//         driverListA.style.display = 'none';
//     }
// })

// //Function List


// function addSpanBusAvailable(data, type) {
//     let span = document.createElement('span');
//     const element = document.createElement('span');
//     let icon_delete = document.createElement('a');
//     span.className = 'badge badge-pill badge-primary';
//     span.id = data;
//     //element.textContent = String(bus_available[index]) + " ";
//     element.textContent = data + " ";
//     icon_delete.text = ' ' + 'x';
//     icon_delete.href = '#';
//     icon_delete.title = 'Remove bus'
//     icon_delete.addEventListener('click', (e) => {
//         if (type == 0) {
//             document.getElementById('bus_available_a').removeChild(e.target.parentElement);
//         } else {
//             document.getElementById('bus_available_u').removeChild(e.target.parentElement);
//         }
//     })
//     span.appendChild(element);
//     span.appendChild(icon_delete);
//     if (type == 0) {
//         document.getElementById('bus_available_a').appendChild(span);
//     } else {
//         document.getElementById('bus_available_u').appendChild(span);
//     }


// }

// function removeAllChild(parent) {
//     while (parent.firstChild) {
//         parent.removeChild(parent.firstChild);
//     }
// }


// //only for update and add new
// function readAllSpanChild(parent) {
//     let spans = parent.getElementsByTagName('span');
//     if (available_chosen.length > 0) {
//         available_chosen = []; //set default lai
//     }
//     for (var i = 0, l = spans.length; i < l; i++) {
//         if (spans[i].id !== '') {
//             console.log(spans[i].id);
//             available_chosen.push(spans[i].id);
//         }

//     }
// }

// function setTimeStamp(time_string) {
//     let time = [];
//     time = time_string.split(':');
//     let date = new Date();
//     date.setFullYear(2020, 07, 16);
//     date.setHours(parseInt(time[0]));
//     date.setMinutes(parseInt(time[1]));
//     return date;
// }

// function removeChildBusListA(doc) {
//     let li = driverListA.querySelector('[data-id=' + doc.id + ']');
//     driverList.removeChild(li);
// }

// function removeChildBusListU(doc) {
//     let li = driverListU.querySelector('[data-id=' + doc.id + ']');
//     driverList.removeChild(li);
// }


// function addSpanDriverAvailable(data, type) {
//     let span = document.createElement('span');
//     const element = document.createElement('span');
//     let icon_delete = document.createElement('a');
//     span.className = 'badge badge-pill badge-primary';
//     span.id = data;
//     //element.textContent = String(bus_available[index]) + " ";
//     element.textContent = data + " ";
//     icon_delete.text = ' ' + 'x';
//     icon_delete.href = '#';
//     icon_delete.title = 'Remove bus'
//     icon_delete.addEventListener('click', (e) => {
//         if (type == 0) {
//             document.getElementById('driver_available_a').removeChild(e.target.parentElement);
//         } else {
//             document.getElementById('driver_available_u').removeChild(e.target.parentElement);
//         }
//     })
//     span.appendChild(element);
//     span.appendChild(icon_delete);
//     if (type == 0) {
//         document.getElementById('driver_available_a').appendChild(span);
//     } else {
//         document.getElementById('driver_available_u').appendChild(span);
//     }

// }


// //render form
// //add schedule 
// form_add.addEventListener('submit', (e) => {
//     e.preventDefault();
//     console.log(document.getElementById('bus_available_a').innerHTML);
//     readAllSpanChild(document.getElementById('bus_available_a'));

//     let bus_chosen = String(available_chosen[0]);
//     readAllSpanChild(document.getElementById('driver_available_a'));
//     let driver_chosen = String(available_chosen[0]);

//     firebase.firestore().collection('Schedule').doc(busline_id_chosen).collection('Routes').add({
//         timeStart: setTimeStamp(String(form_add.time_start.value)),
//         timeEnd: setTimeStamp(String(form_add.time_end.value)),
//         currentBusID: bus_chosen,
//         currentDriverID: driver_chosen,
//         routeName: form_add.name.value
//     });
//     removeAllChild(document.getElementById('bus_available_a'));
//     removeAllChild(document.getElementById('driver_available_a'))
//     form_add.time_start.value = '';
//     form_add.time_end.value = '';
//     form_add.name.value = '';
// });
// //form update
// function updateSchedule(route_id) {
//     let table = document.getElementById('schedule-table').rows.namedItem(route_id).cells;
//     document.getElementById('name_u').value = table.namedItem('name').innerHTML;
//     document.getElementById('time_start_u').value = table.namedItem('time_start').innerHTML;
//     document.getElementById('time_end_u').value = table.namedItem('time_end').innerHTML;
//     removeAllChild(document.getElementById('bus_available_u'));
//     removeAllChild(document.getElementById('driver_available_u'));
//     readAllSpanChild(table.namedItem('bus_available'))
//     addSpanBusAvailable(available_chosen[0], 1);
//     readAllSpanChild(table.namedItem('driver_available'))
//     addSpanDriverAvailable(String(available_chosen[0]), 1);
//     //firebase.firestore().collection('Schedule').doc(e.target.value).collection('Route')
//     form_update.addEventListener('submit', (e) => {
//         readAllSpanChild(document.getElementById('bus_available_u'));
//         let bus_chosen = String(available_chosen[0]);
//         readAllSpanChild(document.getElementById('driver_available_u'));
//         let driver_chosen = String(available_chosen[0]);
//         firebase.firestore().collection('Schedule').doc(busline_id_chosen).collection('Routes')
//             .doc(route_id).set({
//                 timeStart: setTimeStamp(document.getElementById('time_start_u').value),
//                 timeEnd: setTimeStamp(document.getElementById('time_end_u').value),
//                 currentBusID: bus_chosen,
//                 currentDriverID: driver_chosen,
//                 routeName: document.getElementById('name_u').value
//             });
//     });
// }

//get driver list



//vue

let routevue = new Vue({
    el: '#routevue',
    data: {
        buslineList: [],
        buslineID: '',
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
           // console.log(this.buslineID.id)
            routeaddvue.buslineid = this.buslineID.id

            fetch('https://asia-east2-fptbustracking.cloudfunctions.net/routes/api/v1/routelist?buslineid=' + this.buslineID.id)
                .then(response => response.json())
                .then((data) => {
                    this.routeList = data;
                })
        },
        millisToMinutesAndSeconds: function (millis) {
            var time = new Date(millis).getTime();
            var hours = new Date(time).getHours();
            var minutes = new Date(time).getMinutes();
            return hours + ":" + minutes;
        },

        deleteRoutes: function (routeid) {
            fetch('https://asia-east2-fptbustracking.cloudfunctions.net/routes/api/v1/delete?buslineid=' + this.buslineID.id + '&routeid=' + routeid,
                { method: 'DELETE' })
                .then((response)=>{
                    if(response.status==200)
                    {
                        alert('Delete Complete!')
                    }
                })

        },
        transferDataIntoUpdateForm: function (scheduleid, schedulename, timestart, timeend, currentbusID, currentDriverID) {
            routeupdatevue.scheduleid = scheduleid;
            routeupdatevue.scheduleName = schedulename;
            routeupdatevue.timestart = timestart;
            routeupdatevue.timeend = timeend;

            if (routeupdatevue.spanBusRenderList.length > 0) {
                routeupdatevue.spanBusRenderList.splice(0, routeupdatevue.spanBusRenderList.length)
            }

            routeupdatevue.spanBusRenderList.push(currentbusID);

            if (routeupdatevue.spanDriverRenderList.length > 0) {
                routeupdatevue.spanDriverRenderList.splice(0, routeupdatevue.spanBusRenderList.length)
            }

            routeupdatevue.spanDriverRenderList.push(currentDriverID);


        }
    },

})


var routeupdatevue = new Vue({
    el: '#routeupdatevue',
    data: {

        busList: [],
        driverList: [],
        scheduleid: '',
        scheduleName: '',
        timestart: '',
        timeend: '',
        busselected: '',
        driverselected: '',
        spanBusRenderList: [],
        spanDriverRenderList: []

    },
    mounted() {
        fetch('https://asia-east2-fptbustracking.cloudfunctions.net/drivers/api/v1/driverlist')
            .then(response => response.json())
            .then((data) => {
                this.driverList = data

            }
            );

        fetch('https://asia-east2-fptbustracking.cloudfunctions.net/buses/api/v1/buslist')
            .then(res => res.json())
            .then((data) => {
                this.busList = data;

            })

        //this.spanBusRenderList.push(this.bustransfer);

    },

    methods: {
        onChangeAddSpanBus: function () {
            if (!this.spanBusRenderList.includes(this.busselected))
                this.spanBusRenderList.push(this.busselected);

        },

        onChangeAddSpanDriver: function () {
            if (!this.spanDriverRenderList.includes(this.driverselected))
                this.spanDriverRenderList.push(this.driverselected);

        },

        deleteSpan: function (span, index, type) {
            if (type == 0) {
                if (this.spanBusRenderList.includes(span)) {
                    this.spanBusRenderList.splice(index, 1);
                }
            } else {
                if (this.spanDriverRenderList.includes(span)) {
                    this.spanDriverRenderList.splice(index, 1);
                }
            }
        },
        updateSchedule: function () {
            let buslineid = routevue.buslineID

            let scheduleid = this.scheduleid
            let scheduleName = this.scheduleName
            let timestart_u = this.timestart
            let timeend_u = this.timeend;
            let driver_u = ''
            if (this.spanDriverRenderList.length > 0) {
                driver_u = this.spanDriverRenderList[0]
            }
            let bus_u = ''
            if (this.spanBusRenderList.length > 0) {
                bus_u = this.spanBusRenderList[0]
            }

            console.log(timestart_u)

            if (scheduleid == '' || scheduleName == '' || timestart_u == '' || timeend_u == '' || driver_u == '' || bus_u == '') {
                alert('You have to input all fields')
            } else {
                fetch('https://asia-east2-fptbustracking.cloudfunctions.net/routes/api/v1/route?buslineid=' + buslineid + '&routeid=' + scheduleid + '&name=' + scheduleName + '&busid=' + bus_u + '&driverid=' + driver_u + '&timestart=' + timestart_u + '&timeend=' + timeend_u,
                    { method: 'POST' })
                    .then(response => console.log(response.status))
            }
        },

    }
})

var routeaddvue = new Vue({
    el: '#routeaddvue',
    data: {
        busList: [],
        driverList: [],
        routeName: '',
        timestart: '',
        timeend: '',
        busSelected: '',
        driverSelected: '',
        spanBusRenderList: [],
        spanDriverRenderList: [],
        buslineid: '',
    },
    mounted() {
        fetch('https://asia-east2-fptbustracking.cloudfunctions.net/drivers/api/v1/driverlist')
            .then(response => response.json())
            .then((data) => {
                this.driverList = data

            }
            );

        fetch('https://asia-east2-fptbustracking.cloudfunctions.net/buses/api/v1/buslist')
            .then(res => res.json())
            .then((data) => {
                this.busList = data;

            });

    },
    methods: {
        onChangeAddSpanBus: function () {
            console.log(this.busSelected)
            if (!this.spanBusRenderList.includes(this.busSelected))
                this.spanBusRenderList.push(this.busSelected);
            console.log(this.spanBusRenderList);
        },

        onChangeAddSpanDriver: function () {
            if (!this.spanDriverRenderList.includes(this.driverSelected))
                this.spanDriverRenderList.push(this.driverSelected);

        },
        deleteSpan: function (span, index, type) {
            if (type == 0) {
                if (this.spanBusRenderList.includes(span)) {
                    this.spanBusRenderList.splice(index, 1);
                }
            } else {
                if (this.spanDriverRenderList.includes(span)) {
                    this.spanDriverRenderList.splice(index, 1);
                }
            }
        },
        addNewRoute: function () {
            if (this.buslineid != '') {
                let routename = this.routeName
                let timestart = this.timestart
                let timeend = this.timeend

                let driver_u = ''
                if (this.spanDriverRenderList.length > 0) {
                    driver_u = this.spanDriverRenderList[0]
                }
                let bus_u = ''
                if (this.spanBusRenderList.length > 0) {
                    bus_u = this.spanBusRenderList[0]
                }

                if (routename == '' || timestart == '' || timeend == '' || driver_u == '' || bus_u == '') {
                    alert('You have to input all fields')
                } else {

                    fetch('https://asia-east2-fptbustracking.cloudfunctions.net/routes/api/v1/route?buslineid=' + this.buslineid + '&routeid=' + routename + '&name=' + routename + '&busid=' + bus_u + '&driverid=' + driver_u + '&timestart=' + timestart + '&timeend=' + timeend,
                        { method: 'POST' })
                        .then((response) =>{
                            if(response.status == 200)
                                alert('Add Complete!')
                        })
                }
            } else {
                alert('You have to select busline')
            }


        }
    }
})

