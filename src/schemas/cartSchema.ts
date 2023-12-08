import * as yup from 'yup';

const CreateCartSchema = (countries: string[], cities: string[]) => {
    return yup.object().shape({
        firstName: yup
            .string()
            .matches(/^[A-Za-z ]*$/, { message: "First name must not contain special symbols" })
            .required('Fist name is required')
            .min(2, 'Enter at least 2 characters')
            .max(16, 'Maximum allowed 16 characters'),
        lastName: yup
            .string()
            .matches(/^[A-Za-z ]*$/, { message: "Last name must not contain special symbols" })
            .required('Last name is required')
            .min(2, 'Enter at least 2 characters')
            .max(16, 'Maximum allowed 16 characters'),
        email: yup.
            string()
            .email('Enter a valid email')
            .required('Email is required'),
        phone: yup.string()
            .required('Phone is required')
            .min(10, 'Enter correct phone (10-15 digits)')
            .max(15, 'Enter correct phone (10-15 digits)'),
        address: yup
            .string()
            .required('Address is required')
            .matches(/^[A-Za-z0-9 ,.]*$/, { message: "Address must not contain special symbols" })
            .min(5, 'Enter correct adress. At least 5 characters')
            .max(16, 'Maximum allowed 50 characters'),
        country: yup
            .string()
            .required('Country is required')
            .test(
                'existsInCountries',
                'Country is not valid',
                value => countries.includes(value)
            ),
        city: yup
            .string()
            .required('City is required')
            .test(
                'existsInCities',
                'City is not valid',
                value => cities.includes(value)
            ),
        zip: yup
            .string()
            .required('ZIP is required')
            .matches(/^\d{5}$/, 'Must be a 5-digit number'),
        additionalInfo: yup
            .string()
            .notRequired()
            .max(300, 'Not more than 300 symbols'),
        agreeToMarketing: yup
            .boolean()
            .notRequired(),
        agreeToTermsAndPrivacy: yup
            .boolean()
            .required()
            .oneOf([true], 'You must accept the terms and conditions'),
    });
}

export default CreateCartSchema;
