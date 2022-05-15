'use strict'

// PSEUDOCODE
// Take open text prompts from the form
    //send the prompts to the API (**LATER)

//display the text prompts below in an ordered list 
    //these should be sorted from newest to oldest (currently achieved through a flex: column-reverse - may need to check back on this one)

//each result should include the prompt 
    //as well as the response from the API (**LATER)

//querying the DOM for the form
const formElement = document.querySelector('form');
console.log(formElement);

//querying the DOM for the ordered list
const responseList = document.querySelector('ol');
console.log(responseList);

// add a submit event listener on the form
formElement.addEventListener('submit', function(event) {
    
    // stop the page from refreshing when the form is submitted 
    event.preventDefault();
    console.log(event); //NOTE**: remove later when completed activity

    //query the DOM for the textarea element - tells me if it's empty or not later 
    const promptTextarea = document.getElementById('enterPrompt');
    console.log(promptTextarea); //NOTE**: remove later when completed activity - just checking

    //activity should only run if user has entered a prompt
    if (promptTextarea.value !== '') {

        const prompt = promptTextarea.value;
        console.log(prompt); //NOTE**: remove later when completed activity

        const promptAndResponse = `
                <li class = "generatedPrompt">
                    <h3 class = "promptHeader">Prompt:</h3>
                    <p class = "promptParagraph">${prompt}</p>
                </li>
                <li class = "generatedResponse">
                    <h3>Response:</h3>
                    <p></p>
                </li>
            `;
        console.log(promptAndResponse); //NOTE**: remove later when completed activity

        //creating the parent unordered list, adding the styled class, and adding the prompt and response information into it
        const listItem = document.createElement('ul');
        listItem.classList.add('promptAndResponse')
        console.log(listItem);
        listItem.innerHTML = promptAndResponse;
        console.log(listItem);

        //adding the entire prompt and response into the parent ordered list (queried at the beginning of the JS doc)
        responseList.appendChild(listItem);

        //clear the textarea after submitted
        promptTextarea.value = '';

    } else {
        alert('Please enter a prompt!');
    }





});