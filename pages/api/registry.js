import User from '../../models/user';

export default function userHandler(req, res) {
    const {
        // query: { id, name },
        body: { full_name, email, phone },
        method
    } = req;

    switch (method) {
        // case "GET":
        //   // Get data from your database
        //   res.status(200).json({ id, name: `User ${id}` });
        //   break;
        case 'POST':
            if (!full_name || !email || !phone) {
                res.status(200).json({ result: 'error', message: 'Please fill all data!' });
            } else {
                const newUser = new User({
                    email,
                    full_name,
                    phone,
                    isPaid: false,
                    wallet: null,
                    createdAt: Date.now()
                });
                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        res.status(200).json({ result: 'error', message: 'DB save error: ' });
                    } else {
                        res.status(200).json({ result: 'success', data: newUser });
                    }
                });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
