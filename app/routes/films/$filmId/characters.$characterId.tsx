import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { FilmCharacter, getFilmCharacter } from '~/api/fimls'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.characterId, 'expected params.characterId')

  return getFilmCharacter(params.characterId)
}

export default function Character() {
  const characterDetails = useLoaderData<FilmCharacter>()
  return (
    <div className='mb-3'>
      <div className='text-3xl mb-2'>Character Details</div>
      <div className='p-4 rounded shadow-lg border'>
        <div className='text-gray-700 font-bold text-xl mb-2'>{characterDetails.name}</div>
        <ul className='py-2'>
          <li>Gender: {characterDetails.gender}</li>
          <li>Age: {characterDetails.age}</li>
          <li>Eye Color: {characterDetails.eye_color}</li>
          <li>Hair Color: {characterDetails.hair_color}</li>
        </ul>
      </div>
    </div>
  )
}
