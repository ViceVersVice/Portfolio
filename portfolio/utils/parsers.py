import re
from typing import Union

from rest_framework.parsers import JSONParser


def camel_case_to_snake_case(raw_data: Union[dict, list]):
    def format_data(item):
        if not isinstance(item, dict):
            return item
        else:
            formatted_data = {}
            for key, val in item.items():
                split_camel_case = re.compile(r'^[a-z]+|[A-Z][a-z]*')
                formatted_key = '_'.join([word.lower() for word in re.findall(split_camel_case, key)])
                if isinstance(val, dict):
                    formatted_data[formatted_key] = format_data(val)
                elif isinstance(val, list):
                    formatted_data[formatted_key] = camel_case_to_snake_case(val)
                else:
                    formatted_data[formatted_key] = val

            return formatted_data

    if isinstance(raw_data, list):
        return [format_data(item) for item in raw_data]

    return format_data(raw_data)


class CamelCaseJsonParser(JSONParser):
    def parse(self, stream, media_type=None, parser_context=None):
        data = super(CamelCaseJsonParser, self).parse(stream, media_type=media_type, parser_context=parser_context)
        return camel_case_to_snake_case(data)