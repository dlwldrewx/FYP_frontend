// app/layout.js
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-semibold mb-4">Welcome to Our E-Commerce Store</h1>
      <p className="mb-6">Your one-stop shop for all your needs.</p>
      <Link href="/products">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          See Our Products
        </button>
      </Link>
    </div>
  )
}
