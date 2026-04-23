namespace RichBackend.Models
{
    public class PaymentRequest
    {
        public int Id { get; set; }

        // React'tan gelen 'cardHolderName' verisini karşılamak için ekledik
        public string CardHolderName { get; set; } = string.Empty;

        public string CardNumber { get; set; } = string.Empty;

        public string ExpiryDate { get; set; } = string.Empty;

        public string Cvv { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }
    }
}