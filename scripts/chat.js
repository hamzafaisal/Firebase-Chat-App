class Chatroom 
{
    constructor(room , username){
        this.unsub;
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }
    
    // Add data to firebase
    async addChat(message){
        let now = new Date();
        
        let chat = {
          message: message,
          username: this.username,
          room: this.room,
          created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        
        let response = await this.chats.add(chat).then(()=>{
            console.log('chat added');
        })
    }
    
    // Get data from firebase
    getChat(callback){
        this.unsub = this.chats
        .where('room' , '==' , this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
               if(change.type === "added"){
                   callback(change.doc.data());
               } 
            });
        })
    }
    
    // Update user
    updateUser(username){
        this.username = username;
    }
    
    // Update room
    updateRoom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();
        }
    }
    
}


//setTimeout(() => {
//    chatroom.updateUser("Ali");
//    chatroom.updateRoom('music');
//    chatroom.getChat((data) => {
//    console.log(data);
//});
//    chatroom.addChat('okay');
//    
//} , 3000 );

