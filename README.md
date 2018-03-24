# ScrapDataFromWebsite
This project has a node server and a angular UI to scrap data from a given website using a keyword and displaying the occurrence or count of the words in the fetched content. 

Command to run the server : node ndex.js
Command to run the UI : npm run serve

Hit on broswer to see the resuls : http://localhost:3000/home

The UI makes a get request to the node server and passes the keyword to be searched to server as request params.
The node server makes use of express for routing and cheerio to scrap the data and search a content having the passed keyword. 
Maximum 50 pages are searched.

The result if found is returned to the UI. The UI parses the string and counts number of times any word occures in the content.
