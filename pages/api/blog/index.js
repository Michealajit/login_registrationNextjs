import dbConnect from '../../../utils/dbconnection';
import blog from '../../../models/Blog';

dbConnect();

export default async (req, res) => {
    const { method } = req;
   

    switch (method) {
        case 'GET':
            try {
                const blogs = await blog.find({});

                res.status(200).json({ success: true, data: blogs })
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                console.log(req.body)
                const data = await blog.create(req.body);

                res.status(201).json({ success: true,data: data})
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}