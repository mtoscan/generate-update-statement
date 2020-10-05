import * as handler from '../src/Handler';

import {
  document,
  anotherDocument,
  addMutations,
  deleteMutations,
  updateMutations,
  updateMutationforAnotherDocument
} from './sampleData';

const getEvent = (doc, mutation) => {
  return {
    body: JSON.stringify({ document: doc, mutations: mutation})
  }
};

test('Test add Mutations', async () => {
  const event = getEvent(document, addMutations);
  const context = 'context';
  const response = await handler.generateUpdateStatement(event, context);
  expect(response.statusCode).toEqual(200);
  expect(typeof response.body).toBe("string");
  expect(JSON.parse(response.body).data).toContainEqual({ "$add": { "posts": [{ "value": "four"}]}});
});

test('Test update Mutations', async () => {
  const event = getEvent(document, updateMutations);
  const context = 'context';
  const response = await handler.generateUpdateStatement(event, context);
  expect(response.statusCode).toEqual(200);
  expect(typeof response.body).toBe("string");
  expect(JSON.parse(response.body).data).toContainEqual({ "$update": { "posts.1.mentions.0.text": "pear"}});
});

test('Test delete Mutations', async () => {
  const event = getEvent(document, deleteMutations);
  const context = 'context';
  const response = await handler.generateUpdateStatement(event, context);
  expect(response.statusCode).toEqual(200);
  expect(typeof response.body).toBe("string");
  expect(JSON.parse(response.body).data).toContainEqual({ "$remove": { "posts.1.mentions.1": true}} );
});
test('Test with different structure document',  async () => {
  const event = getEvent(anotherDocument, updateMutationforAnotherDocument);
  const context = 'context';
  const response = await handler.generateUpdateStatement(event, context);
  expect(response.statusCode).toEqual(200);
  expect(typeof response.body).toBe("string");
  expect(JSON.parse(response.body).data).toContainEqual({ "$update": { "menu.1.pages.1.columns.3.height": 50 }});
})

