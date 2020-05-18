import React, {useState} from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps'
import * as bus from 'bus-promise';



const TelaMapa = (props) => {

  const [linha, setLinha] = useState(props.navigation.getParam('lin'))

  const[linhaMap, setLinhaMap] = useState(props.navigation.getParam('cordMap'))
  const[primeiro, setPrimeiro] = useState(props.navigation.getParam('posInical'))
  const[ultimo, setUltimo] = useState(props.navigation.getParam('posFinal'))

  let latitude = (parseFloat(ultimo.latitude) + parseFloat(primeiro.latitude)) / 2;
  let longitude = (parseFloat(ultimo.longitude) + parseFloat(primeiro.longitude)) / 2;


  
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
            coordinate={primeiro}
          > 
            <Image 
              style={estilos.imagem}
              source={require('../assets/pontoInicial.png')}/>
          </Marker> 
          <Marker
            coordinate={ultimo}
          > 
            <Image 
              style={estilos.imagem}
              source={require('../assets/pontoFinal.png')}/>
          </Marker> 


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