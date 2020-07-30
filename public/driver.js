// const driverList = document.querySelector('#driver-list');
// const formAdd = document.querySelector('#addform');
// const formUpdate = document.querySelector('#update-driver-form');
// function renderDriverList(doc) {
//     let tr = document.createElement('tr');
//     let driver_id = document.createElement('td');
//     let driver_name = document.createElement('td');
//     let email = document.createElement('td');
//     let phone = document.createElement('td');
//     let citizenID = document.createElement('td');
//     let drivingLicense = document.createElement('td');
//     let status = document.createElement('td');
//     let note = document.createElement('td');
//     let btnUpdate = document.createElement('button');
//     let btnDelete = document.createElement('button');

//     tr.setAttribute('data-id', doc.id);
//     tr.id = doc.id;
//     driver_id.id = 'driver_id';
//     driver_name.id = 'driver_name';
//     email.id = 'email';
//     citizenID.id = 'citizenID';
//     drivingLicense.id = 'drivingLicense';
//     status.id = 'status';
//     note.id = 'note';
//     phone.id = 'phone'

//     driver_id.textContent = doc.data().driverID;
//     driver_name.textContent = doc.data().name;
//     email.textContent = doc.data().email;
//     citizenID.textContent = doc.data().citizenID;
//     drivingLicense.textContent = doc.data().drivingLicense;
//     note.textContent = doc.data().note;
//     phone.textContent = doc.data().phone;
//     if (doc.data().status == 0) {
//         status.textContent = 'Inactive';
//     } else {
//         status.textContent = 'Active';
//     }


//     btnUpdate.className = "btn btn-info btn-fill btn-wd";
//     btnUpdate.innerHTML = 'Update';
//     btnUpdate.setAttribute('data-toggle', 'modal');
//     btnUpdate.setAttribute('data-target', '#myModal');

//     btnDelete.innerHTML = 'Delete';
//     btnDelete.className = "btn btn-info btn-fill btn-wd";

//     tr.appendChild(driver_id);
//     tr.appendChild(driver_name);
//     tr.appendChild(email);
//     tr.appendChild(phone);
//     tr.appendChild(citizenID);
//     tr.appendChild(drivingLicense);
//     tr.appendChild(status);
//     tr.appendChild(note);

//     tr.appendChild(btnUpdate);
//     tr.appendChild(btnDelete);

//     driverList.appendChild(tr);

//     btnDelete.addEventListener('click', (e) => {
//         let id = e.target.parentElement.getAttribute('data-id');
//         firebase.firestore().collection('Drivers').doc(id).delete();
//     })

//     btnUpdate.addEventListener('click', (e) => {
//         let id = e.target.parentElement.getAttribute('data-id');
//         updateDriver(id);
//     })

// }

// firebase.firestore().collection('Drivers').orderBy('driverID', 'asc')
//     .onSnapshot(snapshot => {
//         let changes = snapshot.docChanges();
//         changes.forEach(change => {
//             if (change.type == 'added') {
//                 renderDriverList(change.doc)
//             } else if (change.type == 'removed') {
//                 let li = driverList.querySelector('[data-id=' + change.doc.id + ']');
//                 driverList.removeChild(li);
//             }


//         })
//     })

// formAdd.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let status_number;
//     if (document.getElementById('status_a').value == 'Active') {
//         status_number = 1;
//     } else {
//         status_number = 0;
//     }
//     firebase.firestore().collection('Drivers').doc(formAdd.txtDriverID.value)
//         .set({
//             driverID: formAdd.txtDriverID.value,
//             name: formAdd.txtDriverName.value,
//             email: formAdd.txtEmail.value,
//             citizenID: formAdd.txtCitizenID.value,
//             drivingLicense: formAdd.txtLicense.value,
//             status: status_number,
//             note: formAdd.txtNote.value,
//             phone: formAdd.txtPhone.value

//         });
//     formAdd.txtDriverID.value = '';
//     formAdd.txtDriverName.value = '';
//     formAdd.txtEmail.value = '';
//     formAdd.txtCitizenID.value = '';
//     formAdd.txtLicense.value = ''
//     formAdd.txtNote.value = '';
//     document.getElementById('status_a').value = 'Inactive'
// })

