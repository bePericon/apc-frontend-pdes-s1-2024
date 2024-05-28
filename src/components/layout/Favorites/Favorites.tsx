import {
    StyledContainerSection,
    StyledFavoritesContainer,
} from './Favorites.styled'
import useSearch from '@/hook/useSearch'
import { useEffect, useRef, useState } from 'react'
import debounce from 'lodash.debounce'
import Navbar from '../Navbar/Navbar'

const Favorites = () => {

    return (
        <StyledFavoritesContainer>
            <StyledContainerSection withColor>
                <Navbar />
            </StyledContainerSection>
            <StyledContainerSection withColor>
                Contenido
            </StyledContainerSection>
        </StyledFavoritesContainer>
    )
}

export default Favorites
