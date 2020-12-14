
# Axios 提交 post 数据的三种请求

## 1. Content-Type:application/json

```
    const data = {test: '123', test2: '456'}
    axios.post(`${url}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
```

## 2. Content-Type:multipart/form-data

```
    const data = new FormData();
    data.append('test', '123');
    data.append('test2', '456');
    axios.post(`${url}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
```

## 3. Content-Type:application/x-www-form-urlencoded

```
     const data = {test: '123', test2: '456'}
     axios.post(`${url}`, qs.stringify(data), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
     })

```