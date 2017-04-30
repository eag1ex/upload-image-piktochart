#### - Image editor -
An image editor and text editor, you can upload image to the server and add them to the canvas,
with drag and drop. 

```
#!python

$/ npm install 
```

***
###### Start the App

```
#!python

  $/ npm run start
```
      
***
##### Stack/Setup
* Angular 1.6/component, BootStrap 3, drag and drop, and window.storage witn express
* All the files are documented.
* Following John Papa Angular Styleguide
* Integraded in modular fashion
* Using $.AJAX to send form data for multer
* Coded in OOP
***

##### File structure

> **app**

>> css

>> images

>> scripts

>>> directives

>>>> app.canv.html

>>>> app.canv.js

>>>> form.upload.js

>>> data.services

>>>> app.data.js

>>>> app.localStorage.js

>>> **app.layout.js**

>>> app.layout.html

>>> app.main.html

>>> **app.core.js**

>>> **app.js**

>> index.html

```
#!python

     /**
       *  The logic of this app is:
       *  Layout controller  <<< data || localstorage
       *         > directives <<< data from parent
       */
```

***

##### -- Remarks --
* Using $.AJAX for the form data submission
* Using dragging plugin form movind items on canvas
* executing $watches when data changes to save for localstorage.
* Can add and remove items from canvas and menu.
* Tested and works on Linux and Windows
***

###### To be completed ?
* Images are not removed from the server on delete, i wasnt sure since there is no actual database...

***

##### Thank you