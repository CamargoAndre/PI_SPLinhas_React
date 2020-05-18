import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Alert, Card } from 'react-native';
import {Ionicons, FontAwesome} from "@expo/vector-icons"
import { TouchableOpacity, LongPressGestureHandler } from 'react-native-gesture-handler';
import * as bus from 'bus-promise';
import { set } from 'react-native-reanimated';

const TelaResultadoBusca = (props) => {

  const [linhas, setLinhas]  = useState(props.navigation.getParam('resultado'))
  const [cordLinha, setCordLinha] = useState([]);
  const [auth, setAuth] = useState(bus.auth('5c32ec06af1099b7310a9e195a66981b80375eb3adc5fd90c4615dfb27347a3c'))



  const adicionarCordLinha = (shape, linha) => {
    //setCordLinha([])
    //shape.map((item) => {
     // setCordLinha((cordLinha) => {
       // return [... cordLinha, {latitude: item.lat , longitude: item.lng}]
     // })
    //})

    let test = shape.map((item) => ({latitude: item.lat , longitude: item.lng}))
    
    props.navigation.navigate("Mapa" , {lin: linha, cordMap: test})
    
      
  }

  if(linhas && linhas.length ){
  } else{
    Alert.alert(
      'Erro',
      'Nenhuma linha encontrada.',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
  }

  const pressHandler = (linha) => {
    Alert.alert('Linha selecionada: ' + linha.item.shapeId)
    

    bus.find({
      auth: auth._v,
      type:'shapes',
      shapeId: linha.item.shapeId
    }).then((response) => {
      
      adicionarCordLinha(response, linha)

    })
    
    //console.log(cordLinha)
    //props.navigation.navigate("Mapa" , {lin: linha, cordMap: cordLinha})

  }

  return (
  
     <View> 
        <FlatList 
          data = {linhas}
          keyExtractor ={linha => linha.lineId}
          renderItem={linha => (
            <TouchableOpacity onPress={() => {pressHandler(linha)} }
            style={estilos.card}
            >
           
              <Text style={estilos.div}>
                <Text style={estilos.label}>Linha: </Text><Text style={estilos.item}>{linha.item.displaySign}-{linha.item.type} </Text>
              </Text> 

              <Text style={estilos.div}>
                <Text style={estilos.label}>Sentido: </Text>
                                
                {linha.item.direction === 1 ? <Text style={estilos.item}>{linha.item.mainTerminal} / {linha.item.secondaryTerminal} </Text> : 
                <Text style={estilos.item}>{linha.item.secondaryTerminal} / {linha.item.mainTerminal} </Text>} 

              </Text>
            </TouchableOpacity>
          )}
        />
    </View>
  );
}
TelaResultadoBusca.navigationOptions = dadosNav => {
  return {
      headerTitle: "Resultado da busca"
  }
}
const estilos = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      marginTop: 30,
      padding:5
  },
  title: {
      fontSize: 30,
      paddingBottom: 5,
      fontWeight: "bold"
  },
  body: {
      fontSize: 15,
      paddingBottom: 25,
      marginTop: 10
  },
  search: {
      height: 40, 
      width: 300,
      borderBottomColor: '#20B2AA', 
      borderBottomWidth: 1,
      marginBottom: 10
  },
    button: {
      marginTop: 30,
      color: '#20B2AA',
      fontSize: 20
  },
  image:{
      width: 100,
      height: 100
  },
  card: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      marginTop: 10,
      borderBottomWidth: 1,
      borderTopColor: "#20B2AA",
      borderTopWidth: 1,
      borderBottomColor: "#20B2AA",
      borderLeftWidth: 1,
      borderLeftColor: "#20B2AA",
      borderRightWidth: 1,
      borderRightColor: "#20B2AA",
      paddingTop: 5,
      paddingLeft: 5
  },
  item: {
      fontSize: 14,
      padding: 2,
      alignSelf: 'flex-start',
      flexDirection: 'row',
      flex: 1,
  },
  label: {
      fontWeight: "bold",
      alignSelf: 'flex-start'
  },
  div: {
      alignSelf: 'flex-start'
  },
  access:{
      fontSize: 32,
      marginBottom: 10,
      marginTop: 5,
      padding: 1,
      color: '#20B2AA'
  },

});



export default TelaResultadoBusca;