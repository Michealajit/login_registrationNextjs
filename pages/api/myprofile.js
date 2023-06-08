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
                console.log(req.body.username);
                 const user = await User.findOne({
                     username:req.body.username
                 });
                 if(!user) {
                  return res.status(401).json("no user Credentials");
                 }
                //   const hashedPassword = cryptoJS.AES.decrypt(user.password,"test");
                //   console.log(hashedPassword);
                //  const Password = hashedPassword.toString(cryptoJS.enc.Utf8);
                //  console.log(Password);
               
                // if(Password!==req.body.password){
                // return  res.status(401).json("Wrong password Credentials");
                // }
                
                
                return res.status(200).json({user});
             
             } catch (error) {
                 res.status(400).json({ success: false,error:error });
             }
             break;
        case 'PUT':
            console.log(req.body);
            //process.abort();
            try {
                console.log(req.body.username);
                if(req.body.inputs['password'] !== undefined){
                    const hashedPassword = cryptoJS.AES.encrypt(req.body.inputs.password,"test").toString();
                    console.log(hashedPassword);
                const data =       req.body.inputs;
                data['password'] = hashedPassword;
                 const user = await User.findByIdAndUpdate(req.body.inputs.id, data, {
                    new: true,
                    runValidators: true
                });
                if (!user) {
                    return res.status(400).json({ success: false });
                }
            }else{
                const data =       req.body.inputs;
               // data['password'] = hashedPassword;
                 const user = await User.findByIdAndUpdate(req.body.inputs.id, data, {
                    new: true,
                    runValidators: true
                });
                if (!user) {
                    return res.status(400).json({ success: false });
                }
            }
                

                res.status(200).json({ success: true, data: user });
             
             } catch (error) {
                 res.status(400).json({ success: false,error:error });
             }
             break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}