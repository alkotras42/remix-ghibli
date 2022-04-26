import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Film, getFilms } from '~/api/fimls'
import styles from '../../tailwind.css'

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const title = url.searchParams.get('title')
  if (title) {
    return getFilms(title)
  }
  return getFilms()
}

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Films | Studio Ghibli',
  description: 'List of films',
  viewport: 'width=device-width,initial-scale=1',
})

export default function FilmIndex() {
  const fimls = useLoaderData<Film[]>()
  return (
    <div className='p-16 font-sans'>
      <h1 className='text-5xl font-bold text-center'>Studio Ghibli Films</h1>
      <Form className='py-5'>
        <label htmlFor='' className='font-bold'>
          Search <input type='text' name='title' placeholder='Type a title...' className='border-2 rounded py-2 px-3' />
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2'>
            Search
          </button>
        </label>
      </Form>
      <div className='grid grid-cols-4 gap-4'>
        {fimls.map((film) => (
          <Link key={film.title} to={film.id} className='hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer' prefetch='intent'>
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  )
}
