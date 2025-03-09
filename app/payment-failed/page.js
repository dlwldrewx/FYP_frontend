export default function PaymentFailed() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
                <h1 className="text-3xl font-semibold text-red-600 flex items-center justify-center space-x-2">
                    ❌ <span className="animate-pulse">Payment Failed</span>
                </h1>
                <p className="text-gray-700 mt-4">
                    Oops! Something went wrong with your payment. Please try again.
                </p>
                
                <div className="mt-6 flex flex-col space-y-4">
                    <a
                        href="/checkout"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Try Again
                    </a>
                    
                    <a
                        href="/support"
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
