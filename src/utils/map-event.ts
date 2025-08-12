export const smoothPanTo = (
  map: google.maps.Map,
  target: google.maps.LatLngLiteral,
  duration = 500
) => {
  const start = map.getCenter();
  if (!start) return;

  const startLat = start.lat();
  const startLng = start.lng();
  const endLat = target.lat;
  const endLng = target.lng;

  const startTime = performance.now();

  function animate(time: number) {
    const progress = Math.min((time - startTime) / duration, 1);

    const lat = startLat + (endLat - startLat) * progress;
    const lng = startLng + (endLng - startLng) * progress;

    map.setCenter({ lat, lng });

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
};
