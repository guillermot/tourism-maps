const markers = [];

const loadGuides = function(guides, containerId) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';

    grid.classList.remove('fadeIn');
    grid.classList.remove('animated');

    guides.forEach(guide => {

        const item = document.createElement('div');
        const anchor = document.createElement('a');

        const imageContainer = document.createElement('div');
        const image = document.createElement('img');

        const descriptionContainer = document.createElement('div');
        const title = document.createElement('div');
        const description = document.createElement('div');

        // Adding row
        grid.appendChild(item);

        // Building card layout
        item.appendChild(anchor);
        anchor.appendChild(imageContainer);
        anchor.appendChild(descriptionContainer);
        imageContainer.appendChild(image);
        descriptionContainer.appendChild(title);
        descriptionContainer.appendChild(description);

        // Applying styles
        item.setAttribute('class', 'item');
        anchor.setAttribute('class', 'item-clickeable');
        imageContainer.setAttribute('class', 'image-container');
        descriptionContainer.setAttribute('class', 'description-container');
        title.setAttribute('class', 'title');
        description.setAttribute('class', 'description');

        // Setting values
        title.innerText = guide.name;
        description.innerText = guide.description;
        // image.setAttribute('src', place.img);

        item.addEventListener('click', event => {
            loadPlaces(guides, guide.places, containerId);
        }, false);
    });
};

const loadPlaces = function(guides, places, containerId) {
    const grid = document.getElementById(containerId);
    grid.innerHTML = '';
    grid.classList.remove('fadeIn');
    grid.classList.remove('animated');

    // Backbutton
    const backButton = document.createElement('a');
    backButton.innerText = '<< Atras';
    backButton.addEventListener('click', event => {
        removeAllMarkers(markers);
        loadGuides(guides, containerId);
    });
    backButton.setAttribute('class', 'back-btn');
    grid.appendChild(backButton);

    places.forEach(place => {
        // Creating elements
        const item = document.createElement('div');
        const anchor = document.createElement('a');

        const imageContainer = document.createElement('div');
        const image = document.createElement('img');

        const descriptionContainer = document.createElement('div');
        const title = document.createElement('div');
        const description = document.createElement('div');

        // Adding row
        grid.appendChild(item);

        // Building card layout
        item.appendChild(anchor);
        anchor.appendChild(imageContainer);
        anchor.appendChild(descriptionContainer);
        imageContainer.appendChild(image);
        descriptionContainer.appendChild(title);
        descriptionContainer.appendChild(description);

        // Applying styles
        item.setAttribute('class', 'item');
        anchor.setAttribute('class', 'item-clickeable');
        imageContainer.setAttribute('class', 'image-container');
        descriptionContainer.setAttribute('class', 'description-container');
        title.setAttribute('class', 'title');
        description.setAttribute('class', 'description');

        // Setting values
        item.setAttribute('data-id', place.id);
        item.setAttribute('data-lat', place.lat);
        item.setAttribute('data-lng', place.lng);
        title.innerText = place.name;
        description.innerText = place.description;
        image.setAttribute('src', place.img);

        // Adding marker
        if (place.lat) {
            const coordinates = { lat: place.lat, lng: place.lng };
            item.addEventListener('click', event => {
                map.panTo(coordinates);
            }, false);

            var marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                title: place.title
            });

            markers.push(marker);
        }
    });

}

const removeAllMarkers = (markers) => {
    markers.forEach(marker => {
        marker.setMap(null);
    });
}

document.addEventListener('DOMContentLoaded', event => {
    loadGuides(guides, 'grid-places');
}, false);