const radioConts = document.querySelectorAll('.radio-cont')

radioConts.forEach(radioCont => {
    radioCont.addEventListener('click', (e) => {
        radioConts.forEach(cont => cont.classList.remove('active-radio-cont'))
        radioCont.classList.add('active-radio-cont')
        const radio = e.currentTarget.querySelector('.radio')
        if(radio.checked === true){
            radio.checked = false
        }
        else(
            radio.checked = true

        )
        // console.log(radio)
    })
})


const clearBtn = document.querySelector('.clear-btn')
const inputs = document.querySelectorAll('.input')
const radios = document.querySelectorAll('.radio')
const form = document.querySelector('.form')
const monthly = document.querySelector('.monthly')
const total = document.querySelector('.total')
const rightEmpty = document.querySelector('.right-empty')
const rightCompleted = document.querySelector('.right-completed')

form.onsubmit = (e) => {
    e.preventDefault()

    // Provera dali su input dugmici popunjeni
    inputs.forEach(input => {
        const error = input.parentNode.parentNode.querySelector('.error')
        if(input.value === ''){
            input.classList.add('input-error')
            error.style.display = 'block'
        }else{
            input.classList.remove('input-error')
            error.style.display = 'none'
        }
    })
    // Provera dali su radio dugmici popunjeni
    const isAnyChecked = Array.from(radios).some(radio => radio.checked);

    // Prikazivanje greške ako nijedno dugme nije selektovano
    const radioError = radios[0].parentNode.parentNode.querySelector('.error');
    if (isAnyChecked) {
        radioError.style.display = 'none';
        // console.log("Form submitted successfully!");
        // Nastavite sa slanjem forme ili dodatnim akcijama
    } else {
        radioError.style.display = 'block';
        // console.log("Please select a radio option.");
    }

    // Provera dali su sva input polja popunjena
    const allInputFilled = Array.from(inputs).every(input => input.value.trim() !== '');

    if (allInputFilled && isAnyChecked) {
        const amount = parseFloat(inputs[0].value); // Iznos kredita
        const term = parseFloat(inputs[1].value); // Period u mesecima
        const rate = parseFloat(inputs[2].value) / 100; // Godišnja kamatna stopa (u procentima)
        const type = document.querySelector('.radio:checked').value; // Tip kredita
    
        let monthlyPayment;
        let totalRepayment;
    
        if (type === 'repayment') {
            const monthlyRate = rate / 12; // Mesečna kamatna stopa
            const n = term; // Broj uplata (broj meseci)
            
            // Formula za mesečnu uplatu za otplatu kredita
            monthlyPayment = amount * (monthlyRate * (1 + monthlyRate) ** n) / ((1 + monthlyRate) ** n - 1);
            totalRepayment = monthlyPayment * n;
        } else if (type === 'interest') {
            // Formula za mesečnu uplatu samo sa kamatom
            monthlyPayment = (amount * rate) / 12;
            totalRepayment = monthlyPayment * term;
        }
    
        // Prikaz rezultata
        monthly.innerHTML = `£${monthlyPayment.toFixed(2)}`;
        total.innerHTML = `£${totalRepayment.toFixed(2)}`;
        rightEmpty.style.display = 'none';
        rightCompleted.style.display = 'block';
    } else {
        rightEmpty.style.display = 'flex';
        rightCompleted.style.display = 'none';
    }
    
}
