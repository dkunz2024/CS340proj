/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Denton Kunz
 * Email: kunzd@oregonstate.edu
 */

//add click event listeners to the sell-something and filter-update buttons
document.getElementById('sell-something-button').addEventListener('click', open_modal)
document.getElementById('update-something-button').addEventListener('click', open_update_modal)
document.getElementById('filter-update-button').addEventListener('click', update_filter)

//create an array of all the posts (will automatically update when we add one)
var all_posts = document.getElementsByClassName('post')

//create temp variable to hold all the posts before we've removed any
var temp = []
for(let i=0; i<all_posts.length; i++)
    temp.push(all_posts[i])

//filters through each post to only show those that the user has specified
function update_filter(event){

    //create an array and grab all of the user's filter input
    var filter_text = document.getElementById('filter-text').value
    var filter_min_price = document.getElementById('filter-min-price').value
    var filter_max_price = document.getElementById('filter-max-price').value
    var filter_city = document.getElementById('filter-city').value

    //create another array within user_input to hold all of the conditions to filter by
    var filter_conditions = []
    var all_filter_conditions = document.getElementsByName('filter-condition')
    for(let i = 0; i < all_filter_conditions.length; i++){
        if(!all_filter_conditions[i].checked)
            filter_conditions.push(all_filter_conditions[i].value)
    }

    //check to make sure the minimum price is not greater than the maximum price
    if(filter_min_price != "" && filter_max_price != "" && (parseInt(filter_min_price) > parseInt(filter_max_price))){
        alert("The minimum price cannot be greater than the maximum price. ")
        return
    }

    //reset all_posts to show all posts again before filtering
    for(let i = all_posts.length-1; i >= 0; i--)
        all_posts[i].remove()
    for(let i = 0; i < temp.length; i++)
        document.getElementById('posts').appendChild(temp[i])

    //apply title filtering, unless the user left the field blank
    if(filter_text != ""){
        //loop through all posts backwards
        for(let i = all_posts.length-1; i >= 0; i--){
            //remove any posts that don't contain filter_text as a substring, case insensitive
            if(!all_posts[i].firstElementChild.lastElementChild.firstElementChild.textContent.toLowerCase().includes(filter_text.toLowerCase()))
                all_posts[i].remove()
        }
    }

    //apply minimum price filtering, unless the user left the field blank
    if(filter_min_price != ""){
        //loop through all posts backwards
        for(let i = all_posts.length-1; i >= 0; i--){
            //compare prices
            if(parseInt(all_posts[i].dataset.price) < parseInt(filter_min_price))
                all_posts[i].remove()
        }
    }

    //apply maximum price filtering, unless the user left the field blank
    if(filter_max_price != ""){
        //loop through all posts backwards
        for(let i = all_posts.length-1; i >= 0; i--){
            //compare prices
            if(parseInt(all_posts[i].dataset.price) > parseInt(filter_max_price))
                all_posts[i].remove()
        }
    }

    //apply city filtering, unless the user left the field blank
    if(filter_city != ""){
        //loop through all posts backwards
        for(let i = all_posts.length-1; i >= 0; i--){
            //compare cities
            if(all_posts[i].dataset.city != filter_city)
                all_posts[i].remove()
        }
    }

    //apply condition filtering, unless the user leaves all boxes blank
    if(filter_conditions.length != all_filter_conditions.length){
        //loop through all posts backwards
        for(let i = all_posts.length-1; i >= 0; i--){
            //check for any invalid conditions
            for(let j = 0; j < filter_conditions.length; j++){
                //if the post's condition is contained in the invalid conditions, remove the post
                if(all_posts[i].dataset.condition === filter_conditions[j]){
                    all_posts[i].remove()
                    break;
                }
            }
        }
    }
}

//opens the modal when the sell-something-button is clicked
function open_modal(event){
    //unhide the modal and modal backdrop
    document.getElementById('sell-something-modal').classList.remove('hidden')
    document.getElementById('modal-backdrop').classList.remove('hidden')

    //give the buttons that would close the modal their event listeners
    document.getElementById('modal-close').addEventListener('click', close_modal)
    document.getElementById('modal-cancel').addEventListener('click', close_modal)
    document.getElementById('modal-accept').addEventListener('click', create_post)
}

