from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = "Deletes the users created by the create_users command"

    def handle(self, *args, **options):
        # Delete the users
        user = User.objects.filter(username__startswith="NA")
        # print(str(user))
        user.delete()
        self.stdout.write(self.style.SUCCESS("Users deleted successfully"))
