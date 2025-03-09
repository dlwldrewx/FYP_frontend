export default function PaymentFailed() {
    return (
        <div className="min-h-screen bg-red-50 p-6">
            <h1 className="text-3xl font-semibold mb-6 text-red-600">Payment Failed</h1>
            <p className="mb-4">Oops! Something went wrong with your payment. Please try again.</p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <p>If you continue facing issues, please contact support.</p>
                <div className="mt-4">
                    <a href="/checkout" className="text-blue-500 hover:underline">Go back to checkout</a>
                </div>
            </div>
        </div>
    );
}
