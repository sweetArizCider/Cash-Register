let price = 19.5;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
let cashChange = [
  ['PENNY', 0],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0]
];

window.onload = function() {
  const cashInput = document.getElementById("cash");
  const purchaseBtn = document.getElementById("purchase-btn");
  const status = document.getElementById("status");
  const changeDue = document.getElementById("change-due");
  const drawer = document.getElementById("drawer");
  const total = document.getElementById("total");
  let statusArr = [
    "INSUFFICIENT_FUNDS",
    "CLOSED",
    "OPEN"
  ];

  const updateDrawer = (cid) => {
    drawer.innerHTML = ''; 
    cid.forEach(element => {
      drawer.innerHTML += `<p>${element[0]}: $<span class="bold" id="pennies">${element[1]}</span></p>`;
    });
    const sumOfDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);
    drawer.innerHTML += `<p>Total: <span class="bold yellow">$${sumOfDrawer.toFixed(2)}</span></p>`;
  }

  const cleanChange = () => {
    for (let i = 0; i < cashChange.length; i++) {
      cashChange[i][1] = 0;
    }
  }

const giveChange = (change) => {
    let changeDetails = []; 
    let initialChange = change;
    let sumTheDrawer = 0;

    for (let i = cid.length - 1; i >= 0; i--) {
      let coinValue = 0;
      switch (cid[i][0]) {
        case 'PENNY': coinValue = 0.01; break;
        case 'NICKEL': coinValue = 0.05; break;
        case 'DIME': coinValue = 0.10; break;
        case 'QUARTER': coinValue = 0.25; break;
        case 'ONE': coinValue = 1; break;
        case 'FIVE': coinValue = 5; break;
        case 'TEN': coinValue = 10; break;
        case 'TWENTY': coinValue = 20; break;
        case 'ONE HUNDRED': coinValue = 100; break;
      }

      let count = Math.floor(change / coinValue);
      let availableCoins = cid[i][1] / coinValue;

      sumTheDrawer = sumTheDrawer + cid[i][1]

      if (count > availableCoins) {
        count = availableCoins;
      }

      if (count > 0) {
        cashChange[i][1] = count * coinValue;
        cid[i][1] -= cashChange[i][1];
        change -= cashChange[i][1];
        change = parseFloat(change.toFixed(2)); 
        changeDetails.push(`${cid[i][0]}: $${(count * coinValue).toFixed(2)}`)
      }
    }

    if (change > 0) {
      status.textContent = statusArr[0];
      changeDue.innerHTML = `<p>Insufficient funds to return change</p>`;
      cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
      updateDrawer(cid);

    } else if(initialChange == sumTheDrawer){
      status.textContent = statusArr[1]; 
      changeDetails.forEach(element => {
        changeDue.innerHTML += `<p>${element}</p>`;
      })
    }else {
      status.textContent = statusArr[2]; 
      changeDetails.forEach(element => {
        changeDue.innerHTML += `<p>${element}</p>`;
      })
    }
    return sumTheDrawer;
};

  updateDrawer(cid);

  const clickHandler = () => {
    const customerCash = parseFloat(cashInput.value);

    if (isNaN(customerCash)) {
      alert("Please enter a valid amount.");
      return;
    }

    drawer.innerHTML = ''; 

    if (customerCash > price) {
      let change = customerCash - price;
      giveChange(change);
      cleanChange();
      updateDrawer(cid);
    } else if (customerCash === price) {
      status.textContent = statusArr[1];
      updateDrawer(cid);
      changeDue.textContent = "No change due - customer paid with exact cash";
    } else {
      status.textContent = statusArr[0];
      changeDue.innerHTML = '';
      alert("Customer does not have enough money to purchase the item");
    }
  };

  total.textContent = price;
  purchaseBtn.addEventListener("click", clickHandler);
};
