'use strict'

import TOKEN from './config.js';

// Calls Open AI API
async function getResponse(prompt, engine) {
    const requestBody = {
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    };

    const response = await fetch("https://api.openai.com/v1/engines/" + engine + "/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${atob(TOKEN)}`,
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

// Querying the DOM for the form & ordered list
const formElement = document.querySelector('form');
const responseList = document.querySelector('ol');

// Listen for textarea & engine selection form submissions & follow-up with the generated Prompt & Response
formElement.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const engineSelect = document.getElementById('chooseEngine');
    const promptTextarea = document.getElementById('enterPrompt');


    // Follow-up activity should only run if user has entered a prompt & generate a Prompt & Response with the selected engine 
    if (promptTextarea.value !== '') {
        const prompt = promptTextarea.value;
        getResponse(prompt, engineSelect.value).then(responseBody => {
            generateResponseHTML(prompt, responseBody.choices[0].text)
        });

        // Clear the textarea after submitted
        promptTextarea.value = '';
    } else {
        alert('Please enter a prompt!');
    }
});