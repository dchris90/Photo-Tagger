
var photos = [];
var autocompleteTagList = [];
var value = "";

// will be used by onClick @ updateImages()
var chosenTagsFromPopup = [];


class autoChosen extends React.Component {
    constructor(props) {
        super(props); 
        //this.state = { color: "#86b2b5" };
        this.optionOnclick = this.optionOnclick.bind(this);
    }

    optionOnclick(e) {
        // call update function

        // passed in: tag string, update function
        var tag = this.props.text;
        var removeFromChosenAddToOption = this.props.updateFuncTwo;

        // send tag to update function
        removeFromChosenAddToOption(tag);
    }

    render() {
        return (
            React.createElement(
                'p', // type           
                { className: 'autoChosen', onClick: this.optionOnclick }, // flex container: reg tags, add tags

                // contents

                // a string from the autocomplete array
                this.props.text
            )
        );  // return
    }
}


class autoOptions extends React.Component {
    constructor(props) {
        super(props); 
        //this.state = { color: "#86b2b5" };
        this.optionOnclick = this.optionOnclick.bind(this);
    }

    optionOnclick(e) {
        // call update function

        // passed in: tag string, update function
        var fromOptionToChosen = this.props.text;
        var updateStateChosen = this.props.updateFunc;

        // send tag to update function
        updateStateChosen(fromOptionToChosen);
    }

    render() {
        return (
            React.createElement(
                'p', // type           
                { className: 'autoOptions', onClick: this.optionOnclick }, // flex container: reg tags, add tags

                // contents

                // a string from the autocomplete array
                this.props.text
            )
        );  // return
    }
}

class SearchPopUp extends React.Component {
    constructor(props) {
        super(props);

        // array, e.g:
        // this.state.value[0]
        this.state = {
            value: value,
            chosen: []
        };

        this.updateChosen = this.updateChosen.bind(this);
        this.updateOption = this.updateOption.bind(this);
    }

    // clicking on a tag from chosen
    updateOption(argz) {
        // remove from chosenArr
        // append to optionsArr

        // the tag in question
        var thisTagFromCho = argz;

        // get current chosenArr
        var chosenArr = this.state.chosen;
        // remove tag from chosenArr
        var newChosenArray = chosenArr.filter(e => e !== thisTagFromCho);

        // get current optionsArr
        var optionsArr = this.state.value;
        // append tag to last-most position of optionsArr
        var newOptionsArray = [...optionsArr, thisTagFromCho];

        // set states for both optionArr and chosenArr

        // same as version 1, except
        // that this tag will not be "returned"
        // to options
        // rather, keep the options array unchanged
        // as the user can choose to delete the tag 
        // from "chosen" at_any_time
        this.setState(
            {
                //value: newOptionsArray,
                chosen: newChosenArray
            }
        );

        // update the global array chosenTagsFromPopup
        // since tag was deleted chosen
        chosenTagsFromPopup = newChosenArray.slice(0);

        // output test:
        var myNode = document.getElementById("searchstatus");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        var chosenSTR = chosenTagsFromPopup.toString();
        var content = document.createTextNode(chosenSTR);
        var div = document.getElementById("searchstatus");
        //div.appendChild(content);


        // and render() should run again
    }

    // clicking on a tag from Options
    // will add the tag to Chosen
    updateChosen(argx) {
        // remove from optionsArr
        // append to chosenArr

        // the tag in question
        var thisTagFromOps = argx;

        // get current optionArray
        var optionsArr = this.state.value;

        // remove tag from optionArray
        var newOptionArray = optionsArr.filter(e => e !== thisTagFromOps);

        // get current chosenArray
        var chosenArr = this.state.chosen;
        // append tag to last-most position of chosenArray
        var newChosenArray = [...chosenArr, thisTagFromOps];


        // version 2
        // completely clear out options array
        // add tag to chosen array
        // clear out search box
        this.setState(
            {
                value: [],
                chosen: newChosenArray
            }
        );

        // clear textbox
        document.getElementById("req-text").value = "";

        // update the global array chosenTagsFromPopup
        // since a new tag was added to it
        chosenTagsFromPopup = newChosenArray.slice(0);

        // output test:
        var myNode = document.getElementById("searchstatus");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        var chosenSTR = chosenTagsFromPopup.toString();
        var content = document.createTextNode(chosenSTR);
        var div = document.getElementById("searchstatus");
        //div.appendChild(content);


        // and render() should run again
    }



