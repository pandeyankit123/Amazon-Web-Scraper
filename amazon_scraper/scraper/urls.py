from django.urls import path
from .views import scrape_product, compare_products

urlpatterns = [
    path('scrape/', scrape_product, name='scrape-product'),
    path('compare/', compare_products, name='compare-products'),
]
