import React, {useEffect, useState} from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
  
  const [projects, setProjects] = useState([]);

  useEffect(()=> {
    api.get('/projects').then((response) => {
      setProjects(response.data);
    }, () => console.log('Errou'));
  }, []);
  
  function handleAddProject() {
    api.post('/projects', {
      title: `Projeto Criado as ${Date.now()}`,
      description: 'descrição padrão'
    }).then(response => {
      let newProject = response.data;
      setProjects([...projects, newProject]);
    });

    
  }

  return (
    <>  
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container} >
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({item: project}) => (
            <Text style={styles.project} key={project.id}> {project.title} </Text>
          )}
        />
        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
        

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7159c1',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  project: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 30
  },

  button: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    height: 50,
    margin: 20,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});