    render() {
        // get the latest stuff 
        var chosenArr = this.state.chosen;
        var passedInTagsArr = this.state.value; // array

        // to push stuff in to send to other components
        var SendToOptionsArray = [];


        // TOP DIV: chosen
        if (passedInTagsArr.length != 0
            || (chosenArr.length != 0 && passedInTagsArr.length == 0)) {
            SendToOptionsArray.push(
                React.createElement(
                    'div',
                    { className: 'chosenDIV' },
                    "Chosen:"
                )
            )
        }

        // TOP DIV: chosen
        for (let i = 0; i < chosenArr.length; i++) {
            SendToOptionsArray.push(
                React.createElement(
                    'div',
                    { className: 'popupParaTwo' },

                    // contents
                    React.createElement(
                        autoChosen, // type

                        // properties
                        {
                            text: chosenArr[i],       // the tag string
                            key: chosenArr[i] + i,    // unique key
                            updateFuncTwo: this.updateOption
                        }
                    )
                ) // end create element
            ); // end push
        } // end for







        // BOTTOM DIV: options
        if (passedInTagsArr.length != 0
            || (chosenArr.length != 0 && passedInTagsArr.length == 0)) {
            SendToOptionsArray.push(
                React.createElement(
                    'div',
                    { className: 'optionsDIV' },
                    "Options:"
                )
            )
        }


        // BOTTOM DIV: options
        if ((passedInTagsArr.length == 0)
            && (chosenArr.length != 0)) {
            SendToOptionsArray.push(
                React.createElement(
                    'div',
                    { className: 'EmptyOptions' },
                    "You have tag(s) chosen. Type to add more, click to delete, or search."
                )
            )
        }



        // BOTTOM DIV: options
        for (let i = 0; i < passedInTagsArr.length; i++) {
            SendToOptionsArray.push(
                React.createElement(
                    'div',
                    { className: 'popupParaTwo' },

                    // contents
                    React.createElement(
                        autoOptions, // type

                        // properties
                        {
                            text: passedInTagsArr[i],       // the tag string
                            key: passedInTagsArr[i] + i,    // unique key
                            updateFunc: this.updateChosen
                        }
                    )
                ) // end create element
            ); // end push
        } // end for



        return (
            // create the div
            // pass these up to options
            React.createElement(
                'div', // type           
                { className: 'popupPara' }, // properties

                // contents

                // testing: 
                //this.props.text,
                //this.state.value[0],
                //this.state.value[1]

                // put array here as contents
                SendToOptionsArray

            ) // end create element
        ); // end return
    } // end render
} // end class



const reactContainerPopUp = document.getElementById("popupReactContainer");
var reactAppPopUp = ReactDOM.render(React.createElement(SearchPopUp), reactContainerPopUp);

// calls everytime a new char is inputted into textbox
function autoc() {
    var input = document.getElementById("req-text").value;


    var myNode = document.getElementById("searchstatus");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    reactAppPopUp.setState({ value: "" });



    // if 2 chars, send ajax req to get possible completions 
    // or, do this checking in react, using the state of the lists.
    // don't do it here. pass these info up to a react component
    // and do the checking there and set state accordingly 
    if (input.length == 2) { // later: input.length >= 2
        //var content = document.createTextNode(input);
        //var div = document.getElementById("searchstatus");
        //div.appendChild(content);



        var oReq = new XMLHttpRequest();
        var url = "/query?autocomplete=" + input;
        oReq.open("GET", url);
        oReq.addEventListener("load", fnCallback);
        oReq.send();

        // browser sends ajax request using a 2-char input
        // sever responds: displays a response of this format: {"tags":{"bunker":1,"building":2}}
        // set state accordingly
        function fnCallback(err) {
            /*
                var fruits = '{"al":{"tags":{"alligator":1,"alley":1}}}';
                                
                var jsonObj = JSON.parse(fruits);
                var objValues = jsonObj['al'];  // {"tags":{"alligator":1,"alley":1}}
                var strResponse = JSON.stringify(objValues);                         
                                        
                document.getElementById("demo").innerHTML = strResponse;
            */

            var response = oReq.responseText;           
            // {"tags":{"bunker":1,"building":2}}

            var jsonObj = JSON.parse(response);     

            // want the values of the key: tag
            // {"tags":{"bunker":1,"building":2}}
            // key: "tags"
            // values: {"bunker":1,"building":2}
            // var valuesObj = object["key"]
            var tagsObj = jsonObj['tags']; // {"bunker":1,"building":2}
            //var tagsObjValues = tagsObj['bunker'];

            // get keys from {"bunker":1,"building":2}
            // an array
            autocompleteTagList = Object.keys(tagsObj); // ["bunker","building"]
            // output test 
            //globalTest();


            // for values array: Object.values(obj)


            // now what do we do with the tags array?: ["bunker","building"]

            // in this callback, where chars >= 2,
            // set state using the tags array
            // that was returned by ajax
            // reactAppPopUp.setState({ value: "anna" });
            var autocompleteTagListSTR = autocompleteTagList.toString();
            reactAppPopUp.setState({ value: autocompleteTagList });

        } // end callback



    } // end if

    // otherwise, if input.length is not 2
    // set state to no popup

}






