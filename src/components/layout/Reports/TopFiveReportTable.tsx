import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import FavoriteService from '@/service/favorite.service'
import { FavoriteReportItem } from '@/types/report.types'
import Image from 'next/image'
import StarIcon from '@mui/icons-material/Star'
import {
    StyledTableCellText,
    StyledTableContainer,
    StyledTableHeadText,
} from './Reports.styled'
import { useWidth } from '@/hook/useWidth'

const TopFiveReportTable = () => {
    const [report, setReport] = useState<FavoriteReportItem[]>([])
    const { isMobile } = useWidth()

    const fetchReport = async () => {
        const { data } = await FavoriteService.getReportTopFive()
        setReport(data)
    }

    useEffect(() => {
        fetchReport()
    }, [])

    return (
        <StyledTableContainer>
            <Table sx={{ minWidth: 250 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">
                            <StyledTableHeadText>Producto</StyledTableHeadText>
                        </TableCell>
                        <TableCell align="center">
                            <StyledTableHeadText>Imagen</StyledTableHeadText>
                        </TableCell>
                        <TableCell align="center">
                            <StyledTableHeadText>Calificación</StyledTableHeadText>
                        </TableCell>
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
                                <StyledTableCellText>
                                    {reportItem.hydrated.title}
                                </StyledTableCellText>
                            </TableCell>
                            <TableCell align="center">
                                <Image
                                    src={reportItem.hydrated.thumbnail}
                                    width={isMobile ? 50 : 80}
                                    height={isMobile ? 50 : 80}
                                    alt={reportItem.hydrated.thumbnail_id}
                                    style={{ borderRadius: 8 }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 8,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <StarIcon fontSize="small" />
                                    <StyledTableCellText style={{ marginTop: 4 }}>
                                        {reportItem.averageRating}
                                    </StyledTableCellText>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    )
}

export default TopFiveReportTable
