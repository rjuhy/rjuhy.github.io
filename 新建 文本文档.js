const app = require('express')();
const http = require('http').createServer(app);
const io   = require('socket.io')(http);

app.get('/', (_,res)=>res.sendFile(__dirname+'/index.html'));

io.on('connection', socket=>{
  socket.on('offer',  (id,desc)=> socket.to(id).emit('offer', socket.id, desc));
  socket.on('answer', (id,desc)=> socket.to(id).emit('answer', socket.id, desc));
  socket.on('ice',   (id,cand)=> socket.to(id).emit('ice', socket.id, cand));
  socket.on('join',  room=>{ socket.join(room); socket.room=room; });
  socket.on('disconnect',()=> socket.to(socket.room).emit('bye'));
});

http.listen(3000, ()=>console.log('信令服务器 http://localhost:3000'));