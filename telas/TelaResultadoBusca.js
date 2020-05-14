import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';



const TelaResultadoBusca = (props) => {

  const [linhas, setLinhas]  = useState(props.navigation.getParam('resultado'))

  return (
  
     <View> 
        <FlatList 
          data = {linhas}
          keyExtractor ={linha => linha.lineId}
          renderItem = {linha => (<Text>{linha.item.mainTerminal}</Text>)}
        />
    </View>
  );
}

const estilos = StyleSheet.create({})

export default TelaResultadoBusca;