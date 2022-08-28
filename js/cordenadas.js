/* CALCULO INICIO */
import LatLon from 'https://cdn.jsdelivr.net/npm/geodesy@2/latlon-spherical.min.js';

function calculateDistance() {
    const p1 = LatLon.parse(-12.0499,-77.05);
    const p2 = LatLon.parse(-12.091350605083651,-76.98542480570022);
    const dist = parseFloat(p1.distanceTo(p2).toPrecision(4));
    
    console.log(dist);
}
calculateDistance()
/* CALCULO FIN */