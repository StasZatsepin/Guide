// Динамическая подгрузка постов и AJAX-форма

document.addEventListener('DOMContentLoaded', function() {
    // --- Динамическая фильтрация по категориям ---
    document.querySelectorAll('.category-filter').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            let category = this.dataset.category;
            loadPosts(1, category);
            document.querySelectorAll('.category-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- Динамическая пагинация ---
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('page-nav')) {
            e.preventDefault();
            let page = e.target.dataset.page;
            let activeCat = document.querySelector('.category-filter.active');
            let category = activeCat ? activeCat.dataset.category : '';
            loadPosts(page, category);
        }
    });

    // --- AJAX-форма создания поста ---
    let postForm = document.getElementById('post-create-form');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let formData = new FormData(postForm);
            fetch(window.location.pathname, {
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                let notif = document.getElementById('form-notification');
                if (data.success) {
                    notif.innerHTML = `<div class='alert alert-success mb-3'>${data.message}</div>`;
                    postForm.reset();
                    // Можно сразу обновить список постов
                    if (window.location.pathname.includes('add')) {
                        window.location.href = '/posts/';
                    }
                } else {
                    notif.innerHTML = `<div class='alert alert-danger mb-3'>${data.message || 'Ошибка при добавлении.'}</div>`;
                }
            })
            .catch(() => {
                let notif = document.getElementById('form-notification');
                notif.innerHTML = `<div class='alert alert-danger mb-3'>Ошибка соединения.</div>`;
            });
        });
    }
});

function loadPosts(page, category) {
    let url = `/posts/?page=${page}`;
    if (category) url += `&category=${category}`;
    fetch(url, {headers: {'X-Requested-With': 'XMLHttpRequest'}})
        .then(response => response.text())
        .then(html => {
            document.getElementById('posts-list-container').innerHTML = html;
        });
} 