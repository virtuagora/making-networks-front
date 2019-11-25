const addInitiative = {
  title: 'Add your initiative',
  optional: '(Optional)',
  step0: {
    title: 'Welcome!',
    text: [
      'This form aims to map initiatives that involve young people and Information and Communication Technologies.',
      'The information will be used to create a network of organizations for future workshops and webinars.',
      'All the information will be used only within the scope of the Creating Networks project, carried out by the Youth Observatory, the Youth Special Interest Group of the Internet Society.',
    ],
    start: 'START!',
  },
  step1: {
    conversation: [
      'Awesome! Let\'s start!',
    ],
    fields: [
      {
        question: 'Whats the name of your initiative?',
        placeholder: 'Name of your initiative',
        fieldName: 'Initiative name',
      },
    ],
  },
  step2: {
    conversation: [
      '"{initiativeName}", Nice! I like it!',
      'Ok, now.. how about you tell us more about it?',
    ],
    fields: [
      {
        question: 'Write a brief description of your initiative',
        placeholder: 'Start typing here',
        fieldName: 'Initiative description',
      },
    ],
  },
  step3: {
    conversation: [
      'Very interesting!',
      'Let\'s place it in the map',
      'Choose the region, then the country, and (if it applies) the city where your initiative is located',
    ],
    fields: [
      {
        question: 'Where is located?',
      },
    ],
    fetchingRegions: 'Fetching regions from the server...',
    startTypingRegion: 'Start typing a region',
    fetchingCountries: 'Fetching countries from the server...',
    startTypingCountry: 'Start typing country',
    fetchingCities: 'Fetching cities from the server...',
    startTypingCity: 'Start typing a city',
    noResults: 'No results found',
    noCity: 'My initiative is not located in a city',
    cantFindCity: 'Can\t find your city? Click here',
    notificationNoCity: 'The initiative is not located in a city',
    skip: 'Skip this step, my initiative cannot be placed in a location',
    cantLocate: 'I cannot find my city in the list',
    feature: {
      title: 'This feature will be available soon',
      text: 'Sorry! We will add this feature in a future update, stay tuned!',
    },
  },
  step4: {
    conversation: [
      'Ok, so it\'s located in {cityName}, right?',
      'Let\'s load the map and see',
      'Your initiative will be placed like this. If that is ok for you, let\'s continue!',
    ],
  },
  step5: {
    conversation: [
      'Ok, now we need some public information',
    ],
    fields: [
      {
        question: 'Whats are the goals of the initiative? ',
        placeholder: 'Start typing the goals',
        fieldName: 'Initiative goals',
      },
      {
        question: 'What year the initiative started? ',
        placeholder: 'YYYY',
        fieldName: 'Initiative foundation year',
      },
      {
        question: 'What is the role of youth in this initative? ',
        fieldName: 'Initiative youth roles',
        options: {
          targetAudience: 'Target Audience',
          leadership: 'Leadership',
          membership: 'Membership',
        },
      },
      {
        question: '(Optional) What are your networks?',
        inputs: {
          website: 'Website',
          facebook: 'Facebook',
          twitter: 'Twitter',
          other_network: 'Other network',
        },
        labels: {
          other_network: '(Optional) URL to other network',
          test: 'Click here to test the link!',
        },
      },
    ],
  },
  step6: {
    conversation: [
      'We would like to know if your initiative has impact or presence in other countries.',
      'Can you list the countries where your initiative has impact? This step is totally optional',
    ],
  },
  step7: {
    conversation: [
      'Also, we would like to know the areas of interest of your initiative.',
      'Can you select what areas of interest is your initiative involved with?',
    ],
  },
  step8: {
    conversation: [
      'Thank you for sharing!',
      'To finish, we will ask you for some private data',
    ],
    fields: [
      {
        question: 'Please provide us a contact email of the initiative',
        placeholder: 'address@domain.com',
        fieldName: 'Initiative contact email',
      },
      {
        question: '(Optional) You can also provide us a telephone number',
        placeholder: 'Ex: +54 9 11 321 123456 (Int. format)',
        fieldName: 'Initiative phone number',
      },
    ],
  },
  step9: {
    conversation: [
      'We are almost done! Now it\'s time to check the information you gave us',
      'If you need to change something, please, click the pencil icon',
    ],
    noLocation: 'No location has been addressed',
    founded: 'Founded in the year {year}',
    button: 'Add my initiative',
    finish: 'Everything is ok? Good! To finish, click the button!',
    labels: {
      description: 'Description',
      location: 'Location',
      goals: 'Goals',
      roleOfYouth: 'Role of Youth',
      networks: 'Networks',
      contact: 'Contact',
      private: 'Private data',
      countries: 'Countries',
      areasOfInterest: 'Areas of interest',
    },
  },
  sending: {
    text: [
      'Wait a few seconds!',
      'We are sending a paper plane to our server with all the data!',
    ],
  },
  confirmation: {
    congratulations: 'Congratulations!',
    text: [
      'You\'ve successfully added your initiative',
      'Thanks for being part of this project!',
    ],
    edit: [
      'Add a picture and/or the logo of your initiative',
      'Edit any information of your initiative',
      'Add other users as members or owners',
    ]
  },
};

export default addInitiative;
