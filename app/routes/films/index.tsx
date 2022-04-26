import type { LinksFunction, LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import styles from '../../tailwind.css'

export const loader: LoaderFunction = async () => {
  const response = await fetch('https://ghibliapi.herokuapp.com/films')

  return response.json()
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
  const fimls = useLoaderData()
  return (
    <div>
      <h1>Films </h1>
      <div>
        {fimls.map((film) => (
          <div>{film.title}</div>
        ))}
      </div>
    </div>
  )
}
