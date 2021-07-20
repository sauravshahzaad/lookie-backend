import { AppointmentModel } from '../models/Appointment.js';

export default (app) => {
    app.post('/bookAppointment', async (req, res) => {
        if (req.body === undefined) {
            req.status(400).end();
        }
        else {
            console.log(req.body)
            // const appoint = await AppointmentModel.create(req.body);
            try {
            const newAppointment = {
                customerName: req.body.Name,
                customerMobile: req.body.mobile,
                appointmentDate: req.body.date,
                appointmentStartTime: req.body.startTime,
                serviceName: req.body.services,
                customerId: req.body.id,
                shopId: req.body.shopId
            }
            const appointment = AppointmentModel(newAppointment);
            appointment.save()
            if (appointment) {
                // res.send(user);
                console.log(appointment)
                res.json({
                    success: true,
                    msg: 'Appointment Booked    ',
                    appointment: {
                        ...req.body,
                        ...appointment
                    },
                })
            } else {
                res.status(404).end();
            }
        } catch (e) {
            res.status(404).end();
        }

    }
    });
    // app.post('/v1/orders', async (req, res) => {
    //     if (req.body === undefined) {
    //         req.status(400).end();
    //     } else if (req.user === undefined) {
    //         req.status(401).end();
    //     } else {
    //         const orderData = {
    //             ...req.body,
    //             timestamp: Date.now(),
    //             customer: req.user.data._id,
    //         };
    //         const order = await OrderModel.create(orderData);
    //         if (order) {
    //             res.send(order).end();
    //         } else {
    //             res.status(500).end();
    //         }
    //     }
    // });
    // app.get('/v1/orders', async (req, res) => {
    //     if (!req.user.data._id) {
    //         res.status(401).end();
    //         return;
    //     }
    //     const orders = await OrderModel.find({ customer: req.user.data._id }) || [];
    //     res.send(orders);
    // });
};