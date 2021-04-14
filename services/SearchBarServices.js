dbconnection = require('../lib/db')
class SearchBarServices {
     allResults = '';
     simplifier = false

    constructor(model,user_id)  {
        this.id           = user_id
        this.phrase       = model.phrase;
        this.categories   = model.categories;
        this.minDonation  = model.minDonation;
    }

   async allTheServices(followsVar, titleVar, descriptionVar, categoriesVar){
        titleVar       = await this.searchForTitle(titleVar)
        descriptionVar = await this.searchForDescription(descriptionVar)
        if(titleVar.length == 0 && descriptionVar == 0){
         titleVar = await this.simplifySearch(titleVar)
        }
        categoriesVar  = await this.callTheCategories(categoriesVar)
        this.Unifier(titleVar,descriptionVar) 
        followsVar     = await this.userFollows(followsVar)
        return [this.simplifier]
    }

    userFollows (result){
      return new Promise((resolve,reject) =>{
            const query = `select * from follow where user_id = ? and group_id in (?) ;`
            dbconnection.execute(query,[this.id,this.allResults],function (err,res) {
            if(err){return reject(err)
            } else{
               res.forEach(element => {result.push(element)});
               return resolve(result)
            }
        })
        })
        
        
    }
    
    searchForTitle(result){
        return new Promise((resolve,reject) =>{
            var query = `select * from foundain_express.groups where match(title) against(?) and group_id = (select group_id from categorygroup where category_id = ?)`
            if(this.phrase == ""||this.phrase ==" "){query = "select * from foundain_express.groups order by createdAt "}
            dbconnection.execute(query,[this.phrase,this.categories], (err,res) => {
            if(err){return reject(err)
            } else{
               res.forEach(element => {result.push(element)});
               return resolve(result)
               
            }
        })
        })
    }

    simplifySearch(result){
       return new Promise((resolve,reject) =>{
                var query = `select * from foundain_express.groups where match(title) against(?);`
                dbconnection.execute(query,[this.phrase], (err,res) => {
                    console.log('simplify', this.phrase)
                if(err){return reject(err)
                } else{
                res.forEach(element => {result.push(element)});
                this.simplifier = true;
                return resolve(result)
                }
            })
        })
    }


    searchForDescription(descriptionVar){
        return new Promise((resolve,reject) =>{
            let descQuery = `select * from foundain_express.groups where match(description) against(?)`;
            dbconnection.execute(descQuery,[this.phrase],function (err,searchByDescriptionResults) {
                console.log("description Var", this.phrase)
            if(err){return reject(err)
            } else{
                console.log("here",searchByDescriptionResults)
                searchByDescriptionResults.forEach(element => {descriptionVar.push(element)});
            return resolve(descriptionVar)
            }
    })
    })
    
    
}
callTheCategories (value){
    return new Promise((resolve,reject) =>{
        const query = `select * from foundain_express.category `
        dbconnection.execute(query,function (err,res) {
            if(err){return reject(err)
            } else{                           
               res.forEach(element => {value.push(element)});
               return resolve(value)
            }
        })
    })}

    Unifier(titleVar,descriptionVar){
        console.log(titleVar,descriptionVar)
        if(titleVar.length){
            titleVar.forEach(titleElement =>{
                console.log("titleVar: ", titleElement)
                console.log("unifier")
                descriptionVar.forEach((element,index) =>{
                    console.log("Description : ", element)
                    console.log(titleElement.group_id == element.group_id)
                if(titleElement.group_id == element.group_id){
                    console.log("unifier1")
                    descriptionVar.splice(index,1)
                }
                })
            })
        }
        titleVar.forEach(element =>{
            this.allResults +=`${element.group_id},`
        })
        descriptionVar.forEach(element =>{
            this.allResults +=`${element.group_id},`
        })
    }
    
}




module.exports = {
    SearchBarServices
}
