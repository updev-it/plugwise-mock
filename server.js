const projectRoot = require('path').resolve(__dirname);

const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 80;

const filterPathParameters = function(req, res, next) {
  if (req.url.indexOf(';') > -1) {
    const pathParameters = req.url.substring(req.url.indexOf(';') + 1).split(';');

    req.query['pathParameters'] = pathParameters.reduce((acc, cur, idx, src) => {
      if (cur.includes('=')) {
        const left = cur.split('=')[0];
        const right = cur.split('=')[1];
        return { ...acc, [left]: right };
      } else {
        return acc;
      }
    }, {});

    req.url = req.url.substring(0, req.url.indexOf(';'));
  }
  next();
};

// Removes any path parameters (starting with ';' in the url path)
app.use(filterPathParameters);
app.use(morgan('tiny'));

app.get('/core/domain_objects', function(req, res) {
  const pathParameters = req.query['pathParameters'];

  res.set('Content-Type', 'text/xml');

  if (!pathParameters || !Object.keys(pathParameters).includes('@memberModifiedDate')) {
    res.sendFile(projectRoot + '/mock_data/domain_objects.xml', err => {
      console.error(err);
    });
  } else {
    const classParam = pathParameters['class'] || '';
    switch (classParam.toLowerCase()) {
      case 'gateway': {
        res.sendFile(projectRoot + '/mock_data/domain_objects_gateway.xml', err => {
          console.error(err);
        });
        break;
      }
      default: {
        // Send empty XML response
        res.send('<?xml version="1.0" encoding="UTF-8"?><domain_objects/>');
        break;
      }
    }
  }
});

app.get('*', function(req, res) {
  res.status(400).send('Invalid endpoint');
});

const server = app.listen(process.env.MOCK_PORT || port, () =>
  console.log(`Plugwise mock API listening on ${server.address().address}:${server.address().port}`)
);
