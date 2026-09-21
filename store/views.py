from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem
from .serializers import ProductSerializer, UserSerializer, OrderItemSerializer

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully!"})
    return Response(serializer.errors, status=400)

@api_view(['GET', 'POST'])
def manage_cart(request):
    # Fallback to the first user (your superuser) if not strictly authenticated
    user = request.user if request.user.is_authenticated else User.objects.first()
    order, created = Order.objects.get_or_create(user=user, is_completed=False)

    if request.method == 'POST':
        product_id = request.data.get('product_id')
        try:
            product = Product.objects.get(id=product_id)
            order_item, item_created = OrderItem.objects.get_or_create(order=order, product=product)
            if not item_created:
                order_item.quantity += 1
            order_item.save()
            return Response({"message": f"Added {product.name} to cart!"})
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=404)

    # If it's a GET request, return the cart contents
    items = order.items.all()
    serializer = OrderItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def checkout(request):
    user = request.user if request.user.is_authenticated else User.objects.first()
    order = Order.objects.filter(user=user, is_completed=False).first()
    
    if order:
        order.is_completed = True
        order.save()
        return Response({"message": "Order processed successfully!"})
    
    return Response({"error": "No active cart found"}, status=400)