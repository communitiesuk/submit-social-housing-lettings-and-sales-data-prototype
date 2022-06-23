# Submit social housing lettings and sales data (CORE) prototype

> This prototype is built using the [GOV.UK Prototype Rig](https://x-govuk.github.io/govuk-prototype-rig/).

## Requirements

* Node.js v16

## Installation

1. Clone this repository:\
`git clone git@github.com:communitiesuk/submit-social-housing-lettings-and-sales-data-prototype.git`

2. Install the dependencies:\
`npm install`

3. Start the application:\
`npm start`

## Developing locally

To automatically refresh the browser upon updating a file, use `npm run dev`.

### Generating fake data

The prototype includes datasets for organisation and schemes. Source datasets can be found in `app/datasets`.

The data for organisations is partially based on the list of [Registered providers of social housing](https://www.gov.uk/government/publications/registered-providers-of-social-housing), and both sets of data are embellished with faked values generated using [Faker](https://fakerjs.dev).

To generate organisation and scheme data for the application, run the following npm tasks (code for which can be found in `/scripts`):

* `npm run generate-datasets` - Generate all organisation and schemes data
* `npm run generate-organisations` - Generate organisation data only
* `npm run generate-schemes` - Generate schemes data only

Generated data is saved to `app/data/generated`.

### Linting

To lint JavaScript and CSS files, use `npm run lint`.