function globalTest() { // testing purposes
    // global test 
    var autocompleteTagListSTR = autocompleteTagList.toString();
    var content = document.createTextNode("annak? " + autocompleteTagListSTR);
    var div = document.getElementById("searchstatus");
    //div.appendChild(content);
}




class AddTag extends React.Component {
    constructor(props) {
        super(props);

        this.tagOnclick = this.tagOnclick.bind(this);
        this.inputOnclick = this.inputOnclick.bind(this);

        this.state = {
            backgroundColor: "#a5eccfb9",
            borderRadius: "2px",
            border: "2px solid rgb(180, 200, 216)"
        };
    }

    inputOnclick(e) {
        // the only purpose of this function: prevent tagBox from disappearing
        // inputBox still retains value when closing the tags
        e.stopPropagation();
    }

    tagOnclick(e) {
        e.stopPropagation(); // upon click, change color, but don't disappear

        // passed in: key, idNum, img's current tag list length
        var thisKey = this.props.key;
        var idNum = this.props.idNum;
        var tagListLenght = this.props.tagListLenght;
        var updateStateAdd = this.props.updateStateAdd;

        // get input str from input box (will be decoded on server side)
        // use: ".value"
        var inputBoxInput = document.getElementById("inputBoxInput" + idNum).value;

        // make sure its lowercase, if not, make it so
        var inputBoxInput_lower = inputBoxInput.toLowerCase();


        // (1) call the update function tileControl
        // to update display
        // dont forget to bind updateStateAdd() in TileControl's constructor
        updateStateAdd(inputBoxInput);

        // ajax: send add request
        var generateAddkey = 1101100011;
        var spacer = "**";

        var oReq = new XMLHttpRequest();
        var url = "add?key=" + generateAddkey + idNum + spacer + inputBoxInput_lower + spacer + tagListLenght + spacer + thisKey;
        oReq.open("GET", url);
        oReq.addEventListener("load", fnCallback);
        oReq.send();

        function fnCallback(err) {
            // no need to do anything...
            // and: requests are asynchronous

            console.log("ajax request sent: add tag")
        }




        // call the update function tileControl
        // to update display
        //this.props.updateStateDelete(thisTag);
    }

    render() {




        return ( 
            React.createElement(
                'p', // the wrapper           
                { className: 'tagText' }, // flex container

                // (1) input box 
                // React.createElement('input', { id: 'addTagBox'+photoId }),
                React.createElement( // input box
                    'input',

                    // onClick: this.inputOnclick -> prevent tag from disappearing
                    // id needs unique value, otherwise input could be from any other
                    // inputbox from other images
                    {
                        id: "inputBoxInput" + this.props.idNum,
                        onClick: this.inputOnclick,
                        style: {
                            backgroundColor: this.state.backgroundColor,
                            borderRadius: this.state.borderRadius,
                            border: this.state.border
                        }
                    },
                ),

                // (2) onclick
                React.createElement(
                    'p', // type 

                    // properties
                    { onClick: this.tagOnclick }, // properties

                    // content
                    "+"
                )
            )
        );  // return
    } // render
}











var numTagsDeletedSoFar = 1;

