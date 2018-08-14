const Ajv = require('ajv');
const ajv = new Ajv({allErrors: true});
const colors = require('colors/safe');

// Example from; https://jsonschema.net/
const jsonJS = {
  sender: {
    id: 'USER_ID',
  },
  recipient: {
    id: 'PAGE_ID',
  },
  timestamp: 1458692752478,
  message: {
    mid: 'mid.1457764197618:41d102a3e1ae206a38',
    seq: 73,
    text: 'hello, world!',
    quick_reply: {
      payload: 'DEVELOPER_DEFINED_PAYLOAD',
    },
  },
};

const schemaJS = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-06/schema#',
  $id: 'http://example.com/example.json',
  type: 'object',
  properties: {
    checked: {
      $id: '/properties/checked',
      type: 'boolean',
      title: 'The Checked Schema',
      description: 'An explanation about the purpose of this instance.',
      'default': false,
      examples: [
        false,
      ],
    },
    dimensions: {
      $id: '/properties/dimensions',
      type: 'object',
      properties: {
        width: {
          $id: '/properties/dimensions/properties/width',
          type: 'integer',
          title: 'The Width Schema',
          description: 'An explanation about the purpose of this instance.',
          'default': 0,
          examples: [
            5,
          ],
        },
        height: {
          $id: '/properties/dimensions/properties/height',
          type: 'integer',
          title: 'The Height Schema',
          description: 'An explanation about the purpose of this instance.',
          'default': 0,
          examples: [
            10,
          ],
        },
      },
    },
    id: {
      $id: '/properties/id',
      type: 'integer',
      title: 'The Id Schema',
      description: 'An explanation about the purpose of this instance.',
      'default': 0,
      examples: [
        1,
      ],
    },
    name: {
      $id: '/properties/name',
      type: 'string',
      title: 'The Name Schema',
      description: 'An explanation about the purpose of this instance.',
      'default': '',
      examples: [
        'A green door',
      ],
    },
    price: {
      $id: '/properties/price',
      type: 'number',
      title: 'The Price Schema',
      description: 'An explanation about the purpose of this instance.',
      'default': 0,
      examples: [
        12.5,
      ],
    },
    tags: {
      $id: '/properties/tags',
      type: 'array',
      items: {
        $id: '/properties/tags/items',
        type: 'string',
        title: 'The 0 Schema',
        description: 'An explanation about the purpose of this instance.',
        'default': '',
        examples: [
          'home',
        ],
      },
    },
  },
};

const validate = ajv.compile(jsonJS);

function runTest(data) {
  const valid = validate(data);
  if (valid) {
    console.log(colors.green('\tValid!'));
  }
  else {
    console.log(colors.red('\tInvalid: ' + ajv.errorsText(validate.errors)));
  }
}

const test = () => {
  console.log(colors.blue('Demo'))
  runTest(JSON.stringify(jsonJS));
};

const demo = {
  test,
};
exports.demo = demo;
