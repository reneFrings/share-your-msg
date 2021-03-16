// import html2canvas from './html2canvas.esm.js';
// https://stackoverflow.com/questions/22960471/html2canvas-js-not-capturing-image-for-dynamically-generated-content

class SelectImage{
    constructor(arrImgages) {

        import('./html2canvas.esm.js')
        .then(module => {
            this.html2canvas = module.default;
        });

        this.arrImgages = arrImgages;

    /**
     * Elemente selektieren
     */
        this.domDynamicText = document.querySelector('#dynamicText');
        this.domMyText = document.querySelector('#myText');
        this.domPicture = document.querySelector('#pictureText > picture');
        this.domSelectedImg = document.querySelector('#pictureText > #selectedImg');
        this.domExistImg = document.querySelector('#pictureText > #selectedImg > img');
        this.domButton = document.querySelector('#pictureText > button');

    /**
     * Funktionen aufrufen
     */
        // this.value();

        // Alle Bilder die man auswählen kann werden in <picture> eingefügt
        this._imagesToDOM();

        // Fängt ab, wenn ein Bild ausgewählt wird
        this._selectedImg(this.domPicture); 

        // Text aus #myText in #dynamicText einfügen
        this._write(); 

        // Fängt Klick auf Save Button ab
        this._shareButton(this.domButton);

        // Zu Beginn, das erste Bild in <picture> einfügen
        this._addImg(this.arrImgages[0]);

    }


    /**
     * Alle Bilder die man auswählen kann werden in <picture> eingefügt
     */
        _imagesToDOM(){

            console.log('this.test: ', this.test);

            // Bilder Array wird durchlaufen und jedes Bild innerhalb von <picture> als <img> eingefügt
            for(let img of this.arrImgages){

                // <img> erstellen
                let nodeImg = this._createImg(img,img);

                // <img> in #selectedImg einfügen
                this._appendImg(this.domPicture,nodeImg);
                
            }

        }

    /**
     * Bild wird ausgewählt
     */
        _selectedImg(domElement){
            
            // Eventlistener: Wenn auf ein Bild geklickt wird
            domElement.addEventListener('click', (e) => { 
                
                // Das geklickte Bild (Pfad) speichern
                let selectedImg = e.target.currentSrc;

                this._addImg(selectedImg);

            });

        }

    /**
     * Bild in #selectedImg einfügen
     */
    
        _addImg(selectedImg){

            let nodeImg = '';
            let checkImg = this._selectElement('#pictureText > #selectedImg > img');

            // Wenn ein <img> in #selectedImg existiert
            if(checkImg){

                // <img> entfernen
                this.domSelectedImg.removeChild(checkImg);

                // <img> erstellen
                nodeImg = this._createImg(selectedImg,selectedImg);

                // <img> in #selectedImg einfügen
                this._insertBefore(this.domSelectedImg,nodeImg);
                
            }
            else{
                // <img> erstellen
                nodeImg = this._createImg(selectedImg,selectedImg);

                // <img> in #selectedImg einfügen
                this._insertBefore(this.domSelectedImg,nodeImg);
            }

        }

    /**
     * Kindelement als erstes Element einfügen
     */

        _insertBefore(domElement,newElement){           
            domElement.insertBefore(newElement, domElement.firstChild);
        }

    /**
     * Kindelement nach letztem Kindelement einfügen
     */

        _appendImg(domElement,newElement){           
            domElement.appendChild(newElement);
        }

    /**
     * <img src alt> erstellen
     */
        _createImg(img,alt){

            // <img> erstellen und als src den geklickten Bildpfad einfügen
            let nodeImg = document.createElement('img');
            nodeImg.src = img;
            nodeImg.alt = alt;
            return nodeImg;

        }



    /**
     * Text aus #myText in #dynamicText einfügen
     */

        _write(){

            // #selectedImg selektieren

            console.log('domDynamicText:', this.domDynamicText);
            // let getText = '';


            // Eventlistener: Wenn auf ein Bild geklickt wird
            this.domMyText.addEventListener('keyup', (e) => { 
                
                // console.log('keydown e:', e.key);
                // getText = getText + e.key;
                let getText = this.domMyText.value;

                console.log('getText:', getText);

                this.domDynamicText.innerHTML = getText;

            });

        }

    /**
     * Bild speichern
     */
        _shareButton(domElement){
            domElement.addEventListener('click', (e) => { 
                console.log('save');
                this._saveImg();
            });
        }

        _saveImg(){
            this.html2canvas(this.domSelectedImg).then(canvas => {
                let link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg');
                link.download = 'myimg.jpeg';
                link.click();                 
            });
         }


    /**
     * Element selektieren
     */
        _selectElement(domElement){
            let selectElement = document.querySelector(domElement);
            return selectElement;
        }

    /**
     * Test Funktion
     */

        value(){
            console.log('this.test: ', this.test);
            return this.arrImgages;
        }

}

var images = new SelectImage(['/img/bild-1.jpg','/img/bild-2.jpg','/img/bild-3.jpg','/img/bild-4.jpg','/img/bild-5.jpg','/img/bild-6.jpg','/img/bild-7.jpg']);
// console.log('SelectImage:', images);

// var images = new SelectImage();
// images.imagesToDOM();
