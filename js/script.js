let seats = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4", "C1", "C2", "C3", "C4", "D1", "D2", "D3", "D4", "E1", "E2", "E3", "E4", "F1", "F2", "F3", "F4", "G1", "G2", "G3", "G4", "H1", "H2", "H3", "H4", "I1", "I2", "I3", "I4", "J1", "J2", "J3", "J4"];
let appliedDiscount = 0;
let nextBtn = document.getElementById('nextBtn');
let couponBtn = document.getElementById('couponBtn');
let seatPlan = document.getElementById('seatPlan');
let couponInput = document.getElementById('couponInput');
let mobileNumber = document.getElementById('mobileNo');
let usersName = document.getElementById('name');
let selectedSeat = [];
const ticketPrice = 550;
const busClass = 'Economy'
document.getElementById('remainingSeat').innerHTML = seats.length - selectedSeat.length;

let coupons = [
    {
        n: 'NEW15',
        discounts: 0.15
    },
    {
        n: 'Couple 20',
        discounts: 0.20
    }
];
for (const seat of seats) {
    const seatNumber = document.createElement('div');
    seatNumber.id = seat;
    seatNumber.textContent = seat;
    seatNumber.classList.add('py-4', 'rounded-xl', 'px-10', 'bg-[#f7f8f8]', 'f-inter', 'mx-auto', 'my-8', 'seat');
    seatPlan.appendChild(seatNumber);
}
document.addEventListener("click", function (e) {
    const target = e.target.classList.contains('seat');
    if (target) {
        let seatID = e.target.id
        if (!isValidSeat(seatID)) {
            return;
        }
        selectedSeat.push(seatID);
        renderSelectedSeat();
        e.target.classList.add('background');
        document.getElementById('remainingSeat').innerHTML = seats.length - selectedSeat.length;
        document.getElementById('selection').innerHTML = selectedSeat.length;
    }
});
function isValidSeat(seatID) {
    if (selectedSeat.length > 3) {
        alert('Can not Purchase more than 4 seats');
        return false;
    }
    if (selectedSeat.includes(seatID)) {
        alert('Single seat can not be selected more than one time');
        return false;
    }
    return true;
}
function renderSelectedSeat() {
    let html = "";
    for (let index = 0; index < selectedSeat.length; index++) {
        const element = selectedSeat[index];
        html += `
        <div class="flex flex-row justify-between w-full">
            <p class="w-1/3 f-inter">${element}</p>
            <p class="w-1/3 text-center">${busClass}</p>
            <p class="w-1/3 text-right f-inter">${ticketPrice}</p>
        </div>
        `
    }
    document.getElementById('seatContainer').innerHTML = html;
    renderAmount()
}
function renderAmount() {
    let totalAmount = ticketPrice * selectedSeat.length;
    document.getElementById('totalCost').innerHTML = totalAmount;
    let discount = calculateDiscount(totalAmount)
    document.getElementById('grandTotalCost').innerHTML = totalAmount - discount;
}
function calculateDiscount(totalAmount) {
    if (!appliedDiscount) {
        return 0;
    }
    let discountAmount = totalAmount * appliedDiscount
    document.getElementById('coupon').innerHTML = `
    <div class="bg-[#f7f8f8] mb-4 flex w-full flex-row justify-between border-b-2 border-t-2 border-solid">
        <div class="f-inter font-medium">Discount</div>
        <div class="f-inter font-medium">BDT ${discountAmount}</div>
    </div>`
    return discountAmount;
}
couponBtn.addEventListener('click', function () {
    let enteredCoupon = couponInput.value;
    if (enteredCoupon == '') {
        alert('Enter The Valid Coupon Code ')
    }
    const coupon = coupons.find(function (coupon) {
        return coupon.n == enteredCoupon
    })
    if (!coupon) {
        alert('Wrong Coupon Code');
    }
    appliedDiscount = coupon.discounts;
    renderAmount()
})
function dataValidation() {
    if (selectedSeat.length === 0) {
        alert('Select Your Seat First')
        return;
    }
    if (mobileNumber.value.length !== 11) {
        alert('Enter A Valid Mobile Number')
        return;
    }
    my_modal_2.showModal()
}