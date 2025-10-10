export default function Partners() {
  const partners = [
    "INAX", "XINGFA", "SINO ELECTRIC", "CADIVI", "Eurowindow", "AN CƯỜNG", "TOTO"
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Đối Tác
          </h2>
          <p className="text-xl text-gray-600">
            Các đối tác mà chúng tôi đã hợp tác hiện nay trên thị trường
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((partner, index) => (
            <div key={index} className="bg-gray-100 px-8 py-4 rounded-lg hover:bg-gray-200 transition-colors">
              <span className="text-gray-700 font-semibold text-lg">{partner}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
