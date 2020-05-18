import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Polyline } from 'react-native-maps'
import * as bus from 'bus-promise';


const TelaMapa = (props) => {

  const [linha, setLinha] = useState(props.navigation.getParam('lin'))

  const[linhaMap, setLinhaMap] = useState(props.navigation.getParam('cordMap'))
  
  
  return (
  
     <View style={estilos.container}> 
        <Text> {linha.item.mainTerminal} </Text>
        <MapView
          style= {estilos.map}
          initialRegion={{
            latitude: -23.5489,
            longitude: -46.6388,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Polyline
            coordinates={linhaMap}
            strokeColor='#04B4AE'
            strokeWidth={8}
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
})

export default TelaMapa;