import { getAllProjects, getAllPeople } from '@/lib/markdown'
import ProjectCard from '@/components/ProjectCard'
import Header from '@/components/Header'
import Link from 'next/link'

export default function ResearchPage() {
  const projects = getAllProjects()
  const people = getAllPeople()

  const ongoingProjects = projects.filter(p => p.status === 'ongoing')
  const completedProjects = projects.filter(p => p.status === 'completed')

  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col bg-white">
      <Header />

      <main className="flex-grow px-4 py-8">
        <h1 className="text-4xl font-bold mb-12">Research Projects</h1>

        {/* Active Projects */}
        {ongoingProjects.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Active Projects</h2>
            <div className="grid gap-6">
              {ongoingProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  people={people}
                />
              ))}
            </div>
          </section>
        )}

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Completed Projects</h2>
            <div className="grid gap-6">
              {completedProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  people={people}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="space-y-4 mb-4">
        <div className='w-full h-[1px] bg-gray-300' />
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            href="https://aybu.edu.tr"
            className="hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            © 2024 Ankara Yildirim Beyazit University
          </Link>
        </div>
      </footer>
    </div>
  )
} 