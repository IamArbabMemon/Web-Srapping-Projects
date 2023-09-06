const puppeeter =  require('puppeteer');
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
