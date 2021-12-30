const express=require('express')
const app=express();
const mailer=require('nodemailer')
//localhost:3000/email?service=gmail&sender=tyb67@gmail.com&password=yourpassword&receiver=xyz@gmail.com
app.get('/email',(req,res)=>{
  const mail=  mailer.createTransport({
        service:req.query.service.toString(),
        auth:{
            user:req.query.sender.toString(),
            pass:req.query.password.toString(),
        }
    })
    console.log(req.query)

 const mail_details={
     from:req.query.sender.toString(),
     to:req.query.receiver.toString(),
     subject:"Welcome",
     //text:"Hey Buddy!"
     html:"<a href='https://github.com/TAYYAB-IT/JS_Series'>Click Here</a>",
     attachments:[{
         filename:"file.txt",
         path:__dirname+'/folder/file.txt'
     }]
 }

 
 mail.sendMail(mail_details,(err, info)=>{
     if(err){res.send(err)}
     else{
         console.log("Email Sent")
         res.send("Email Sent, "+info.response)
     }
 })
} )
app.listen(3000,()=>{
    console.log("Server is Active")
})