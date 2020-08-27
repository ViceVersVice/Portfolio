from django.test import SimpleTestCase

from utils.parsers import camel_case_to_snake_case


class CamelCaseToSnakeCaseParserTest(SimpleTestCase):
    def test_camel_case_to_snake_case(self):
        camel_case_dict = {
            'toDo': 123,
            'seeWho': 456,
            'lolWhat': [{'dontKnow': 465}, 654, {'blessUsa': 787}],
            'forWhy': {'manyTimes': 145, 'soWhat': 135, 'cmOn': {'laLaLa': 567}}
        }

        snake_case_dict = {
            'to_do': 123,
            'see_who': 456,
            'lol_what': [{'dont_know': 465}, 654, {'bless_usa': 787}],
            'for_why': {'many_times': 145, 'so_what': 135, 'cm_on': {'la_la_la': 567}}
        }
        self.assertDictEqual(snake_case_dict, camel_case_to_snake_case(camel_case_dict))
