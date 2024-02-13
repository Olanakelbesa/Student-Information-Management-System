var count = 0;
var students = [];

function togleSide(){
        
       if (window.innerWidth <800) {
            document.querySelector(".side_nav").style.display="none"; 
            document.querySelector(".smlside_nav").style.display="block";
            return;
        }
       const val=document.querySelector(".side_nav").style.display;
       if(val==="none"){
        document.querySelector(".side_nav").style.display="block";
        document.querySelector(".smlside_nav").style.display="none";
       }
       else{
        document.querySelector(".side_nav").style.display="none"; 
        document.querySelector(".smlside_nav").style.display="block";
       }
}


function showAdd() {
    document.querySelector(".addConainer").style.display = 'block';
}

function closeAdd() {
    document.querySelector(".addConainer").style.display = 'none';
}

function addStudent() {
    var nameRegex = /^[A-Za-z]+$/;
    var phoneRegex = /^(09|07)\d{8}$/;

        document.getElementById("submit").value= "Register";
        const fnameValue = document.getElementById('fname').value;
        const lnameValue = document.getElementById('lname').value;
        const nameValue =  fnameValue + " " + lnameValue;
        const emailValue = document.getElementById('Email').value;
        const ageValue = document.getElementById('Age').value;
        const phoneValue = document.getElementById('phone').value;
        const addressValue = document.getElementById('address').value;

        //validation part

        if (nameValue == '' || emailValue == '' || ageValue == '' || phoneValue == '' || addressValue == "") {
            alert("All fields are required!");
            return;
        }
        else if (!nameRegex.test(fnameValue) || !nameRegex.test(lnameValue)) {
                alert("First name and last name must contain only characters");
                return false;   
        }
        else if (!phoneRegex.test(phoneValue)) {
            alert("Phone number must start with 09 or 07 and be 10 digits long");
            return false;
        }
        count++;
 
       console.log(document.getElementById("submit").value);
        
        students.push({
            ID: count,
            name: nameValue,
            email: emailValue,
            age: ageValue,
            phone: phoneValue,
            address: addressValue
        });
        count = students.length;
        clearInputFields();
        closeAdd();
        showTable();
}


function clearInputFields() {
    document.getElementById('fname').value = "";
    document.getElementById('lname').value = "";
    document.getElementById('Email').value = "";
    document.getElementById('Age').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('address').value = "";
}

function search() {
    var input, filter, table, tr, td,td1, i, txtValue, txtValue1;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("tbody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        td1 = tr[i].getElementsByTagName("td")[1];
       
        if (td || td1 ) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
       
            if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 ) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function showTable() {
    const table = document.getElementById('tbody');
    table.innerHTML = "";

    students.forEach((student) => {
        const row = document.createElement("tr");
        Object.values(student).forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            edit(student['ID']);
        };
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            del(student['ID']);
        };
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        table.appendChild(row);
    });
 
    // Save students data to localStorage
    localStorage.setItem('students', JSON.stringify(students));
}

function edit(id) {
    showAdd();
    let student = students.find(s => s.ID == id);
    count=id-1;
    del(id);
    document.getElementById('fname').value = student.name.split(' ')[0];
    document.getElementById('lname').value = student.name.split(' ')[1];
    document.getElementById('Email').value = student.email;
    document.getElementById('Age').value = student.age;
    document.getElementById('phone').value = student.phone;
    document.getElementById('address').value = student.address;
    document.getElementById("submit").value= "Edit Student";
  
}

function del(id) {
    
    students = students.filter(student => student.ID !== id);
    showTable();
}

window.onload = function () {
    if (localStorage.getItem('students')) {
        students = JSON.parse(localStorage.getItem('students'));
        count = students.length;
        showTable();
    }
};