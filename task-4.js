// You have been tasked with creating a helper function that will be used to determine the output of an array of data.
// Each element of the array has the following structure:

/*
{
  state: <String> // a state to go to
  errorCode: <String> // optional error code
}
*/

// The states have different functions:
// 'processing' = delay 2 seconds, then fetch the next state
// 'error' = handle the error code provided (see below)
// 'success' = return from the helper with the object:
//    { title: 'Order complete', message: null }

// Handling error codes:

// 'NO_STOCK' = return from the helper with an object:
//    { title: 'Error page', message: 'No stock has been found' }
// 'INCORRECT_DETAILS' = return from the helper with an object:
//    { title: 'Error page', message: 'Incorrect details have been entered' }
// null = return from the helper with an object:
//    { title: 'Error page', message: null }
// undefined = return from the helper with an object:
//    { title: 'Error page', message: null }

// Example usage:
// getProcessingPage([{ state: 'processing' }, { state: 'error' }])

// This code should return after 2 seconds with the object: { title: 'Error page', message: null }

// To-do:
// Provide the code and a description of how to run it
// Starting point:

/**
* Gets the processing page
* @param {array} data
*/
function getProcessingPage(data = []) {
  const result = { title: null, message: null };
  if (!Array.isArray(data) || !data.length) {
    result.title = 'Error page'

    return result;
  }

  const { state: initialState = '', errorCode } = data[0];
  switch (initialState) {
    case 'processing':
      // TODO: Should validate the input `data` to be an array with at least 2 elements. Omitted for brevity
      return syncWait(2000, () => {
        const nextStep = data[1];
        return getProcessingPage([nextStep]);
      })

    case 'success':
      result.title = 'Order complete'
      return result;

    case 'error':
      result.title = 'Error page'
      result.message = handleErrorCode(errorCode)
      return result;

    default:
      result.title = 'Error page'
      return result;
  }
}

/**
 * Processes the error code
 * @param {string} errorCode
 */
function handleErrorCode(errorCode) {
  switch (errorCode) {
    case 'INCORRECT_DETAILS':
      return 'Incorrect details have been entered';
    case 'NO_STOCK':
      return 'No stock has been found';
    default:
      return null;
  }
}

function syncWait(ms, callback) {
  const start = new Date().getTime();
  while(new Date().getTime() < start + ms) {
    ; // Do nothing, just block the thread.
  }
  return callback();
}

const { assert } = require('chai');

describe('Task 4', () => {

  it('handles bad input', () => {
    const result = getProcessingPage();

    assert.deepEqual(result, { title: 'Error page', message: null });
  });

  it('handles no data', () => {
    const result = getProcessingPage([]);

    assert.deepEqual(result, { title: 'Error page', message: null });
  });

  it('handles unknown state', () => {
    const result = getProcessingPage([{ state: 'unknown' }]);

    assert.deepEqual(result, { title: 'Error page', message: null });
  });

  it('handles success state', () => {
    const result = getProcessingPage([{ state: 'success' }]);

    assert.deepEqual(result, { title: 'Order complete', message: null });
  });

  it('handles NO_STOCK error code', () => {
    const result = getProcessingPage([{ state: 'error', errorCode: 'NO_STOCK' }]);

    assert.deepEqual(result, { title: 'Error page', message: 'No stock has been found' });
  });

  it('handles INCORRECT_DETAILS error code', () => {
    const result = getProcessingPage([{ state: 'error', errorCode: 'INCORRECT_DETAILS' }]);

    assert.deepEqual(result, { title: 'Error page', message: 'Incorrect details have been entered' });
  });

  it('handles null error code', () => {
    const result = getProcessingPage([{ state: 'error', errorCode: null }]);

    assert.deepEqual(result, { title: 'Error page', message: null });
  });

  it('handles undefined error code', () => {
    const result = getProcessingPage([{ state: 'error' }]);

    assert.deepEqual(result, { title: 'Error page', message: null });
  });

  it('handles processing and fetches next state', () => {
    const startTime = Date.now()
    const result = getProcessingPage([{ state: 'processing' }, { state: 'success' }]);
    const endTime = Date.now()
    const elapsed = endTime - startTime;

    assert.deepEqual(result, { title: 'Order complete', message: null });
    assert.isAtLeast(elapsed, 2000);
  }).timeout(2500); // mocha times out after 2000ms
});
