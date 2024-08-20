document.addEventListener('DOMContentLoaded', () => {
    loadMembers();
    loadPayments();
});

document.getElementById('add-member-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('member-name').value;
    const info = document.getElementById('member-info').value;
    const id = Date.now(); 
    const members = JSON.parse(localStorage.getItem('members')) || [];
    members.push({ id, name, info });
    localStorage.setItem('members', JSON.stringify(members));
    loadMembers();
    this.reset(); 
});

document.getElementById('search-member')?.addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const members = JSON.parse(localStorage.getItem('members')) || [];
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm) ||
        member.id.toString().includes(searchTerm) ||
        member.info.toLowerCase().includes(searchTerm)
    );
    displayMembers(filteredMembers);
});

function loadMembers() {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    displayMembers(members);
}

function displayMembers(memberList) {
    const listElement = document.getElementById('members');
    listElement.innerHTML = '';
    memberList.forEach(member => {
        const listItem = document.createElement('li');
        listItem.textContent = `${member.name} - ${member.info}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            deleteMember(member.id);
        });
        listItem.appendChild(deleteButton);
        listElement.appendChild(listItem);
    });
}

function deleteMember(id) {
    let members = JSON.parse(localStorage.getItem('members')) || [];
    members = members.filter(member => member.id !== id);
    localStorage.setItem('members', JSON.stringify(members));
    loadMembers();
}


document.getElementById('add-payment-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const memberId = document.getElementById('payment-member').value;
    const amount = document.getElementById('payment-amount').value;
    const date = document.getElementById('payment-date').value;
    const id = Date.now(); 
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments.push({ id, memberId, amount, date });
    localStorage.setItem('payments', JSON.stringify(payments));
    loadPayments();
    this.reset(); 
});

document.getElementById('search-payment')?.addEventListener('input', function(event) {
    const searchTerm = event.target.value.toLowerCase();
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    const filteredPayments = payments.filter(payment => 
        payment.id.toString().includes(searchTerm) ||
        payment.amount.toString().includes(searchTerm) ||
        payment.date.includes(searchTerm) ||
        payment.memberId.includes(searchTerm)
    );
    displayPayments(filteredPayments);
});

function loadPayments() {
    const payments = JSON.parse(localStorage.getItem('payments')) || [];
    displayPayments(payments);
}

function displayPayments(paymentList) {
    const listElement = document.getElementById('payments');
    listElement.innerHTML = '';
    paymentList.forEach(payment => {
        const listItem = document.createElement('li');
        listItem.textContent = `Membro ID: ${payment.memberId} - Valor: ${payment.amount} - Data: ${payment.date}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => {
            deletePayment(payment.id);
        });
        listItem.appendChild(deleteButton);
        listElement.appendChild(listItem);
    });
}

function deletePayment(id) {
    let payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments = payments.filter(payment => payment.id !== id);
    localStorage.setItem('payments', JSON.stringify(payments));
    loadPayments();
}
