import moment from "moment";
import EventModel from "../schemas/events.schema.js"
import Users from "../schemas/users.schema.js"

const getEvents = async (req, res) => {
    await PartyModel.find()
    const events = await EventModel.find({}).populate({
        path: "user",
        model: Users,
        select: {
            password: false
        }
    });


    res.json({
        status: 1,
        events
    })
}

const createEvents = async (req, res) => {
    // console.log('token: ', req.user);
    console.log('body: ', req.body);

    const event = await EventModel.create({
        ...req.body,
        // user: req.user.id
    })

    console.log('event: ', event);

    res.json({
        status: 1,
        data: event
    })
    console.log("some");
}

const getEventByUser = async (req, res) => {
    console.log(req.user);
    const events = await Events.find({
        user: req.user.id
    }).populate({
        path: "user",
        select: {
            'eventName': $name
        }
    }).select({
        name: 1,
        date: 1,
    })
    res.json({
        status: 1,
        data: events
    })
}

export {
    getEvents,
    createEvents,
    getEventByUser
}