// A react component for a tag
// display tag with "x" symbol
class Tag extends React.Component {
    // set initial this.state and bindings
    constructor(props) {
        super(props); 
        //this.state = { color: "#86b2b5" };
        this.tagOnclick = this.tagOnclick.bind(this);
    }

    // Tag onClick calls TileControl update
    tagOnclick(e) {
        e.stopPropagation(); // upon click, change color, but don't disappear

        var thisTag = this.props.text;
        var thisKey = this.props.key;

        // (1) call the update function tileControl
        // to update display
        this.props.updateStateDelete(thisTag);

        var generateDeletekey = 1101100010;
        var spacer = "**";
        var imgCurrentTagListLength = this.props.tagListLenght;
        var idNum = this.props.idNum;

        // (2) do the ajax
        var oReq = new XMLHttpRequest();
        var url = "delete?key=" + generateDeletekey + idNum + spacer + thisTag + spacer + imgCurrentTagListLength + spacer + thisKey;
        oReq.open("GET", url);
        oReq.addEventListener("load", fnCallback);
        oReq.send();

        function fnCallback(err) {
            // no need to do anything...
            // and: requests are asynchronous

            console.log("ajax request sent: delete tag")
        }
    }

    render() {
        // stuff being passed in:
        // string
        // key
        // a function inside the parent

        return ( 
            React.createElement(
                'p', // type           
                { className: 'tagText' }, // flex container: reg tags, add tags

                // contents

                // 1 -- the single tag string from array of tags
                this.props.text,

                // 2 -- the "x" button which calls onClick
                React.createElement(
                    'p', // type 

                    // properties
                    { className: 'tagTextOnClick', onClick: this.tagOnclick }, // properties

                    // content
                    "x"
                )
            )
        );  // return
    }
};

// A react component for controls on an image tile
// runs everytime you click on image
class TileControl extends React.Component {
    constructor(props) {
        // constructor runs only runs 

        super(props);

        // don't forget to bind fn's outside of render()
        this.updateStateDelete = this.updateStateDelete.bind(this);
        this.updateStateAdd = this.updateStateAdd.bind(this);

        // this.setState takes object as input, merges with state obj (does not replace it)
        // this.setState triggers a render()

        // set this react component's initial state
        // where this.state.value contains the original
        // string of tags for that particular image
        // this.state.value will be updated via this.setState
        // whenever updateStateDelete() is called, assuming that the user
        // chooses the click the "x"
        // whenever user clicks tag, updateStateDelete() is called
        // whenever user clicks the image, TileControl is called (updateStateDelete() bypassed)
        this.state = { value: this.props.tags };
        // update: this.props.tags is an array, not a string
    }



    updateStateAdd(argz) {
        // add the tag to the list of tags 
        // update the state

        // the tag in question
        var thisTagz = argz;

        // for this image, get current state's string of tags
        //var imageTagListStr1 = this.state.value; // string
        var imageTagListArr = this.state.value; // array

        // convert it to array
        //var imageTagListArr = imageTagListStr1.split(", ");

        // newArray = [ ...initialArray, newElement ];
        var newArray = [...imageTagListArr, thisTagz];

        // convert arr back to string
        //var imageTagListStr2 = imageTagListArr.toString();
        //var imageTagListStr2 = newArray.toString();

        // make sure string is in proper format: spacing between comma and next letter
        //var find = ","; // need to replace these by ", "
        //var re = new RegExp(find, 'g'); // find all occurences of ","
        //var imageTagListStr2 = imageTagListStr2.replace(re, ", ");

        // before:
        var div = document.getElementById("searchstatus");
        var content = document.createTextNode("BEFORE:*" + imageTagListArr.toString() + "*  ");
        //div.appendChild(content);


        // after
        var div = document.getElementById("searchstatus");
        var content = document.createTextNode("AFTER:*" + newArray.toString() + "*  ");
        //div.appendChild(content);

        // update this img's state with the updated list of tags (where value is a str)
        // then render() will run, updating the display of tags on the screen
        this.setState({ value: newArray });

        // done
        // ajax request moved to class AddTag
    }



