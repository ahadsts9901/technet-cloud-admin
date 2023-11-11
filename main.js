const firebaseConfig = {
    apiKey: "AIzaSyCtn1vByh5Icc1u7SfpdUanh_M18V77GMg",
    authDomain: "resume-sts-17a3d.firebaseapp.com",
    projectId: "resume-sts-17a3d",
    storageBucket: "resume-sts-17a3d.appspot.com",
    messagingSenderId: "1084591198105",
    appId: "1:1084591198105:web:294ea8b0f70d8bce388d08",
    measurementId: "G-QPMRCNPQV5"
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

function renderStudent() {
    let container = document.querySelector(".results");
    container.innerHTML = "";

    db.collection("studentsData2023")
        .orderBy("timestamp", "desc")
        .get()
        .then(function (querySnapshot) {
            if (querySnapshot.size === 0) {
                container.innerHTML = "<div class='not'>No Data Found</div>";
            } else {
                let table = document.createElement("table");
                let thead = document.createElement("thead");
                let tr = document.createElement("tr");
                let sNo = document.createElement("th");
                sNo.innerText = "No";
                let thImage = document.createElement("th");
                thImage.innerText = "Image";
                let thName = document.createElement("th");
                thName.innerText = "Name";
                let thFather = document.createElement("th");
                thFather.innerText = "Father";
                let thRollNo = document.createElement("th");
                thRollNo.innerText = "Roll No";
                let thCity = document.createElement("th");
                thCity.innerText = "City";
                let thCourse = document.createElement("th");
                thCourse.innerText = "Course";
                let thPhone = document.createElement("th");
                thPhone.innerText = "Phone";
                let thEmail = document.createElement("th");
                thEmail.innerText = "Email";
                let thCNIC = document.createElement("th");
                thCNIC.innerText = "CNIC";
                let thDOB = document.createElement("th");
                thDOB.innerText = "D.O.B";
                let thQualification = document.createElement("th");
                thQualification.innerText = "Qualification";
                let thStatus = document.createElement("th");
                thStatus.innerText = "Status";
                let thAddress = document.createElement("th");
                thAddress.className = "address"
                thAddress.innerText = "Address";
                let thGender = document.createElement("th");
                thGender.innerText = "Gender";
                let thTime = document.createElement("th");
                thTime.innerText = "Time";
                let thActions = document.createElement("th");
                thActions.innerText = "Actions";

                tr.appendChild(sNo)
                // tr.appendChild(thTime)
                tr.appendChild(thImage);
                tr.appendChild(thName);
                tr.appendChild(thGender)
                tr.appendChild(thFather);
                tr.appendChild(thRollNo);
                tr.appendChild(thCity);
                tr.appendChild(thCourse);
                tr.appendChild(thPhone);
                tr.appendChild(thEmail);
                tr.appendChild(thCNIC);
                tr.appendChild(thDOB);
                tr.appendChild(thQualification);
                tr.appendChild(thStatus);
                tr.appendChild(thAddress);
                tr.appendChild(thActions)
                thead.appendChild(tr);
                table.appendChild(thead);

                let tbody = document.createElement("tbody");
                let num = 1
                querySnapshot.forEach(function (doc) {
                    let data = doc.data();
                    // console.log(data);
                    let tr = document.createElement("tr");

                    let sNo = document.createElement("td");
                    sNo.innerText = num++;
                    tr.appendChild(sNo);

                    // let timeStamp = document.createElement("td");
                    // timeStamp.innerText = moment(data.timeStamp).fromNow();
                    // tr.appendChild(timeStamp);

                    let imgTD = document.createElement("td");
                    let img = document.createElement("img")
                    img.src = data.image
                    img.className += "tdImage"
                    imgTD.appendChild(img)
                    tr.appendChild(imgTD);

                    let name = document.createElement("td");
                    name.innerText = data.fullName;
                    tr.appendChild(name);

                    let gender = document.createElement("td");
                    gender.innerText = data.gender;
                    tr.appendChild(gender);

                    let father = document.createElement("td");
                    father.innerText = data.fatherName;
                    tr.appendChild(father);

                    let rollNo = document.createElement("td");
                    rollNo.innerText = data.rollNo || "";
                    tr.appendChild(rollNo);

                    let cityName = document.createElement("td");
                    cityName.innerText = data.cityName;
                    tr.appendChild(cityName);

                    let courseName = document.createElement("td");
                    courseName.innerText = data.courseName;
                    tr.appendChild(courseName);

                    let phone = document.createElement("td");
                    phone.innerText = data.phone;
                    tr.appendChild(phone);

                    let email = document.createElement("td");
                    email.innerText = data.email;
                    tr.appendChild(email);

                    let cnic = document.createElement("td");
                    cnic.innerText = data.cnic;
                    tr.appendChild(cnic);

                    let dateOfBirth = document.createElement("td");
                    dateOfBirth.innerText = data.dateOfBirth;
                    tr.appendChild(dateOfBirth);

                    let lastQualification = document.createElement("td");
                    lastQualification.innerText = data.lastQualification;
                    tr.appendChild(lastQualification);

                    let status = document.createElement("td");
                    status.innerText = data.status;
                    tr.appendChild(status);

                    let address = document.createElement("td"); 
                    address.className += "address"
                    address.innerText = data.address;
                    tr.appendChild(address);

                    let buttons = document.createElement("td")
                    buttons.className += "row"

                    let edit = document.createElement("i")
                    edit.style.color = "#33b861"
                    edit.className += "bi bi-pencil-fill"
                    edit.addEventListener("click", function () {
                        editStudent(doc.id, data);
                    });
                    let del = document.createElement("i")
                    del.style.color = "#e55865"
                    del.className += "bi bi-trash-fill"
                    del.addEventListener("click", function () {
                        deleteStudent(doc.id);
                    });
                    buttons.appendChild(edit)
                    buttons.appendChild(del)
                    tr.appendChild(buttons);

                    tbody.appendChild(tr);
                });

                table.appendChild(tbody);
                container.appendChild(table);
            }
        })
        .catch(function (error) {
            console.error("Error getting documents: ", error);
        });
}

// delete

function deleteStudent(docId) {
    Swal.fire({
        title: 'Enter Password to Delete',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#15182b',
        cancelButtonColor: '#15182b',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        preConfirm: (password) => {
            const requiredPassword = 'catdog';

            if (password !== requiredPassword) {
                Swal.showValidationMessage('Invalid password');
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            db.collection("studentsData2023").doc(docId).delete()
                .then(() => {
                    // console.log("Document deleted successfully.");
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 1000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Deleted Successfully'
                    })
                    renderStudent();
                })
                .catch((error) => {
                    console.error("Error deleting document: ", error);
                });
        }
    });
}

