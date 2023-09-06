const puppeeter =  require('puppeteer');
//const dataBase = require('./database.js');

async function showerBook ()  {
    const browser = await puppeeter.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://books.toscrape.com/');
    
    const paragraphGraber = await page.evaluate(()=>{
        const pgTag = document.querySelectorAll('.row ol li');
         const productAndPrice = [];
         
         for(item of pgTag){
            productAndPrice.push({
                product:item.getElementsByTagName('a')[1].title,
                price:item.querySelector('.price_color').innerText
            });
         }

        //  productAndPrice[0].getElementsByTagName('a')[1].title;   
        return productAndPrice;
    })

   console.log(paragraphGraber);
    await browser.close();
};

// function printer(arr){
//     for(item of arr){
//         console.log(item)
//         console.log();
//     }
// };

async function pageEvaluator(page){
    const totalQuotes = [];
    let i =1;
    while(true){
        
    await page.goto(`http://quotes.toscrape.com/page/${i}/`);
    let quotesSet = await page.evaluate(()=>{
        const arr = [];       
        const quotes = document.querySelectorAll('.quote');
            for(quote of quotes){
            author = quote.querySelector('.author').innerText;
            saying = quote.querySelector('.text').innerText;
            arr.push({author,saying});
    }
    return arr;
});
i++;
    if(quotesSet.length===0){
        return totalQuotes;
}
totalQuotes.push({pgNo:i})
totalQuotes.push(quotesSet);    

}

}

async function getQuotes(){
    const browser = await puppeeter.launch({headless:false});
    const page = await browser.newPage();

    const totalQuotes = await pageEvaluator(page);
    console.log(totalQuotes);
    browser.close();

};


async function login(){
    const {employeeData} = require('./data.js');    
    const browser = await puppeeter.launch({headless:false});
    const page = await browser.newPage();
     await page.goto('http://localhost:3000/');
      await fillData(employeeData,page);  
     await browser.close();
};

async function fillData(employeeData,page){
    for(employee of employeeData){    
        await page.waitForSelector('body');
        await page.type('#nameField',employee.fullName);
        await page.type('#usernameField',employee.userName);
        await page.type('#emailField',employee.email);
        await page.type('#phoneNumField',employee.phone);
        await page.type('#passwordField',employee.password);
        await page.type('#confirmPass',employee.password);    
        
            if(employee.gender==='Male')
                         await page.click('.dot.one');
            else if(employee.gender==='Female')
            await page.click('.dot.two');
            else
           await page.click('.dot.three');

        await page.click('input[value="Register"]');
        await page.reload();
    };
};



async function ScrapWeb(){
    let DataCollection =[];
    let data;
    
    const browser = await puppeeter.launch({ headless: false });
const page = await browser.newPage();


for(let i= 1; i<=4; i++){
await page.goto(`https://www.libertybooks.com/non-fiction/business-management/finance-investment-stocks?page=${i}`)
data = await page.evaluate(()=>{
    const arr= [];
    let bookName;
     let price;
    const elements = document.querySelectorAll('.caption');

    for(book of elements){   
         bookName = book.querySelector('h4').innerText;   
        if(book.querySelector('.price').querySelectorAll('span').length>1)
            price = parseFloat(book.querySelector('.price-new').innerText.replace(/[^0-9.-]+/g, ''));
        else
            price = parseFloat(book.querySelector('.price').innerText.replace(/[^0-9.-]+/g, ''));
        arr.push({bookName,price});
}

return arr;
})

DataCollection.push(data);

}
//********************************** */
console.log(DataCollection);
await browser.close();

}


async function getFreeShipItems(){
    const browser = await puppeeter.launch({headless:false});
    const page = await browser.newPage();
   await  page.goto('https://www.daraz.pk/mens-t-shirts/?spm=a2a0e.pdp.cate_3.1.45937623O3uvFU');
    
    const data = await page.evaluate(()=>{
        const arr = [];
        const items = document.querySelectorAll('.info--ifj7U');
        for(item of items){
        if(item.querySelector('i.ic-dynamic-badge.ic-dynamic-badge-freeShipping.ic-dynamic-group-2')){;
        arr.push({
            productName : item.querySelector('.title--wFj93').innerText.substring(0,199),
             price : parseInt(item.querySelector('.price--NVB62').innerText.replace(/^Rs\. /, ''))
           });
        }
  }
        return arr;
   
    });

    console.log(data);
    await require('./database.js').insertData(data);
    await browser.close();

}



async function getArtice(){
    const browser = await puppeeter.launch({headless:false});
    const page = await browser.newPage();
    await page.goto('http://hyd.szabist.edu.pk/academics.html#faculty');
    
    const item = await page.evaluate(()=>{
    const arr = []; 
        const names = document.querySelectorAll('.faculty .container h3');
        const designations = document.querySelectorAll('.faculty .container h4');
        try{
        for(let i =0; i<names.length; i++){
            arr.push({
                name:names[i].innerText,
                designation : designations[i].innerText
            })  
        }
    }catch(err){
        console.log(err);
    }
           
            return arr;
     });

     console.log(item);
     await browser.close();

}

