const list = document.querySelector("ul");
const check = document.querySelector(".check-btn");
const correct = document.querySelector(".correct-btn");
const persons = [
    'Jeff Bezos',
    "Elon Musk",
    "Bernard Arnault",
    "Bill Gates",
    "Mark Zuckerberg",
    "Warren Buffett",
    "Larry Ellison",
    "Larry Page",
    "Sergey Brin",
    "Mukesh Ambani",
];
const listItems = [];
let dragStartIndex;


(function() {
    [...persons]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="list-person" draggable = "true">
                <p class="person-name">${person}</p>
                <div class="icons">
                <i class="fas fa-ellipsis"></i>
                <i class="fas fa-ellipsis"></i>
                </div>
            </div>     
            `;
            listItems.push(listItem);
            list.appendChild(listItem);
        });
    AddDrag();
})();

function dragStart() {
    dragStartIndex = this.closest('li').getAttribute('data-index');
    listItems.forEach((listItem) => {
        const personName = listItem.querySelector('.list-person').innerText.trim();
            listItem.classList.remove('wrong', 'right');
    });
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function swapItems(from, to) {
    const itemOne = listItems[from].querySelector('.list-person');
    const itemTwo = listItems[to].querySelector('.list-person');

    listItems[from].appendChild(itemTwo);
    listItems[to].appendChild(itemOne);
}

function AddDrag() {
    const ListPersons = document.querySelectorAll('.list-person');
    const listItems = document.querySelectorAll('ul li');

    ListPersons.forEach(person => {
        person.addEventListener('dragstart', dragStart);
    });

    listItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    })
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.list-person').innerText.trim();
        if (personName !== persons[index]) {
            listItem.classList.add('wrong');
        }else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    })
}

function correctOrder() {
    listItems.forEach((listItem, index) => {
        var personName = listItem.querySelector('.list-person');
        if (personName.innerText !== persons[index]) {
            personName.querySelector('.person-name').innerText = persons[index];
        }
        listItem.classList.remove('wrong');
        listItem.classList.remove('right');
    })
}

correct.addEventListener("click", correctOrder);
check.addEventListener("click", checkOrder);