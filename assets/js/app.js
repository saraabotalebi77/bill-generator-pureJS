//foods and ordered foods lists
const foods = [{id:0,Name:"همبرگر معمولی",price:8000,image:"./assets/img/hamburger.png"},
{id:1,Name:"همبرگر مخصوص",price:10000,image:"./assets/img/hamburger.png"},
{id:2,Name:"همبرگر معمولی با قارچ و پنیر",price:10000,image:"./assets/img/hamburger.png"},
{id:3,Name:"همبرگر مخصوص با قارچ و پنیر",price:20000,image:"./assets/img/hamburger.png"},
{id:4,Name:"سیب زمینی سرخ کرده ویژه",price:25000,image:"./assets/img/french_fries.png"},
{id:5,Name:"سیب زمینی سرخ کرده",price:10000,image:"./assets/img/french_fries.png"},
{id:6,Name:"نوشابه رژیمی",price:6000,image:"./assets/img/soda.png"},
{id:7,Name:"نوشابه",price:5000,image:"./assets/img/soda.png"},
{id:8,Name:"سالاد فصل",price:8000,image:"./assets/img/salad.png"},
{id:9,Name:"سالاد سزار",price:25000,image:"./assets/img/ceasar.png"}],
orderedFoods =[];

//getting discountCodeForm , submitOrdersForm , popUpBtn element
const discountCodeForm = document.querySelector(".discountCode-form"),
    submitOrders = document.querySelector(".submit-orders")
    popUpBtn = document.querySelector(".pop-up-btn");

// Definition of the addfood function to add food to the ordered food list
const addFood = function(foodItem){
    //Defining the flag variable to check whether the selected food is in the list of ordered foods or not
    let flag =0;
    for(let index in orderedFoods){
        if(orderedFoods[index].id == foods[foodItem].id){
            orderedFoods[index].count++;
            flag = 1;
            break; 
        }
    }
    //Create an object for the selected food if the food is not available in the ordered food list 
    if(!flag){
        const orderedFood = {
            id : foods[foodItem].id,
            Name : foods[foodItem].Name,
            price : foods[foodItem].price,
            count : 1,
            sumPrice(){
                return this.count*this.price; 
            }
        }
        orderedFoods.push(orderedFood);
    }
    render(0);
}


// definition minusFood function for reduce food from list of ordered foods
const minusFood = function(foodItem){
    for(let index in orderedFoods){
        if(orderedFoods[index].id == foods[foodItem].id){
            orderedFoods[index].count--;
            if(orderedFoods[index].count == -1){
                orderedFoods.splice(index,1);
            }
            break; 
        }
    }
    
    render(0);
}


function render(disCountPercent){
    // getting menu-wrapper
    const menu = document.querySelector(".menu-wrapper");
    menu.innerHTML = "";

    foods.forEach((food,index)=>{
        /* If the food is in the list of ordered foods, its number is taken from the list of ordered foods, otherwise its number is zero*/
        let numberOrderedFood = 0
        let orderedFoodId;
        for(let index in orderedFoods){
            if(food.id == orderedFoods[index].id){
                numberOrderedFood = orderedFoods[index].count;
                orderedFoodId = index;
                break;
            }
        }
        //creating element for showing food
        const foodWrapper = document.createElement("div");
        foodWrapper.className = "food-wrapper d-flex justify-content-f-start bg-white f-grow-1";
        foodWrapper.innerHTML = `
        <div class="foodImage-wrapper">
            <img class="foodImage" src=${food.image} alt=${food.Name}>
        </div>
        <div class="foodInfo d-flex f-direction-column f-grow-1 justify-content-center">
            <h3 class="nameFood">
            ${food.Name}
            </h3>
            <span class="priceFood">
                ${food.price}تومان
            </span>
            <div class="sumPrice-quantityOrdered-wrapper d-flex align-items-center justify-content-space-between">
                <div class="quantityOrdered-wrapper d-flex align-items-center">
                    <button class="d-flex align-items-center justify-content-center bg-red add-btn" onclick="addFood(${index})"><img class="addImage" src="./assets/img/add.png" alt="add"></button>
                    <span class="quantity-ordered d-flex align-items-center justify-content-center f-grow-1 bg-gray">${numberOrderedFood}</span>
                    <button class="d-flex reduce-btn align-items-center justify-content-center bg-red" onclick="minusFood(${index})"><img class="reduceImage" src="./assets/img/minus.png" alt="minus"></button>
                </div>
                <div class="sumPrice-wrapper">
                    <span class="sum-price">${numberOrderedFood==0 ? 0 : orderedFoods[orderedFoodId].sumPrice()}</span>تومان
                </div>
            </div>
        </div>`;
        menu.append(foodWrapper);
    })

    //getting sumPriceOrders , fee , amountPayable and discount elements for showing factor
    const sumPriceOrdersElement = document.querySelector(".sumPriceOrders"),
        feeElement = document.querySelector(".fee"),
        amountPayable = document.querySelector(".amountPayable"),
        discount = document.querySelector(".discount");
    //calculate total orders
    let totalOrders = 0;
    for(let index in orderedFoods){
        totalOrders += orderedFoods[index].sumPrice();
    }
    sumPriceOrdersElement.innerText = totalOrders;
    feeElement.innerText = 5*totalOrders/100; 
    amountPayable.innerText = (totalOrders + (5*totalOrders/100))-((totalOrders + (5*totalOrders/100))*disCountPercent/100);
    discount.innerText = disCountPercent;
}
render(0);


discountCodeForm.addEventListener("submit",event=>{
    event.preventDefault();
    //discounts list
    disCounts = [{Name:"golden",percent:30},
    {Name:"silver" ,percent:20},
    {Name:"bronze",percent:10}];
    //getting discount name that entered by user
    const nameDiscount = event.target.firstElementChild.value.toLowerCase();
    //definition variable for discount value
    let disCountValue =0;
    //Determining the discount percentage
    disCounts.forEach(disCount=>{
        if(disCount.Name == nameDiscount){
            disCountValue = disCount.percent
        }
    })
    event.target.firstElementChild.value = null;
    render(disCountValue)
})

submitOrders.addEventListener("submit",event=>{
    event.preventDefault();
    document.querySelector(".content").style.filter = "blur(0.2rem)";
    document.querySelector(".pop-up-box").classList.add("show"); 
    if(orderedFoods.length != 0){            
        document.querySelector(".pop-up-txt").innerHTML = "سفارش شما با موفقیت ثبت شد";
    }
    else{            
        document.querySelector(".pop-up-txt").innerHTML = "شما هیچ محصولی انتخاب نکردید.";
    }

})

popUpBtn.addEventListener("click",event=>{
    document.querySelector(".content").style.filter = "none";
    document.querySelector(".pop-up-box").classList.remove("show");
    orderedFoods.splice(0,orderedFoods.length);
    render(0);

})