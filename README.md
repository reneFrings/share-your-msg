# What is "Share your Message"?
The user can create his own message for sharing. The user choose an image from a gallery, add his own text, can format this text, 
save the image and can share it about whatsapp, instagram, twitter, facebook etc. It is a small application to give your visitors 
more useful content to generate traffic, new backlinks and shares.

# Demo
[Easter greetings](https://www.ausgabencheck.de/verschicke-ostergruesse-ueber-socialmedia-und-e-mail/)

# Usage
1. Upload your images for the gallery in /img/
2. Upload new fonts in /fonts/
3. Include the new fonts in /css/template.css
4. Create in /js/js.js a new object and add the images for the gallery and the fonts:
```
var images = new SelectImage(
    {
        // Image gallery
        images: [
            '../img/img-1.jpg',
            '../img/img-2.jpg',
            '../img/img-3.jpg'
        ],        
        // Fonttypes for Texteditor
        fonts: [
            'Courgette',
            'Yesteryear',
            'Ranchers'
        ]
    }        
);
```

# Tested for
## Windows 10 Desktop
 * Chrome
 * Firefox
 * MS Edge

## Android mobile
 * Chrome
 * Firefox
 * Samsung Internet

# 3rd party licences
This application use [google fonts](https://fonts.google.com/) and [html2canvas](https://github.com/niklasvh/html2canvas). Please note the licenses.
