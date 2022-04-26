import type { LoaderFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { Film, getFilmById } from '~/api/fimls'
import CharacterList from '~/components/CharacterList'
import FilmBanner from '~/components/FilmBanner'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.filmId, 'expected params.filmId')

  const film = await getFilmById(params.filmId)

  return film
}

export default function Film() {
  const film = useLoaderData<Film>()
  return (
    <div>
      <FilmBanner film={film} />
      <div className='p-10'>
        <p>{film.description}</p>
        <div className='flex py-5 space-x-5'>
          <CharacterList characters={film.characters} />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
