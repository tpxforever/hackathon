class User {
    constructor(username, email, dateOfBirth) {
        this.username = username;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.friendListPending = [];
        this.friendList = [];
        this.capsuleList = [];
        this.premium = false
    }

    // Method to add a friend to the friend list
    addFriend(friendID) {
        this.friendListPending.push(friendID);
    }

    updatePremium(confirmPurchase){
        if(confirmPurchase=true){
            this.premium = true
        }
    }

    processFriendRequest(friendID, friendListPending, friendList, accepted) {        
        const index = friendListPending.indexOf(friendID);
            if (index !== -1) {
                // Remove the friendID from friendListPending
                friendListPending.splice(index, 1);
                if(accepted = true) {
                    // Add the friendID to friendList
                    friendList.push(friendID);
                    return true;
                }
            }
        
        return false;
    }

    // Method to remove a friend from the friend list
    removeFriend(friend) {
        this.friendList = this.friendList.filter(f => f !== friend);
    }

    // Method to add an item to the capsule list
    addCapsule(capsule) {
        this.capsuleList.push(capsule);
    }

    // Method to remove an item from the capsule list
    removeCapsule(capsule) {
        this.capsuleList = this.capsuleList.filter(c => c !== capsule);
    }

    // Method to get user info
    getUserInfo() {
        return {
            username: this.username,
            email: this.email,
            dateOfBirth: this.dateOfBirth,
            friendList: this.friendList,
            capsuleList: this.capsuleList
        }
    }
}

class Capsule{
    constructor(username, title, setDate) {
        this.title = title;
        this.capsuleID = `${username}_${title}`;
        this.setDate = setDate;
        this.endDate = null;  
        this.theme = "standard";
        this.questionnaire = [];
        this.uploadSize = 0;
        this.visibility = "private"
        this.sharedTo = []

        this.limits = {
            uploadSizeMax: 5,
            friendShareMax: 3,
            vidMax: 0,
            backedUp: false,
            durationMax: 365,
            availableThemes: {
                yellow: "happy",
                blue: "calm",
                red: "passionate"
            }
        }
    }

    premiumCheck(premium){
        if(premium = true){
            this.limits = {
                uploadSizeMax: 15,
                friendShareMax: 10,
                vidMax: 3,
                backedUp: true,
                durationMax: (1825),
                availableThemes: {
                    yellow: "happy",
                    blue: "calm",
                    red: "passionate",
                    green: "anxious",
                    pink: "love",
                    purple: "proud"

                }
            }
        }
    }

    setEndDate(sliderVal){
        //if SV = 1 set this.endDate = setDate + months
        //if SV = 2 && premium = true etc
    }

    setUploadSize(premium, amount){
        if(premium = true){

        }
    }

    addFriendToCapsule(friend, friendList)
    {
        const index = friendList.indexOf(friend);    
        if (index !== -1) {
                let counter = 0
                if (counter < this.limits.friendShareMax 
                    && friend !== this.sharedTo){
                        this.sharedTo.push(friend) 
                }
        }
    }
}


// Example usage:
const user = new User("johnDoe", "john@example.com", "1990-01-01");
user.addFriend("janeDoe");
user.addCapsule("summer2024");
console.log(user.getUserInfo());
