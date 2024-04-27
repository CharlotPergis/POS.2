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

 let nextItemCode = 1;

 // Function to open the form submission page
 function openFormPage() {
     window.open("add_item.html?nextItemCode=" + nextItemCode, "_blank");
 }

 // Function to add submitted details to the table dynamically
 function addSubmittedDetails(formData) {
     var tableBody = document.querySelector("#item-table tbody");
          var newRow = tableBody.insertRow();

     var itemCodeCell = newRow.insertCell(0);
     var categoryCell = newRow.insertCell(1);
     var nameCell = newRow.insertCell(2);
     var priceCell = newRow.insertCell(3);
     var statusCell = newRow.insertCell(4);
     var imageCell = newRow.insertCell(5);
     var actionCell = newRow.insertCell(6);

     itemCodeCell.textContent = formData.get("itemCode");
     categoryCell.textContent = formData.get("category");
     nameCell.textContent = formData.get("name");
     priceCell.textContent = formData.get("price");
     statusCell.textContent = formData.get("status");

     var image = document.createElement("img");
     image.src = URL.createObjectURL(formData.get("image"));
     image.width = 50;
     image.height = 50; 
     image.alt = "Product Image";

     imageCell.appendChild(image);

// Create a delete button
     var deleteButton = document.createElement("button");
     deleteButton.textContent = "Delete";
     deleteButton.classList.add("delete-button")
     deleteButton.onclick = function() {
         newRow.remove();
     };

     actionCell.appendChild(deleteButton);

 // Create an edit button
     var editButton = document.createElement("button");
     editButton.textContent = "Edit";
     editButton.classList.add("edit-button"); 
     editButton.onclick = function() {
         var itemCode = itemCodeCell.textContent;
         var category = categoryCell.textContent;
         var name = nameCell.textContent;
         var price = priceCell.textContent;
         var status = statusCell.textContent;
         window.open(`edit_item.html?itemCode=${itemCode}&category=${category}&name=${name}&price=${price}&status=${status}`, "_blank");
     };

     actionCell.appendChild(editButton);
     nextItemCode++;
 }

 // Function to update table with edited details
    function editSubmittedDetails(formData) {
        var itemCode = formData.get("itemCode");
        var tableRows = document.querySelectorAll("#item-table tbody tr");
        tableRows.forEach(row => {
            if (row.cells[0].textContent === itemCode) {
                row.cells[1].textContent = formData.get("category");
                row.cells[2].textContent = formData.get("name");
                row.cells[3].textContent = formData.get("price");
                row.cells[4].textContent = formData.get("status");
                var imageCell = row.cells[5];
                var image = imageCell.querySelector("img");
                image.src = URL.createObjectURL(formData.get("image"));
            }
        });
    }


