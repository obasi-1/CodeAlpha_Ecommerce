from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='get_products'),
    path('register/', views.register_user, name='register'),
    path('cart/', views.manage_cart, name='cart'),
    path('checkout/', views.checkout, name='checkout'),
]