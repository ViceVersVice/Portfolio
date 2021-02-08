from django.http import JsonResponse

# Create your views here.
from django.views.generic.base import View


class GetUserInfoView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            return JsonResponse({'username': user.username})

        return JsonResponse({'username:': None})
