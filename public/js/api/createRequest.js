/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = async (options = {}) => {
  const { url, data = {}, method, callback } = options;
  
  if (method === 'GET') {
    await requestGet({ url, data, callback });
  } else {
    await requestNoGet({ url, data, method, callback });
  } 
};

async function requestGet(options = {}) {
  const { url, data, callback } = options;
  const fullUrl = createUrlBasedOnParams(url, data);

  await fetch(fullUrl, {
    method: 'GET',
    headers: {
      'Coentent-Type': 'application/json'
  }})
  .then(res => {
    if (res.ok === true) {
      callback(null, res);
    } else {
      callback(true, res);
    }
  });

}

async function requestNoGet(options = {}) {
  const { url, data, callback, method } = options;
  const formData = new FormData();

  for (const dataKey in data) {
    formData.append(dataKey, data[dataKey]);
  }

  await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(formData)
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

createRequest({
  url: 'https://jsonplaceholder.typicode.com/todos/',
  data: {
    mail: 'ivan@biz.pro',
    password: 'odinodin',
    credit: 34000
  },
  method: 'GET',
  callback: ( err, response ) => {
    // console.log( err, 'createRequest err' ); // null
    // console.log( response, 'createRequest response' ); // ответ
  }
});

