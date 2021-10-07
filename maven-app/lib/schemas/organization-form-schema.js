import {
  getCountries,
  getHeardAboutUsOptions,
  getLanguagesOfCommunication,
  getMethodOfCommunications,
  getOrganizationTypes,
  getPronouns,
  getTimezones,
} from 'lib/handlers/dropdown-handlers'
import { formatOptions } from 'lib/handlers/helper-handlers'
import Organization from 'lib/models/organization'

export default class OrganizationFormSchema {
  static async getSchema() {
    let organization = new Organization({})

    return [
      {
        type: 'heading',
        heading: 'Organization Information',
      },
      {
        type: 'text',
        label: 'Organization Name',
        id: 'org_name',
        name: 'org_name',
        autoComplete: 'org_name',
        placeholder: 'Organization Name',
        disabled: false,
        required: true,
        width: 'full',
        halfFull: true,
      },
      {
        type: 'text',
        label: 'Street Address',
        id: 'street_address',
        name: 'street_address',
        autoComplete: 'street_address',
        placeholder: 'Street Address',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'text',
        label: 'state',
        id: 'state',
        name: 'state',
        autoComplete: 'state',
        placeholder: 'State',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'text',
        label: 'city',
        id: 'city',
        name: 'city',
        autoComplete: 'city',
        placeholder: 'City',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'text',
        label: 'zip_code',
        id: 'zip_code',
        name: 'zip_code',
        autoComplete: 'zip_code',
        placeholder: 'Zip Code',
        disabled: false,
        required: true,
        width: 'full',
        halfFull: true,
      },
      {
        type: 'select',
        label: '',
        id: 'country',
        name: 'country',
        isRequired: true,
        placeholder: 'Country',
        options: formatOptions(getCountries()),
        value: '',
      },
      {
        type: 'select',
        label: '',
        id: 'timezone',
        name: 'timezone',
        isRequired: true,
        placeholder: 'Timezone',
        options: formatOptions(getTimezones()),
        value: '',
      },
      {
        type: 'text',
        label: 'office_number',
        id: 'office_number',
        name: 'office_number',
        autoComplete: 'office_number',
        placeholder: 'Office Number',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'text',
        label: 'office_email',
        id: 'office_email',
        name: 'office_email',
        autoComplete: 'office_email',
        placeholder: 'Office Email',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'select',
        label: '',
        id: 'org_type',
        name: 'org_type',
        isRequired: true,
        placeholder: 'Organization Type',
        options: formatOptions(getOrganizationTypes()),
        value: '',
      },
      // {
      //   type: 'select',
      //   label: '',
      //   id: 'org_affiliation',
      //   name: 'org_affiliation',
      //   isRequired: true,
      //   placeholder: 'Organization Affiliation',
      //   options: await organization.getOrganizationForSelect(1, 100000, false),
      //   value: '',
      // },
      {
        type: 'select',
        label: '',
        id: 'method_of_communication',
        name: 'method_of_communication',
        isRequired: true,
        placeholder: 'Preferred method of communication',
        options: formatOptions(getMethodOfCommunications()),
        value: '',
      },
      {
        type: 'select',
        label: '',
        id: 'language_of_communication',
        name: 'language_of_communication',
        isRequired: true,
        placeholder: 'Preferred language of communication',
        options: formatOptions(getLanguagesOfCommunication()),
        value: '',
      },
      {
        type: 'heading',
        heading: 'Main Point of Contact',
      },
      {
        type: 'text',
        label: 'title',
        id: 'title',
        name: 'title',
        autoComplete: 'title',
        placeholder: 'Title',
        disabled: false,
        required: true,
        width: 'full',
        halfFull: true,
      },
      {
        type: 'text',
        label: 'first_name',
        id: 'first_name',
        name: 'first_name',
        autoComplete: 'first_name',
        placeholder: 'First Name',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'text',
        label: 'last_name',
        id: 'last_name',
        name: 'last_name',
        autoComplete: 'last_name',
        placeholder: 'Last Name',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'select',
        label: '',
        id: 'pronoun',
        name: 'pronoun',
        isRequired: true,
        placeholder: 'Pronoun',
        options: formatOptions(getPronouns()),
        value: '',
        halfFull: true,
      },
      {
        type: 'text',
        id: 'org_position',
        name: 'org_position',
        autoComplete: '',
        placeholder: 'Position or Role in Organization',
        disabled: false,
        required: false,
        width: 'full',
        halfFull: true,
      },
      {
        type: 'phone',
        id: 'mobile_number',
        name: 'mobile_number',
        autoComplete: '',
        placeholder: 'Mobile Number',
        disabled: false,
        required: false,
        width: 'full',
      },
      {
        type: 'email',
        label: 'Email',
        id: 'email',
        name: 'email',
        autoComplete: '',
        placeholder: 'Email',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'heading',
        heading: 'Account Details',
      },
      {
        type: 'email',
        label: 'Email',
        id: 'email',
        name: 'email',
        autoComplete: '',
        placeholder: 'Email',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'break',
        text: "Your password must be at least '8' characters",
      },
      {
        type: 'password',
        label: 'Password',
        id: 'password',
        name: 'password',
        autoComplete: '',
        placeholder: 'Password',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'password',
        label: 'Confirm Password',
        id: 'confirm_password',
        name: 'confirm_password',
        autoComplete: '',
        placeholder: 'Confirm Password',
        disabled: false,
        required: true,
        width: 'full',
      },
      {
        type: 'heading',
        heading: 'How did you hear about Maven?',
      },
      {
        type: 'select',
        label: '',
        id: 'heard_about',
        name: 'heard_about',
        isRequired: true,
        placeholder: 'Select Option',
        options: formatOptions(getHeardAboutUsOptions()),
        value: '',
      },
      {
        type: 'heading',
        heading: 'Subscribe',
      },
      {
        type: 'checkbox',
        label: 'Subscribe',
        id: 'is_subscribe',
        options: [
          {
            label:
              'I would like to receive email updates about upcoming events, classes and promotions',
            id: 'is_subscribe',
            name: 'is_subscribe',
            value: true,
          },
        ],
      },
      {
        type: 'heading',
        heading: 'Terms of Service and Privacy Policy',
      },
      {
        type: 'checkbox',
        label: 'Terms of Service and Privacy Policy',
        id: 'accepted_term_and_conditions',
        options: [
          {
            label: 'I agree to the ',
            id: 'accepted_term_and_conditions',
            name: 'accepted_term_and_conditions',
            value: true,
            privacyLink: 'https://www.aju.edu/about-aju/privacy-policy',
          },
        ],
      },
    ]
  }
}
