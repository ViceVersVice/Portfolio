from django.shortcuts import render

# Create your views here.
from django.views.generic import TemplateView


class OauthLoginView(TemplateView):

    def get(self, request, *args, **kwargs):
        print('USR::', request.user)
        return render(request, 'oauth_login.html')