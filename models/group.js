class Group {
    constructor( title,photo,description,targetFunds,minDonation,userId, categories) {
        this.title = title;
        this.photo = photo;
        this.description = description;
        this.targetFunds = targetFunds;
        this.minDonation = minDonation;
        this.userId = userId;
        this.categories = categories;
    }
}
module.exports = Group;
