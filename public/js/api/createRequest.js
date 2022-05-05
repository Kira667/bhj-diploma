/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = async (options = {}) => {
  let { url, data, method, callback, responseType } = options;

	console.log(data);
	if (data === undefined) {
		data = {};
	}
  
  if (method === 'GET') {
    await requestGet({ url, data, callback, responseType });
  } else {
    await requestNoGet({ url, data, method, callback, responseType });
  } 
};

async function requestGet(options = {}) {
  const { url, data, callback, responseType } = options;
  const fullUrl = createUrlBasedOnParams(url, data);
	const headersJSON = {
		'Content-Type': 'application/json',
    'Accept': 'application/json'
	};
	const headers = {};

	if (responseType === 'json') {
		Object.assign(headers, headersJSON);
	}

  await fetch(fullUrl, {
    method: 'GET',
    headers: headers})
  .then(res => {
    if (res.ok === true) {
      callback(null, res);
    } else {
      callback(true, res);
    }
  });

}

async function requestNoGet(options = {}) {
  const { url, data, callback, method, responseType } = options;
  // const formData = new FormData();
	const headersJSON = {
		'Content-Type': 'application/json',
    'Accept': 'application/json'
	};
	const headers = {};

  // for (const dataKey in data) {
  //   formData.append(dataKey, data[dataKey]);
  // }

	if (responseType === 'json') {
		Object.assign(headers, headersJSON);
	}

  await fetch(url, {
    method: method,
    headers: headers,
    body: JSON.stringify(data)
  })
  .then(res => {
    if (res.ok === true) {
      callback(null, res);
    } else {
      callback(true, res);
    }
  });

} 

function createUrlBasedOnParams(baseUrl, data) {
  let url = baseUrl;

  const entriesData = Object.entries(data);

  if (entriesData.length > 0) {
    url = `${url}?`;

    for (let i = 0; i < entriesData.length; i++) {
      const key = entriesData[i][0];
      const value =  entriesData[i][1]

      if (i === entriesData.length - 1) { // если это самый последний элемент массива
        url = `${url}${key}=${value}`;
      } else {
        url = `${url}${key}=${value}&`;
      }
    }

  }

  return url;
}
