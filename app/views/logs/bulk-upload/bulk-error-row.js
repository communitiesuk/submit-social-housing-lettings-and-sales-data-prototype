const detailsLinks = document.querySelectorAll('[data-module="details-link"]')
const specificationDetails = document.querySelectorAll('[data-module="specification-details"]')

detailsLinks.forEach(function (link, index) {
    link.setAttribute("id", `details-link-${index}`);
});

specificationDetails.forEach((link, index) => {
    link.setAttribute("id", `specification-details-${index}`);
});

detailsLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const id = link.getAttribute('id')
        const index = id.replace('details-link-', '');
        const specificationDetails = document.getElementById(`specification-details-${index}`)
        specificationDetails.classList.toggle('govuk-visually-hidden')

        const detailsLink = document.getElementById(`details-link-${index}`)
        detailsLink.classList.toggle('expand-details-link')
        detailsLink.classList.toggle('collapse-details-link')
    });
})
