// const busList = document.querySelector('#bus-list');
// const form = document.querySelector('#add-bus-form');
// const form_update =  document.querySelector('#update-bus-form');
// const update_block = document.getElementById('update-bus');
// // update_block.style.display = 'none';



// function renderBusList(doc) {
//     let tr = document.createElement('tr');
//     let busID = document.createElement('td');
//     let busName = document.createElement('td');
//     let des = document.createElement('td');
//     let license_plate = document.createElement('td');
//     let model = document.createElement('td');
//     let seat = document.createElement('td');
//     let button_delete = document.createElement("button");
//     let button_update = document.createElement("button");

//     tr.setAttribute('data-id', doc.id);
//     tr.setAttribute('id',doc.id);
//     busID.setAttribute('id','busID');
//     busName.setAttribute('id','busName');
//     license_plate.setAttribute('id','license_plate');
//     model.setAttribute('id','model');
//     seat.setAttribute('id','seat');
//     des.setAttribute('id','des');

    
//     busID.textContent = doc.data().bus_id;
//     busName.textContent = doc.data().bus_name;
//     license_plate.textContent = doc.data().license_plate;
//     model.textContent = doc.data().model;
//     seat.textContent = doc.data().seat;
//     des.textContent = doc.data().des;

//     button_update.className = "btn btn-info btn-fill btn-wd";
//     button_update.innerHTML = 'Update';
//     button_update.setAttribute('data-toggle','modal');
//     button_update.setAttribute('data-target','#myModal');
    
//     button_delete.innerHTML = 'Delete';
//     button_delete.className = "btn btn-info btn-fill btn-wd";
    

//     tr.appendChild(busID);
//     tr.appendChild(busName);
//     tr.appendChild(license_plate);
//     tr.appendChild(model);
//     tr.appendChild(seat);
//     tr.appendChild(des);
//     tr.appendChild(button_update);
//     tr.appendChild(button_delete);

//     busList.appendChild(tr);

//     //delete data
//     button_delete.addEventListener('click', (e) =>{
        
//         let id = e.target.parentElement.getAttribute('data-id');
//         firebase.firestore().collection('Buses').doc(id).delete();
//     })

//     button_update.addEventListener('click', (e) =>{
//         let id = e.target.parentElement.getAttribute('data-id');
//         updateData(id);
//     })

// }


// //retrieve data from Firebase
// // firebase.firestore().collection('Bus').orderBy('bus_id','asc').get().then((snapshot) => {
// //     snapshot.docs.forEach(doc => {
// //         renderBusList(doc);
// //     })
// // })


// firebase.firestore().collection('User Locations').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => console.log(doc))
// })

// //real-time listener
// firebase.firestore().collection('Buses').orderBy('bus_id','asc')
// .onSnapshot(snapshot =>{
//     let changes = snapshot.docChanges();
//     changes.forEach(change =>{
//         if(change.type == 'added'){
//             renderBusList(change.doc);
//         }else if (change.type == 'removed'){
//             let li = busList.querySelector('[data-id='+ change.doc.id + ']');
//             busList.removeChild(li);
//         }
//     })
// })

// //add data into firebase
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     firebase.firestore().collection('Buses').doc(form.bus_id.value).set({
        
//         bus_id: form.bus_id.value,
//         bus_name : form.bus_name.value,
//         license_plate: form.license.value,
//         model: form.model.value,
//         seat: form.seat.value,
//         des: form.note.value 
//     });
//     form.bus_id.value = '';
//     form.bus_name.value = '';
//     form.license.value = '';
//     form.model.value = '';
//     form.seat.value = '';
//     form.note.value= '';
// })




// function updateData(id)
// {
//     var table = document.getElementById("bus-table").rows.namedItem(id).cells;

//     var bus_id = table.namedItem('busID').innerHTML;
//     var bus_name = table.namedItem('busName').innerHTML;
//     var license = table.namedItem('license_plate').innerHTML;
//     var model= table.namedItem('model').innerHTML;
//     var seat = table.namedItem('seat').innerHTML;
//     var note = table.namedItem('des').innerHTML;

//     console.log(bus_id);
//     console.log(bus_name);
//     console.log(license);

    
//     document.getElementById("busID_u").value  =  bus_id;
//     document.getElementById('busName_u').value = bus_name ;
//     document.getElementById('uLicense').value = license ;
//     document.getElementById('uModel').value = model ;
//     document.getElementById('uSeat').value = seat ;
//     if(note != "")
//     {
//         document.getElementById('uNote').value = note ;
//     }
    
//     // document.getElementById('license_u').value=license;
//     // document.getElementById('model_u').value=model ;
//     // document.getElementById('seat_u').value=seat ;
//     // document.getElementById('note_u').value= note;


//      document.getElementById('busID_u').disabled=true;

//     form_update.addEventListener('submit', (e) =>{
//         firebase.firestore().collection('Buses').doc(id).set({
//             bus_id: id,
//             bus_name : form_update.bus_name_u.value,
//             license_plate: form_update.license_u.value,
//             model: form_update.model_u.value,
//             seat: form_update.seat_u.value,
//             des: form_update.note_u.value 
//         });
        

//     })

// }


var vm = new Vue({
    el: '#app',
    data: {
        search: '',
        buses: [],
        editBus: 1,
        busnote: '',
        otherParam: {
            method: 'POST'

        },
    },
    mounted() {
       this.listAllBus()
    },
    methods: {
        listAllBus(){
            fetch("https://asia-east2-fptbustracking.cloudfunctions.net/buses/api/v1/buslist")
            .then(response => response.json())
            .then((data) => {
                this.buses = data;
            })
        },
        deletebyID(busidfordelete) {
            fetch("https://asia-east2-fptbustracking.cloudfunctions.net/buses/api/v1/bus/delete?docid=" + busidfordelete, { method: 'DELETE' })
            .then(this.listAllBus())

        },
        updateBus(busid, busname, busmodel, busseat, buslicenseplate) {
            fetch("https://asia-east2-fptbustracking.cloudfunctions.net/buses/api/v1/bus/add?docid=" + busid + "&name=" + busname + "&license=" + buslicenseplate + "&model=" + busmodel + "&seat=" + busseat + "&note=" + this.busnote, this.otherParam);
        },


    },
});

var vuejs = new Vue({
    el: '#add',
    data: {
        buses: {
            busId: '',
            busName: '',
            busPlate: '',
            busSeat: '',
            busModel: '',
            busNote: ''
        },

        otherParam: {
            method: 'POST'

        }
    },
    methods: {
        addBus() {
            fetch("https://asia-east2-fptbustracking.cloudfunctions.net/buses/api/v1/bus/add?docid=" + this.buses.busId + "&name=" + this.buses.busName + "&license=" + this.buses.busPlate + "&model=" + this.buses.busModel + "&seat=" + this.buses.busSeat + "&note=" + this.buses.busNote, this.otherParam)
            .then(location.reload())
        }
    },

   
});
