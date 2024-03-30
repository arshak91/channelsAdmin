import Cars from "../schemas/cars.schema.js";
import Users from "../schemas/users.schema.js"
import axios from 'axios'

async function getCars(req, res) {
    try {
            console.log(req.query);
        const arr = Array.isArray(req.query.name)
        console.log(arr);
        // filter.name = req.query.name
        const type = req.query.fiterType
        // $eq, $ne, $gt, $lt, $gte, $lte
        const filter = {
            $and: [{
                name: arr ? { $in: req.query.name } : req.query.name,
            }, {
                price: {
                    "$gte": req.query.price
                }
            }]
        };

        console.log('filter!!!!: ', filter);

        const cars = await Cars.find(filter)

        const micro = await axios.get('http://localhost:3000/micro');
        console.log('micro: ', micro.data);

        res.json({ cars })
    } catch (error) {
        console.log(error);
    }
    
}
async function addCar(req, res) {
    try {
        const car = await Cars.create({
            ...req.body,
            user: req.user.id
        })
        res.json(car)
    }
    catch (e) {
        res.json(e.message)
    }
}
export { getCars, addCar }