import { useNavigation } from '@react-navigation/native'
import { UseNavigation } from '../../types/navigation'
import { ImageScreen } from '../../components/ImageScreen'


export function ProfileScreen() {
  const { goBack } = useNavigation<UseNavigation<'Profile'>>()

  return (
    <ImageScreen
      onPressBack={goBack}
      source={require('../../../assets/menu/Profile.png')}
    />
  )
}
