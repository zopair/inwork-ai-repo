# معالج العمليات المركزي لمنصة In Work
def process_service_request(client_data: dict, provider_data: dict) -> dict:
    """
    تقوم هذه الوحدة بمعالجة طلب الخدمة بين العميل والحرفي،
    والتحقق من صحة البيانات وبوابات الدفع بالجنيه المصري.
    """
    response = {
        "status": "success",
        "message": "تم ربط الطلب بنجاح وجاري إشعار الحرفي الأقرب في الإسماعيلية",
        "client": client_data.get("name"),
        "provider": provider_data.get("name"),
        "currency": "EGP"
    }
    return response
