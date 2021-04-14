dbconnection = require('../lib/db')
class DashboardServices {
    constructor(id)
    {this.id = id}

    async allTheServices(groupsUserFollowsVar, postsVar , categoriesVar){
        groupsUserFollowsVar   = await this.userFollows(groupsUserFollowsVar)
        postsVar               = await this.callThePosts(postsVar)
        categoriesVar          = await this.callTheCategories(categoriesVar)

        return [groupsUserFollowsVar, postsVar, categoriesVar]
    }

    userFollows (value){
        return new Promise((resolve,reject) =>{
        const query = `select * from foundain_express.groups where group_id in (select group_id from follow where user_id = ?);`
        dbconnection.execute(query,[this.id],function (err,res) {
            if(err){return reject(err)
            } else{                           
               res.forEach(element => {value[element.group_id] = element});
               return resolve(value)
            }
        })
    })}
    callThePosts(value){
        return new Promise((resolve,reject) =>{
            const query = `select * from foundain_express.posts where group_id in (select group_id from follow where user_id = ?) order by createdAt desc`
            dbconnection.execute(query,[this.id],function (err,res) {
                if(err){return reject(err)
            } else{
                res.forEach(element => {value.push(element)
                });
                return resolve(value)
            }
    })
})}

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

}
// function 
module.exports = {
    DashboardServices
}
