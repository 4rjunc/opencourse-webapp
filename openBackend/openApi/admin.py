from django.contrib import admin
from .models import OC

#.site.register(OC)

from django.http import HttpResponse
import csv

def export_model_to_csv(modeladmin, request, queryset):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="Open_Course.csv"'

    writer = csv.writer(response)
    fields = [field.name for field in OC._meta.fields]  # Replace YourModel with your model name

    writer.writerow(fields)
    for obj in queryset:
        writer.writerow([str(getattr(obj, field)) for field in fields])

    return response

class OCAdmin(admin.ModelAdmin):
    actions = [export_model_to_csv]

admin.site.register(OC, OCAdmin)  
