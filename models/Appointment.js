import mongoose from 'mongoose';

export const AppointmentSchema = new mongoose.Schema({
    // customer: mongoose.Schema.Types.ObjectId,

    // products: [{
    //     _id: mongoose.Schema.Types.ObjectId,
    //     name: String,
    //     price: Number,
    //     images: [String],
    // }],
    // contact: {
    //     fullName: String,
    //     phoneNumber: String,
    // },
    // shippingAddress: {
    //     country: String,
    //     city: String,
    //     addressLine1: String,
    //     addressLine2: String,
    //     postalCode: String,
    // },
    customerId: mongoose.Schema.Types.ObjectId,
    shopId: {
        type: String,
        require: true
    },
    customerName: {
        type: String,
        require: true
    },
    customerMobile: {
        type: String,
        // require: true
    },
    appointmentDate: {
        type: String,
        require: true
    },
    appointmentStartTime: {
        type: String,
        require: true
    },
    serviceName: {
        type: String,
        require: true
    },

}, { timestamps: true });

export const AppointmentModel = mongoose.model('Appointments', AppointmentSchema);