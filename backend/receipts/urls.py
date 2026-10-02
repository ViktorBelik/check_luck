from django.urls import path

from receipts.views import (
    cabinet_page,
    register_receipt,
)

app_name = 'receipts'

urlpatterns = [

    path("cabinet/", cabinet_page, name="cabinet-page",),
    path("register/", register_receipt, name="register-receipt",),

]
