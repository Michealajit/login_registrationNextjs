import dbConnect from '../../../utils/dbconnection';
import blog from '../../../models/Blog'

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const data = await blog.findById(id);

                if (!data) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const data = await blog.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!data) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: data });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deleteddata = await blog.deleteOne({ _id: id });

                if (!deleteddata) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}