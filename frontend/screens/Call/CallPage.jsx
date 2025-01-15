import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute } from "@react-navigation/native";
import io from 'socket.io-client';
import Peer from 'peerjs';

const socket = io('http://192.168.100.52:3333', {
  transports: ['websocket'],
});

export default function CallPage() {
  const route = useRoute();
  const { friendId, friendName, userId } = route.params;
  const [myPeerId, setMyPeerId] = useState('');
  const [remotePeerId, setRemotePeerId] = useState('');
  const [callStatus, setCallStatus] = useState('');
  const [ShowAcceptCall, setShowAcceptCall] = useState(false);
  const [ShowHandelMedia, setShowHandelMedia] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    // Initialisation de PeerJS
    const peer = new Peer();
    peerInstance.current = peer;

    // Obtenir l'ID Peer
    peer.on('open', (id) => {
      setMyPeerId(id);
    });

    // Gérer les appels entrants
    peer.on('call', (call) => {
      setCallStatus('Incoming call...');
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = remoteStream;
            }
          });
          setCallStatus('In call');
        })
        .catch((err) => console.error('Failed to get local stream', err));
    });

    
        // Créez la room quand l'écran se charge
        const roomId = [userId, friendId].sort().join('_');

        socket.emit("joinRoom", roomId);
    
        // Ecoutez les messages entrants dans cette room
        socket.on("getIdFrindCall", (FrindId) => {
          setRemotePeerId(FrindId);
          setShowAcceptCall(true)
        });
    
        return () => {
          socket.off("receiveMessage");
          peer.disconnect();
        };

  }, [friendId, userId]);

  const ACseptCall = () => {
    setCallStatus('In call');
    if (peerInstance.current && localVideoRef.current?.srcObject) {
      const call = peerInstance.current.call(remotePeerId, localVideoRef.current.srcObject);
      call.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
        setCallStatus('In call');
      });
      call.on('close', () => setCallStatus('Call ended'));
    }
  };

  const handleCallFrind = () => {
    const roomId = [userId, friendId].sort().join('_');
    socket.emit('callUser', { roomId, MyId: myPeerId });
  }

  const handleMedia = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error('Error accessing media devices:', err));
      setShowHandelMedia(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Start Meet</Text>
      {/* <Text>Your Peer ID:</Text>
      <Text style={styles.peerId}>{myPeerId}</Text> */}
      { 
         ShowHandelMedia ? (
          <Button title="Enable Camera/Mic" onPress={handleMedia} />
         ) : (
        <>
          <View style={styles.videoContainer}>
            <video ref={localVideoRef} autoPlay muted style={styles.video} />
            <video ref={remoteVideoRef} autoPlay style={styles.video} />
          </View>
         
          {
            ShowAcceptCall ?  
                <Button title="Acsept Call" onPress={ACseptCall} />  : <Button title={`Call ${friendName}`} onPress={handleCallFrind} />
          }
          

          <Text>Status: {callStatus}</Text>
        </>
         )
      }
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  peerId: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  videoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  video: {
    width: '48%',
    height: 200,
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
