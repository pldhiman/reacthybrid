**Prepshop Seller Panel**



---

*Initial Instructions*
1. npm install

---



---

*Multiple Page Instructions*

## Add new Static Page 

let say want to make static contact.html page.Make sure all file name must be same.then

1. Add static page in [./public] name of [contact.html].
    *Paste this code in contact.html*

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1 ,maximum-scale=1,user-scalable=0">
        <title>PAGE TITLE</title>
        <link rel="manifest" href="/manifest.json">
        <meta name="description" content="">
        <meta name="keywords" content="">
    </head>
    <body>
        <div id="root"></div>
    </body>
    </html>

2. Add Route to [./staticRoutes] 

    module.exports=[
                    'index',
                    'contact' //=> contact page for webpack
                    ]

3. Update package.josn

   "reactSnap": {
    "include": [
      "/index.html",
      "/contact.html"  //=> contact page to react-snap
    ]
  },

4. Add [contact.js] file in [./src] 
    
    import React from 'react';
    import { hydrate, render } from 'react-dom';
    import Contact from './roots/Contact';
    import './style/main.scss';

    const rootElement = document.getElementById('root');

    if (rootElement.hasChildNodes()) {
        hydrate(<Contact />, rootElement);
    } else {
        render(<Contact />, rootElement);
    }

---
