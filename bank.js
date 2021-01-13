const fs = require('fs')


let bankAccount = {name: 'nancy', AccNum: '1111', balance: '100'}

readAllAccounts = function(){
    try{
        data = fs.readFileSync('accounts.json')
        if(data.toString().length==0) throw new Error('')
        data = JSON.parse(data.toString())
        if(!Array.isArray(data)) throw new Error('')
    }
    catch(e){
        data = []
        fs.writeFileSync('accounts.json', "[]")
    }
    return data    
}
showAllAccounts = function(){
    data = readAllAccounts()
    if(data.length>0) console.table(readAllAccounts());
    else console.log(("no account found"))
}
addNewAccount = function(bankAccount) {
    data = readAllAccounts()
    
    result = data.find(element=>{
        return element.AccNum == bankAccount.AccNum
    })
    if(result == undefined)
    {
        data.push(bankAccount)
        fs.writeFileSync('accounts.json', JSON.stringify(data))
    }
    else
    {
        console.log("Account Number exists")
    } 
    
}
addBalance = function(bankAccount,newBalance)
{
    data = readAllAccounts() 
    id = data.findIndex(element=>{
        return element.accNum == bankAccount
    })
    data[id].balance+=newBalance
    fs.writeFileSync('accounts.json', JSON.stringify(data))
}

cashOut = function(bankAccount,cashOut)
{
    data = readAllAccounts()
       id = data.findIndex(element=>{
        return element.accNum == bankAccount
    })
    
    if(data[id].balance>=cashOut)
    {
        data[id].balance-=cashOut
    }  
    else
    {   
       console.log('Insufficient balance')
    }
    fs.writeFileSync('accounts.json', JSON.stringify(data))
    
    
}
addBalance(113,5)
showAllAccounts()
//cashOut(113,5)
//showAllAccounts()
//showAllAccounts()
// addNewAccount(bankAccount)
// showAllAccounts()