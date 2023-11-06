import React from 'react'
import { Link, Box, Container, Typography, Stack } from '@mui/material'
import { ReactComponent as QuadrantLogoFooter } from '../../assets/images/quadrant/quadrant-logo-footer.svg'

const Footer = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingBottom: '0.8rem',
        marginTop: '30px',
        marginBottom: '0.5rem',
        position: 'relative'
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
        <Box display={{ xs: 'none', md: 'flex' }}>
          <QuadrantLogoFooter height={30} />
        </Box>
        <Box>
          <Typography
            component="p"
            sx={{ margin: '0', color: '#777777', fontSize: '0.8571rem', fontQeight: '300' }}
          >
            ¿Necesitas ayuda? escríbenos a{' '}
            <Link
              sx={{ fontWeight: '500', color: '#777777 !important' }}
              underline="hover"
              href="mailto:clientes@quadrant.pe"
            >
              clientes@quadrant.pe
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Container>
  )
}

export default Footer
