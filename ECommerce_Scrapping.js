const puppeeter =  require('puppeteer');
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