//opens the modal when the sell-something-button is clicked
function open_update_modal(event){
    //unhide the modal and modal backdrop
    document.getElementById('update-something-modal').classList.remove('hidden')
    document.getElementById('update-modal-backdrop').classList.remove('hidden')

    //give the buttons that would close the modal their event listeners
    document.getElementById('update-modal-close').addEventListener('click', close_update_modal)
    document.getElementById('update-modal-cancel').addEventListener('click', close_update_modal)
    document.getElementById('update-modal-accept').addEventListener('click', update_post)
}

//closes the modal (hides the elements) and resets the fields for next use
function close_modal(event){
    //rehide the modal and modal backdrop
    document.getElementById('sell-something-modal').classList.add('hidden')
    document.getElementById('modal-backdrop').classList.add('hidden')

    //remove the text within each field of the modal:
    var text_fields = document.getElementsByClassName('insert-element')
    for(let i = 0; i < text_fields.length; i++){
        for(let j = 0; j < text_fields[i].childNodes.length; j++){
            if(text_fields[i].childNodes[j].nodeName === 'INPUT'){
                text_fields[i].childNodes[j].value = "";
            }
        }
    }
}

//closes the modal (hides the elements) and resets the fields for next use
function close_update_modal(event){
    //rehide the modal and modal backdrop
    document.getElementById('update-something-modal').classList.add('hidden')
    document.getElementById('update-modal-backdrop').classList.add('hidden')

    //remove the text within each field of the modal:
    var text_fields = document.getElementsByClassName('update-element')
    for(let i = 0; i < text_fields.length; i++){
        for(let j = 0; j < text_fields[i].childNodes.length; j++){
            if(text_fields[i].childNodes[j].nodeName === 'INPUT'){
                text_fields[i].childNodes[j].value = "";
            }
        }
    }
}

//takes the user's input from the text fields in the modal and creates a new post
function create_post(event){
    //create new array to hold all of the user's input into the modal
    var user_input = []

    //add the data from each text field of the modal into the array
    var text_fields = document.getElementsByClassName('insert-element')
    for(let i = 0; i < text_fields.length - 1; i++){
        for(let j = 0; j < text_fields[i].childNodes.length; j++){
            if(text_fields[i].childNodes[j].nodeName === 'INPUT')
                user_input.push(text_fields[i].childNodes[j].value)
        }
    }

    //check to make sure each field was filled before allowing the post to be created
    for(let i = 0; i < user_input.length; i++){
        if(user_input[i] === ""){
            alert("You must fill out every field before a post can be created.")
            return
        }
    }

    //insert the new post
    //insert_new_post(user_input[2], user_input[3], user_input[4], user_input[1], user_input[0])

    //close the modal and reset all the fields as well
    close_modal(event)
}

function update_post(event){
    //create new array to hold all of the user's input into the modal
    var user_input = []

    //add the data from each text field of the modal into the array
    var text_fields = document.getElementsByClassName('update-element')
    for(let i = 0; i < text_fields.length - 1; i++){
        for(let j = 0; j < text_fields[i].childNodes.length; j++){
            if(text_fields[i].childNodes[j].nodeName === 'INPUT')
                user_input.push(text_fields[i].childNodes[j].value)
        }
    }

    //check to make sure each field was filled before allowing the post to be created
    for(let i = 0; i < user_input.length; i++){
        if(user_input[i] === ""){
            alert("You must fill out every field before a post can be created.")
            return
        }
    }

    //insert the new post
    //insert_new_post(user_input[2], user_input[3], user_input[4], user_input[1], user_input[0])

    //close the modal and reset all the fields as well
    close_update_modal(event)
}

