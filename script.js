'use strict'

import TOKEN from './config.js';

// Calls Open AI API
async function getResponse(prompt) {
    const requestBody = {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    const response = await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${btoa(TOKEN)}`,
        },  
        body: JSON.stringify(requestBody),
    });
    return await response.json();
}

// Putting the prompt and response text together & package together for viewing on the page
function generateResponseHTML(prompt, responseText) {

    const promptAndResponse = `
            <li class = "generatedPrompt">
                <h3 class = "promptHeader">Prompt:</h3>
                <p class = "promptParagraph">${prompt}</p>
            </li>
            <li class = "generatedResponse">
                <h3>Response:</h3>
                <p>${responseText}</p>
            </li>
        `;

    // Creating the parent unordered list, adding the styled class, and adding the prompt and response information into it
    const listItem = document.createElement('ul');
    listItem.classList.add('promptAndResponse')
    listItem.innerHTML = promptAndResponse;
    responseList.appendChild(listItem);
    //allows the new answer to be focusable
}

// Querying the DOM for the form
const formElement = document.querySelector('form');

// Querying the DOM for the ordered list
const responseList = document.querySelector('ol');

// Listen for textarea form submissions & follow-up with the generated Prompt & Response
formElement.addEventListener('submit', function(event) {
    
    // stop the page from refreshing when the form is submitted 
    event.preventDefault();

    //query the DOM for the textarea element
    const promptTextarea = document.getElementById('enterPrompt');

    // Follow-up activity should only run if user has entered a prompt & generate a Prompt & Response 
    if (promptTextarea.value !== '') {
        const prompt = promptTextarea.value;
        getResponse(prompt).then(responseBody => {
            generateResponseHTML(prompt, responseBody.choices[0].text)
        });

        // Clear the textarea after submitted
        promptTextarea.value = '';
    } else {
        alert('Please enter a prompt!');
    }
});