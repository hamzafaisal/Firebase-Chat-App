class ChatUI {
    constructor(list){
        this.list = list;
    }
    
    clear(){
        this.list.innerHTML = '';
    }
    
    render(data){
        let when = dateFns.distanceInWordsToNow(data.created_at.toDate() , { addSuffix: true});
        
        let username = data.username ? data.username : "Anonymous";
        
        let html = `
          <li class="list-group-item">
              <span class="username">${username}</span>
              <span class="message">${data.message}</span>
              <div class="time">${when}</div>
          </li>
        `;
        this.list.innerHTML += html;
    }
    
    
    
    
}