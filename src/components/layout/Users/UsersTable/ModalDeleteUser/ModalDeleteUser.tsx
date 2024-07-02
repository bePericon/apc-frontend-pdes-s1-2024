import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'

import DialogTitle from '@mui/material/DialogTitle'

interface ModalDeleteUserProps {
    open: boolean
    onClose: (needUpdate?: boolean) => void
    onConfirm: () => void
}

const ModalDeleteUser = ({ open, onClose, onConfirm }: ModalDeleteUserProps) => {
    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogTitle>¿Confirma que desea eliminar el usuario?</DialogTitle>
            <DialogActions>
                <Button onClick={() => onClose()} sx={{ color: '#F95738' }}>
                    Cancelar
                </Button>
                <Button onClick={onConfirm} sx={{ color: '#0D3B66' }}>
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ModalDeleteUser