    // ran everytime "x" in tag is clicked 
    updateStateDelete(arg) {
        // remove the tag from the list of tags
        // update the state

        // the tag in question
        var thisTag = arg;

        // for this image, get current state's string of tags
        //var imageTagListStr1 = this.state.value; //string
        var imageTagListArr = this.state.value; //array

        // convert it to array
        //var imageTagListArr = imageTagListStr1.split(", ");

        // remove the tag from the array
        //imageTagListArr = imageTagListArr.filter(e => e !== thisTag);
        var newArr = imageTagListArr.filter(e => e !== thisTag);

        // convert arr back to string
        //var imageTagListStr2 = imageTagListArr.toString();

        // make sure string is in proper format: spacing between comma and next letter
        //var find = ","; // need to replace these by ", "
        //var re = new RegExp(find, 'g'); // find all occurences of ","
        //var imageTagListStr2 = imageTagListStr2.replace(re, ", ");



        // before:
        var div = document.getElementById("searchstatus");
        var content = document.createTextNode("BEFORE:*" + imageTagListArr.toString() + "*  ");
        //div.appendChild(content);


        // after
        var div = document.getElementById("searchstatus");
        var content = document.createTextNode("AFTER:*" + newArr.toString() + "*  ");
        //div.appendChild(content);

        // remove middle element: "historic site"
        // BEFORE:*arch, landmark, architecture, historic site, triumphal arch, building* 
        // AFTER:*arch, landmark, architecture, triumphal arch, building*

        // remove first element: "sky"
        // BEFORE:*sky, landmark, water, tower, building, tourist attraction* 
        // AFTER:*landmark, water, tower, building, tourist attraction*

        // remove last element: "ancient history"
        // BEFORE:*dome, dome, building, historic site, khanqah, ancient history* 
        // AFTER:*dome, dome, building, historic site, khanqah*

        // update the state with the updated list of tags (where value is a str)
        // then render() will run, updating the display of tags on the screen
        this.setState({ value: newArr });
    }

    // ran everytime image is clicked
    // or if tag is clicked (which calls updateStateDelete(), and then render() is run)
    render() {
        // remember input vars in closure
        var _selected = this.props.selected;
        var _src = this.props.src;

        // parse image src for photo name
        var photoName = _src.split("/").pop();
        photoName = photoName.split('%20').join(' ');



        // updateStateDelete() runs, updating the array. after that,
        // render() runs, updating the state with the new
        // string as set by updateStateDelete()


        // get current tags: an array
        //var _tags = this.state.value;
        var listTagsArr = this.state.value;



        // using the current state's _tags string, create the tags array
        //var listTagsArr = _tags.split(", "); 

        var listTagsReact = []; // init empty on every new iter

        // AFTER:*woody plant*
        // after clicking on this "x", we don't want any new tags to display,
        // other than "add"

        // using this image's current list of tags,
        // create a tag for each tag in the list
        // if no tags remain, listTagsArr[0] == "", don't create tag (otherwise it'll be an empty box)
        if (listTagsArr[0] != "") {     // as long as not empty
            for (let i = 0; i < listTagsArr.length; i++) { // create tags for every string in arr
                listTagsReact.push(
                    React.createElement('div',
                        { className: 'flexSpacing' },

                        React.createElement(Tag, // type
                            { // properties
                                text: listTagsArr[i],       // the tag string
                                key: listTagsArr[i] + i,    // unique key

                                // pass updateFunction to child
                                // whenever tag is clicked, updateStateDelete()
                                // is called 
                                updateStateDelete: this.updateStateDelete,

                                // image's current # of tags, depending on dels / adds
                                tagListLenght: listTagsArr.length,

                                // id num 
                                idNum: this.props.idNum
                            })
                    )
                ); // end push
            } // end for
        }






        // at this point listTagsReact[] is filled.
        //
        //
        // if list.size < 6, always have one additional box floating
        //      create one additional box,
        //      appended to the end of the list,
        //      where a tag can be added: [           + ]
        //
        // e.g.: current list.size = 4, after: 5
        // e.g.: current list.size = 1, after: 2
        if (listTagsArr.length < 7) { // up to 7 tags max
            listTagsReact.push( // push one time only
                React.createElement('div',
                    { className: 'flexSpacing' },

                    React.createElement(AddTag, // type
                        { // properties
                            text: "empty",
                            key: listTagsArr[i] + i,    // unique key

                            // pass updateStateAdd() to child
                            // whenever "+" is clicked, updateStateAdd()
                            // is called 
                            updateStateAdd: this.updateStateAdd,

                            // image's current # of tags, depending on dels / adds
                            tagListLenght: listTagsArr.length,

                            // id num 
                            idNum: this.props.idNum
                        }
                        // contents
                    )
                )
            ); // end push
        }





        return (React.createElement(
            // type 
            'div',

            // properties
            { className: _selected ? 'selectedControls' : 'normalControls' },

            // version 3
            //tagElements

            listTagsReact
        )// createElement div
        );// return
    } // render
};



