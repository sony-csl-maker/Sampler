export const playAudio = (url: string, audioRef: any) => {
  if (url) {
    audioRef.current.src = url;
  }
  audioRef.current.load();
  audioRef.current.play().catch((error : any) => {
    console.warn("conflict in the audio api, trying to play multiple source (was bypassed)", error);
  });
};