// edit

function editStudent(docId, currentData) {
    Swal.fire({
        title: 'Enter Password to Edit',
        input: 'password',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonColor: '#15182b',
        cancelButtonColor: '#15182b',
        confirmButtonText: 'Edit',
        cancelButtonText: 'Cancel',
        preConfirm: (password) => {
            const requiredPassword = 'catdog';

            if (password !== requiredPassword) {
                Swal.showValidationMessage('Invalid password');
            } else {
                // Show the edit form with current data
                Swal.fire({
                    title: 'Edit Student',
                    html: `
                        <input placeholder="Name" id="editName" class="swal2-input" value="${currentData.fullName}" required>
                        <input placeholder="Father" id="editFather" class="swal2-input" value="${currentData.fatherName}" required>
                        <input placeholder="Roll No" id="editRollNo" class="swal2-input" value="${currentData.rollNo}" type="number" required>
                        <input placeholder="Gender" id="editGender" class="swal2-input" value="${currentData.gender}" required>
                        <input placeholder="City" id="editCity" class="swal2-input" value="${currentData.cityName}" required>
                        <input placeholder="Course" id="editCourse" class="swal2-input" value="${currentData.courseName}" required>
                        <input placeholder="Phone" id="editPhone" class="swal2-input" value="${currentData.phone}" required>
                        <input placeholder="Email" id="editEmail" class="swal2-input" value="${currentData.email}" required>
                        <input placeholder="CNIC" id="editCNIC" class="swal2-input" value="${currentData.cnic}" required>
                        <input placeholder="Date of Birth" id="editDOB" class="swal2-input" value="${currentData.dateOfBirth}" required>
                        <input placeholder="Last Qualification" id="editLastQualification" class="swal2-input" value="${currentData.lastQualification}" required>
                        <input placeholder="Status" id="editStatus" class="swal2-input" value="${currentData.status}" required>
                        <input placeholder="Address" id="editAddress" class="swal2-input" value="${currentData.address}" required>
                    `,
                    showCancelButton: true,
                    confirmButtonColor: '#15182b',
                    cancelButtonColor: '#15182b',
                    confirmButtonText: 'Save',
                    cancelButtonText: 'Cancel',
                    preConfirm: () => {
                        // Check for empty fields
                        const editName = document.getElementById('editName').value;
                        const editFather = document.getElementById('editFather').value;
                        const editRollNo = document.getElementById('editRollNo').value;
                        const editGender = document.getElementById('editGender').value;
                        const editCity = document.getElementById('editCity').value;
                        const editCourse = document.getElementById('editCourse').value;
                        const editPhone = document.getElementById('editPhone').value;
                        const editEmail = document.getElementById('editEmail').value;
                        const editCNIC = document.getElementById('editCNIC').value;
                        const editDOB = document.getElementById('editDOB').value;
                        const editLastQualification = document.getElementById('editLastQualification').value;
                        const editStatus = document.getElementById('editStatus').value;
                        const editAddress = document.getElementById('editAddress').value;

                        if (
                            editName.trim() === '' ||
                            editFather.trim() === '' ||
                            editRollNo.trim() === '' ||
                            editGender.trim() === '' ||
                            editCity.trim() === '' ||
                            editCourse.trim() === '' ||
                            editPhone.trim() === '' ||
                            editEmail.trim() === '' ||
                            editCNIC.trim() === '' ||
                            editDOB.trim() === '' ||
                            editLastQualification.trim() === '' ||
                            editStatus.trim() === '' ||
                            editAddress.trim() === ''
                        ) {
                            Swal.showValidationMessage('Please fill in all fields');
                            return false;
                        }

                        // Get the edited data from the form
                        const editedData = {
                            fullName: editName,
                            fatherName: editFather,
                            rollNo: parseInt(editRollNo),
                            gender: editGender,
                            cityName: editCity,
                            courseName: editCourse,
                            phone: editPhone,
                            email: editEmail,
                            cnic: editCNIC,
                            dateOfBirth: editDOB,
                            lastQualification: editLastQualification,
                            status: editStatus,
                            address: editAddress
                        };

                        // Update the data in Firestore
                        db.collection("studentsData2023").doc(docId).update(editedData)
                            .then(() => {
                                const Toast = Swal.mixin({
                                    toast: true,
                                    position: 'top-end',
                                    showConfirmButton: false,
                                    timer: 1000,
                                    timerProgressBar: true,
                                    didOpen: (toast) => {
                                        toast.addEventListener('mouseenter', Swal.stopTimer)
                                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                                    }
                                });

                                Toast.fire({
                                    icon: 'success',
                                    title: 'Edited Successfully'
                                });
                                renderStudent(); // Render the updated student list
                            })
                            .catch((error) => {
                                console.error("Error updating document: ", error);
                            });
                    }
                });
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    renderStudent();
});
