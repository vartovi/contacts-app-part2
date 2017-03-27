var url = 'http://localhost:50322/api/contacts';
var table = document.getElementById('users');

function addUser() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var phone = $('#phone').val();
    var streetAddress = $('#streetAddress').val();
    var city = $('#city').val();

    var contact = JSON.stringify({"firstName": firstName, "lastName" : lastName, "phone": phone, "streetAddress": streetAddress, "city":city});

    $.ajax({
        type: "POST",
        url: url,
        data: contact,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function () {
            location.reload();
        }
    });
}
function showTable() {
    $.getJSON(url, function (data) {
        $.each(data, function (index) {
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            cell1.innerHTML = data[index].firstName;
            cell2.innerHTML = data[index].lastName;
            cell3.innerHTML = data[index].phone;
            cell4.innerHTML = '<a id="'+ (table.rows.length-1) +'" href="https://www.google.fi/maps/place/'+ data[index].streetAddress +' '+ data[index].city +'" target="_blank">'+data[index].streetAddress+', '+data[index].city+'</a>';
            cell5.innerHTML = '<input class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" type="button" value="Delete" onclick="deleteUser(' + index +')">';
            cell6.innerHTML = '<input class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" type="button" value="Edit" onclick="editUser('+ index +')">';
            cell4.value = data[index].streetAddress + ',' + data[index].city;

            cell1.className = "mdl-data-table__cell--non-numeric";
            cell2.className = "mdl-data-table__cell--non-numeric";
        });
    });
}

function deleteUser(index) {
    console.log(index);
    if (confirm("Are you sure you want to delete this contact?")){
        $.ajax({
            url: url + '/' +index,
            type: 'DELETE',
            success: function() {
                location.reload();
            }
        });
    }
}

function editUser(index){
    console.log(index);
    $('.mdl-textfield').addClass('is-dirty');
    document.getElementById('firstName').value = table.rows[index+1].cells[0].innerHTML;
    document.getElementById('lastName').value = table.rows[index+1].cells[1].innerHTML;
    document.getElementById('phone').value = table.rows[index+1].cells[2].innerHTML;
    document.getElementById('streetAddress').value = document.getElementById('' + (index+1)).innerHTML.split(',')[0];
    document.getElementById('city').value = document.getElementById('' + (index+1)).innerHTML.split(',')[1].trim();
    document.getElementById('addUserButton').value = 'Save';
    document.getElementById('contactId').innerHTML = 'Edit contact:';
    document.getElementById('addUserButton').onclick = function () {
        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var phone = document.getElementById('phone').value;
        var streetAddress = $('#streetAddress').val();
        var city = $('#city').val();
        var contact = JSON.stringify({"firstName": firstName, "lastName" : lastName, "phone": phone, "streetAddress": streetAddress, "city":city});
        $.ajax({
            url: url + '/' +index,
            type: 'PUT',
            data: contact,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function() {
                location.reload();
            }
        });
    }
}
