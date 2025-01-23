let apiUrl = "https://67665085410f84999657549a.mockapi.io/students";
let inputName = document.querySelector("#inputName");
let inputNumber = document.querySelector("#inputNumber");
let row = document.querySelector(".row");
let btn = document.querySelector("#btn");
let editId = null; 

function fetchData() {
  let get = new XMLHttpRequest();
  get.open("GET", apiUrl);

  get.onload = function () {
    let data = JSON.parse(get.responseText);

    row.innerHTML = ""; 

    data.forEach((item) => {
      row.innerHTML += `
        <div class="flex w-[1000px] justify-between items-center border mx-auto my-[50px]">
          <div class="flex gap-[20px]">
            <img src="Group 232.png" class="w-[60px]" alt="">
            <div>
              <h1>${item.firstName}</h1>
              <p class="text-[#8A8A8D]">${item.telNumber}</p>
            </div>
          </div>
          <div>
            <button class="rounded-[10px] text-white px-[5px] py-[4px]" onclick="deleteData(${item.id})">
              <img src="Vector.png" alt="">
            </button>
            <button class="rounded-[10px] text-white px-[5px] py-[4px]" onclick="editData(${item.id})">
              <img src="tabler_edit.png" alt="">
            </button>
          </div>
        </div>
      `;
    });
  };

  get.send();
}

fetchData();

function sendData(event) {
  event.preventDefault();
  let method = editId ? "PUT" : "POST"; 
  let url = editId ? `${apiUrl}/${editId}` : apiUrl;

  let request = new XMLHttpRequest();
  request.open(method, url, true);
  request.setRequestHeader("Content-Type", "application/json");

  const pushData = JSON.stringify({
    firstName: inputName.value,
    telNumber: inputNumber.value,
  });

  request.onload = function () {
    if (request.status === 201 || request.status === 200) {
      fetchData(); 
      inputName.value = "";
      inputNumber.value = "";
      btn.textContent = "Add"; 
      btn.classList.remove("bg-orange-600");
      editId = null; 
    }
  };

  request.send(pushData);
}

btn.addEventListener("click", sendData);





function deleteData(id) {
  let del = new XMLHttpRequest();
  del.open("DELETE", `${apiUrl}/${id}`, true);

  del.onload = function () {
    if (del.status === 200) {
      fetchData(); 
    }
  };

  del.send();
}

function editData(id) {
  let get = new XMLHttpRequest();
  get.open("GET", `${apiUrl}/${id}`, true);

  get.onload = function () {
    if (get.status === 200) {
      let data = JSON.parse(get.responseText);
      inputName.value = data.firstName;
      inputNumber.value = data.telNumber;
      btn.textContent = "Save"; 
      btn.classList.add("bg-orange-600");
      editId = id; 
    }
  };

  get.send();
}
