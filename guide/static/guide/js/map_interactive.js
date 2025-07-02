document.addEventListener('DOMContentLoaded', function() {
  const popover = document.getElementById('map-popover');
  // Для мест
  document.querySelectorAll('.map-place').forEach(el => {
    el.addEventListener('mouseenter', e => {
      popover.innerHTML = `<b>${el.dataset.title}</b><br>${el.dataset.desc}`;
      popover.style.display = 'block';
    });
    el.addEventListener('mousemove', e => {
      popover.style.left = (e.pageX + 20) + 'px';
      popover.style.top = (e.pageY - 20) + 'px';
    });
    el.addEventListener('mouseleave', e => {
      popover.style.display = 'none';
    });
  });
  // Для маршрутов
  document.querySelectorAll('.map-route').forEach(el => {
    el.addEventListener('mouseenter', e => {
      popover.innerHTML = `<b>${el.dataset.title}</b><br>${el.dataset.desc}`;
      popover.style.display = 'block';
    });
    el.addEventListener('mousemove', e => {
      popover.style.left = (e.pageX + 20) + 'px';
      popover.style.top = (e.pageY - 20) + 'px';
    });
    el.addEventListener('mouseleave', e => {
      popover.style.display = 'none';
    });
    el.addEventListener('click', e => {
      if (el.dataset.url) {
        window.location.href = el.dataset.url;
      }
    });
  });
}); 