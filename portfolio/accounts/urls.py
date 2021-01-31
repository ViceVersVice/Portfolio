from django.urls import path

from accounts.views import OauthLoginView


urlpatterns = [
    path('oauth_login/', OauthLoginView.as_view(), name='oauth_login')
]