import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, } from 'react-native';
import { SafeAreaView, SafeAreaProvider, } from 'react-native-safe-area-context';
import KartuProfil from './components/KartuProfil';

export default class App extends Component {
  // a.inisialisasi state
  constructor(props) {
    super(props);
    this.state = {
      kodeKelas: '',
      isHadir: false,
      waktuAbsen: '',
      jamRealtime: 'Memuat jam...',
    };

    this.studentData = {
      nama: 'Alyza Septia Anjani',
      nim: '0920240015',
      prodi: 'TRPL - Politeknik Astra',
    };
  }

  // b.fase mounting (komponen lahir)
  componentDidMount() {
    console.log('[MOUNTING] Aplikasi Presensi Dibuka.');

    this.intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      this.setState({ jamRealtime: waktu });
    }, 1000);
  }

  // c.fase updating (komponen berubah)
  componentDidUpdate(prevProps, prevState) {
    if(this.state.isHadir === true && prevState.isHadir === false) {
      console.log(`[UPDATING] Sukses presensi pada pukul: ${this.state.waktuAbsen}`);
    }
  }

  // d.fase unmounting (komponen mati)
  componentWillUnmount() {
    console.log('[UNMOUNTING] Aplikasi Ditutup. Membersihkan memori...');
    clearInterval(this.intervalJam);
  }

  // e. logika event handler
  handleAbsen = () => {
    if (this.state.kodeKelas.trim() === '') {
      alert('Masukkan kode kelas (Simulasi QR) terlebih dahulu!');
      return;
    }

    this.setState({
    isHadir: true,
    waktuAbsen: this.state.jamRealtime
    });
  };

  // f.fungsi render wajib
  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sistem Presensi</Text>
            <Text style={styles.clockText}>{this.state.jamRealtime}</Text>
          </View>

          <KartuProfil student={this.studentData} />

          <View style={styles.actionSection}>
            {this.state.isHadir ? (
              <View style={styles.successCard}>
                <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }}
                style={styles.successIcon}
                />
              <Text style={styles.successText}>Presensi Berhasil!</Text>
              <Text style={styles.timeText}>Tercatat pada: {this.state.waktuAbsen} WIB</Text>
              <Text style={styles.codeText}>Kode Terverifikasi: {this.state.kodeKelas}</Text>
              </View>

            ) : (
              <View style={styles.inputCard}> 
                <Text style={styles.instructionText}>Masukkan Kode Kelas:</Text>
                <Text style={styles.noteText}>Simulasi dari hasil Scan QR Kamera</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Contoh: TRPL-03'
                  value={this.state.kodeKelas}
                  onChangeText={(text) => this.setState({ kodeKelas: text })}
                  autoCapitalize='characters'
                />

                <TouchableOpacity style={styles.buttonSubmit} onPress={this.handleAbsen}>
                  <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
  },
  header: {
    backgroundColor: '#0056A0',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#D1E8FF',
    fontSize: 14,
    marginTop: 5,
  },
  actionSection: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  inputCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    elevation: 2,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
    color: '#333',
  },
  buttonSubmit: {
    backgroundColor: '#0056A0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successCard: {
    backgroundColor: '#E8F5E9', // Latar belakang hijau lembut
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  successIcon: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: '#388E3C',
    marginBottom: 5,
  },
  codeText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontFamily: 'monospace',
  },
});
