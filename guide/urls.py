"""
URL configuration for gandalf_guide project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

app_name = 'guide'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('quotes/', views.quotes_view, name='quotes'),
    path('posts/', views.posts_list, name='posts_list'),
    path('posts/<int:pk>/', views.post_detail, name='post_detail'),
    path('posts/add/', views.post_create, name='post_create'),
    path('posts/<int:pk>/edit/', views.PostUpdateView.as_view(), name='post_edit'),
    path('posts/<int:pk>/delete/', views.PostDeleteView.as_view(), name='post_delete'),
    path('category/<str:category>/', views.posts_by_category, name='posts_by_category'),
    path('guidepost/<int:pk>/', views.main_post_detail, name='main_post_detail'),
    path('login/', auth_views.LoginView.as_view(template_name='guide/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(next_page='guide:index'), name='logout'),
    path('register/', views.register, name='register'),
    path('routes/', views.routes, name='routes'),
    path('routes/<str:route_slug>/', views.route_detail, name='route_detail'),
]
