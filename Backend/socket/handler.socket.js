import { rooms, roomsMembers, roomsRaising } from "../constants/rooms.js";
import jsonwebtoken from 'jsonwebtoken'

const secretKey = 'jefhd85o3ruijf9';
const handler = (io)=>{
    io.on('connection', (socket) => {
    // console.log(`✅ User connected: ${socket.id}`);

    socket.on('joinRoom', (roomToken)=>{
        try { 
            const decoded = jsonwebtoken.verify(roomToken, secretKey); 
            var code = decoded.code;
            if(rooms[code]){
                socket.user = {
                    mail: decoded.mail,
                    code: decoded.code,
                    host: decoded.host
                };
                socket.join(code);
                if(roomsMembers[code])io.to(code).emit('updateMembers', {membersData:roomsMembers[code], host:rooms[code].host, scale:rooms[code].scale, tMembers:rooms[code].members});
            }
        } catch (err) { 
            console.log('wrong user joining room') 
            return;
        }
    })

    socket.on('raisingHand', ()=>{
        if (!socket.user?.code) return;
        const code = socket.user.code;
        const mail = socket.user.mail;
        roomsRaising[code]= {...roomsRaising[code],[mail]: true};
        io.to(code).emit('updateRaisingHand', roomsRaising[code])  
    })

    socket.on('handsDown', ()=>{
        if (!socket.user?.code) return;
        const code = socket.user.code;
        const mail = socket.user.mail;
        roomsRaising[code]= {...roomsRaising[code],[mail]: false};
        io.to(code).emit('updateRaisingHand', roomsRaising[code])  
    })

    socket.on('sendGroupMessage', ({message})=>{
        if (!socket.user?.code){
            console.log("wrong user")
            return;
        }
        const code = socket.user.code;
        const mail = socket.user.mail;
        io.to(code).emit('recieveGroupMessage', {message:message, sender:mail})  
    })
    
    socket.on('disconnect-meeting', ()=>{
        if (!socket.user?.code) return;
        const code = socket.user.code;
        const mail = socket.user.mail;
        if(socket.user.host){
            (async()=>{
                await socket.leave(code);
                io.to(code).emit('meetingEnded', {message:"metting terminated by host"});
                delete rooms[code]
                delete roomsMembers[code]
                delete roomsRaising[code]
                return;
            })();
        }   
        if(code && roomsMembers[code]){
            delete roomsMembers[code][mail]
            io.to(code).emit('updateMembers', {membersData:roomsMembers[code], host:rooms[code].host, scale:rooms[code].scale, tMembers:rooms[code].members});
        }
        socket.leave(code);
    })
    socket.on('disconnect', () => {
        // console.log('disconnected ',socket.id)
        
    });
  });
}

export default handler