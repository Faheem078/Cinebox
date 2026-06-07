import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import CreditApisFetching from './CreditApisFetching';

export default function CreditsMoviesAPi({}) {
       const { id } = useLocalSearchParams();


    return(
        <CreditApisFetching api={`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e7783a6a3bf804ec4011f13935e14b8`} />
    )
}