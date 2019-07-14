
const create = {
  optional: '(Optional)',
  required: '(Required)',
  placeholder: 'Type here..',
  fields: {
    name: {
      label: 'Name of the initiative',
    },
    description: {
      label: 'Description',
    },
    public_data: {
      label: 'Public information',
      goals: {
        label: 'Goals of the initiative',
      },
      founding_year: {
        label: 'Year of foundation',
      },
      role_of_youth: {
        label: 'Role of youth',
        options: {
          targetAudience: 'Target Audience',
          leadership: 'Leadership',
          membership: 'Membership',
        },
      },
      networks: {
        label: '(Optional) Initiative networks',
        website: 'Website',
        facebook: 'Facebook',
        twitter: 'Twitter',
        other_network: 'Other network',
        test: 'Click here to test the link!',
      },
    },
    private_data: {
      label: 'Private information',
      contact_email: {
        label: 'Contact email',
      },
      contact_phone: {
        label: '(Optional) Contact phone',
      },
    },
    location: {
      title: 'Location in the map',
      searchTitle: 'Search for the location',
      fetchingRegions: 'Fetching regions from the server...',
      startTypingRegion: 'Start typing a region',
      fetchingCountries: 'Fetching countries from the server...',
      startTypingCountry: 'Start typing country',
      fetchingCities: 'Fetching cities from the server...',
      startTypingCity: 'Start typing a city',
      noResults: 'No results found',
      noCity: 'My initiative is not located in a city',
      notificationNoCity: 'The initiative is not located in a city',
      theLocation: '<i class="fas fa-check"></i>&nbsp;The initiative is located in <b>{region}, {country}, {city}</b>',
      confirm: {
        title: 'Confirm location',
        question: 'Do you confirm that the initiative is located in <b>{region}, {country}, {city}</b>',
      },
    },
  },
};

export default create;
