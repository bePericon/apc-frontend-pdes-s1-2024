import { Skeleton } from '@mui/material'
import { StyledSkeletonContainer, StyledSkeletonInfoContainer } from './Modal.styled'
import { useWidth } from '@/hook/useWidth'

const CardProductSkeleton = ({
    showCommentSection,
}: {
    showCommentSection?: boolean
}) => {
    const { isMobile } = useWidth()

    return (
        <StyledSkeletonContainer>
            <Skeleton
                variant="rectangular"
                width={isMobile ? 300 : 400}
                height={isMobile ? 240 : 400}
            />

            <StyledSkeletonInfoContainer>
                <Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '100%' }} />
                <Skeleton variant="text" sx={{ fontSize: '2.5rem', width: '70%' }} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        width: '100%',
                    }}
                >
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '30%' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '10%' }} />
                </div>
                <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '30%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '60%' }} />
                <Skeleton variant="text" sx={{ fontSize: '1.2rem', width: '70%' }} />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        gap: 16,
                        width: '100%',
                    }}
                >
                    <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '25%' }} />
                </div>

                {showCommentSection && (
                    <>
                        <Skeleton variant="rectangular" width={'100%'} height={120} />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: 16,
                                width: '100%',
                            }}
                        >
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.5rem', width: '10%' }}
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.5rem', width: '10%' }}
                            />
                        </div>
                    </>
                )}
            </StyledSkeletonInfoContainer>
        </StyledSkeletonContainer>
    )
}

export default CardProductSkeleton
