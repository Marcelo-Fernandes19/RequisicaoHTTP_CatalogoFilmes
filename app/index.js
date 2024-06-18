import { Text, View, StyleSheet,ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import api from "../src/services/api";
import Filmes from "../src/Filmes";


export default function Index() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{

    async function loadFilmes(){
      const reponse = await api.get('r-api/?api=filmes');
      setFilmes(reponse.data);
      setLoading(false);
    }

    loadFilmes();
    
  }, []);

  if(loading){
    return(
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <ActivityIndicator color= '#121212' size={45}/>
      </View>
    )
  }else{

  return (
    <View style = {styles.container}>

      <FlatList 
      data={filmes}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => <Filmes data={item}/>}
      /> 

    </View>
  );
}
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  }
});