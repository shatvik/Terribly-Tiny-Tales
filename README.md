# Frontend Assignment

**_Deployed Link : https://terribly-tiny-tales-nine.vercel.app/_**
### To perform :
1) On page Load , `Submit` Button is shown.
2) After Clicking on `Submit` Button , we will fetch **API** contents from
_https://www.terriblytinytales.com/test.txt_.
3) Then we will parse the content that we get as a response and would find the 20 most occurring word *(those words which have higher frequency )*.
4) We would now store this 20 words and make a histogram chart of it.
5) Finally, we will add an `Export` Button that will allow users to download the data in the form of .csv file.

### Libraries used :

 - React-apexcharts
 - apexcharts
 - Extras : 
	  - Intl.Segmenter(Object) 
	 - Image(Asset)
 
### React Hooks used : 
 - useState() - _for storing the states of variables_
 - useEffect() - _for setting the data into our `chart` options_
 - useRef() - _for handling the export functionality i used `chart` ref_

 ### Code working :
 
 1) I have made 2 components name : `Header.js` and `Content.js`
	 - `Header.js` simply contains a nav bar.
	 - inside `Content.js ` all the main working contents are there like :
	 - the _fetch API request , parsing of data, chart Component_, etc.
2) For styling code pls refer `App.css` file.
3) All the Components have been stacked together in `App.js`.
4) Now, coming to our `Content.js`, in this :
	-  first we will extract `data` in form of **text()** from **async()** fetch API request and will convert all the text to lowercase() .
	- then we will use _Intl.Segmenter_ Javascript Object to separate all the words based on `(".",",","/","-")`,etc..
	- now we will create one map object name :  **{freq}**which will have all the occurences of words that have come 'n' number of times.
	- now we will sort the words in descending order and store the top 20 words in an `array`.
	- finally we would set the `data` inside histogram `chart.options` attribute
	with the help of React custom hooks like useState(), useEffect().
	- At last , i have created an `export CSV` button so that a user can download the data in form of excel file.

### To run the code in local environment :

1) First clone my github repo : [Shatvik](https://github.com/shatvik/Terribly-Tiny-Tales)

2) Navigate to the folder or open the folder in any code editor

3) Now type commands (one-by-one):
```
npm install
```
```
npm start
```
4) Access the project on : [Localhost](http://localhost:3000/)
