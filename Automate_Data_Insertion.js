
const puppeeter =  require('puppeteer');
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