// function updateDriver(id) {
//     var table = document.getElementById("driver-table").rows.namedItem(id).cells;

//     document.getElementById('driverID_u').value = table.namedItem('driver_id').innerHTML;
//     document.getElementById('driverName_u').value = table.namedItem('driver_name').innerHTML;
//     document.getElementById('citizenid_u').value = table.namedItem('citizenID').innerHTML;
//     document.getElementById('drivinglicense_u').value = table.namedItem('drivingLicense').innerHTML;
//     document.getElementById('status_u').value = table.namedItem('status').innerHTML;
//     document.getElementById('email_u').value = table.namedItem('email').innerHTML;
//     document.getElementById('phone_u').value = table.namedItem('phone').innerHTML;
//     document.getElementById('uNote').value = table.namedItem('note').innerHTML;
//     let status_number;

//     if (document.getElementById('status_u').value == 'Active') {
//         status_number = 1
//     } else {
//         status_number = 0;
//     }

//     document.getElementById('status_u').addEventListener('change', (e) => {
//         if (e.target.value == 'Active') {

//             status_number = 1;
//         } else {
//             status_number = 0;
//         }
//         console.log(status_number);
//     });
//     document.getElementById('driverID_u').disabled = true;

//     formUpdate.addEventListener('submit', (e) => {
//         e.preventDefault();
//         firebase.firestore().collection('Drivers').doc(id).set({
//             driverID: document.getElementById('driverID_u').value,
//             name: document.getElementById('driverName_u').value,
//             email: document.getElementById('email_u').value,
//             citizenID: document.getElementById('citizenid_u').value,
//             drivingLicense: document.getElementById('drivinglicense_u').value,
//             status: parseInt(status_number),
//             note: document.getElementById('uNote').value,
//             phone: document.getElementById('phone_u').value
//         })
//     })
//     console.log(status_number);

// }


// firebase.auth().getUserByEmail('haccoco99999@gmail.com')
// .then(function(userRecord) {
//   // See the tables above for the contents of userRecord
//   console.log("Successfully fetched user data:", userRecord.toJSON());
// })
// .catch(function(error) {
//   console.log("Error fetching user data:", error);
// });


//vue


var vueInstance = new Vue({
    el: '#users',
    data: {
        users: [],
        editUser: 1,
        otherParam: {
            method: 'POST'
        }
    },
    mounted() {
        this.listAllUser();
    },
    methods: {
        listAllUser() {
            fetch("https://asia-east2-fptbustracking.cloudfunctions.net/drivers/api/v1/driverlist")
                .then(response => response.json())
                .then((data) => {
                    this.users = data;
                })
        },
        deleteUserbyID(userID) {
            fetch("https://asia-east2-fptbustracking.cloudfunctions.net/drivers/api/v1/delete?docid=" + userID, { method: 'DELETE' })
                .then(window.location.reload())
        },

    }
})

var addUser = new Vue({
    el: '#adduser',
    data: {
        Users: {
            userid: '',
            username: '',
            useremail: '',
            useravatar: '',
            userpassword: '',
        },

        otherParam: {
            method: 'POST'
        },
        getUID: ''
    },
    methods: {
        addUser() {
            console.log(this.Users.useremail)
            console.log(this.Users.username)

            if(this.Users.useremail!= '' && this.Users.username!= ''){

            
            fetch('https://asia-east2-fptbustracking.cloudfunctions.net/registerUser?email=' + this.Users.useremail + '&pass=' + this.Users.userpassword, { method: 'POST' })
                .then(response => response.json()
                ).then((data) => {
                    console.log(data);
                    console.log(data.uid)
                    this.getUID = data.uid
                    console.log(this.getUID)
                    this.addUserIntoCollection(data.uid)
                })

            }else{
                alert('You have to input email and password')
            }

        },
        addUserIntoCollection: function (uid) {

            if (uid != '') {
                fetch('https://asia-east2-fptbustracking.cloudfunctions.net/drivers/api/v1/driver?userid='+uid+'&email=' + this.Users.useremail,
                    { method: 'POST' })
                    .then(window.location.reload())
            } else {
                alert('Do not have user uid')
            }
        }
    }
})