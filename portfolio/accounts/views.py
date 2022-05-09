from django.http import JsonResponse

# Create your views here.
from django.views.generic.base import View


class GetUserInfoView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            return JsonResponse(
                {
                    'username': user.username,
                    'firstName': user.first_name,
                    'lastName': user.last_name,
                }
            )

        return JsonResponse(
            {
                'username': None,
                'firstName': None,
                'lastName': None,
            }
        )
