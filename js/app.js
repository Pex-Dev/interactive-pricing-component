let yearly = false;

document.addEventListener('DOMContentLoaded',() =>{
    slider();
    switchButton();
})

function slider(){
    const slider = document.querySelector('#slider');
    slider.addEventListener('mousedown',()=>{//grabbing
        slider.classList.add('active');
    })
    slider.addEventListener('mouseup',()=>{
        slider.classList.remove('active');
    })
    slider.addEventListener('input',() =>{
        displayValues(slider.value);
    })
}

function switchButton(){
    const switchBtn = document.querySelector('.switch');
    switchBtn.addEventListener('click',(e) =>{
        e.preventDefault();//Prevent submit event
        switchBtn.querySelector('.slider-round').classList.toggle('active');//Toggle active class to change switch button position
        yearly = !yearly;//Toggle between year and month
        displayValues(document.querySelector('#slider').value);//Update the values
    })
}

function  displayValues(v){
    const value = parseInt(v, 10);//Parse slider value from string to int
    const pageviews = document.querySelector('#pageviews');
    const priceText = document.querySelector('.price');
    let priceValue = 16;

    const pricingOptions = [
        { pageviews: '10K', price: 8 },
        { pageviews: '50K', price: 12 },
        { pageviews: '100K', price: 16 },
        { pageviews: '500K', price: 24 },
        { pageviews: '1M', price: 36 }
    ];
    
    const selectedOption = pricingOptions[value-1]; //gets the selected pricing option

    pageviews.textContent = selectedOption.pageviews; //sets the pageviews text
    priceValue = selectedOption.price;//gets the price fron the selected option

    let billing = yearly ? 'year' : 'month'; //get the billing option

    if(yearly){//Check if the billing selected is yearly
        priceValue = calculatePriceYearly(priceValue);//Gets yearly prices
    }    
    priceText.innerHTML = `$${priceValue}.00<span>/ ${billing}</span>`;//sets the price
}

function calculatePriceYearly(value){
    let price = value * 12;
    const discount = price * 0.25;
    price = price - discount;
    return price;
}