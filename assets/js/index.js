var loadPlaces = function () {
    const grid = document.getElementById('grid-places');
    grid.innerHTML = '';

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
        title.innerText = place.title;
        description.innerText = place.description;
        image.setAttribute('src', place.img);

        // Adding marker
        var marker = new google.maps.Marker({
          position: {lat: place.lat, lng: place.lng},
          map: map,
          title: place.title
        });

    });

    var items = document.querySelectorAll('#grid-places .item');
    console.log(items);
    items.forEach(item => {
        item.addEventListener('mouseover', event => {
            // console.log(event.fromElement);
            event.stopPropagation(); 
            console.log(event.relatedTarget);
            var e = event.fromElement || event.relatedTarget;
            if (e.parentNode == this || e == this) {
                return;
            }
        }, false);
    });
}

document.addEventListener('DOMContentLoaded', event => {
    loadPlaces();
}, false);