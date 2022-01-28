// PZoVrUvZro7OgW3O
// mongodb+srv://ira_sokolova:PZoVrUvZro7OgW3O@cluster0.81849.mongodb.net/test
// mongodb+srv://ira_sokolova:<password>@cluster0.81849.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const app = require('./app')
const {DB_HOST, PORT = 3000} = process.env;
require('mongoose').connect(DB_HOST)
.then(()=>app.listen(PORT, () => {
  console.log("Database connection successful")
}))
.catch(error=>{
  console.log(error.message)
  process.exit(1)
})
 


