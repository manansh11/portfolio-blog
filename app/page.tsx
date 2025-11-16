import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Manansh Shukla
      </h1>
      <div className="mb-4 space-y-4">
        <p>
          I co-founded <a href="https://www.openux.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 underline">OpenUX</a>, where I currently conduct UX research with leading crypto companies and protocols.
        </p>
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