// A react component for an image tile
// no need to modify this unless passing up stuff
class ImageTile extends React.Component {

    render() {
        // onClick function needs to remember these as a closure
        var _onClick = this.props.onClick;
        var _index = this.props.index;
        var _photo = this.props.photo; // this.props.photo is the photo array
        var _selected = _photo.selected; // this one is just for readability

        // get tags:
        var tagsStr = _photo.tags;
        // convert to array:
        var tagsArr = tagsStr.split(", ");


        return (
            React.createElement('div',
                {
                    style: { margin: this.props.margin, width: _photo.width },
                    className: 'tile',
                    onClick: function onClick(e) {
                        console.log("tile onclick");
                        // call Gallery's onclick
                        return _onClick(e,
                            { index: _index, photo: _photo })
                    }
                }, // end of props of div


                //                  "key":value
                // idNum            "idNum":1
                // fileName         "fileName":"Uluru%20sunset1141.jpg"
                // width            "width":500
                // height           "height":334
                // location         "location":""
                // tags             "tags":"sky, tree, ecosystem, savanna, dawn, woody plant",
                // src              "src":"http://lotus.idav.ucdavis.edu/public/ecs162/UNESCO/Uluru%20sunset1141.jpg"


                // contents of div - the Controls and an Image
                React.createElement(TileControl, // type: TileControl
                    {       // properties
                        selected: _selected,
                        src: _photo.src,      // keyNameHere: _photo.src

                        // testing
                        width: _photo.width,
                        idNum: _photo.idNum,
                        tags: tagsArr       // an array
                        //tags: _photo.tags // a string
                    }),
                React.createElement('img',
                    {
                        className: _selected ? 'selected' : 'normal',
                        src: _photo.src,
                        width: _photo.width,
                        height: _photo.height
                    })
            )//createElement div
        ); // return
    } // render
} // class

// The react component for the whole image gallery
// Most of the code for this is in the included library
class App extends React.Component {

    // set initial this.state
    // and maybe some bindings
    constructor(props) {
        super(props); // need this whenever defining constructor
        this.state = { photos: photos }; // name: value array
        this.selectTile = this.selectTile.bind(this);
    }

    selectTile(event, obj) {
        console.log("in onclick!", obj);
        let photos = this.state.photos;
        photos[obj.index].selected = !photos[obj.index].selected;
        this.setState({ photos: photos });
    }

    render() {
        return (
            React.createElement(Gallery, {
                columns: 2,
                photos: this.state.photos,
                onClick: this.selectTile,
                ImageComponent: ImageTile
            })
        );
    }
}


/* Finally, we actually run some code */

const reactContainer = document.getElementById("react");
var reactApp = ReactDOM.render(React.createElement(App), reactContainer);

/* Workaround for bug in gallery where it isn't properly arranged at init */
window.dispatchEvent(new Event('resize'));

