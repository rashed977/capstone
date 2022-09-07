let express = require('express');
let app = express();
app.use(express.static(__dirname+'/dist/capstoneproj'))
app.get('/*',(req, res)=>{
  res.sendFile(__dirname+'/dist/capstoneproj/index.html')
});
app.listen(process.env.PORT || 9080);
