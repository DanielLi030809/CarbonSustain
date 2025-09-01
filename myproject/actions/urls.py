from django.urls import path

from . import views

urlpatterns = [
    path("actions/", views.get_or_add_actions),
    path("actions/<str:action_id>/", views.update_or_delete_actions),
]