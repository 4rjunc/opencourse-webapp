from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from openApi.models import StudMaster
from django.db.models import Q
from django.db import IntegrityError


class Command(BaseCommand):
    help = 'Create user accounts from table data'
    
    def handle(self, *args, **options):
        pgm_exp = [15, 16, 12, 10, 4, 2]
        users = StudMaster.objects.filter(~Q(pgm__in=pgm_exp) & Q(current_sem=4))

        for user_data in users:
            # Extract relevant data from the table row
            username = user_data.uty_reg_no
            password = user_data.dob

            if username:
                try:
                    # Create a new user account
                    user = User.objects.create_user(username=username, password=str(password))
                    user.save()
                    self.stdout.write(f'Successfully created account for {username}')
                except IntegrityError:
                    self.stdout.write(f'Skipped duplicate entry for {username}')
            else:
                self.stdout.write('Skipping user creation due to missing username')
