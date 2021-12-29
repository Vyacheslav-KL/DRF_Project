from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string


class Command(BaseCommand):
    help = 'Create random users'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Количество создаваемых пользователей')
        parser.add_argument('-a', '--admin', action='store_true', help='Создание учетной записи администратора')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        admin = kwargs['admin']

        if admin:
            User.objects.create_superuser(username='admin', email='', password='123')
        else:
            for i in range(total):
                User.objects.create_user(username=get_random_string(5), email=f'{get_random_string(7)}@mail.com', password='123')
