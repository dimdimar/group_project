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
            dbconnection.execute(query,[this.id,this.allResults], (err,res) => {
                console.log(this.allResults)
            if(err){return reject(err)
            } else{
                console.log(res)
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
            if(err){return reject(err)
            } else{
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
        if(titleVar.length){
            titleVar.forEach(titleElement =>{
                descriptionVar.forEach((element,index) =>{
                if(titleElement.group_id == element.group_id){
                    descriptionVar.splice(index,1)
                }
                })
            })
        }
        titleVar.forEach((element,index) =>{
            if(titleVar.length  == index + 1){
                this.allResults +=`${element.group_id}`
            }else{
            this.allResults +=`${element.group_id},`
        }
        })
        descriptionVar.forEach((element, index) =>{
            if(titleVar.length  == index + 1){
                this.allResults +=`${element.group_id}`
            }else{
            this.allResults +=`${element.group_id},`
        }
        })
    }
    
}




module.exports = {
    SearchBarServices
}
