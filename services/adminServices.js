dbconnection = require('../lib/db')
var fs       = require('fs')
class AdminServices {
    constructor(model,categories,jsonIndex,jsonFile)  {
       this.model      = model
       this.categories = categories
       this.jsonIndex  = jsonIndex
       this.jsonFile   = jsonFile
    }


   async acceptServices(){
    
        await this.insertNewGroupToDB(this.model)
        await this.getLastId(this.model)
        this.declineServices()
    }

    declineServices(){
        delete this.jsonFile[this.jsonIndex]
        let newJsonFile = [];
        for (let i = 0 ; i <this.jsonFile.length ; i++){
            if(this.jsonFile[i] !== undefined){
                console.log(this.jsonFile[i])
                newJsonFile.push(this.jsonFile[i])
            }

        }
        fs.writeFile(`AdminNotifications/newGroup.json`,JSON.stringify(newJsonFile),(err)=>{
            if(err){console.log(err)}
        })
    }

    deletePhoto(index){
        if (index !== 'katt-yukawa-K0E6E0a0R3A-unsplash.jpg'){
            fs.unlink(`group/${index}`,(err) => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file: example_file.txt");
                }
            })
        }
    }

    insertNewGroupToDB (newGroup){
      return new Promise((resolve,reject) =>{
        const query = `insert into foundain_express.groups (title,photo,description,targetFunds,minDonations,user_id,status)
        values(?,?,?,?,?,?,?);`
        dbconnection.query(query,[newGroup.title,newGroup.photo,newGroup.description,newGroup.targetFunds,newGroup.minDonation,newGroup.userId,newGroup.status],(err,results)=>{
            if(err){return reject(err)}
          else{ resolve()}
     
        })
    })
}
    
    getLastId(val){
        return new Promise((resolve,reject) =>{
            dbconnection.query("SELECT group_id FROM foundain_express.groups ORDER BY group_id DESC LIMIT 1;",(err,results)=>{
                if(err){return reject(err)}
                else{
                    return resolve(this.insertCategories(results[0],val.categories))
        }
        })
        
        
    })
}

    insertCategories(idVar,categories){
        return new Promise((resolve,reject) =>{
            const query = `insert into foundain_express.categorygroup (group_id,category_id) values(?,?);`
                dbconnection.execute(query,[idVar.group_id,categories],function (err,results) {
                    if(err){return reject(err)
                    } else{return resolve ()}
            })
    })
    }    
}




module.exports = {
    AdminServices
}
