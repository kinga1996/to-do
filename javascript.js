const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.duties');
const items = JSON.parse(localStorage.getItem('items')) || [];
const bins = document.getElementsByClassName('bin');


function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text: text,
      done: false
    };
    console.log(item);
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(duties = [], dutiesList){
	dutiesList.innerHTML = duties.map((duties,i) => {
		return `
			<li>
			<input type="checkbox" data-index="${i}" class="checkBox" id="item${i}" ${duties.done ? 'checked' : ''} />
			<label for ="item${i}">${duties.text}</label>
			<button class="bin" onclick="deleteOne(${i})">🗑️</button>
			</li>
		`;
	}).join('');
}

function toggleDone(e) {
	if (!e.target.matches('input')) return;
	const el = e.target;
	const index = el.dataset.index;
	items[index].done = !items[index].done;
	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function clearClick(){
    localStorage.clear();
   	var listOfDuties = document.querySelectorAll('.duties li');
		for(var i=0; li=listOfDuties[i]; i++) {
		    li.parentNode.removeChild(li);
	}
		while(items.length > 0) {
    		items.pop();
		}
}

function checkClick() {
	var inputs = document.querySelectorAll("input[type='checkbox']");
        for(var i = 0; i < inputs.length; i++) {
           if (inputs[i].checked == false) {
           		items[i].done = !items[i].done;
           		console.log(items[i].done);
           }
        }

    localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function noneClick() {
	var inputs = document.querySelectorAll("input[type='checkbox']");
        for(var i = 0; i < inputs.length; i++) {
           if (inputs[i].checked == true) {
           		items[i].done = !items[i].done;
           		console.log(items[i].done);
           }
        }
    localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

function deleteOne(i){
	console.log(i);

	var listOfDuties = document.querySelectorAll('.duties li');
	listOfDuties[i].parentNode.removeChild(listOfDuties[i]);

	items.splice(i, 1);

	localStorage.setItem('items', JSON.stringify(items));
	populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);


populateList(items, itemsList);