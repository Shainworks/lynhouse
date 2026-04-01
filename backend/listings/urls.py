from django.urls import path
from .views import (
    ListingListView, ListingCreateView, ListingUpdateView,
    ListingDeleteView, ListingDetailView, search_listings,
    GeminiAnalysisView, GeminiChatAPIView
)

urlpatterns = [
    path('', ListingListView.as_view(), name='listing-list'),
    path('<int:pk>/', ListingDetailView.as_view(), name='listing-detail'),
    path('create/', ListingCreateView.as_view(), name='listing-create'),
    path('<int:pk>/update/', ListingUpdateView.as_view(), name='listing-update'),
    path('<int:pk>/delete/', ListingDeleteView.as_view(), name='listing-delete'),

    # Format: /api/listings/search/?city=CityName
    path('search/', search_listings, name='listing-search'),

    # Gemini AI: property analysis (used by AiAnalysisButton on property detail page)
    path('analyze-housing/', GeminiAnalysisView.as_view(), name='analyze-housing'),

    # Gemini AI: general chatbot
    path('chat/', GeminiChatAPIView.as_view(), name='gemini-chat'),
]