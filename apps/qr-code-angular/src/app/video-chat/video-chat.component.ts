import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

const ICE_SERVERS: RTCIceServer[] = [
  {urls: ['stun:stun.example.com', 'stun:stun-1.example.com']},
  {urls: 'stun:stun.l.google.com:19302'}
];

const PEER_CONNECTION_CONFIG: RTCConfiguration = {
  iceServers: ICE_SERVERS
};



@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css']
})
export class VideoChatComponent implements OnInit {
  @ViewChild('dataChannelSend') dataChannelSend!: ElementRef;

  textareas: FormGroup;

  private peerConnection!: RTCPeerConnection;
  private signalingConnection!: WebSocket;
  private sendChannel!: RTCDataChannel;
  private uuid: any;

  constructor(fb: FormBuilder) {
    this.textareas = fb.group({
      dataChannelSend: new FormControl({value: '', disabled: true}),
      dataChannelReceive: ['']
    });
  }

  ngOnInit(): void {
    this.dataChannelSend.nativeElement.placeholder = 'Press Start, enter some text, then press Send...';
    this.uuid = this.createUuid();
  }

  start() {
    this.setupSignalingServer();
    this.setupPeerServer();

    this.peerConnection
      .createOffer()
      .then(this.setDescription())
      .catch(this.errorHandler);
  }

  send() {
    this.sendChannel.send('hi');
  }

  private setupSignalingServer() {
    this.signalingConnection = new WebSocket(`ws://${window.location.hostname}:8080/ws/echo`);
    this.signalingConnection.onmessage = this.getSignalMessageCallback();
    this.signalingConnection.onerror = this.errorHandler;
  }

  private setupPeerServer() {
    this.peerConnection = new RTCPeerConnection(PEER_CONNECTION_CONFIG);
    this.peerConnection.onicecandidate = this.getIceCandidateCallback();
    // this.peerConnection.ondatachannel = (event) => { console.log(`received message from channel`); };
    // this.sendChannel = this.peerConnection.createDataChannel('sendDataChannel');
  }

  private getSignalMessageCallback(): any {
    return (message: any) => {
      const signal = JSON.parse(message.data);
      if (signal.uuid === this.uuid) {
        return;
      }

      console.log('Received signal');
      console.log(signal);

      if (signal.sdp) {
        this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === 'offer') {
              this.peerConnection.createAnswer()
                .then(this.setDescription())
                .catch(this.errorHandler);
            }
          })
          .catch(this.errorHandler);
      } else if (signal.ice) {
        this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice)).catch(this.errorHandler);
      }
    };
  }

  private getIceCandidateCallback(): any {
    return (event: any) => {
      console.log(`got ice candidate:`);
      console.log(event);

      if (event.candidate != null) {
        this.signalingConnection.send(JSON.stringify({ 'ice': event.candidate, 'uuid': this.uuid }));
      }
    };
  }

  private setDescription(): (string: any) => void {
    return (description) => {
      console.log('got description');
      console.log(description);

      this.peerConnection.setLocalDescription(description)
        .then(() => {
          this.signalingConnection.send(JSON.stringify({ 'sdp': this.peerConnection.localDescription, 'uuid': this.uuid }));
        })
        .catch(this.errorHandler);
    };
  }

  private errorHandler(error: any) {
    console.log(error);
  }

  // Taken from http://stackoverflow.com/a/105074/515584
  // Strictly speaking, it's not a real UUID, but it gets the job done here
  private createUuid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

}
