import mapStyle from './map-style'
import env from './environment'

const apiUrl = env.isBrowserBuild() && env.isQa() ? 'https://qa-api.find.earth/' : 'https://api.find.earth/'

const config = {
  map: {
    key: 'AIzaSyBFDFmn-PL1Kg0frwZUXibuFyuiTPDMsas',
    style: mapStyle,
    icons: {
      male: '/person-male.png',
      female: '/person-female.png'
    }
  },

  api: {
    baseUrl: process.env.API_URL || apiUrl
  },

  contact: {
    email: 'hi@keepe.rs',
    phone: '',
    emergencyPhone: '911'
  },

  social: {
    fbUrl: 'https://www.facebook.com/sharer/sharer.php',
    twUrl: 'https://twitter.com/intent/tweet',
    wpUrl: 'whatsapp://send/?text='
  }
}

export default config