//formats and inserts the new post into the DOM, takes in all necessary data
function insert_new_post(price, city, condition, photoURL, caption){
    //create main div for the new post
    var post_div = document.createElement('div')
    post_div.classList.add('post')
    post_div.dataset.price = price
    post_div.dataset.city = city
    post_div.dataset.condition = condition

    //create additional div for the post's contents
    var post_contents = document.createElement('div')
    post_contents.classList.add('post-contents')
    post_div.appendChild(post_contents)

    //create a div to go within post_contents to hold the image
    var post_image_container = document.createElement('div')
    post_image_container.classList.add('post-image-container')
    post_contents.appendChild(post_image_container)

    //create a div to go within post_contents to hold the post info
    var post_info_container = document.createElement('div')
    post_info_container.classList.add('post-info-container')
    post_contents.appendChild(post_info_container)

    //configurate and add the post's photo/image    
    post_image_container.appendChild(document.createElement('img'))
    post_image_container.firstChild.src = photoURL
    post_image_container.firstChild.alt = caption

    //configurate and add the post's caption
    post_info_container.appendChild(document.createElement('a'))
    post_info_container.firstChild.classList.add('post-title')
    post_info_container.firstChild.href = '#'
    post_info_container.firstChild.textContent = caption
    
    //configurate and add the post's price
    post_info_container.appendChild(document.createElement('span'))
    post_info_container.lastChild.classList.add('post-price')
    post_info_container.lastChild.textContent = '$' + price

    //configurate and add the post's city
    post_info_container.appendChild(document.createElement('span'))
    post_info_container.lastChild.classList.add('post-city')
    post_info_container.lastChild.textContent = '(' + city + ')'

    //finally, add the new post to the section of posts
    document.getElementById('posts').appendChild(post_div)

    //and manually add our new post to our temporary post list (for filtering)
    temp.push(post_div)
}

/*
***NOTES:***

==*JAVASCRIPT OBJECTS*
var student{
    name: 'Luke Skywalker'
    firstName: 'Luke",
    lastName: 'Skywalker',
    getFullName: function() {
        return this.firstName + " " + this.lastName
    }
}

//how to call
console.log("== student.getFullName(): ", student.getFullName())

==*CLASSES*
//constructor (conventional that class name is capitalized)
function Student(firstName, lastName, gpa){
    this.firstName = firstName
    this.lastName = lastName
    this.gpa = gpa
}

//Each instance of a class has a "prototype" which they use to access the class methods:
Student.prototype.getFullName = function(){
    return this.firstName + " " + this.lastName
}

var s = new Student("Leia", "Organa", 4.0)
console.log("== s: ", s)

in HTML: <script src="index.js" charset="utf-8" defer></script>
add the "defer" attribute to make surethe browser parses the javascript after all of the
HTML is rendered

***DOM??:**
var body = document.body

//access nodes of the body, can also access specific ones by body.childNodes[i] where int i
console.log("== body.childNodes", body.childNodes)

//can also use .parentNode to go to the node above

// can use document.getElementById("photo-card-container") to get a specific node
var photoCardContainer = document.getElementById("photo-card-container")

//all elements of a particular class:
var photoCards = document.getElementByClassName('photo-card')
//can access each element by photoCards[i] and iterate with photoCards.length
//this array will update automatically if a post is added/removed
//when filtering posts, if you remove one you may acccidentally skip an element
because it shifts forward. You should iterate from the back of the array: for(i = length-1; i>=0; i--)
use photoCards[i].remove() to remove a post

//gets all the links in the DOM by HTML tag a
var links = document.getElementByTagName('a')

//can use a CSS selector to select an element in javascript
//if there are multiple it would return only the first one
var rightNavItem = document.querySelector('.navitem.right')

//can use this to get all of the selector (less efficient than getElementByClassName or others)
var rightNavItems = document.querySelectorAll('.navitem.right')

.textContent
.innerHTML
and more, you can find them in the inspect element
you can write to these properties as well as read
!! writing to innerHTML with user supplied values can result in security breaches and allow
malicious users to run javascript code we didn't write !! .textContent is safe

function insertNewPhotoCard(photoURL, caption){
    var photoCardSection = document.createElement('section')
    photoCardSection.classList.add('photo-card')

    ...imgContainerDiv...

    var post_image = document.createElement('img')
    post_image.classList.add('img-container')
    post_image.src = photoURL
    imgContainerDiv.appendChild(post_image)

    var photoCardContainer = document.getElementId('photo-card-container')
    photoCardContainer.appendChild(photoCardSection)
    or
    document.getElementId('photo-card-container').appendChild(photoCardSection)
}


*/