import React, {useState} from 'react';
import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import MapView, { Polyline, Marker, Callout } from 'react-native-maps'
import * as bus from 'bus-promise';
import { set } from 'react-native-reanimated';



const TelaMapa = (props) => {

  const [linha, setLinha] = useState(props.navigation.getParam('lin'))

  const[linhaMap, setLinhaMap] = useState(props.navigation.getParam('cordMap'))
  const[primeiro, setPrimeiro] = useState(props.navigation.getParam('posInical'))
  const[ultimo, setUltimo] = useState(props.navigation.getParam('posFinal'))
  const [posicoes, setPosicoes] = useState(props.navigation.getParam('posicaoBus'))
  const[firstTime, setFirstTime] = useState(1);

  let latitude = (parseFloat(ultimo.latitude) + parseFloat(primeiro.latitude)) / 2;
  let longitude = (parseFloat(ultimo.longitude) + parseFloat(primeiro.longitude)) / 2;

  let position = <Text></Text>

  console.log(posicoes.vehicles)

  if(posicoes.vehicles === null){
    Alert.alert(
      'Onibus não encontrado',
      'Nenhuma onibus em operação no momento.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )

  }else{

    if(firstTime === 1){
    
      position = posicoes.vehicles.map((pos) =>
      
      
        <Marker key= {pos.lat}
              coordinate={{latitude: parseFloat(pos.lat) , longitude: parseFloat(pos.lng)}}
            > 
              <Image 
                style={estilos.imagem}
                source={require('../assets/Onibus1.png')}/>
        </Marker>
      )
      

      setFirstTime(2)
      
    }

  }

  
  return (
  
     <View style={estilos.container}> 
        <Text> {linha.item.mainTerminal} </Text>
        <MapView
          style= {estilos.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{latitude: parseFloat(primeiro.latitude) , longitude: parseFloat(primeiro.longitude)}}
          > 
            <Image 
              style={estilos.imagem}
              source={require('../assets/pontoInicial.png')}/>
              <Callout>
                <Text> Inicio do Trajeto </Text>
            </Callout>
          </Marker> 
          <Marker
            coordinate={{latitude: parseFloat(ultimo.latitude) , longitude: parseFloat(ultimo.longitude)}}
          > 
            <Image 
              style={estilos.imagem}
              source={require('../assets/pontoFinal.png')}/>
            <Callout>
              <Text> Fim do Trajeto </Text>
            </Callout>
          </Marker> 

          {position}
          
          <Polyline
            coordinates={linhaMap}
            strokeColor='#04B4AE'
            strokeWidth={6}
          />



        </MapView>
  
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding:5
},
  map: {
    height: '100%',
    width: '100%',
  },
  imagem: {
    height: 40,
    width: 40,
  }
})

export default TelaMapa;