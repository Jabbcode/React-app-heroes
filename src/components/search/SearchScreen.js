import React, { useMemo, useState } from 'react'
import queryString from 'query-string'

import { getHeroesByName } from '../../selectors/getHeroesByName'
import { useLocation } from 'react-router-dom'
import { HeroCard } from '../heroes/HeroCard'

export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search)

    const [form, setForm] = useState({
        heroe: q
    })


    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])


    const handleSubmit = (e) => {
        e.preventDefault()

        history.push(`?q=${form}`)
    }

    const handleChange = (e) => {
        const heroe = e.target.value
        setForm(heroe)
    }


    return (
        <div className='animate__animated animate__fadeIn'>
            <h1>Search</h1>
            <hr />

            <div className='row'>
                <div className='col-5'>
                    <h4>Search Form</h4>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder='Find your hero'
                            className='form-control'
                            name='heroe'
                            autoComplete='off'
                            value={form.heroe}
                            onChange={handleChange}
                        />

                        <div className="d-grid gap-2">

                            <button
                                type='submit'
                                className='btn mt-2 btn-block btn-outline-primary'
                            >
                                Search...
                            </button>
                        </div>

                    </form>
                </div>

                <div className='col-7'>
                    <h4> Results </h4>
                    <hr />

                    {
                        (q === '')
                            && 
                            <div className='alert alert-info'>
                                Search a hero
                            </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0)
                            && 
                            <div className='alert alert-danger'>
                                There is no a hero with { q }
                            </div>
                    }

                    {
                        heroesFiltered.map(heroe => (
                            <HeroCard
                                key={heroe.id}
                                {...heroe}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
