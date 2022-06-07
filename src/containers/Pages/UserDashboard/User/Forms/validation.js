import Joi from 'utils/validator';

export const FORM_MAIN_SCHEMA = {
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    username: Joi.string().label('Username').required(),
    password: Joi.string().label('Password').required(),
    confirm_password: Joi.string().label('Confirm Password').required(),
    phone: Joi.required().error(() => ({
        message: 'Please provide phone number',
    })),
    email: Joi.string().email().label('Email').required(),
};

export const FORM_EDIT_SCHEMA = {
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    username: Joi.string().label('Username').required(),
    phone: Joi.required().error(() => ({
        message: 'Please provide phone number',
    })),
    email: Joi.string().email().label('Email').required(),
};

export const CLIENT_FORM_SCHEMA = {
    firstname : Joi.string().label('First Name').required(),
    lastname : Joi.string().label('Last Name').required(),
    email: Joi.string().email().label('Email').required(),
    password: Joi.string().label('Password').required(),
    address: Joi.string().label('Address').required(),
    city: Joi.string().required(),
    state: Joi.string().label('State').required().error(() => ({
        message: 'Please select state',
    })), 
    zip: Joi.string().regex(/^[0-9]*$/).error(() => ({
        message: 'Please enter digits only and should not be empty',
    })),
    dob : Joi.string().label('Date of birth').required(),
    home_phone_number : Joi.string().label('Home Phone Number').required(),
    mobile_number : Joi.string().label('Mobile Number').required(),
    time_zone : Joi.string().label('Time Zone').required(),
    language  : Joi.string().label('Language').required(),
    desired_compensation : Joi.string().label('Desired Compensation').required(),
    start_date : Joi.string().label('Start date').required(),
    termination_date : Joi.string().label('Termination Date').required(),
    emergency_contact: Joi.required().error(() => ({
        message: 'Please provide emergency contact',
    })),
    home_phone_number: Joi.required().error(() => ({
        message: 'Please provide home phone number',
    })),
    mobile_number: Joi.required().error(() => ({
        message: 'Please provide mobile number',
    })),
    user_role: Joi.string().label('User type').required().error(() => ({
        message: 'Please select which type of user you want to create',
    })),
};
