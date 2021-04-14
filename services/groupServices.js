dbconnection = require('../lib/db')
mysql = require('mysql2/promise')
class groupServices {
     result = 1 ;

    constructor(group)
    {this.group = group}

   async allTheServices(groupVar, postsVar, followersVar, categoriesVar, fundsVar){
       
        groupVar      = await this.callTheGroup(groupVar)
        postsVar      = await this.callThePosts(postsVar)
        followersVar  = await this.callTheFollowers(followersVar)
        categoriesVar = await this.callTheCategories(categoriesVar)
        fundsVar      = await this.getFunds(fundsVar)
        return [groupVar, postsVar, followersVar, categoriesVar]
    }

    callTheFollowers (result){
      return new Promise((resolve,reject) =>{
            const query = `select * from user where user_id in (select user_id from follow where group_id = ?);`
            dbconnection.execute(query,[this.group],function (err,res) {
            if(err){return reject(err)
            } else{
               res.forEach(element => {result.push(element)});
               return resolve(result)
            }
        })
        })
        
        
    }
    callThePosts(result){
        return new Promise((resolve,reject) =>{
            const query = `select * from foundain_express.posts where group_id = ? order by createdAt desc`
            dbconnection.execute(query,[this.group],function (err,res) {
            if(err){return reject(err)
            } else{
               res.forEach(element => {result.push(element)});
               return resolve(result)
            }
        })
        })
        
        
    }


callTheGroup(result){
    return new Promise((resolve,reject) =>{
        const query = `select * from foundain_express.groups where group_id = ?`
         dbconnection.execute(query,[this.group],function (err,res) {
        if(err){return reject(err)
        } else{
           res.forEach(element => {result.push(element)});
           return resolve(result)
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

    getFunds (value){
        return new Promise((resolve,reject) =>{
            const query = `SELECT SUM(amount)
            FROM foundain_express.donation
            WHERE group_id = ?`
            dbconnection.execute(query,[this.group],function (err,res) {
                if(err){return reject(err)
                } else{                           
                   res.forEach(element => {value.push(element)});
                   return resolve(value)
                }
            })
        })
    }
    
}


module.exports = {
    groupServices
}
