const io = require('socket.io')(8900 , {
    cors:{
        origin:"http://localhost:4000"
    }
});


let users = [];
console.log(users,"usersss")

const addUser = (userId, socketId)=>{
    !users.some((user)=> user?.userId === userId) && 
    users.push({userId, socketId})
}

const removeUser = (socketId)=>{
    users = users.filter(user=>user.socketId !== socketId)
}

const getUser = (userId)=>{
    return users.find((user)=>user.userId === userId)
}

    io.on("connection", (socket) => {
    console.log("user connected");    
    //take userId and socketId from user
     socket.on("addUser" , (userId)=>{
        addUser(userId, socket.id);
        io.emit("getUsers" , users)
    });


    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const user = getUser(receiverId);
        if (user) {
            io.to(user.socketId).emit("getMessage", {
                senderId,
                message,
            });
        } else {
            console.error('User not found:', receiverId);
        }
    });    


    //when disconnect 
    socket.on("disconnect" , ()=>{
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
   
});