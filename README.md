# :Different Code Test

This is my submission for the junior developer role.

## Approach

As first and last weeks of the rent may not be a complete cycle, they were calculated seperately. 
All complete cycles are calculated and rendered into the table. 
Each tenant is captured through react router params to determine which id to request from the API.


## Packages Used

- Create React App boilerplate
- Axios
- React Router Dom
- Enzyme


## Available Scripts

In the project directory, you can run:

### `yarn install`

Ensures any packages are installed an up to date.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Known Issues

1. The diffrerences in the number of days in a month are currently not accounted for, so payment day could shift.
2. On some occasions, the last full week date does not calculate corectly. 


## Imrpovements

1. Standarise the dates earlier to ensure consistency and reduce transofmations of the data.
2. Testing.