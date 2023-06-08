import User from '../../models/user'
import dbConnect from '../../utils/dbconnection';
import cryptoJS from "crypto-js";

dbConnect();


export default async (req, res) => {
    const { method } = req;
   
    console.log(req.body)
    switch (method) {
        case 'POST':
            try {
               console.log(req.body)
                const user = await User.findOne({
                    username:req.body.username
                });
                if(!user) 
                 return res.status(401).json("no user Credentials");
                
                 const hashedPassword = cryptoJS.AES.decrypt(user.password,"test");
                 console.log(hashedPassword);
                const Password = hashedPassword.toString(cryptoJS.enc.Utf8);
                console.log(Password);
              
               if(Password!==req.body.password){
               return  res.status(401).json("Wrong password Credentials");
               }
               return res.status(200).json(user);
            
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'GET':
            try {
                console.log(req.body)
                 const user = await User.findOne({
                     username:req.body.username
                 });
                 if(!user) 
                  return res.status(401).json("no user Credentials");
                 
                //   const hashedPassword = cryptoJS.AES.decrypt(user.password,"test");
                //   console.log(hashedPassword);
                //  const Password = hashedPassword.toString(cryptoJS.enc.Utf8);
                //  console.log(Password);
               
                // if(Password!==req.body.password){
                // return  res.status(401).json("Wrong password Credentials");
                // }
                return res.status(200).json(user);
             
             } catch (error) {
                 res.status(400).json({ success: false });
             }
             break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}