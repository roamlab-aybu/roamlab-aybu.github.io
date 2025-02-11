import { getAllProjects, getAllPeople, markdownToHtml } from '@/lib/markdown'
import Header from '@/components/Header'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Add this function to generate static params
export function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

interface ProjectPageProps {
  params: {
    slug: string
  }
}

interface ProjectImage {
  url: string
  caption?: string
}

function extractImagesFromMarkdown(content: string): ProjectImage[] {
  const imageRegex = /!\[(.*?)\]\((.*?)\)(?:\n_?(.*?)_)?/g
  const images: ProjectImage[] = []
  let match

  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      url: match[2],
      caption: match[3] || match[1] || ''
    })
  }

  return images
}

async function getProjectContent(slug: string, status: 'ongoing' | 'completed') {
  const filePath = path.join(process.cwd(), 'content/projects', status, `${slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await markdownToHtml(content)
  return { data, htmlContent, content }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug

  const projects = getAllProjects()
  const project = projects.find(p => p.slug === slug)

  if (!project) {
    notFound()
  }

  const { htmlContent, content } = await getProjectContent(slug, project.status)
  const people = getAllPeople()

  const images = extractImagesFromMarkdown(content)
  const teamMembers = project.team.map(slug => people[slug]).filter(Boolean)

  return (
    <div className="min-h-screen max-w-4xl mx-auto flex flex-col bg-white">
      <Header />

      <main className="flex-grow px-4 py-8">
        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{project.description}</p>

          {/* Project Status Badge */}
          <span className={`inline-block rounded-full px-4 py-1 text-sm font-semibold ${project.status === 'ongoing'
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
            }`}>
            {project.status === 'ongoing' ? 'Active Project' : 'Completed Project'}
          </span>
        </div>

        {/* Project Images Gallery */}
        {images.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((image, index) => (
                <figure key={index} className="relative">
                  <div className="relative aspect-video">
                    <Image
                      src={image.url}
                      alt={image.caption || 'Project image'}
                      fill
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      className="object-cover rounded-lg"
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="mt-2 text-sm text-gray-600 text-center">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* Team Members Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Research Team</h2>
          <div className="flex flex-wrap gap-6">
            {teamMembers.map((person) => (
              <a
                key={person.slug}
                href={person.websiteUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12">
                  <Image
                    src={person.image || '/placeholder-avatar.png'}
                    alt={person.name}
                    width={48}
                    height={48}
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{person.name}</h3>
                  <p className="text-sm text-gray-600">{person.bio}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Project Content */}
        <section>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
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