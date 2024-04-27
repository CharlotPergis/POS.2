document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });

});

function toggleDropdown() {
    const dropdown = document.getElementById("filterDropdown");
    dropdown.classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.filter')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

let nextEmployeeCode = 1;

// Function to open the form submission page
function openFormPage() {
    window.open("add_employee.html?nextEmployeeCode=" + nextEmployeeCode, "_blank");
}

// Function to add submitted details to the table dynamically
function addSubmittedDetails(formData) {
    var tableBody = document.querySelector("#item-table tbody");    
    var newRow = tableBody.insertRow();

    var employeeCodeCell = newRow.insertCell(0);
    var employeeNameCell = newRow.insertCell(1);
    var usernameCell = newRow.insertCell(2);
    var passwordCell = newRow.insertCell(3);
    var actionCell = newRow.insertCell(4);

    employeeCodeCell.textContent = formData.get("employeeCode");
    employeeNameCell.textContent = formData.get("employeeName");
    usernameCell.textContent = formData.get("username");
    passwordCell.textContent = formData.get("password");

// Create a delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = function() {
        newRow.remove();
    };

    actionCell.appendChild(deleteButton);

// Create an edit button
    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.onclick = function() {
        var employeeCode = employeeCodeCell.textContent;
        var employeeName = employeeNameCell.textContent;
        var username = usernameCell.textContent;
        var password = passwordCell.textContent;
        window.open(`edit_employee.html?employeeCode=${employeeCode}&employeeName=${employeeName}&username=${username}&password=${password}`, "_blank");
    };

    actionCell.appendChild(editButton);

    nextEmployeeCode++;
}

// Function to update table with edited details
    function editSubmittedDetails(formData) {
        var employeeCode = formData.get("employeeCode");
        var tableRows = document.querySelectorAll("#item-table tbody tr");
        tableRows.forEach(row => {
            if (row.cells[0].textContent === employeeCode) {
                row.cells[1].textContent = formData.get("employeeName");
                row.cells[2].textContent = formData.get("username");
                row.cells[3].textContent = formData.get("password");
            }
        });
    }