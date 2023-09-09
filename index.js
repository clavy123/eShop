const server = require('./app')

server.listen(process.env.PORT,() => {
    console.log("server connected")
})