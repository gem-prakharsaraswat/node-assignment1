const http = require("http");
const fs = require("fs");

// Creating a server
const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    
    // Reading JSON
    fs.readFile("text.json", "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
        return;
      }

      // Parse the JSON
      let jsonData = JSON.parse(data);

      // Write the retrieved data into data.txt file
      fs.writeFile(
        "data.txt",
        JSON.stringify(jsonData),
        "utf8",
        (err) => {
          if (err) {
            res.statusCode = 500;
            res.end("Internal Server Error");
            return;
          }

          // Return the JSON in response to the GET call
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(jsonData));
        }
      );
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

// Start the server on port 8080
server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});
