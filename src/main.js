const navTo = (page) => {
    // Navigate to page argument
    document.location.href = page
}

const truncate = () => {
    /* Truncate widget-description content by calculating width and height
    of widget-content box and applying some random maths I've tinkered with
    to give a list of characters to slice.
    */
    const windowSize = window.outerWidth

    // Original descriptions from hidden paragraphs
    let descriptions = document.querySelectorAll(".widget-description-original")
    // Newly created descriptions
    let truncatedDescriptions = document.querySelectorAll(".widget-description")

    // Loop through each description and truncate appropriately
    for (let i = 0; i < descriptions.length; i++) {
        let content = descriptions[i].innerText
        // Truncate length is caluclated based on width and height of widget-content box
        let truncateLength = (descriptions[i].parentElement.clientWidth / 5) * descriptions[i].parentElement.clientHeight / 180
        content = `${content.slice(0, truncateLength)}...`
        truncatedDescriptions[i].innerText = content
    }
}

const addWidgetDescriptions = () => {
    /*  Hide original widget descriptions and add "widget-description-original" class
    to them. This makes each description identifiable. We then insert a visible paragraph
    below which has the class "widget-description". JavaScript later on uses the original
    text from the hidden paragraph, truncates dynamically according to the size of the
    widget-content box before injecting it into the new paragraph.

    This is necessary as working out the truncation current text inside the paragraph leads
    to problems when the box size increases; sliced content with trailing dots which cannot
    be recovered without refreshing page.

    This approach makes the HTML rather simple to manage as you only need to add a paragraph
    tag when creating another widget as opposed to created two paragraph tags with different
    classes etc, etc.

    Of course Vue, Svelte or any front-end framework could solve this in a much more efficient
    manner, right within the HTML itself.
    */

    // Original widget descriptions
    const widgetDescriptions = document.querySelectorAll(".widget-content > p")

    let widgetContents = document.querySelectorAll(".widget-content")
    for (let i = 0; i < widgetContents.length; i++) {
        // Add widget-description-original class
        widgetDescriptions[i].classList.add("widget-description-original")
        // Add displau: none; style
        widgetDescriptions[i].style.display = "none"

        // Create new visible paragraph below original
        const truncatedParagraph = document.createElement("p")
        // Add widget-description class so we can target it later
        truncatedParagraph.classList.add("widget-description")
        widgetContents[i].appendChild(truncatedParagraph)
    }

    // Truncate text for first time as this function is ran on DOMContentLoaded
    truncate()
}

window.addEventListener("DOMContentLoaded", addWidgetDescriptions)
window.addEventListener("resize", truncate)