function updateImages() {
    var checkEmpty = document.getElementById("req-text").value;

    

    // clear any starter messages
    var myNode = document.getElementById("asksearch");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }


    // spaces matter 
    //multiple words: "royal palace" -> [ 'royal', 'palace' ] -> 1 result 
    //one word:       "royalpalace" -> royalpalace ->  0 result 




    // input: "tag1, tag2, ..., tagn"
    var reqIndices = document.getElementById("req-text").value; // string
    // remove all whitespace between any letter and a comma
    reqIndices = reqIndices.replace(/\s*,\s*/g, ",");


    // get values from the global chosen array
    // and convert to string
    // string is also comma-separated, no need to do any further replacing
    var chosenArrayStr = chosenTagsFromPopup.toString(); // string



    // make it a bad query


    // 1 inputbox non empty, chosen non empty => make it a bad query
    if ((reqIndices.length != 0)
        && (chosenArrayStr.length != 0)) {
        reqIndices = "*****";
    }

    // 2 inputbox empty, chosen non empty => reqIndices = chosen
    if ((reqIndices.length == 0)
        && (chosenArrayStr.length != 0)) {
        reqIndices = chosenArrayStr;
    }

    // 3 inputbox non empty, chosen empty => 
    // continue as normal, no need to do anything,
    // since everything below uses reqIndices
    /*
    if ((reqIndices.length != 0)
        && (chosenArrayStr.length == 0)) {
        reqIndices = reqIndices;
    }
    */

    // 4 inputbox empty, chosen empty => do nothing 
    // and want to use: combine into single var, reqIndices
    if (!reqIndices && !chosenArrayStr) return; // No query? Do nothing!















    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/query?keyList=" + reqIndices.replace(/ |,/g, "+"));
    // We want more input sanitization than this!


    // clear inputbox
    document.getElementById("req-text").value = "";
    




    // clear any previous error messages before displaying new data
    var myNode = document.getElementById("searchstatus");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // clear out gallery, if any, from previous search,
    // before displaying new data
    var emptyArr = [];
    reactApp.setState({ photos: emptyArr });

    xhr.addEventListener("load", (evt) => {
        // if (query is good)
        //      -> there are photos that match these tag(s)
        //      -> there are no photos that match these tag(s)
        // else (query is bad)

        if (xhr.status == 200) { // good query: still, might/might not have photos
            

            var response = xhr.responseText; // str
            var responseObj = JSON.parse(response); // obj arr



            // if responseObj contains zero data due to bad query
            // then display error message
            var arrCount = 0;
            for (i = 0; i < responseObj.length; i++) {
                arrCount++;
            }
            //console.log(arrCount);
            if (arrCount == 0) {
                var div = document.getElementById("searchstatus");
                var content = document.createTextNode('There were no photos satisfying this query.');
                div.appendChild(content);
            } else {
                var div = document.getElementById("searchstatus");
                var divResults = document.createElement("p");
                if (arrCount == 1) {
                    var content = document.createTextNode(arrCount + " result. Click on an image to edit its tag(s). 7 tags max per image. New tags can't be added if limit is reached.");
                    divResults.appendChild(content);
                    div.appendChild(divResults);
                } else {
                    var content = document.createTextNode(arrCount + " results. Click on an image to edit its tag(s). 7 tags max per image. New tags can't be added if limit is reached.");
                    divResults.appendChild(content);
                    div.appendChild(divResults);
                }
            }


            // change key name from "fileName" to "src"
            for (i = 0; i < responseObj.length; i++) {
                responseObj[i].src = responseObj[i].fileName;
            }


            var div = document.getElementById("searchstatus");
            var contentx = document.createTextNode(JSON.stringify(responseObj));
            //div.appendChild(contentx);

            reactApp.setState({ photos: responseObj });

            // clear out arr and set state
            // so that (1) popup won't show, (2) chosenArr is empty and ready for next search
            chosenTagsFromPopup = [];
            reactAppPopUp.setState({ chosen: [] });


            window.dispatchEvent(new Event('resize')); /* The world is held together with duct tape */
        }
        else { // bad query
            var div = document.getElementById("searchstatus");

            var div2 = document.createElement("div");
            div2.setAttribute("id", "badQueryText")
            var content = document.createTextNode("Bad Query.");
            div2.appendChild(content);
            div.appendChild(div2);

            var divSpace = document.createElement("div");
            divSpace.setAttribute("id", "divSpace")
            var content = document.createTextNode("");
            divSpace.appendChild(content);
            div.appendChild(divSpace);

            var divTips = document.createElement("div");
            var content = document.createTextNode("- Use autocomplete or input box, but not both.");
            divTips.appendChild(content);
            div.appendChild(divTips);

            var div3 = document.createElement("div");
            var content = document.createTextNode("- No uppercase characters.");
            div3.appendChild(content);
            div.appendChild(div3);

            var div4 = document.createElement("div");
            var content = document.createTextNode("- No special characters.");
            div4.appendChild(content);
            div.appendChild(div4);

            var div5 = document.createElement("div");
            var content = document.createTextNode("- No numbers.");
            div5.appendChild(content);
            div.appendChild(div5);
        }
    }); // end addEventListener
    xhr.send();




} // end updateImages() 