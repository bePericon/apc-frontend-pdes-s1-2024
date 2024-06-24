import { render } from '@/utils/testing'
import { Product } from '@/types/meli.types'
import '@testing-library/jest-dom'
import CardProductWithModal from './CardProductWithModal'

describe('CardItemList', () => {
    const product: Product = {
        favoriteId: '6657c4c295902dba19168195',
        createdDateFavorite: '2024-05-30T00:13:54.967Z',
        user: '6647867aa9551b91eb2e36e1',
        itemId: 'MLA1411220617',
        comment: '',
        rating: 9,
        hydrated: {
            itemId: 'MLA1411220617',
            title: 'Samsung Galaxy S22 Ultra 5g (snapdragon) 5g 512 Gb  Phantom Black 12 Gb Ram',
            thumbnail: 'http://http2.mlstatic.com/D_913503-MLA52132116989_102022-O.jpg',
            thumbnail_id: '913503-MLA52132116989_102022',
            pictures: [
                {
                    url: 'http://http2.mlstatic.com/D_913503-MLA52132116989_102022-O.jpg',
                    secure_url:
                        'https://http2.mlstatic.com/D_913503-MLA52132116989_102022-O.jpg',
                    size: '250x500',
                    max_size: '392x784',
                    quality: '',
                    id: '913503-MLA52132116989_102022',
                },
                {
                    size: '250x500',
                    max_size: '532x1064',
                    quality: '',
                    id: '982637-MLA52132138394_102022',
                    url: 'http://http2.mlstatic.com/D_982637-MLA52132138394_102022-O.jpg',
                    secure_url:
                        'https://http2.mlstatic.com/D_982637-MLA52132138394_102022-O.jpg',
                },
            ],
            price: 1849999,
        },
    }

    it('should render correctly', () => {
        const result = render(
            <CardProductWithModal
                item={product}
                index={0}
                renderModalComponent={() => {}}
            />
        )

        expect(result).toMatchSnapshot()
    })

    it('should show correct title', () => {
        const { getByText } = render(
            <CardProductWithModal
                item={product}
                index={0}
                renderModalComponent={() => {}}
            />
        )

        expect(getByText(/Samsung Galaxy/)).toBeInTheDocument()
    })
})
