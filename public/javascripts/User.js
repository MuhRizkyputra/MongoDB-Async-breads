//variable
let id = null, conditional = null, page = 1, query = '', limit = 5, sortBy = '_id', sortMode = 'desc'
let data = ``
// support fungsi

function getId(_id) {
    id = _id
}

const deleteModal = new bootstrap.Modal(document.getElementById('deleteData'), {
    keyboard: false
});


let addButton = document.getElementById('addButton')
addButton.onclick = () => {
    conditional = true
    const name = document.getElementById('name').value = ""
    const phone = document.getElementById('phone').value = ""
}

let button = document.getElementById('mybutton')
button.onclick = () => {
    conditional ? addData() : editData()
}

function showDelete(_id) {
    deleteModal.show()
    id = _id
}

const readData = async function () {
    try {
        const response = await fetch(`http://localhost:3000/api/users`);
        const users = await response.json();
        let html = ''
        users.data.forEach((item, index) => {
            html += ` <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>
            <button class="btn btn-success" onclick="getoneData('${item._id}')" type="button" data-bs-toggle="modal" data-bs-target="addData"><i class="fa-solid fa-pen"></i></button>
            <button class="btn btn-danger" onclick="showDelete('${item._id}')" data-bs-toggle="modal" data-bs-target="#deleteData"><i
            class="fa-solid fa-trash" data-bs-toggle="modal"></i></button>&nbsp;
            <a href="/users/${item._id}/todos" class="btn btn-warning"><i class="fa-solid fa-right-to-bracket"></i></a>
            </td>
            </tr>`
        });
        document.getElementById('tbody').innerHTML = html
    } catch (error) {
        alert('failed to read data users')
    }
}
readData()

const addData = async () => {
    const name = document.getElementById('name').value
    const phone = document.getElementById('phone').value
    try {
        const response = await fetch(`http://localhost:3000/api/users`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ name, phone })
        })
        const user = await response.json()
        document.getElementById('name').value = ""
        document.getElementById('phone').value = ""
        readData()
    } catch (err) {
        alert('falied to add data users')
    }
}

const getoneData = async (id) => {
    conditional = false
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`)
        const user = await response.json()
        getId(user._id)
        document.getElementById('name').value = user.name
        document.getElementById('phone').value = user.phone
    } catch (err) {
        alert('failed to get one data users')
    }
}


const deleteData = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        })
        const users = await response.json()
        readData()
        deleteModal.hide()
    } catch (err) {
        alert('failed to delete data users')
    }
}
