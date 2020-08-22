import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './src/services/api';

const mobile = () => {
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    async function loadProjects(){
      const response = await api.get('/projects');
      console.log(response.data)
      setProjects(response.data);
    }
    loadProjects();
  },[])

  async function handleAddProject(){
    const response = await api.post('/projects',{
      title:'Sirius',
      owner:'William'
    })

    const newProject = response.data;

    setProjects([...projects, newProject]);
  }

  return(
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      <View style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project=>project.id}
          renderItem={({item})=>(
            <TouchableOpacity style={{marginBottom:10, borderBottomWidth:1, borderBottomColor:'#eee', paddingVertical:6}}>
              <Text style={{color:'#fff', fontWeight:'bold'}}>{item.title}</Text>
              <Text style={{color:'#d8d8d8'}}>Owner {item.owner}</Text>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity style={styles.buttonSave} onPress={handleAddProject}>
          <Text style={styles.buttonSaveText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#7159c1',
    padding:20,
  },

  buttonSave:{
    backgroundColor:'#27ae60',
    paddingHorizontal:25,
    paddingVertical:20,
    borderRadius:10,
    marginVertical:20,
    justifyContent:'center',
    alignItems:'center',
  },

  buttonSaveText:{
    color:'#fff',
    fontWeight:'bold',
  }

})

export default mobile;