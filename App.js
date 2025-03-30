import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { useState } from 'react';
import BouncyCheckbox from "react-native-bouncy-checkbox";

export default function App() {
  const [monstrarMeses, setMostrarMeses] = useState(false);
  const [anosSelect, setAnosSelect] = useState([]);
  const [textDias, setTextDias] = useState(0);
  
  const data = [
    { value: '2025' },
    { value: '2024' },
    { value: '2023' },
    { value: '2022' },
    { value: '2021' },
    { value: '2020' },
    { value: '2019' },
  ];

  const meses = [
    {
      name: 'Janeiro',
      dias: '30',
    },
    {
      name: 'Fevereiro',
      dias: '28',
    },
    {
      name: 'Março',
      dias: '31',
    },
    {
      name: 'Abril',
      dias: '30',
    },
    {
      name: 'Maio',
      dias: '31',
    },
    {
      name: 'Junho',
      dias: '30',
    },
    {
      name: 'Julho',
      dias: '31',
    },
    {
      name: 'Agosto',
      dias: '31',
    },
    {
      name: 'Setembro',
      dias: '30',
    },
    {
      name: 'Outubro',
      dias: '31',
    },
    {
      name: 'Novembro',
      dias: '30',
    },
    {
      name: 'Dezembro',
      dias: '31',
    },
  ];

  function calcula() {
    let dias = 0;
    anosSelect.forEach(ano => {
      ano = parseInt(ano);
      dias += ano % 4 === 0 ? 366 : 365;
    });
    setTextDias(dias);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.textTitle}>Cálculo de dias</Text>
        <Text style={styles.textMultiSelect}>Selecione um ano</Text>
        
        <MultiSelect
          search
          data={data}
          labelField="value"
          valueField="value"
          placeholder="Selecione o ano"
          searchPlaceholder="Pesquisar"
          value={anosSelect}
          onChange={(item) => setAnosSelect(item)}
          style={styles.picker}
        />

        <BouncyCheckbox
          size={30}
          text='Mostrar meses'
          onPress={setMostrarMeses}
          style={styles.checkBox}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={calcula}
        >
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        {
          monstrarMeses ?
          anosSelect.map((ano, i) => (
            <Text style={styles.textoAnos} key={ano}>
              {ano}:{'\n\n'}
              {
                meses.map((mes, j) => (
                  <Text key={`${mes.name}${i}`}>
                    {mes.name} - {j === 1 ? '29' : mes.dias}
                    {'\n'}
                  </Text>
                ))
              }
              {'\n'}
            </Text>
          ))
          : ''
        }
        {
          textDias ?
          <Text style={styles.textoDias}>
            {textDias} Dias totais
          </Text>
          : ''
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 16,
  },
  textTitle: {
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  textMultiSelect: {
    marginBottom: 8,
    fontSize: 24,
  },
  textoAnos: {
    fontSize: 18,
  },
  textoDias: {
    textAlign: 'center',
    fontSize: 18,
  },
  checkBox: {
    marginBottom: 20,
    marginTop: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
