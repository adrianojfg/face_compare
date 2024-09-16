# Face compare based on Face Recognition

### Web service in python that use face recognition method (https://github.com/ageitgey/face_recognition) to compare two faces (face distance method)

Run web server at localhost with port 5001:

```
docker compose up
```

Example of upload two images and compare it:

```
curl --location 'http://localhost:5001' \
--form 'file1=@"///image1.jpg"' \
--form 'file2=@"///image2.jpg"'
```

Example of return (JSON) - HTTP 200 OK:

```
{
    "face_distance": 0.49
}
```
