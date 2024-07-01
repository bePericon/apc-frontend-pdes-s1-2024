import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import UserService from '@/service/user.service'
import { UserReportItem } from '@/types/report.types'
import Image from 'next/image'
import {
    StyledTableCellText,
    StyledTableContainer,
    StyledTableHeadText,
} from '../../Reports.styled'
import { useWidth } from '@/hook/useWidth'
import { Typography } from '@mui/material'
import { StyledTableCellTextEmail } from './TopFiveMustPurchasesReportTable.styled'

const TopFiveMustPurchasesReportTable = () => {
    const [report, setReport] = useState<UserReportItem[]>([])
    const { isMobile } = useWidth()

    const fetchReport = async () => {
        const { data } = await UserService.getReportTopFiveMustPurchases()
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
                            <StyledTableHeadText>Usuario</StyledTableHeadText>
                        </TableCell>
                        <TableCell align="center">
                            <StyledTableHeadText>Cantidad de compras</StyledTableHeadText>
                        </TableCell>
                        <TableCell align="center">
                            <StyledTableHeadText>Última realizada</StyledTableHeadText>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {report.map((reportItem) => (
                        <TableRow
                            key={reportItem.user._id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                    gap: 10,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <StyledTableCellText>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: 8,
                                        }}
                                    >
                                        {`${reportItem.user.name} ${reportItem.user.surname}`}
                                        <StyledTableCellTextEmail>
                                            {`(${reportItem.user.email})`}
                                        </StyledTableCellTextEmail>
                                    </div>
                                </StyledTableCellText>
                            </TableCell>
                            <TableCell align="center">
                                <StyledTableCellText style={{ marginTop: 4 }}>
                                    {reportItem.count}
                                </StyledTableCellText>
                            </TableCell>
                            <TableCell align="center">
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 24,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography sx={{ color: 'grey', width: 200 }}>
                                        {reportItem.lastPurchase.hydrated.title}
                                    </Typography>
                                    <Image
                                        src={reportItem.lastPurchase.hydrated.thumbnail}
                                        width={isMobile ? 50 : 80}
                                        height={isMobile ? 50 : 80}
                                        alt={
                                            reportItem.lastPurchase.hydrated.thumbnail_id
                                        }
                                        style={{ borderRadius: 8 }}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    )
}

export default TopFiveMustPurchasesReportTable
