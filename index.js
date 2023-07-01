
let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("url") )


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    renderLeads(myLeads);
}

/**
 * Push the current tab into the url array by using chrom tab's 
 * build in function query
 */
saveTabBtn.addEventListener("click", function()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads(myLeads)
    })
})

/**
 * function for "Save Button". save the url into 
 * the array that is later render onto the list screen
 * by using the renderLeads() function
 * 
 * NOTE: the input also store in the localStorage
 */
inputBtn.addEventListener("click", function () {
    // Prevent user from adding empty input
    if (String(inputEl.value).trim() !== "") {
        myLeads.push(inputEl.value)
        // Store the new link into the local storage
        localStorage.setItem("url", JSON.stringify(myLeads));
    }

    // Clear the input box
    inputEl.value = ""


    // Render the url only if the list is not empty
    if (!myLeads.isEmpty) {
        renderLeads(myLeads)
    }
})

/**
 * Clear the url List and local storage
 */
deleteBtn.addEventListener("click", function () {
    myLeads = [];
    renderLeads(myLeads);
    localStorage.clear();
})

/**
 * Render the urls from the myLeads array by using
 * the string template and innerHTML.
 */
function renderLeads(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        // Make sure to include hyper text transfer protocol
        // so the client is able to identify it
        let url = leads[i];

        if (!String(url).includes("http"))
        {
            url = "https://" + url;
        }
        listItems += `
            <li>
                <a target='_blank' href='${url}'>
                     ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}