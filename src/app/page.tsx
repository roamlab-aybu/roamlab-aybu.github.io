import { getAllPeopleWithCategories, getNews } from '@/lib/markdown'
import Header from '@/components/Header'
import PersonCard from '@/components/PersonCard'

export default function Home() {
  const people = getAllPeopleWithCategories()
  const news = getNews()

  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* About Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Aybu Roam Laboratory</h2>
            <p className="text-gray-700 leading-relaxed">
              Our laboratory at Ankara Yildirim Beyazit University focuses on cutting-edge research
              in quantum computing and related fields. We are dedicated to pushing
              the boundaries of knowledge and fostering innovation through
              collaborative research.
            </p>
          </div>
        </section>

        {/* News Section */}
        {news.length > 0 && (
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Latest News</h2>
              <div className="space-y-6">
                {news.map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <div className="text-sm text-gray-500">{item.date}</div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-700">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* People Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12">Our Team</h2>

            {/* Faculty */}
            {people.faculty.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Faculty</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {people.faculty.map((person) => (
                    <PersonCard key={person.slug} {...person} />
                  ))}
                </div>
              </div>
            )}

            {/* Graduate Students */}
            {people.graduate.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Graduate Students</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {people.graduate.map((person) => (
                    <PersonCard key={person.slug} {...person} />
                  ))}
                </div>
              </div>
            )}

            {/* Undergraduate Students */}
            {people.undergraduate.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-semibold mb-6">Undergraduate Students</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {people.undergraduate.map((person) => (
                    <PersonCard key={person.slug} {...person} />
                  ))}
                </div>
              </div>
            )}

            {/* Alumni */}
            {people.alumni.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-6">Alumni</h3>
                <div className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {people.alumni.map((person) => (
                    <div key={person.slug}>
                      {person.websiteUrl ? (
                        <a href={person.websiteUrl} target="_blank" rel="noopener noreferrer">
                          <span className="text-blue-500 hover:underline">{person.name}</span>
                          {person.graduationBio && ` (${person.graduationBio})`}
                        </a>
                      ) : (
                        <div>
                          {person.name} ({person.graduationBio})
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="space-y-4 mb-4">
        <div className='w-full h-[1px] bg-gray-300' />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <a
            href="https://aybu.edu.tr"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2024 Ankara Yildirim Beyazit University
          </a>
        </div>
      </footer>
    </div>
  )
}
