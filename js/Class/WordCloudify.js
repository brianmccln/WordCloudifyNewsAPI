class WordCloudify {
    
    constructor(str, app) { // str = incoming string to process into a word cloud; app = the id of the elem that is to receive the word cloud widget output
        
        // pass main and article to JS objects
        this.app = document.getElementById(app); // where to dump widget
        this.app.innerHTML = "" // empty
        
        this.obj = {}; // object for holding all unique blog words as keys
        this.min = 2 // the min freq of word for inclusion in word cloud

        // make word cloud div to contain word cloud box (child div) & slider underneath
        this.cloudDiv = document.createElement('div');
        this.cloudDiv.style.cssText = "background-color:transparent; border:5px solid #888; padding:1rem; min-height:400px; text-align:center; border-radius:1rem; font-size:1.25rem; color:#555"
        this.app.appendChild(this.cloudDiv)

        // box to contain the actual word cloud string
        this.cloudBox = document.createElement('div');
        this.cloudBox.style.cssText = "background-color:#DDD; min-height:50px; width:400px; padding:1rem; border:3px solid #888; border-radius:1.25rem; word-wrap:break-word; line-height:2rem; margin-bottom:1rem"
        this.cloudDiv.appendChild(this.cloudBox);

        // label the slider out / slider thing
        this.sliderLabel = document.createElement('p')
        this.sliderLabel.style = "display:inline-block; font-size:1.25rem; font-weight:bold"
        this.sliderLabel.innerHTML = "Min Word Freq: "
        this.cloudDiv.appendChild(this.sliderLabel)

        // output tag to display the slider value as it changes
        this.sliderOut = document.createElement('output')
        this.sliderOut.style.cssText = "padding:5px 15px; text-align:center; font-weight:bold; font-size:1.5rem; border-radius:10px; border:2px solid #555; margin: 0 10px;"
        this.cloudDiv.appendChild(this.sliderOut)

        // slider to appear under the word cloud. On change, it re-renders the cloud
        this.slider = document.createElement('input')
        this.slider.type = 'range'
        this.slider.min = 2
        this.slider.max = 12
        this.slider.value = this.min
        this.slider.addEventListener('change', this.renderCloud.bind(this))
        this.slider.addEventListener('input', () => this.sliderOut.value = this.slider.value)
        this.cloudDiv.appendChild(this.slider);

        this.sliderOut.value = this.slider.value // start the slider output w the starter slider value

        this.junk = "I a about abreast across addition adjust adjusted adjusting adjusts after again against ago almost along already also although always am among amount amounts an and another answer answered answering answers any anyone anything are arent aren't arrive arrived arriving arrives around article as aside ask asked aspect aspects at ave avenue away b back backs bad be became because been before behind being beside besides better best between big bigger biggest blah both bother but by c cab called came can cannot can't cant cancel certain certainly clear close closer complete completed complelely completes conclude concludes conclusion conclusions could couldn't couldnt corner couple course cover covered covering covers d delete deleted deletes despite detail detailed detailing details did didn't didnt do does  doing done don't dont double down downward during e each either else end ends enough entire entirely especially etc even every everyday example except exception f far feel felt feet few file first five fold folder follow followed following follows foot for forward foreward forewards form formed found four from front g gal gals gave gee get gets getting give given go goes going gone good goods got great guy guys h had hadnt haha half halves has have having he heard hello help her him himself his hola hour hours how however hundred hundreds i if img in include included including includes indeed inform information informational informed informing informs insofar instant instantly instants instance instead into is isn't isnt issue issues it its it's inward j jk just k keep keeping keeps kind knew know known knows l last lasts late later latest least leave left less lesser let like likes liked likely likelihood line list lists listed listing little lol look looked looking looks loose loosely low lower lowest long longer longest lot lots m made main make many matter mattered matters maybe me mean mere merely mine minute minutes miss missed misses missing mistake mistakes moment momentarily moments month months more moreover most much must my myself name n named namely names nay near nearly need needed needs neither never next no nobody none nope nor not nothing now o obtain obtained obtaining obtains occur occurs occurred of off often ok okay omg omit on once one oneself only oops open opened opens or other others our ours ourselves out outward over p part pass passed passing past percent percentage percents perhaps place places placed point points presence present probable probably pull pulled pulling pulls pure purely pursue pursed pursues pursuing q quite r rather remember remembered remembers reply replied replies require required requires requiring rest rested resting rests right round s said same sat saw say saying says second secondly seconds see seem seems seemed seemingly seeing sees service services set sets self several shall she shift shifts short shorter shortest shortly should side sides similar simple simply since sincerely small smaller smallest shm so some something sometimes soon sort special specially src st stay stayed staying stays still stood stop stopping stops stopped style styled styling styles such sudden suddenly sum summation suppose supposed supposedly supposes supposing t take taken takes taking tel tell telling tells than thank thanks that their them themselves then there these they theyre they're think thinking thinks this those though thought thousand thousands three threes through throughout thus to too took toward towards ttyl turn turns turned turning tries try two twos u under until up upon upward upwards us use used user using usually utterly v various very w want wants was way ways we week weeks well went were what when where whether which while within who who's whose why will with without worse worst would wouldnt wouldn't w www x y year years yes yet yo you your yours yourself yourselves z zip"

        // alphabetize junk, so that it is easier to add words and to spot repeats. chain: 

        // array of all blog words, each word an array item
        let arr = str.split(' ');
        
        // for-loop to iterate array of all blog words
        for(let i=0; i < arr.length; i++) {

            let word = arr[i];

            // use RegEx to remove all non-letters from word
            word = word.replace(/[^\'a-z]/gi, '');

            // if word already exists as obj key, push its index; else new key w array as value
            this.obj[word] ? this.obj[word].push(i) : this.obj[word] = [i];

        } // end for loop
        
        this.renderCloud()
        
    } // close constructor(str, app)

    renderCloud() {
        
        let cloudStr = ""; // the cloud that we make to output to cloud box
        
        // this.cloudDiv.innerHTML = ''

        // alert(event.target.value)
        if(event) { // if this func got called by an event (so, not the on page load func)
            this.min = event.target.value // set the var to the minWordFreq
        }
        // length of key array value gives us word frequency
        // if word appears at least X times, it is eligible for word cloud
        // make sure it is not a junk word; lower case it first
        // render the word cloud:
        for(let key in this.obj) {

            if(this.obj[key].length > this.min) { // if array length > min (minimum word frequency) 

                if(!this.junk.includes(key.toLowerCase())) { // if it's not a junk word

                   let fontSize = Math.min(60, this.obj[key].length * 4);
                   let redColor = Math.min(255, (this.obj[key].length * 20));
                   let color = `rgb(${redColor}, 88, 88)`;

                   cloudStr += `<span style='font-size:${fontSize}px; color:${color};'>${key}&nbsp;</span>`;
                }
            }
        } // end for in loop

        this.cloudBox.innerHTML = cloudStr;

    } // renderCloud()

} // close Class WordCloudify



