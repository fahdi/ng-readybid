# Readybid Solution

## Requirements 
Create an Angular web page containing horizontally and vertically centered container of 400px in width and 600px in height containing: 

- Header area that’s 100px in height with red background and some text
- Center area containing:
	- Input for text with validation (required, max length 50 chars)
	- Input for number with validation (required, min 0, max 10000, 2 decimal places max)
	- Scrollable container containing list of http calls (look below). It is important that list is ONLY content that will scroll (in Chrome, Firefox, Internet Explorer 10, 11, Edge)

- Footer area that’s 100px in height with blue background containing:
	- vertically centered text on the left side (15px away from container left edge)
	- vertically centered button (25px away from container right edge)
	
When button is clicked HTTP call should be initiated and intercepted with:
	- If number is 404 HTTP call should return error with status 404 and an error message in dialog-like window should be shown
	- If number is any other HTTP call should resolve and an success message in dialog-like window should be shown

- Interceptor should write to page (in list) timestamp of interception, text and number from inputs. This data MUST NOT be transferred back to controller through HTTP response, you HAVE to use some other channel of communication (direct call, service, messaging, some pattern – your choice)

## Solution

Done in simplified AngularJS with no build process. It's ready to be served as is. All code is simplified to make it performant.
  
## View Live Demo
  
https://fahdi.github.io/ng-readybid/