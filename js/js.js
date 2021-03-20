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
        this.domBody = document.querySelector('body');
        this.domDynamicText = document.querySelector('#dynamicText');
        this.domMyText = document.querySelector('#myText');
        this.domPicture = document.querySelector('#pictureText > picture');
        this.domSelectedImg = document.querySelector('#pictureText > #selectedImg');
        this.domExistImg = document.querySelector('#pictureText > #selectedImg > img');
        this.domBtnSave = document.querySelector('#btnSave');
        this.domFonts = document.querySelector('#fonts');
        this.domTextalign = document.querySelector('#textAlign');
        this.domTextFormat = document.querySelector('#textFormat');

        this.domTextFormatBold = document.querySelector('#textFormat > input[name="bold"]');
        this.domTextFormatItalic = document.querySelector('#textFormat > input[name="italic"]');
        this.domTextFormatUnderline = document.querySelector('#textFormat > input[name="underline"]');
        this.domTextFormatColor = document.querySelector('#fontColor');

        /**
         * Wird später evtl. benötigt
         * Wenn man Bilder direkt ohne URL teilen kann
         */
        /*
            this.domBtnFb = document.querySelector('#btnFacebook');
            this.domBtnTwitter = document.querySelector('#btnTwitter');
        */

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
        this._eventListener();

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
     * Klicks im Body abfangen
     */

        _eventListener(){

        /**
         * Klicks im Body
         */
            this.domBody.addEventListener('click', (event) => {

                if (event.target === this.domBtnSave) {
                    console.log('domBtnSave');
                    this._saveImg('save');
                }

            /**
             * Wird später evtl. benötigt
             * Wenn man Bilder direkt ohne URL teilen kann
             */
                /*
                if (event.target === this.domBtnFb) {
                    console.log('domBtnFb');
                    this._saveImg('facebook');
                }

                if (event.target === this.domBtnTwitter) {
                    console.log('domBtnTwitter');
                }
            */
            });        

        /**
         * Font Select
         */
            this.domFonts.addEventListener('change', (event) => {
                console.log('Font:', event.target.value);
                this.domMyText.style.fontFamily = event.target.value;
                this.domDynamicText.style.fontFamily = event.target.value;
            });

        /**
         * Text Align
         */
            this.domTextalign.addEventListener('click', (event) => {
                console.log('textAlign:', event.target.value);
                this.domMyText.style.textAlign = event.target.value;
                this.domDynamicText.style.textAlign = event.target.value;
            });

        /**
         * Text Format Bold
         */
            this.domTextFormatBold.addEventListener('change', (event) => {
                if (event.target.checked) {
                    this.domMyText.style.fontWeight = event.target.value;
                    this.domDynamicText.style.fontWeight = event.target.value;
                  } else {
                    this.domMyText.style.fontWeight = 'normal';
                    this.domDynamicText.style.fontWeight = 'normal';
                }
            });

        /**
         * Text Format Italic
         */
            this.domTextFormatItalic.addEventListener('change', (event) => {
                if (event.target.checked) {
                    this.domMyText.style.fontStyle = event.target.value;
                    this.domDynamicText.style.fontStyle = event.target.value;
                } else {
                    this.domMyText.style.fontStyle  = 'normal';
                    this.domDynamicText.style.fontStyle  = 'normal';
                }
            });

        /**
         * Text Format Underline
         */
            this.domTextFormatUnderline.addEventListener('change', (event) => {
                if (event.target.checked) {
                    this.domMyText.style.textDecoration = event.target.value;
                    this.domDynamicText.style.textDecoration   = event.target.value;
                } else {
                    this.domMyText.style.textDecoration = 'none';
                    this.domDynamicText.style.textDecoration = 'none';
                }
            });

        /**
         * Font Color
         */
            this.domTextFormatColor.addEventListener('change', (event) => {
                // console.log('color:', event.target.value);
                // this.domMyText.style.color = event.target.value;
                this.domDynamicText.style.color = event.target.value;
            });


        }

        _saveImg(how){
            
            /**
             * Notwendig, wenn der Screenshot versetzt ist und links oder rechts eine Lücke ist 
             */ 
                window.scrollTo(0, 0);

                // Scrollbarbreite berechnen
                let scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
                
                // Innere Fensterbreite - Scrollbarbreite
                let calcWidth = window.innerWidth - scrollbarWidth;
            
            this.html2canvas(this.domSelectedImg,
                {
                // Konfiguration
                windowWidth: calcWidth,
                width: 300,
                height: 300
                }
                ).then(canvas => {
                    // document.body.appendChild(canvas);

                /** Bild speichern */
                    if (how === 'save'){
                        let link = document.createElement('a');
                        link.href = canvas.toDataURL('image/jpeg');
                        link.download = 'myimg.jpeg';
                        link.click();              
                    }

                /**
                 * Wird später evtl. benötigt
                 * Wenn man Bilder direkt ohne URL teilen kann
                 */
                    /*
                    if (how === 'facebook'){
                        let link = canvas.toDataURL('image/jpeg');
                        console.log('facebook: ', link );
                    }
                    */


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
