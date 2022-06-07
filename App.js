import React,{useState,useEffect} from 'react'
import {View, StyleSheet,Image, TouchableOpacity} from 'react-native'
import Torch from 'react-native-torch'
import RNShake from 'react-native-shake'

//import de imagens
import imageOff from './assets/icons/eco-light-off.png'
import imageOn from './assets/icons/eco-light.png'


const App = () => {
  const [toggle, setToggle] = useState(false)

  const handleChangeToggle = () => setToggle((oldToggle) => !oldToggle)

  useEffect(()=>{
    //ligar flash do celular
    Torch.switchState(toggle)    
  },[toggle])

  useEffect(() => {
    
    //toggle será modifica ao chacoalhar o celular
    const subscription = RNShake.addListener(() => {
      setToggle((oldToggle) => !oldToggle)
    })
    
    //chamado quando o componente for ser desmontado
    return () => subscription.remove()

  },[])

  return <View style={toggle ? style.containerLight : style.container }>
    <TouchableOpacity onPress = {handleChangeToggle} >
      <Image
            style={toggle ? style.lightingOn : style.lightingOff} 
            source={toggle ? imageOn : imageOff}  
            />
      <Image
            style={ style.dioioLogo} 
            source={
              toggle 
              ? require('./assets/icons/logo-dio.png')
              : require('./assets/icons/logo-dio-white.png')}  
              />
    </TouchableOpacity>
  </View>
}


export default App;

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerLight:{
    flex:1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor:'white',
    width: 150,
    height: 150
  },  
  dioioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250
  },
})