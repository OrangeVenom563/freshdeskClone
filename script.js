// Create functionality to update the ticket status and priority. 

// Create functionality to list all the tickets. 

// Create functionally to list, add and update contacts.


const menuIcons = ['Image 10.png', 'Image 11.png', 'Image 18.png', 'Image 12.png', 'Image 13.png', 'Image 14.png', 'Image 15.png', 'Image 16.png', 'Image 17.png'];

const menuContainer = document.querySelector('.menu-container');
const ticketList = document.querySelector('.tickets-list');

menuIcons.forEach(elt => {
    const iconContainer = document.createElement('div');
    iconContainer.className = "icon-container";
    iconContainer.innerHTML = `<img src="./src/images/${elt}" width="45px" >`;
    menuContainer.append(iconContainer);
})


function refreshTickets() {
    ticketList.innerHTML = '';
    fetch('https://60c98aab772a760017203b63.mockapi.io/freshdesk')
        .then(data => data.json())
        // .then(data =>{
        //     data.state == 'new' ? data.btn='success' : data.btn='danger';
        //     return data;
        // })
        .then(data => {
            data.forEach(data => {
                
                const ticket = document.createElement('div');
                ticket.className = 'ticket';
                ticket.innerHTML = `
            <div><img class="propic" src="${data.profilePic}"/>
            <div>contact:  <u>${data.contact}</u></div> 
            <div>subject:  <b>${data.subject}</b></div>
            status: ${data.status}
            </div>

            <div> 
            <div>ticket group:  ${data.group}</div>
            <div class="row mb-1">
                <label for="agent" class="col-sm-3 col-form-label">agent:</label>
                    <div class="col-sm-7">
                        <select class="form-select" aria-label="Default select example" class="agent" >
                            <option selected>not assigned</option>
                            <option value="1">Anita</option>
                            <option value="2">Chandra</option>     
                            <option value="3">David</option>     
                            <option value="4">Franklin</option>     
                            <option value="5">Evangelin</option>     
                            <option value="6">Rakesh</option>     
                            <option value="7">Steve</option>     
                            <option value="8">vasputin</option>     
                        </select>
                    </div>
            </div>
            <div class="row mb-1">
                <label for="priority" class="col-sm-3 col-form-label">priority:</label>
                    <div class="col-sm-7">
                        <select class="form-select" aria-label="Default select example" class="priority" onchange="changePriority(${data.id})">
                            <option selected>low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>     
                        </select>
                    </div>
            </div>
            <div>ticket state: ${data.state}</div>
            </div>`;
                ticketList.append(ticket);
            })
        });
}


function addTicket() {
    const userContact = document.querySelector('#ticketRequestor').value;
    const tickType = document.querySelector('#ticketType').value;
    const tickSubject = document.querySelector('#Subject').value;
    const tickDescription = document.querySelector('#Description').value;

    // const urlMethod = type === "Edit User" ? "PUT" : "POST";
    // const userId = type === "Edit User" ? localStorage.getItem('userId') : "";
    // DRY - Dont Repeat Yourself

    fetch('https://60c98aab772a760017203b63.mockapi.io/freshdesk', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            createdAt: new Date().toISOString(),
            contact: userContact,
            subject: tickSubject,
            state: 'new',
            group: tickType,
            priority: 'low',
            status: 'open',
            agent: 'not assigned',
            description: tickDescription
        })
    })
        .then((data) => data.json())
        .then((user) => refreshTickets());

    resetForm();
}

function resetForm() {
    document.querySelector('#ticketRequestor').value = '';
    document.querySelector('#ticketType').value = '';
    document.querySelector('#Subject').value = '';
    document.querySelector('#Description').value = '';
}

function changePriority(id){
    fetch(`https://60c98aab772a760017203b63.mockapi.io/freshdesk/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            priority: 'medium',
        })
    })
}

window.onload = () => refreshTickets();