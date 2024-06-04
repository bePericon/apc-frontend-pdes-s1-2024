import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import FavoriteService from '@/service/favorite.service'
import { FavoriteReportItem } from '@/types/report.types'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star'

const TopFiveReportTable = () => {
    const [report, setReport] = useState<FavoriteReportItem[]>([])

    const fetchReport = async () => {
        const { data } = await FavoriteService.getReportTopFive()
        setReport(data)
    }

    useEffect(() => {
        fetchReport()
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Producto</TableCell>
                            <TableCell align="center">Imagen</TableCell>
                            <TableCell align="left">Calificación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {report.map((reportItem) => (
                            <TableRow
                                key={reportItem._id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                        gap: 10,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {reportItem.hydrated.title}
                                </TableCell>
                                <TableCell align="center">
                                    <Image
                                        src={reportItem.hydrated.thumbnail}
                                        width={80}
                                        height={80}
                                        alt={reportItem.hydrated.thumbnail_id}
                                        style={{ borderRadius: 8 }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: 8,
                                            alignItems: 'center'
                                        }}
                                    >
                                        <StarIcon fontSize='small'/>
                                        {reportItem.averageRating}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TopFiveReportTable
