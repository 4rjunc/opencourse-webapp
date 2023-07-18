from django.contrib import admin
from . import models

# Get all model classes defined in the models module
model_classes = [
    getattr(models, name)
    for name in dir(models)
    if isinstance(getattr(models, name), type)
]

# Register all model classes
for model_class in model_classes:
    admin.site.register(model_class)
