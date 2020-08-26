import re

from rest_framework.parsers import BaseParser
from rest_framework.utils import json


def camel_case_to_snake_case(raw_data):
    formatted_data = {}
    for key, val in raw_data.items():
        split_camel_case = re.compile(r'^[a-z]+|[A-Z][a-z]*')
        formatted_key = '_'.join([f'{word[0].lower()}{word[1:]}' for word in re.findall(split_camel_case,  key)])
        if isinstance(val, dict):
            formatted_data[formatted_key] = camel_case_to_snake_case(val)
        else:
            formatted_data[formatted_key] = val
    return formatted_data


class CamelCaseJsonParser(BaseParser):
    media_type = 'application/json'

    def parse(self, stream, media_type=None, parser_context=None):
        raw_data = camel_case_to_snake_case(json.loads(stream.read()))
        return raw_data