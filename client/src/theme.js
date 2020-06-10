import { createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import yellow from '@material-ui/core/colors/yellow'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: yellow,
        error: red
    },
    overrides: {
        MuiInput: {
            underline:{
                borderColor: 'rgba(255, 255, 255, 0.23)'
            }
        },
        'MuiAutocomplete-root': {
            borderColor: '#fff'
        }
    }
})

export default theme
