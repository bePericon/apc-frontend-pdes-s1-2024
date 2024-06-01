import { FormControl, IconButton, TextField } from '@mui/material'
import FavoriteService from '@/service/favorite.service'
import { useState } from 'react'
import { Product } from '@/types/meli.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import EditIcon from '@mui/icons-material/Edit'
import { StyledCommentContainer, StyledInnerButtons } from './CommentSection.styled'

interface CommentSectionProps {
    item: Product
}

const CommentSection = ({ item }: CommentSectionProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm<{ comment: string }>({ defaultValues: { comment: item.comment } })
    const watchComment = watch("comment")

    const [editingComment, setEditingComment] = useState(false)

    const handleOnClickEdit = () => setEditingComment(!editingComment)

    const handleOnClickDelete = async () => {
        await FavoriteService.update(item.favoriteId as string, item.rating as number, '')
        setValue('comment', '')
    }

    const onSubmit: SubmitHandler<{ comment: string }> = async (data) => {
        await FavoriteService.update(
            item.favoriteId as string,
            item.rating as number,
            data.comment
        )
        setEditingComment(!editingComment)
    }

    return (
        <StyledCommentContainer>
            <FormControl variant="outlined">
                <TextField
                    id="input-comment"
                    label="Comentario"
                    placeholder='Escriba aquí...'
                    {...register('comment')}
                    disabled={!editingComment}
                    multiline
                    rows={5}
                    maxRows={5}
                    variant="outlined"
                    sx={{ width: 300 }}
                />
            </FormControl>

            <StyledInnerButtons>
                {editingComment && (
                    <IconButton aria-label="save" onClick={handleSubmit(onSubmit)}>
                        <CheckCircleIcon sx={{ color: '#0D3B66' }} />
                    </IconButton>
                )}
                {!editingComment && (
                    <IconButton aria-label="edit" onClick={handleOnClickEdit}>
                        <EditIcon sx={{ color: '#EE964B' }} />
                    </IconButton>
                )}
                {watchComment && <IconButton aria-label="delete" onClick={handleOnClickDelete}>
                    <DeleteIcon sx={{ color: '#F95738' }} />
                </IconButton>}
            </StyledInnerButtons>
        </StyledCommentContainer>
    )
}

export default CommentSection
