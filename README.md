# Dokumentasi Microservices

## Database
**Tabel User**
| Kolom | Index | Constraints |
| ----------- | ----------- | ----------- | 
| Id | Primary Key | - |
| userName | - | REQUIRED, NOT NULL, UNIQUE |
| accountNumber | - | REQUIRED, NOT NULL, UNIQUE |
| emailAddress | - | REQUIRED, NOT NULL, UNIQUE |
| identityNumber | - | REQUIRED, NOT NULL, UNIQUE |


## Endpoints

***NB: Akan ada delay += 1-2 menit saat data ditambah/diubah karena data disimpan menggunakan cache redis***

### ` GET /token` 
Generate JWT token untuk mengakses endpoint
- Authorization: No
- Path Parameter: None
- Request Body: None

```
Contoh Response: 
{
    "status": "ok",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MC4wODMwOTM5MzUwMjE4MDkxNywiaWF0IjoxNjY4OTQwMDcxLCJleHAiOjE2NjkwMjY0NzF9.JFmLx7qZKswsAKgvf24Ysy5FWteLsDKK8yu8e4ZAQn8"
}
```


### ` GET /api/user/all` 
Mengambil Data semua user
- Authorization: Yes
- Path Parameter: None
- Request Body: None
```
Contoh Response: 
{
    "status": "ok",
    "data": [
        {
            "_id": "637a0356c6805d215f707fb2",
            "userName": "suryabumantara",
            "accountNumber": 123,
            "emailAddress": "surya@gmail.com",
            "identityNumber": 123,
            "__v": 0
        },
        {
            "_id": "637a0362c6805d215f707fb4",
            "userName": "XSmas",
            "accountNumber": 1234,
            "emailAddress": "XSmas@gmail.com",
            "identityNumber": 1234,
            "__v": 0
        }
    ]
}
```


### ` GET /api/user/username/:userName` 
Mengambil Data user berdasarkan username
- Authorization: Yes
- Path Parameter: **userName** (username dari user)
- Request Body: None
```
Contoh Response: 
{
    "status": "ok",
    "data": {
        "_id": "637a0356c6805d215f707fb2",
        "userName": "suryabumantara",
        "accountNumber": 123,
        "emailAddress": "surya@gmail.com",
        "identityNumber": 123,
        "__v": 0
    }
}
```


### ` GET /api/user/accountnumber/:accountNumber` 
Mengambil Data user berdasarkan accountnumber
- Authorization: Yes
- Path Parameter: **accountNumber** (accountNumber dari user)
- Request Body: None
```
Contoh Response: 
{
    "status": "ok",
    "data": {
        "_id": "637a0362c6805d215f707fb4",
        "userName": "XSmas",
        "accountNumber": 1234,
        "emailAddress": "XSmas@gmail.com",
        "identityNumber": 1234,
        "__v": 0
    }
}
```


### ` POST /api/user` 
Menambah data user
- Authorization: Yes
- Path Parameter: None
- Request Body: 
  - userName: String
  - accountNumber: Number
  - emailAddress: String
  - identityNumber: Number
```
Contoh Request Body:
{
    "userName":"suryabumantaraupdated",
    "accountNumber":12,
    "emailAddress":"suryaupdate@gmail.com",
    "identityNumber":12
}

Contoh Response: 
{
    "status": "ok",
    "message": "Berhasil Add User"
}
```


### ` PUT /api/user/:id` 
Update Data user berdasarkan id
- Authorization: Yes
- Path Parameter: **id** (id dari user)
- Request Body: 
  - userName: String
  - accountNumber: Number
  - emailAddress: String
  - identityNumber: Number
```
Contoh Request Body:
{
    "userName":"suryabumantaraupdated",
    "accountNumber":12,
    "emailAddress":"suryaupdate@gmail.com",
    "identityNumber":12
}

Contoh Response: 
{
    "status": "ok",
    "message": "Berhasil update user"
}
```

### ` PUT /api/user/username/:userName` 
Update Data user berdasarkan id
- Authorization: Yes
- Path Parameter: **userName** (username dari user)
- Request Body: 
  - userName: String
  - accountNumber: Number
  - emailAddress: String
  - identityNumber: Number
```
Contoh Request Body:
{
    "userName":"suryabumantaraupdated",
    "accountNumber":12,
    "emailAddress":"suryaupdate@gmail.com",
    "identityNumber":12
}

Contoh Response: 
{
    "status": "ok",
    "message": "Berhasil update user"
}
```


### ` PUT /api/user/accountnumber/:accountNumber` 
Update Data user berdasarkan id
- Authorization: Yes
- Path Parameter: **accountNumber** (accountnumber dari user)
- Request Body: 
  - userName: String
  - accountNumber: Number
  - emailAddress: String
  - identityNumber: Number
```
Contoh Request Body:
{
    "userName":"suryabumantaraupdated",
    "accountNumber":12,
    "emailAddress":"suryaupdate@gmail.com",
    "identityNumber":12
}

Contoh Response: 
{
    "status": "ok",
    "message": "Berhasil update user"
}
```


### ` DELETE /api/user/:id` 
Delete Data user berdasarkan id
- Authorization: Yes
- Path Parameter: **id** (id dari user)
- Request Body: None
```
Contoh Response: 
{
    "status": "ok",
    "message": "Berhasil Delete User"
}
```


### ` DELETE /api/user/username/:userName` 
Delete Data user berdasarkan username
- Authorization: Yes
- Path Parameter: **userName** (userName dari user)
- Request Body: None
```
Contoh Response: 
{
    "status": "ok",
    "message": "Berhasil Delete User"
}
```


### ` DELETE /api/user/accountnumber/:accountNumber` 
Delete Data user berdasarkan accountnumber
- Authorization: Yes
- Path Parameter: **accountNumber** (accountNumber dari user)
- Request Body: None
```
Contoh Response: 
{
    "status": "ok",
    "message": "Berhasil Delete User"
}
```
