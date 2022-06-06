from django.http import JsonResponse

# Create your views here.
from django.views.generic.base import View


class GetUserInfoView(View):
    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            user = request.user
            profile = getattr(user, 'profile', None)

            if profile:
                return JsonResponse(
                    {
                        'username': user.username,
                        'firstName': user.first_name,
                        'lastName': user.last_name,
                        'avatar': profile.avatar,
                    }
                )

        return JsonResponse(
            {
                'username': None,
                'firstName': None,
                'lastName': None,
                'avatar': None,
            }
        )
