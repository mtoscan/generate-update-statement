
const ID_KEY = '_id';
const DELETE_KEY = '_delete';
const NO_INDEX = '-1';

const Action = {
  ADD: '$add',
  UPDATE: '$update',
  DELETE: '$remove'
};

const ApiResponse = {
  status200: (body) => ({
    statusCode: 200,
    body: JSON.stringify(body, null, 2),
  }),
  status400: (body) => ({
    statusCode: 400,
    body: JSON.stringify(body, null, 2),
  }),
  status500: (body) => ({
    statusCode: 500,
    body: JSON.stringify(body, null, 2),
  }),
};

function hasDeleteKey(object) {
  return object[DELETE_KEY] || false;
}

function depthFirstSearchIndex(object, _id) {
  let index = -1;
  if (Array.isArray(object)) {
    index = object.findIndex((item) => item[ID_KEY] === _id);
    if (index < 0) {
      for (const item of object) {
        index = depthFirstSearchIndex(item, _id);
        if (index >= 0) break;
      }
    }
  } else {
    Object.keys(object).forEach((key) => {
      if (Array.isArray(object[key])) index = depthFirstSearchIndex(object[key], _id);
    });
  }
  return index;
}

function flatten(document, object, path, separator = '.') {
  try {
    return Object.keys(object).reduce((acc, key) => {
      if (key !== ID_KEY) {
        let index = key;
        if (path && !isNaN(Number(key))) {
          // Search for index with DFS algorithm
          index = depthFirstSearchIndex(document, object[key][ID_KEY]).toString();
        }
        if (index === NO_INDEX) {
          // Add Statement
          const newPath = [path].filter(Boolean).join(separator);
          return { ...acc, [Action.ADD]: { [newPath]: [object[key]] } };
        }
        if (hasDeleteKey(object[key])) {
          // delete Statement
          const newPath = [path, index].filter(Boolean).join(separator);
          return { ...acc, [Action.DELETE]: { [newPath]: object[key][DELETE_KEY] } };
        }
        // Update Statement
        const newPath = [path, index].filter(Boolean).join(separator);
        return typeof object[key] === 'object'
          ? { ...acc, ...flatten(document, object[key], newPath, separator) }
          : { ...acc, [Action.UPDATE]: { [newPath]: object[key] } };
      }
      return { ...acc };
    }, {});
  } catch (error) {
    throw new Error('Something wrong happened with flatten method');
  }
}

export async function generateUpdateStatement(event) {
    try {
      const parsedBody = JSON.parse(event.body || '');
      // Validate Inputs
      if (!parsedBody.document) {
        return ApiResponse.status400({ error: 'Document property is required' });
      }
      if (!parsedBody.mutations || !parsedBody.mutations.length) {
        return ApiResponse.status400({ error: 'Mutations property is required and it should be an array' });
      }

      const response = [];
      parsedBody.mutations.forEach((mutation) => {
        response.push(flatten(parsedBody.document, mutation));
      });
      return ApiResponse.status200({ data: response });
    } catch (error) {
      return ApiResponse.status500(error.message);
    }
  }

