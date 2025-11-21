# file-metadata-microservice

This is a project for the FreeCodeCamp Back End Development and APIs curriculum.  
It provides an API endpoint that returns metadata about uploaded files.

## Example JSON Output

```json
{ 
  "name": "example.txt", 
  "type": "text/plain", 
  "size": 1024 
} 
```

## API Endpoint

- `POST /api/fileanalyse`  
  Upload a file with the key `upfile` in form-data.  
  Returns JSON with file metadata.

## File Structure

``` 
file-metadata-microservice/
│
├── index.js
├── package.json
├── views/
│   └── index.html
└── public/
    └── styles.css
```

## Author

Brendan Harrington

## License

This project is licensed under the MIT License.
