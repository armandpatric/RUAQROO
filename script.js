function initMap() {
    var myLatLng = { lat: 21.1603299, lng: -86.9275928 };
    var firstPointLatLng = { lat: 21.173100, lng: -86.904532 };
    var lastPointLatLng = { lat: 21.161170, lng: -86.925048 };

    // Define una instancia de InfoWindow
    const infoWindow = new google.maps.InfoWindow();

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14
    });

    // Trazamiento de la ruta 44
    const flightPlanCoordinates = [
        { lat: 21.173100, lng: -86.904532 },
        { lat: 21.172812, lng: -86.905069 },
        { lat: 21.171742, lng: -86.907192 },
        { lat: 21.169573, lng: -86.911730 },
        { lat: 21.171534, lng: -86.912709 },
        { lat: 21.174472, lng: -86.912979 },
        { lat: 21.174472, lng: -86.912979 },
        { lat: 21.174391, lng: -86.914261 },
        { lat: 21.175117, lng: -86.914267 },
        { lat: 21.176102, lng: -86.914305 },
        { lat: 21.176669, lng: -86.914162 },
        { lat: 21.176745, lng: -86.914032 },
        { lat: 21.176939, lng: -86.914014 },
        { lat: 21.176996, lng: -86.914065 },
        { lat: 21.177040, lng: -86.914130 },
        { lat: 21.177107, lng: -86.914145 },
        { lat: 21.177367, lng: -86.914206 },
        { lat: 21.177906, lng: -86.914246 },
        { lat: 21.180151, lng: -86.914224 },
        { lat: 21.180200, lng: -86.914345 },
        { lat: 21.180329, lng: -86.914380 },
        { lat: 21.183467, lng: -86.914415 },
        { lat: 21.183445, lng: -86.913146 },
        { lat: 21.183274, lng: -86.913132 },
        { lat: 21.183260, lng: -86.913181 },
        { lat: 21.182493, lng: -86.913178 },
        { lat: 21.182501, lng: -86.913181 },
        { lat: 21.181724, lng: -86.913168 },
        { lat: 21.181726, lng: -86.913071 },
        { lat: 21.182490, lng: -86.913065 },
        { lat: 21.183262, lng: -86.913072 },
        { lat: 21.183277, lng: -86.912417 },
        { lat: 21.182565, lng: -86.912005 },
        { lat: 21.178629, lng: -86.909693 },
        { lat: 21.177131, lng: -86.913366 },
        { lat: 21.177055, lng: -86.913907 },
        { lat: 21.176960, lng: -86.914031 },
        { lat: 21.177033, lng: -86.914184 },
        { lat: 21.176989, lng: -86.914320 },
        { lat: 21.176885, lng: -86.914382 },
        { lat: 21.176774, lng: -86.914363 },
        { lat: 21.176726, lng: -86.914326 },
        { lat: 21.176656, lng: -86.914366 },
        { lat: 21.176514, lng: -86.914372 },
        { lat: 21.174393, lng: -86.914417 },
        { lat: 21.171787, lng: -86.914420 },
        { lat: 21.170948, lng: -86.914414 },
        { lat: 21.165742, lng: -86.914722 },
        { lat: 21.165455, lng: -86.915574 },
        { lat: 21.165327, lng: -86.916104 },
        { lat: 21.165327, lng: -86.916454 },
        { lat: 21.165322, lng: -86.917424 },
        { lat: 21.165346, lng: -86.919410 },
        { lat: 21.165267, lng: -86.923520 },
        { lat: 21.165272, lng: -86.924217 },
        { lat: 21.165308, lng: -86.924989 },
        { lat: 21.164242, lng: -86.925007 },
        { lat: 21.161170, lng: -86.925048 },
    ];

    // Crea una polilínea para la ruta original
    const flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#43DE27",
        strokeOpacity: 2.0,
        strokeWeight: 6,
        map: map
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLatLng = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Crea un marcador para la ubicación del usuario
            var userMarker = new google.maps.Marker({
                position: userLatLng,
                map: map,
                title: 'Tu Ubicación', // Título opcional para el marcador del usuario
                icon: {
                    url: 'posicion_user.png', // Ruta a tu imagen o archivo SVG
                    scaledSize: new google.maps.Size(40, 40) // Tamaño del icono personalizado
                }
            });

            // Evento click para el marcador del usuario
            userMarker.addListener('click', () => {
                // Calcula la distancia entre la ubicación del usuario y la del marcador
                var distance = google.maps.geometry.spherical.computeDistanceBetween(
                    new google.maps.LatLng(userLatLng.lat, userLatLng.lng),
                    new google.maps.LatLng(myLatLng.lat, myLatLng.lng)
                );

                const userContent = `
                    <div>
                        <h2>Tu Ubicación</h2>
                        <p>Aquí estás tú actualmente (puede estar desorientado por unos metros).</p>
                        <p>Distancia al marcador: ${distance.toFixed(2)} metros</p>
                    </div>`;

                infoWindow.setContent(userContent);
                infoWindow.open(map, userMarker);
            });

            console.log('Distancia entre usuario y marcador:', distance.toFixed(2), 'metros');
        }, function() {
            console.error('Error al obtener la ubicación del usuario');
        });
    } else {
        console.error('Geolocalización no soportada por este navegador');
    }

    // Crea los marcadores para los puntos de la ruta
    var firstPointMarker = new google.maps.Marker({
        position: firstPointLatLng,
        map: map,
        title: 'Primer Punto',
        icon: {
            url: 'marcadores.png',
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    var lastPointMarker = new google.maps.Marker({
        position: lastPointLatLng,
        map: map,
        title: 'Último Punto',
        icon: {
            url: 'marcadores.png',
            scaledSize: new google.maps.Size(40, 40)
        }
    });

    // Contenido HTML para cada ventana de información
    const firstPointContent = `
        <div>
            <h2>Base de la Ruta 44</h2>
            <p>Base ubicada en frente a paseos Nikte.</p>
        </div>`;
    const lastPointContent = `
        <div>
            <h2>Último Punto Cerca de la Uqroo</h2>
            <p>Pide tu parada con anticipación, esta es el último punto cerca de la Universidad.</p>
        </div>`;

    // Evento click para cada marcador
    firstPointMarker.addListener('click', () => {
        infoWindow.setContent(firstPointContent);
        infoWindow.open(map, firstPointMarker);
    });

    lastPointMarker.addListener('click', () => {
        infoWindow.setContent(lastPointContent);
        infoWindow.open(map, lastPointMarker);
    });

    // Crea el marcador para UQROO
    var UQROOmarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'UQROO', 
    });

    const UQROOContent = `
        <div>
            <h2>UAEQROO Campus Cancún</h2>
        </div>`;

    // Evento click para el marcador de UQROO
    UQROOmarker.addListener('click', () => {
        infoWindow.setContent(UQROOContent);
        infoWindow.open(map, UQROOmarker);
    });
}

// Event para cerrar el aviso inicial
window.addEventListener('load', function() {
    var modal = document.getElementById('modal_container');
    modal.classList.add('show');

    // Cerrar el modal después de 5 segundos
    setTimeout(function() {
        modal.classList.remove('show');
    }, 5000);

    // Cerrar el modal cuando el usuario haga clic fuera del modal
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    });
});