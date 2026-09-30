from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.http import JsonResponse

from .models import Receipt


@login_required
def receipt_list(request):
    receipts = Receipt.objects.filter(
        user=request.user
    ).order_by("-purchase_datetime", "-created_at")

    paginator = Paginator(receipts, 10)

    page_number = request.GET.get("page", 1)
    page = paginator.get_page(page_number)

    results = [
        {
            "id": receipt.id,
            "purchase_date": receipt.purchase_datetime.strftime(
                "%d.%m.%Y %H:%M"
            ),
            "amount": str(receipt.amount),
            "status": receipt.status,
            "status_display": receipt.get_status_display(),
            "rejection_reason": receipt.rejection_reason,
        }
        for receipt in page.object_list
    ]

    return JsonResponse(
        {
            "results": results,
            "pagination": {
                "page": page.number,
                "pages": paginator.num_pages,
                "total": paginator.count,
                "has_next": page.has_next(),
                "has_previous": page.has_previous(),
            },
        }
    )
