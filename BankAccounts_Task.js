const yargs = require('yargs')
const fs = require('fs')

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
        return element.accNum == bankAccount.accNum
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
       console.log('you can withdraw max:', data[id].balance,'EGP')
    }
    fs.writeFileSync('accounts.json', JSON.stringify(data))
}

yargs.command(
    {
        command: 'addNewAccount',
        describe: 'Add Customer',
        builder:{
            name:{
                demondOption:true,describe:"name",tybe:'string'
            },
            balance:{
                demondOption:true,describe:"balance",tybe:'string'
            
            },
            accNum:{
                demondOption:true,describe:"account number",tybe:'string'

            }
        },
        handler:function(argv){
            let account={"name": argv.name, "balance":argv.balance, "accNum":argv.accNum}
            addNewAccount(account)
        }
    },
    
)

yargs.command(
    {
        command: 'showAllAccounts',
        describe: 'showAllAccounts',
        handler:function(argv){
            showAllAccounts()
        }
    },
    
)

yargs.command(
    {
        command: 'withdraw',
        describe: 'withdraw',
        builder:{
            accNum:{
                demondOption:true,describe:"accNum",tybe:'string'
            },
            cash:{
                demondOption:true,describe:"cash",tybe:'string'            
            },
        },
        handler:function(argv){
            cashOut(argv.accNum,argv.cash)
        }
    },
    
)

yargs.command(
    {
        command: 'addBalance',
        describe: 'add balance',
        builder:{
            accNum:{
                demondOption:true,describe:"accNum",tybe:'string'
            },
            cash:{
                demondOption:true,describe:"cash",tybe:'string'
            },
        },
        handler:function(argv){
            addBalance(argv.accNum,argv.cash)
        }
    },
    
)

yargs.argv



