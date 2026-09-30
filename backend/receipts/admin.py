from django.contrib import admin

from .models import Receipt


@admin.register(Receipt)
class ReceiptAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "purchase_datetime",
        "amount",
        "status",
        "created_at",
    )

    ordering = ("purchase_datetime",)

    list_filter = (
        "status",
        "purchase_datetime",
    )

    search_fields = (
        "fn",
        "fd",
        "fp",
        "user__username",
    )

    readonly_fields = (
        "created_at",
    )
