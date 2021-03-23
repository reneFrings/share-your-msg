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
        this.domTextAlignLeft = document.querySelector('#textalignLeft');
        this.domTextAlignCenter = document.querySelector('#textalignCenter');
        this.domTextAlignRight = document.querySelector('#textalignRight');

        this.domTextValignTop = document.querySelector('#textvalignTop');
        this.domTextValignCenter = document.querySelector('#textvalignCenter');
        this.domTextValignEnd = document.querySelector('#textvalignEnd');

        this.domTextFormat = document.querySelector('#textFormat');
        this.domTextFormatBold = document.querySelector('#textFormat > input[name="bold"]');
        this.domTextFormatItalic = document.querySelector('#textFormat > input[name="italic"]');
        this.domTextFormatUnderline = document.querySelector('#textFormat > input[name="underline"]');
        this.domTextFormatColor = document.querySelector('#fontColor');
        this.domFontssizePlus = document.querySelector('#fontsizePlus');
        this.domFontssizeMinus = document.querySelector('#fontsizeMinus');


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
         * Klick im Body
         */
            this.domBody.addEventListener('click', (event) => {

                console.log("addEventListener: click");

                switch(event.target.id){
                    /* Wenn die ID des geänderten Elements = ... ist */
                    /* Save Button ruft Screenshot Funktion auf */
                    case 'btnSave':
                        /* werden entsprechene Werte festgelegt */
                        this._saveImg('save');
                        break;
                    case 'fontsizePlus':
                        this._setFontsize(+1);
                        break;
                    case 'fontsizeMinus':
                        this._setFontsize(-1);
                        break;
        
                    default:
                        console.log("Click default " + event.target.id + ".");

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
         * Change im Body
         */
            this.domBody.addEventListener('change', (event) => {

                console.log("addEventListener: change");

                // CSS Property - Relevant für _setStyle() 
                let prop = '';

                // Relevant für _setStyle()
                let type = '';

                // Relevant für _setStyle()
                let elem = '';

                switch(event.target.id){
                    /* Wenn die ID des geänderten Elements = ... ist */
                    case 'textalignLeft':
                    case 'textalignCenter':
                    case 'textalignRight':
                        /* werden entsprechene Werte festgelegt */
                        prop = 'textAlign';
                        type = 'check';
                        elem = 'text';
                        break;
                    case 'bold':
                        prop = 'fontWeight';
                        type = 'check';
                        elem = 'text';
                        break;
                    case 'italic':
                        prop = 'fontStyle';
                        type = 'check';
                        elem = 'text';
                        break;
                    case 'underline':
                        prop = 'textDecoration';
                        type = 'check';
                        elem = 'text';
                        break;
                    case 'fontColor':
                        prop = 'color';
                        type = 'style';
                        elem = 'text';
                        break;
                    case 'fonts':
                        prop = 'fontFamily';
                        type = 'style';
                        elem = 'text';
                        break;
                    case 'textvalignTop':
                    case 'textvalignCenter':
                    case 'textvalignEnd':
                        prop = 'alignItems';
                        type = 'check';
                        elem = 'selectedImg';
                        break;
    
        
                    default:
                        console.log("Change default " + event.target.id + ".");
                }
                
                /* Funktion aufrufen, um CSS Eigenchaft des geänderten Elements zu setzen */
                if(elem == 'text'){
                    this._setStyle(type,event.target,prop,this.domMyText);
                    this._setStyle(type,event.target,prop,this.domDynamicText);
                }

                if(elem == 'selectedImg'){
                    this._setStyle(type,event.target,prop,this.domSelectedImg);
                }


            });

        }
/* Ende _eventListener() */

        /**
         * CSS Eigenschaft setzen 
         */

            _setStyle(type,target,prop,elem){

                // console.log('target.checked:', target.checked);
                // console.log('target.value:', target.value);
                // console.log('prop:', prop);
                // console.log('elem:', elem);

                /* Checkboxen, Radiobutton*/
                if(type == 'check'){
                    if (target.checked) {
                        // console.log('checked:', elem);
                        elem.style[prop] = target.value;
                    } else {
                        // console.log('not checked:', elem);
                        elem.style[prop] = 'normal';
                    }
                }

                /* Sonstige Elemente */
                if(type == 'style'){
                    elem.style[prop] = target.value;
                }

            }


        /**
         * Fontsize 
         */
            _setFontsize(size){

                // Aktuelle Fontsize speichern
                let getFontsize = window.getComputedStyle(this.domDynamicText,null).getPropertyValue('font-size');

                // Fontsize als Int
                getFontsize = parseFloat(getFontsize);
                // console.log('getFontsize:', getFontsize);

                // Fontsize Wert mit Parameter setzen
                this.domDynamicText.style.fontSize = (getFontsize + size) + 'px';
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
