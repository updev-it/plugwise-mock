# Simple mock server

This is a simple mock server to be used during the openHAB `plugwiseha` binding development. It mocks the [Plugwise Adam Home Automation](https://www.plugwise.com/en_US/products/adam-ha) gateway API to assist during development. The mock server is not yet finished and I will add endpoints to add as I require them during development.

This mock server runs on `localhost:80` by default. At the moment only the HTTP/TCP port is configurable. This can be done by setting the environment variable `MOCK_PORT` to the prefered port number.

## Configuration

- Edit the .xml files in the `mock_data` folder. The contents of these files will be served by the mock REST API.
- Download the required nodejs modules by running `$ yarn install` or `$ npm install`.

## API endpoints

- **/core/domain_objects**

  _optional path parameters_

  - class=[Gateway|Locations|Modules|et cetera]
  - @memberModifiedDate=xxxxxxxxxx;
  - @locale=en-US
  - modified_date:ge:xxxxxxxxxx
  - deleted_date:ge:xxxxxxxxxx;

## Usage

To start `nodemon` run:

`$ yarn start`

or

`$ npm start`
