from collections import deque
from typing import Union

from rest_framework.renderers import JSONRenderer


def snake_case_to_camel_case(raw_data: Union[dict, list]):
    def format_data(item):
        if not isinstance(item, dict):
            return item
        else:
            formatted_data = {}
            for key, val in item.items():
                split_snake_case = deque(key.split('_'))
                if len(split_snake_case) > 1:
                    formatted_words = [split_snake_case.popleft().lower()]
                    camel_case_words = [word.capitalize() for word in split_snake_case]
                    formatted_words.extend(camel_case_words)
                    formatted_key = ''.join(formatted_words)
                else:
                    formatted_key = key.lower()

                if isinstance(val, dict):
                    formatted_data[formatted_key] = format_data(val)
                elif isinstance(val, list):
                    formatted_data[formatted_key] = snake_case_to_camel_case(val)
                else:
                    formatted_data[formatted_key] = val

            return formatted_data

    if isinstance(raw_data, list):
        return [format_data(item) for item in raw_data]

    return format_data(raw_data)


class CamelCaseJsonRenderer(JSONRenderer):
    def render(self, data, accepted_media_type=None, renderer_context=None):
        data = snake_case_to_camel_case(data)
        return super().render(data, accepted_media_type=accepted_media_type, renderer_context=renderer_context)