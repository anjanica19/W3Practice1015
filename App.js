import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, Image, View, TouchableOpacity } from 'react-native';
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import KartuProfil from './components/KartuProfil'


export default function App() {
  // a.inisialisasi state
  const [kodeKelas, setKodeKelas] = useState('');
  const [isHadir, setIsHadir] = useState(false);
  const [waktuAbsen, setWaktuAbsen] = useState('');
  const [jamRealtime, setJamRealTime] = useState('Memuat jam...');

  const studentData = {
    nama: 'Alyza Septia Anjani',
    nim: '0920240015',
    prodi: 'TRPL - Politeknik Astra',
  };

  // b.menggabungkan mounting & unmounting
  useEffect(() => {
    console.log('[MOUNTING] Aplikasi dibuka (via useEffect). Jam menyala');

    const intervalJam = setInterval(() => {
      const waktu = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      setJamRealTime(waktu);
    }, 1000);

    // cleanup function
    return() => {
      console.log('[UNMOUNTING] Aplikasi ditutup. Membersihkan interval jam!');
    };
  }, []);

  // c.menggantikan componentdidUpdate
  useEffect(() => {
    if (isHadir === true) {
      console.log(`[UPDATING] Sukses presensi pada pukul: ${waktuAbsen}`);
    }
  }, [isHadir, waktuAbsen]);

   // d.event handler
   const handleAbsen = () => {
    if (kodeKelas.trim() === '') {
      alert('Masukkan kode kelas terlebih dahulu!');
      return;
    }
    setIsHadir(true);
    setWaktuAbsen(jamRealtime);
   };

   // e.return UI
   return(
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sistem Presensi</Text>
          <Text style={styles.clockText}>{jamRealtime}</Text>
        </View>

        <KartuProfil student={studentData} />

        <View style={styles.actionSection}>
          {isHadir ? (
            <View style={styles.successCard}>
              <Image
                source={{ uri: 'http://cdn-icons-png.flaticon.com/512/190/190411.png'}}
                style={styles.successIcon}
              />
              <Text style={styles.successText}>Presensi Berhasil!</Text>
              <Text style={styles.timeText}>Tercatat pada: {waktuAbsen} WIB</Text>
              <Text style={styles.codeText}>Kode Terverifikasi: {kodeKelas}</Text>
            </View>
          ) : (
            <View style={styles.inputCard}>
              <Text style={styles.instructionText}>Masukkan Kode Kelas:</Text>
              <Text style={styles.noteText}>(Simulasi dari hasil Scan QR Kamera)</Text>

              <TextInput
              style={styles.input}
              placeholder="Contoh: TRPL-03"
              value={kodeKelas}
              onChangeText={setKodeKelas}
              autoCapitalize="characters"
              />

              <TouchableOpacity style={styles.buttonSubmit} onPress={handleAbsen}>
                <Text style={styles.buttonText}>Konfirmasi Kehadiran</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
   );
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
