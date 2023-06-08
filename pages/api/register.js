import User from '../../models/user'
import dbConnect from '../../utils/dbconnection';
import cryptoJS from "crypto-js";

dbConnect();


export default async (req, res) => {
    const { method } = req;
   
    console.log(req.body.data);
   // process.abort();
    switch (method) {
        case 'POST':
            const hashedPassword = cryptoJS.AES.encrypt(req.body.data.password,"test").toString();
    const user = new User({
        username:req.body.data.username,
        password:hashedPassword,
        email:req.body.data.email,
        mobile:req.body.data.mobile
    });
try{
    const savedUser = await user.save();
    res.status(200).json(savedUser);
}catch(err){
    res.status(500).json(err);
}
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}