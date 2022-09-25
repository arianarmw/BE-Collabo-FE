var selectedRow = null

function onFormSubmit(e) {
	event.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["nim"] = document.getElementById("nim").value;
    formData["nama"] = document.getElementById("nama").value;
    formData["kelas"] = document.getElementById("kelas").value;
    formData["noabsen"] = document.getElementById("noabsen").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("storeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.nim;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.nama;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.kelas;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.noabsen;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("nim").value = selectedRow.cells[0].innerHTML;
    document.getElementById("nama").value = selectedRow.cells[1].innerHTML;
    document.getElementById("kelas").value = selectedRow.cells[2].innerHTML;
    document.getElementById("noabsen").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.nim;
    selectedRow.cells[1].innerHTML = formData.nama;
    selectedRow.cells[2].innerHTML = formData.kelas;
    selectedRow.cells[3].innerHTML = formData.noabsen;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("nim").value = '';
    document.getElementById("nama").value = '';
    document.getElementById("kelas").value = '';
    document.getElementById("noabsen").value = '';
    selectedRow = null;
}

$(document).ready(function(){
    var $nim = $('#nim');
    var $nama = $('#name');
    var $kelas = $('#kelas');
    var $noabsen = $('#noabsen');

    $.ajax({
        dataType: 'JSON',
        type: 'GET',
        url: 'http://localhost:3000/api/mahasiswa',
        success:function(data){
           var result = " ";
            data.products.forEach(item =>{
                
                result += `<div class="col-md-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${item.nim}</h5>
                    <p class="card-text">Price: ${item.nama}</p>
                    <p class="card-text">Stock: ${item.kelas}</p>
                    <button onclick="deleteProduct(` + item.noabsen + `)" class="btn btn-danger" id="delete-product">Remove</button>  
                  </div>
                </div>
                </div>`})
                $('#product-info').append(result);

            }
        })

        function deleteProduct(id){
            console.log(id)
            console.log('masuk fungsi')
            $.ajax({
                dataType: 'JSON',
                url: 'http://localhost:3000/api/mahasiswa'+id,
                type:'DELETE',
                success: function(response){
                    alert('Product has been deleted');
                    console.log(response)
                },
                error: function(error){
                    alert(error);
                }
            })
            console.log('fungsi selesai')
        }
    $('#add-product').on('click', function(){
        var add = {
            nim: $nim.val(),
            nama: $nama.val(),
            kelas: $kelas.val()
        }

        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/api/mahasiswa',
            data: add,
            success:function(data){
                var result = " ";
                result += `<div class="col-md-3">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">${data.mahasiswa.nim}</h5>
                    <p class="card-text">Price: ${data.mahasiswa.nama}</p>
                    <p class="card-text">Stock: ${data.mahasiswa.kelas}</p>
                  </div>
                </div>
                </div>`
                $('#product-info').append(result);
                console.log(data)
            }
        })
    })


})